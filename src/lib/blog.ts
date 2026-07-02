import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import type { Code, Root } from "mdast";
import readingTime from "reading-time";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { codeToHtml } from "shiki";
import { visit } from "unist-util-visit";

export type BlogFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
};

export type BlogPostMeta = BlogFrontmatter & {
  slug: string;
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  contentHtml: string;
};

const POSTS_DIR = path.join(process.cwd(), "posts");

function normalizeTags(tags: unknown): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) {
    return tags
      .filter((t): t is string => typeof t === "string")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

function assertFrontmatter(
  slug: string,
  data: Record<string, unknown>
): BlogFrontmatter {
  const title = typeof data.title === "string" ? data.title.trim() : "";
  const date = typeof data.date === "string" ? data.date.trim() : "";
  const excerpt = typeof data.excerpt === "string" ? data.excerpt.trim() : "";
  const tags = normalizeTags(data.tags);

  const missing: string[] = [];
  if (!title) missing.push("title");
  if (!date) missing.push("date");
  if (!excerpt) missing.push("excerpt");

  if (missing.length > 0) {
    throw new Error(
      `Post frontmatter missing ${missing.join(", ")}: ${slug}.md`
    );
  }

  return { title, date, excerpt, tags };
}

export function getBlogSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getBlogPostRaw(slug: string): {
  meta: BlogPostMeta;
  content: string;
} {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);

  const frontmatter = assertFrontmatter(slug, data as Record<string, unknown>);

  return {
    meta: {
      ...frontmatter,
      slug,
      readingTime: readingTime(content).text,
    },
    content,
  };
}

export async function markdownToHtml(markdown: string): Promise<string> {
  type ParentWithChildren = { children: unknown[] };

  function isParentWithChildren(value: unknown): value is ParentWithChildren {
    if (typeof value !== "object" || value === null) return false;
    if (!("children" in value)) return false;
    const children = (value as Record<string, unknown>).children;
    return Array.isArray(children);
  }

  const shikiCodeHighlight = () => async (tree: Root) => {
    const codeBlocks: Array<{
      node: Code;
      index: number;
      parent: ParentWithChildren;
    }> = [];

    visit(tree, "code", (node, index, parent) => {
      if (typeof index !== "number") return;
      if (!isParentWithChildren(parent)) return;
      codeBlocks.push({ node, index, parent });
    });

    for (const { node, index, parent } of codeBlocks) {
      const lang = (node.lang || "text").toLowerCase();
      let highlighted: string;

      try {
        highlighted = await codeToHtml(node.value, {
          lang,
          theme: "github-dark",
        });
      } catch {
        highlighted = await codeToHtml(node.value, {
          lang: "text",
          theme: "github-dark",
        });
      }

      parent.children[index] = {
        type: "html",
        value: highlighted,
      };
    }
  };

  const processed = await remark()
    .use(remarkGfm)
    .use(shikiCodeHighlight)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return processed.toString();
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const { meta, content } = getBlogPostRaw(slug);
  const contentHtml = await markdownToHtml(content);

  return {
    ...meta,
    content,
    contentHtml,
  };
}

export function getAllBlogPostsMeta(): BlogPostMeta[] {
  const slugs = getBlogSlugs();

  const posts = slugs.map((slug) => getBlogPostRaw(slug).meta);

  posts.sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    return bTime - aTime;
  });

  return posts;
}

export function getAllBlogTags(): string[] {
  const posts = getAllBlogPostsMeta();
  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags) tags.add(tag);
  }

  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function getRelatedBlogPosts(
  slug: string,
  limit = 3
): BlogPostMeta[] {
  const all = getAllBlogPostsMeta();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const currentTags = new Set(current.tags);

  const scored = all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const overlap = p.tags.reduce(
        (acc, tag) => acc + (currentTags.has(tag) ? 1 : 0),
        0
      );

      return { post: p, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
    })
    .slice(0, limit)
    .map(({ post }) => post);

  return scored;
}
