// Resolves the Supabase project the server code should talk to.
// The platform-managed SUPABASE_URL can point at a different (legacy) project
// than the service key we actually hold, which causes "Invalid API key" (401).
// APP_SUPABASE_URL wins, then the known app project, then the managed URL.
const APP_PROJECT_URL = "https://bhmladpeikgetvlkqvyg.supabase.co";

export function getServerSupabaseUrl(): string {
  return process.env.APP_SUPABASE_URL || APP_PROJECT_URL || process.env.SUPABASE_URL || "";
}

export function getServerSupabaseServiceKey(): string {
  return (
    process.env.APP_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  );
}
