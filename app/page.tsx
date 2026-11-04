import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Logged out: show the landing page
  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-4xl font-bold">The Red Pill</h1>
        <p className="text-lg">Get unplugged from the simulation.</p>
        <LoginButton />
      </main>
    );
  }

  // Logged in: show what Google told us
  const meta = user.user_metadata;
  const firstName = (meta.full_name ?? user.email ?? "").split(" ")[0];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      {meta.avatar_url && (
        <Image
          src={meta.avatar_url}
          alt={`${firstName}'s profile picture`}
          width={96}
          height={96}
          className="rounded-full"
        />
      )}
      <h1 className="text-3xl font-bold">You&apos;re on the list, {firstName}!</h1>
      <p>{user.email}</p>
      <LogoutButton />

      <h2 className="mt-8 font-bold">Everything Google told us</h2>
      <pre className="w-full max-w-xl overflow-x-auto rounded-lg bg-neutral-900 text-neutral-100 p-4 text-left text-xs">
        {JSON.stringify(meta, null, 2)}
      </pre>
    </main>
  );
}