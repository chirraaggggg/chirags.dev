import { format, parseISO } from "date-fns";
import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { BlogLayout } from "@/components/blog/blog-layout";
import { Prose } from "@/components/ui/typography";
import { SITE_INFO } from "@/config/site";
import {
  getBlogPost,
  getBlogSlugs,
  getRelatedBlogPosts,
  type BlogPost,
  type BlogPostMeta,
} from "@/lib/blog";

export default function BlogPostPage({
  post,
  related,
}: {
  post: BlogPost;
  related: BlogPostMeta[];
}) {
  const canonicalUrl = `${SITE_INFO.url}/blog/${post.slug}`;
  const title = `${post.title} · ${SITE_INFO.name}`;
  const description = post.excerpt;

  return (
    <BlogLayout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_INFO.url}${SITE_INFO.ogImage}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_INFO.url}${SITE_INFO.ogImage}`} />

        <meta property="article:published_time" content={post.date} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Head>

      <div className="mx-auto w-full md:max-w-3xl">
        <article className="screen-line-before screen-line-after border-x border-edge px-4 py-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
            <time dateTime={post.date}>{format(parseISO(post.date), "MMM d, yyyy")}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={{ pathname: "/blog", query: { tag } }}
                  className="rounded-md border border-edge bg-muted/30 px-2 py-1 text-xs text-foreground transition-colors hover:bg-muted/50"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8">
            <Prose>
              <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            </Prose>
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-x border-edge px-4 pb-10">
            <h2 className="text-base font-semibold text-foreground">Related posts</h2>
            <div className="mt-4 grid gap-4">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </BlogLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getBlogSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;
  if (typeof slug !== "string") {
    return { notFound: true };
  }

  const post = await getBlogPost(slug);
  const related = getRelatedBlogPosts(slug, 3);

  return {
    props: {
      post,
      related,
    },
  };
};
