import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Add the user to the waitlist. If they're already on it, do nothing.
      const { error: waitlistError } = await supabase.from("waitlist").upsert(
        { user_id: data.user.id, email: data.user.email },
        { onConflict: "user_id", ignoreDuplicates: true }
      );
      if (waitlistError) {
        console.error("Waitlist save failed:", waitlistError.message);
      }
      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.redirect(`${origin}/?error=login_failed`);
}