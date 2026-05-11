import { getTranslations } from "next-intl/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { listPartners } from "@/lib/supabase/queries";
import { PartnerMapClient } from "./PartnerMapClient";

// Server-Wrapper: holt Partner aus Supabase und gibt sie an den Client.
// Graceful Degradation: Ohne Supabase-Env oder ohne Partner-Datensaetze
// wird ein Empty-State gerendert.
export async function PartnerMap() {
  const t = await getTranslations("pages.mitwirkung.map");
  const partners = isSupabaseConfigured() ? await listPartners() : [];

  return (
    <section className="space-y-6 border-t border-[var(--rule-strong)] pt-5">
      <div className="space-y-2">
        <p className="editorial-kicker">
          {t("heading")}
        </p>
        <p className="max-w-2xl text-base leading-[var(--leading-relaxed)] text-foreground/70">
          {t("lead")}
        </p>
      </div>
      {partners.length === 0 ? (
        <div className="rounded-md border border-dashed border-border/70 bg-muted/30 p-8">
          <p className="text-sm text-foreground/55">{t("empty")}</p>
        </div>
      ) : (
        <PartnerMapClient partners={partners} />
      )}
    </section>
  );
}
