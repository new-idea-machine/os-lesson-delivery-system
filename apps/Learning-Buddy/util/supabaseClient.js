import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const SUPABASE_URL = Constants.manifest.extra.supabaseURL;
const SUPABASE_ANON_KEY = Constants.manifest.extra.supabaseKEY_PUBLIC;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY from app.config.js');
};

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

export default supabase;
