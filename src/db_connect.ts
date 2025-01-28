import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_API_KEY
);
declare global {
  const SUPABASE_API_KEY: string;
  const SUPABASE_URL: string;
}