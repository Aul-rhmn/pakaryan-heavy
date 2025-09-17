import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, User, Settings, LogOut, Truck, Plus } from "lucide-react"
import Link from "next/link"
import { DashboardStats } from "@/components/dashboard-stats"
import { BookingsList } from "@/components/bookings-list"
import { ProfileForm } from "@/components/profile-form"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      equipment (
        name,
        brand,
        model,
        images,
        location,
        equipment_categories (name)
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const totalBookings = bookings?.length || 0
  const activeBookings = bookings?.filter((b) => b.status === "active").length || 0
  const pendingBookings = bookings?.filter((b) => b.status === "pending").length || 0
  const totalSpent = bookings?.reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">PakaryanHeavyRent</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/equipment" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              Equipment
            </Link>
            <Link href="/dashboard" className="text-orange-600 font-medium">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600 hidden sm:block">Welcome, {profile?.full_name || user.email}</span>
            <form action={handleSignOut}>
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-orange-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Manage your equipment rentals and account settings</p>
        </div>

        {/* Stats Cards */}
        <DashboardStats
          totalBookings={totalBookings}
          activeBookings={activeBookings}
          pendingBookings={pendingBookings}
          totalSpent={totalSpent}
        />

        {/* Main Content */}
        <div className="mt-8">
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="bookings" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                My Bookings
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-900">My Bookings</h2>
                <Button asChild className="bg-orange-600 hover:bg-orange-700">
                  <Link href="/equipment">
                    <Plus className="w-4 h-4 mr-2" />
                    New Booking
                  </Link>
                </Button>
              </div>

              <BookingsList bookings={bookings || []} />
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Profile Information</h2>
                <ProfileForm user={user} profile={profile} />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Account Settings</h2>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-600">Email Address</label>
                        <p className="text-slate-900">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Account Created</label>
                        <p className="text-slate-900">{new Date(user.created_at).toLocaleDateString("id-ID")}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-600">Verification Status</label>
                        <Badge
                          className={
                            profile?.verification_status === "verified"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {profile?.verification_status || "Pending"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Two-Factor Authentication
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Notification Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        Privacy Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
