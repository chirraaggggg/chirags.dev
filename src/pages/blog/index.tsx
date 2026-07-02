import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { BlogCard } from "@/components/blog/blog-card";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Prose } from "@/components/ui/typography";
import { SITE_INFO } from "@/config/site";
import { getAllBlogPostsMeta, getAllBlogTags, type BlogPostMeta } from "@/lib/blog";

export default function BlogIndexPage({
  posts,
  tags,
}: {
  posts: BlogPostMeta[];
  tags: string[];
}) {
  const router = useRouter();
  const activeTag =
    typeof router.query.tag === "string" ? router.query.tag : undefined;

  const filteredPosts = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  const title = `Blog · ${SITE_INFO.name}`;
  const description = "Writing about software, experiments, and shipping.";

  return (
    <BlogLayout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_INFO.url}/blog`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_INFO.url}/blog`} />
        <meta property="og:image" content={`${SITE_INFO.url}${SITE_INFO.ogImage}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_INFO.url}${SITE_INFO.ogImage}`} />
      </Head>

      <div className="mx-auto w-full md:max-w-3xl">
        <div className="screen-line-before screen-line-after border-x border-edge px-4 py-10">
          <Prose>
            <h1>Blog</h1>
            <p>{description}</p>
          </Prose>

          {tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={
                  "rounded-md border border-edge px-3 py-1.5 text-xs transition-colors hover:bg-muted/30" +
                  (!activeTag ? " bg-muted/30" : "")
                }
                aria-pressed={!activeTag}
              >
                All
              </Link>

              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={{ pathname: "/blog", query: { tag } }}
                  className={
                    "rounded-md border border-edge px-3 py-1.5 text-xs transition-colors hover:bg-muted/30" +
                    (activeTag === tag ? " bg-muted/30" : "")
                  }
                  aria-pressed={activeTag === tag}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 grid gap-4">
            {filteredPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts found.</p>
            ) : (
              filteredPosts.map((post) => <BlogCard key={post.slug} post={post} />)
            )}
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}

export async function getStaticProps() {
  const posts = getAllBlogPostsMeta();
  const tags = getAllBlogTags();

  return {
    props: {
      posts,
      tags,
    },
  };
}
