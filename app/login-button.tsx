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
    <button onClick={handleLogin} className="rounded-full bg-red-600 px-8 py-3 font-bold text-white shadow-[0_0_20px_rgba(220,38,38,0.8)] transition hover:scale-105 hover:bg-red-500">
      Join the Wait with Google
    </button>
  );
}