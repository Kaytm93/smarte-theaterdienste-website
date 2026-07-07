import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

// Webhook-Endpunkt fuer Supabase Database-Webhooks.
// Aufruf: POST https://<host>/api/revalidate?secret=<REVALIDATE_SECRET>
// Body: Supabase-Webhook-Payload { type, table, schema, record, old_record }.

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type SupabaseWebhookPayload = {
  type?: "INSERT" | "UPDATE" | "DELETE";
  table?: string;
  schema?: string;
  record?: Record<string, unknown> | null;
  old_record?: Record<string, unknown> | null;
};

type RevalidateTarget = {
  path: string;
  type?: "page" | "layout";
};

const TABLE_TO_PATHS: Record<string, RevalidateTarget[]> = {
  posts: [
    { path: "/[locale]/blog", type: "page" },
    { path: "/[locale]/blog/[slug]", type: "page" },
    { path: "/sitemap.xml" },
  ],
  post_translations: [
    { path: "/[locale]/blog", type: "page" },
    { path: "/[locale]/blog/[slug]", type: "page" },
    { path: "/sitemap.xml" },
  ],
  events: [{ path: "/[locale]/termine", type: "page" }],
  event_translations: [{ path: "/[locale]/termine", type: "page" }],
};

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, message: "REVALIDATE_SECRET nicht konfiguriert." },
      { status: 500 },
    );
  }

  const provided =
    request.nextUrl.searchParams.get("secret") ??
    request.headers.get("x-revalidate-secret");

  if (provided !== secret) {
    return NextResponse.json(
      { revalidated: false, message: "Unauthorized." },
      { status: 401 },
    );
  }

  let payload: SupabaseWebhookPayload = {};
  try {
    payload = (await request.json()) as SupabaseWebhookPayload;
  } catch {
    // Leerer Body ist erlaubt — dann revalidiere alle bekannten Tabellen.
  }

  const tables =
    payload.table && payload.table in TABLE_TO_PATHS
      ? [payload.table]
      : Object.keys(TABLE_TO_PATHS);

  const revalidated: string[] = [];
  for (const table of tables) {
    for (const target of TABLE_TO_PATHS[table] ?? []) {
      revalidatePath(target.path, target.type);
      revalidated.push(
        target.type ? `${target.path}:${target.type}` : target.path,
      );
    }
  }

  return NextResponse.json({
    revalidated: true,
    tables,
    paths: revalidated,
    now: Date.now(),
  });
}

export function GET() {
  return NextResponse.json(
    { ok: true, message: "Use POST with x-revalidate-secret header or ?secret query." },
    { status: 200 },
  );
}
