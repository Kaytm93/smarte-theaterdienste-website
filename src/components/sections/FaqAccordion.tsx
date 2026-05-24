"use client";

import ReactMarkdown from "react-markdown";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/supabase/queries";

export type FaqGroup = {
  key: string;
  label: string | null;
  items: FaqItem[];
};

type Props = {
  groups: FaqGroup[];
};

export function FaqAccordion({ groups }: Props) {
  const labelled = groups.filter((group) => group.label);

  return (
    <div className="space-y-14">
      {labelled.length > 1 ? (
        <nav className="flex flex-wrap gap-2" aria-label="FAQ">
          {labelled.map((group) => (
            <a
              key={group.key}
              href={`#faq-${group.key}`}
              className="rounded-full border border-[var(--rule-strong)] px-3 py-1 text-sm font-semibold text-foreground/70 transition-colors hover:border-[var(--accent-brand)] hover:text-foreground"
            >
              {group.label}
            </a>
          ))}
        </nav>
      ) : null}

      {groups.map((group) => (
        <div
          key={group.key}
          id={`faq-${group.key}`}
          className="scroll-mt-[calc(var(--header-height)+1.5rem)]"
        >
          {group.label ? (
            <h2 className="mb-4 border-b border-[var(--rule-strong)] pb-2 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent-brand-ink)]">
              {group.label}
            </h2>
          ) : null}
          <Accordion
            type="single"
            collapsible
            className="divide-y divide-[var(--rule-strong)] border-b border-[var(--rule-strong)]"
          >
            {group.items.map((faq, index) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="py-5 text-left font-serif text-xl font-semibold">
                  <span className="mr-4 font-mono text-xs text-[var(--accent-brand)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/76 [&_p]:leading-[var(--leading-relaxed)]">
                  <ReactMarkdown>{faq.answerMd}</ReactMarkdown>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
