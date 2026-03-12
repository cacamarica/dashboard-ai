import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Supabase Client for Credential & User Management
 * 
 * Purpose:
 * - User authentication and authorization
 * - Storing user preferences (dashboard settings, theme, etc.)
 * - Managing API keys and credentials securely
 * 
 * NOT used for:
 * - Inventory data storage (comes from n8n webhook)
 * - Usage records (comes from n8n webhook)
 * - Stock movements (comes from n8n webhook)
 */
