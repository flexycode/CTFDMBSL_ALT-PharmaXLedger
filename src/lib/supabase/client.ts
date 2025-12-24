import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        // Return a mock client or null during development if keys are missing
        console.warn("Supabase credentials missing. UI functionality will be limited.")
        // Returning as any to avoid type errors in a quick fix, 
        // effectively disabling auth features until keys are provided.
        return null as any;
    }

    return createBrowserClient(supabaseUrl, supabaseKey)
}

