export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3030";
  return raw.replace(/\/+$/, "");
}
