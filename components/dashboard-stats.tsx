import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, CreditCard, TrendingUp } from "lucide-react"

interface DashboardStatsProps {
  totalBookings: number
  activeBookings: number
  pendingBookings: number
  totalSpent: number
}

export function DashboardStats({ totalBookings, activeBookings, pendingBookings, totalSpent }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Rentals",
      value: activeBookings,
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending Bookings",
      value: pendingBookings,
      icon: TrendingUp,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Total Spent",
      value: `Rp ${totalSpent.toLocaleString("id-ID")}`,
      icon: CreditCard,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
