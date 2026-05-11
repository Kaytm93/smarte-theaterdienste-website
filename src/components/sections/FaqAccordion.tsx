"use client";

import ReactMarkdown from "react-markdown";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/supabase/queries";

type Props = {
  faqs: FaqItem[];
};

export function FaqAccordion({ faqs }: Props) {
  return (
    <Accordion type="single" collapsible className="divide-y divide-[var(--rule-strong)] border-y border-[var(--rule-strong)]">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="py-5 text-left font-serif text-xl font-semibold">
            <span className="mr-4 font-mono text-xs text-[var(--accent-secondary)]">
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
  );
}
