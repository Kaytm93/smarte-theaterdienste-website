"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";
import { getSupabaseEnv } from "./env";

// Browser-Client fuer Client-Components (z. B. Newsletter-Form).
// Singleton via @supabase/ssr default-Verhalten — eine Instanz pro Tab.
export function getSupabaseBrowser() {
  const { url, anonKey } = getSupabaseEnv();
  return createBrowserClient<Database>(url, anonKey);
}
