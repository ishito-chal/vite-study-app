import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://prjpkcarocysiildwene.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByanBrY2Fyb2N5c2lpbGR3ZW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzOTI5NTYsImV4cCI6MjA2MTk2ODk1Nn0.AqkmHzAhtr_6TptbEJzLTtTZPDrET29q6Ft3R6ryVlI";

export const createSupabase = createClient(supabaseUrl, supabaseKey);
