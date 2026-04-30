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
    <Accordion type="single" collapsible className="divide-y divide-border/60">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="py-4 text-base font-medium">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-foreground/75">
            <ReactMarkdown>{faq.answerMd}</ReactMarkdown>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
