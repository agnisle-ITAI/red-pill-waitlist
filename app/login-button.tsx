"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginButton() {
  async function handleLogin() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <button onClick={handleLogin} className="rounded-lg bg-red-600 text-white px-6 py-3">
      Join with Google
    </button>
  );
}