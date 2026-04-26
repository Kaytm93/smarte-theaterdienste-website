import { ContactCard } from "./ContactCard";
import { FadeInOnScroll } from "@/components/animations/FadeInOnScroll";
import type { TeamMember } from "@/lib/content/loader";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <FadeInOnScroll className="mx-auto max-w-[var(--container-max)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member) => (
          <ContactCard key={member.id} member={member} />
        ))}
      </div>
    </FadeInOnScroll>
  );
}
