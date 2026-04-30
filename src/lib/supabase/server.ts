import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";
import { getSupabaseEnv } from "./env";

// Server-Client fuer RSC, Server Actions, Route Handler.
// Next.js 16: cookies() ist async.
export async function getSupabaseServer() {
  const cookieStore = await cookies();
  const { url, anonKey } = getSupabaseEnv();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll kann in RSC nicht schreiben — wird vom Proxy uebernommen.
        }
      },
    },
  });
}

// Anon-Client ohne Cookie-Bindung — fuer Kontexte ohne HTTP-Request,
// z. B. generateStaticParams (Build-Zeit). RLS greift trotzdem ueber den
// anon-Key.
export function getSupabaseAnon() {
  const { url, anonKey } = getSupabaseEnv();
  return createClient<Database>(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
