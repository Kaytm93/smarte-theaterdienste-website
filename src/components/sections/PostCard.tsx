import { ViewTransition } from "react";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { PostCoverVisual } from "@/components/sections/PostCoverVisual";
import type { PostListItem } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  post: PostListItem;
  locale: Locale;
  readMoreLabel: string;
};

export function PostCard({ post, locale, readMoreLabel }: Props) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <FadeInOnScroll className="h-full">
      <Card className="group h-full overflow-hidden rounded-md border border-[var(--rule-strong)] bg-[var(--surface-elevated)] shadow-[var(--shadow-xs)] ring-0 transition-[transform,box-shadow] duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <Link
          href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
          className="flex h-full flex-col"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-foreground/[0.04]">
            <ViewTransition name={`post-cover-${post.slug}`}>
              {post.coverImageUrl ? (
                <Image
                  src={post.coverImageUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              ) : (
                <PostCoverVisual
                  title={post.title}
                  eyebrow={formattedDate}
                  className="transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              )}
            </ViewTransition>
          </div>
          <CardContent className="flex flex-1 flex-col gap-3 border-t border-[var(--rule-strong)] p-5">
            {formattedDate ? (
              <time
                dateTime={post.publishedAt ?? undefined}
                className="text-xs font-semibold uppercase text-[var(--accent-brand-ink)]"
              >
                {formattedDate}
              </time>
            ) : null}
            <h3 className="font-serif text-2xl font-semibold leading-snug tracking-[var(--tracking-heading)]">
              {post.title}
            </h3>
            {post.excerpt ? (
              <p className="text-sm leading-[var(--leading-relaxed)] text-foreground/70">
                {post.excerpt}
              </p>
            ) : null}
            <span className="mt-auto inline-flex items-center gap-1.5 border-t border-border pt-4 text-sm font-semibold uppercase text-[var(--accent-brand-ink)]">
              {readMoreLabel}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
                →
              </span>
            </span>
          </CardContent>
        </Link>
      </Card>
    </FadeInOnScroll>
  );
}
