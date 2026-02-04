import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

/*
  To set up Supabase, create a project at https://supabase.com and run this SQL:

  CREATE TABLE prospects (
    id TEXT PRIMARY KEY,
    company_name TEXT NOT NULL,
    contact_name TEXT DEFAULT '',
    email TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    status TEXT DEFAULT 'new',
    type TEXT DEFAULT 'business',
    country TEXT DEFAULT 'GE',
    monthly_fee NUMERIC DEFAULT 0,
    integration_fee NUMERIC DEFAULT 0,
    monthly_cost NUMERIC DEFAULT 0,
    logo_url TEXT DEFAULT '',
    notes TEXT DEFAULT '',
    integration_start_date TEXT DEFAULT '',
    payment_day_of_month INTEGER DEFAULT 1,
    payment_delayed BOOLEAN DEFAULT false,
    payment_delay_notes TEXT DEFAULT '',
    cost_history JSONB DEFAULT '[]',
    created_at TEXT DEFAULT now(),
    updated_at TEXT DEFAULT now()
  );

  -- Disable RLS for simplicity (private CRM)
  ALTER TABLE prospects DISABLE ROW LEVEL SECURITY;

  Then add these env vars in Vercel:
    VITE_SUPABASE_URL=https://xxx.supabase.co
    VITE_SUPABASE_ANON_KEY=eyJ...
*/
