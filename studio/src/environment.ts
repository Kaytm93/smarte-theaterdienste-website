function required(value: string | undefined, label: string): string {
  if (!value) {
    throw new Error(
      `${label} fehlt. Lege studio/.env.local auf Basis von studio/.env.example an.`,
    );
  }

  return value;
}

export const projectId = required(
  process.env.SANITY_STUDIO_PROJECT_ID,
  "Sanity-Projekt-ID",
);

export const dataset = process.env.SANITY_STUDIO_DATASET || "production";
export const studioTitle =
  process.env.SANITY_STUDIO_TITLE || "Smarte Theaterdienste";
export const studioHostname = process.env.SANITY_STUDIO_HOSTNAME;
