import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_API_KEY environment variable");
}

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_API_KEY
);