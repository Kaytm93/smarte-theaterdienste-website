import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
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
      <Card className="group h-full overflow-hidden border-border/60 bg-card/50 transition-colors hover:border-border">
        <Link
          href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
          className="flex h-full flex-col"
        >
          {post.coverImageUrl ? (
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <Image
                src={post.coverImageUrl}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : null}
          <CardContent className="flex flex-1 flex-col gap-3 p-6">
            {formattedDate ? (
              <time
                dateTime={post.publishedAt ?? undefined}
                className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/55"
              >
                {formattedDate}
              </time>
            ) : null}
            <h3 className="text-lg font-semibold leading-tight tracking-tight">
              {post.title}
            </h3>
            {post.excerpt ? (
              <p className="text-sm leading-[var(--leading-relaxed)] text-foreground/70">
                {post.excerpt}
              </p>
            ) : null}
            <span className="mt-auto pt-2 text-sm font-medium text-[var(--accent-brand)]">
              {readMoreLabel} →
            </span>
          </CardContent>
        </Link>
      </Card>
    </FadeInOnScroll>
  );
}
