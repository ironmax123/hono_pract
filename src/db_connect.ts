import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URLs = process.env.SUPABASE_URL;
const SUPABASE_API_KEYs = process.env.SUPABASE_API_KEY;

if (!SUPABASE_URLs || !SUPABASE_API_KEYs) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_API_KEY environment variable");
}


export const supabase = createClient(
    SUPABASE_URLs,
    SUPABASE_API_KEYs
);