import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Shield, Clock, Star, ArrowRight, Truck, Settings, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">PakaryanHeavyRent</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/equipment" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              Equipment
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-600 hover:text-orange-600">
                Login
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-slate-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-orange-100 text-orange-800 border-orange-200">
              Trusted by 500+ Construction Companies
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 text-balance">
              Rent Heavy Equipment
              <span className="text-orange-600"> Across Java Island</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 text-pretty max-w-2xl mx-auto">
              Access excavators, bulldozers, cranes, and more construction equipment. Professional service, competitive
              rates, and reliable delivery.
            </p>

            {/* Search Bar */}
            <form action="/equipment" method="GET" className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white rounded-2xl shadow-lg border">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    name="search"
                    placeholder="Search equipment (excavator, crane, bulldozer...)"
                    className="pl-10 border-0 focus-visible:ring-0 text-base"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    name="location"
                    placeholder="Location (Jakarta, Surabaya, Bandung...)"
                    className="pl-10 border-0 focus-visible:ring-0 text-base"
                  />
                </div>
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-base">
                  Search
                </Button>
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-green-600" />
                Verified Equipment
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-600" />
                24/7 Support
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-600" />
                4.9/5 Rating
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Popular Equipment Categories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose from our extensive fleet of well-maintained heavy equipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Excavators",
                description: "Hydraulic excavators for digging and earthmoving",
                image: "/images/excavator-hero.jpg",
                count: "25+ Available",
                startingPrice: "From Rp 2.5M/day",
              },
              {
                name: "Bulldozers",
                description: "Heavy-duty bulldozers for land clearing",
                image: "/images/bulldozer-hero.jpg",
                count: "18+ Available",
                startingPrice: "From Rp 3M/day",
              },
              {
                name: "Mobile Cranes",
                description: "All-terrain cranes for lifting operations",
                image: "/images/crane-hero.jpg",
                count: "12+ Available",
                startingPrice: "From Rp 4M/day",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden"
              >
                <Link
                  href={`/equipment?category=${category.name === "Mobile Cranes" ? "Crane" : category.name.slice(0, -1)}`}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </div>
                </Link>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{category.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-600 font-semibold">{category.startingPrice}</span>
                    <Link
                      href={`/equipment?category=${category.name === "Mobile Cranes" ? "Crane" : category.name.slice(0, -1)}`}
                    >
                      <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700 p-0">
                        View All <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Why Choose PakaryanHeavyRent?</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We make heavy equipment rental simple, reliable, and cost-effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Equipment",
                description: "All equipment undergoes rigorous safety inspections and maintenance checks",
              },
              {
                icon: Truck,
                title: "Island-wide Delivery",
                description: "Free delivery and pickup across Java Island with professional operators",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock customer support and emergency assistance",
              },
              {
                icon: Users,
                title: "Expert Operators",
                description: "Certified operators available for complex projects and training",
              },
              {
                icon: Settings,
                title: "Flexible Terms",
                description: "Daily, weekly, or monthly rentals with competitive pricing",
              },
              {
                icon: Star,
                title: "Trusted Service",
                description: "4.9/5 rating from 500+ satisfied construction companies",
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of construction companies who trust us with their equipment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/equipment">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8">
                Browse Equipment
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 bg-transparent"
              >
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PakaryanHeavyRent</span>
              </div>
              <p className="text-slate-400 mb-4">Your trusted partner for heavy equipment rental across Java Island.</p>
              <div className="space-y-2 text-slate-400">
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4">📞</span>
                  <span>+62 21 5555 0123</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4">✉️</span>
                  <span>info@pakaryanheavyrent.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4">📍</span>
                  <span>Jakarta, Indonesia</span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Equipment</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/equipment/excavators" className="hover:text-white transition-colors">
                    Excavators
                  </Link>
                </li>
                <li>
                  <Link href="/equipment/bulldozers" className="hover:text-white transition-colors">
                    Bulldozers
                  </Link>
                </li>
                <li>
                  <Link href="/equipment/cranes" className="hover:text-white transition-colors">
                    Cranes
                  </Link>
                </li>
                <li>
                  <Link href="/equipment/loaders" className="hover:text-white transition-colors">
                    Loaders
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="hover:text-white transition-colors">
                    Safety Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 PakaryanHeavyRent. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
