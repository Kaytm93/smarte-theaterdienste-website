import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import { RevealText } from "@/components/animations/RevealText";
import type { PostDetail } from "@/lib/supabase/queries";
import type { Locale } from "@/lib/i18n/routing";

type Props = {
  post: PostDetail;
  locale: Locale;
  publishedAtLabel: string;
  backToListLabel: string;
};

export function PostArticle({ post, locale, publishedAtLabel, backToListLabel }: Props) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article className="mx-auto flex max-w-[var(--container-max)] flex-col gap-10 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 lg:px-8">
      <header className="flex max-w-3xl flex-col gap-5">
        {formattedDate ? (
          <FadeInOnScroll className="text-xs font-medium uppercase tracking-[0.22em] text-foreground/55">
            {publishedAtLabel}{" "}
            <time dateTime={post.publishedAt ?? undefined}>{formattedDate}</time>
          </FadeInOnScroll>
        ) : null}
        <h1 className="text-balance font-semibold leading-[var(--leading-tight)] tracking-tight text-[length:var(--text-h1)]">
          <RevealText>{post.title}</RevealText>
        </h1>
        {post.excerpt ? (
          <FadeInOnScroll
            delay={0.15}
            className="max-w-2xl text-pretty text-base leading-[var(--leading-relaxed)] text-foreground/75 md:text-lg"
          >
            {post.excerpt}
          </FadeInOnScroll>
        ) : null}
      </header>

      {post.coverImageUrl ? (
        <FadeInOnScroll className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
          <Image
            src={post.coverImageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority
            className="object-cover"
          />
        </FadeInOnScroll>
      ) : null}

      <FadeInOnScroll
        delay={0.1}
        className="prose prose-neutral dark:prose-invert max-w-3xl text-base leading-[var(--leading-relaxed)] text-foreground/85 [&_a]:text-[var(--accent-brand)] [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:font-semibold"
      >
        <ReactMarkdown>{post.bodyMd}</ReactMarkdown>
      </FadeInOnScroll>

      <div className="pt-2">
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/blog">← {backToListLabel}</Link>
        </Button>
      </div>
    </article>
  );
}
