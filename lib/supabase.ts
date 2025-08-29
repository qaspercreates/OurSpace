// lib/supabase.ts
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser-side client (used in "use client" components).
 * Exported name matches our imports everywhere.
 */
export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase env vars");
  }
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}
