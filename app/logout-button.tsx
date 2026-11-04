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
    <button onClick={handleLogout} className="rounded-lg border border-red-600 text-red-600 px-6 py-3">
      Log out
    </button>
  );
}
