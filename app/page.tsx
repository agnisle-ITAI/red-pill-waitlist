import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import MatrixRain from "./matrix-rain";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const meta = user?.user_metadata;
  const firstName = (meta?.full_name ?? user?.email ?? "").split(" ")[0];

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 font-mono">
      <MatrixRain />

      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-5 rounded-2xl border border-green-500/40 bg-black/75 p-8 text-center text-green-400 shadow-[0_0_40px_rgba(0,255,65,0.25)] backdrop-blur-sm">
        {user ? (
          <>
            {meta?.avatar_url && (
              <Image
                src={meta.avatar_url}
                alt={`${firstName}'s profile picture`}
                width={96}
                height={96}
                className="rounded-full ring-2 ring-green-400"
              />
            )}
            <h1 className="text-3xl font-bold [text-shadow:0_0_12px_#00ff41]">
              You&apos;re on the list, {firstName}!
            </h1>
            <p>{user.email}</p>
            <LogoutButton />

            <h2 className="mt-6 font-bold">Everything Google told us</h2>
            <pre className="w-full overflow-x-auto rounded-lg border border-green-500/30 bg-black p-4 text-left text-xs">
              {JSON.stringify(meta, null, 2)}
            </pre>
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold [text-shadow:0_0_12px_#00ff41]">The Red Pill</h1>
            <p className="text-lg">Get unplugged from the simulation.</p>
            <LoginButton />
          </>
        )}
      </div>
    </main>
  );
}