import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Truck } from "lucide-react"
import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; error_description?: string }>
}) {
  const params = await searchParams
  const error = params?.error
  const errorDescription = params?.error_description

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "access_denied":
        return "Access was denied. Please try again."
      case "server_error":
        return "A server error occurred. Please try again later."
      case "temporarily_unavailable":
        return "The service is temporarily unavailable. Please try again later."
      case "invalid_request":
        return "Invalid request. Please check your information and try again."
      default:
        return errorDescription || "An authentication error occurred."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">PakaryanHeavyRent</span>
          </Link>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-slate-900">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-slate-600">
              {error ? getErrorMessage(error) : "An unexpected error occurred during authentication."}
            </p>

            {error && (
              <div className="bg-slate-50 p-4 rounded-lg text-left">
                <p className="text-sm text-slate-600">
                  <strong>Error Code:</strong> {error}
                </p>
                {errorDescription && (
                  <p className="text-sm text-slate-600 mt-1">
                    <strong>Details:</strong> {errorDescription}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-3">
              <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
                <Link href="/auth/login">Try Again</Link>
              </Button>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>

            <p className="text-sm text-slate-500">
              If this problem persists, please{" "}
              <Link href="/contact" className="text-orange-600 hover:underline">
                contact our support team
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
