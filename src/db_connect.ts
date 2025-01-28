import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URLs = process.env.SUPABASE_URL||'';
const SUPABASE_API_KEYs = process.env.SUPABASE_API_KEY||'';

export const supabase = createClient(
    SUPABASE_URLs,
    SUPABASE_API_KEYs
);