import "@testing-library/jest-dom";

process.env.VITE_SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || "http://localhost";
process.env.VITE_SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY || "test-key";
