import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL: string = process.env.SUPABASE_URL as string;
const SUPABASE_API_KEY: string = process.env.SUPABASE_API_KEY as string;

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_API_KEY environment variable");
}

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_API_KEY
);