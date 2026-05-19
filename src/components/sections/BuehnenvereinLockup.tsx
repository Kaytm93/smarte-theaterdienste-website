import Image from "next/image";

type Props = {
  label: string;
  buehnenvereinAlt: string;
  partners?: Array<{ key: string; src: string; alt: string }>;
};

export function BuehnenvereinLockup({ label, buehnenvereinAlt, partners = [] }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-brand-pale)]"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent-brand)]" />
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/60">
            {label}
          </span>
          <Image
            src="/logos/buehnenverein.png"
            alt={buehnenvereinAlt}
            width={180}
            height={48}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </div>
      </div>

      {partners.length > 0 ? (
        <>
          <span aria-hidden className="hidden h-9 w-px bg-[var(--rule)] sm:block" />
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {partners.map((partner) => (
              <li key={partner.key} className="relative block h-6 w-auto opacity-70">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  width={120}
                  height={24}
                  className="h-6 w-auto object-contain grayscale"
                />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
