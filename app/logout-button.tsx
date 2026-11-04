"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className="rounded-full bg-blue-600 px-6 py-3 font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.8)] transition hover:scale-105 hover:bg-blue-500">
      Log out
    </button>
  );
}
