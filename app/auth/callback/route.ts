import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/dashboard"

    console.log("[v0] Auth callback - code:", !!code, "next:", next)

    if (code) {
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      console.log("[v0] Code exchange result:", { error })

      if (!error) {
        const forwardedHost = request.headers.get("x-forwarded-host")
        const isLocalEnv = process.env.NODE_ENV === "development"

        console.log("[v0] Redirecting to:", next)

        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`)
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`)
        } else {
          return NextResponse.redirect(`${origin}${next}`)
        }
      } else {
        console.log("[v0] Code exchange failed:", error)
      }
    }

    // Return the user to an error page with instructions
    console.log("[v0] Redirecting to error page")
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  } catch (error) {
    console.log("[v0] Callback route error:", error)
    const { origin } = new URL(request.url)
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }
}
