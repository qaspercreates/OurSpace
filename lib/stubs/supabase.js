// Safe stub for build; replace with real supabase client later
function createClient() {
  return {
    from: () => ({
      select: async () => ({ data: [], error: null }),
      insert: async () => ({ data: null, error: null }),
      update: async () => ({ data: null, error: null })
    }),
    auth: {
      getUser: async () => ({ data: { user: null }, error: null })
    }
  };
}
module.exports = { createClient };
