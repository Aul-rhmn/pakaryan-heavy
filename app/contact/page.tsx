import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Truck } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
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
            <Link href="/about" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-orange-600 font-medium">
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

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">Get in Touch</Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ready to rent heavy equipment? Our team is here to help you find the perfect solution for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-orange-600" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-2">Call us for immediate assistance</p>
                  <p className="text-lg font-semibold text-slate-900">+62 21 5555 0123</p>
                  <p className="text-sm text-slate-500">Available 24/7</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-orange-600" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-2">Send us your inquiries</p>
                  <p className="text-lg font-semibold text-slate-900">info@pakaryanheavyrent.com</p>
                  <p className="text-sm text-slate-500">Response within 2 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-2">Visit our main office</p>
                  <p className="text-lg font-semibold text-slate-900">Jakarta, Indonesia</p>
                  <p className="text-sm text-slate-500">Jl. Sudirman No. 123, Jakarta Pusat</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Monday - Friday</span>
                      <span className="font-semibold">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Saturday</span>
                      <span className="font-semibold">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Sunday</span>
                      <span className="font-semibold">Emergency Only</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-slate-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                        First Name *
                      </label>
                      <Input id="firstName" placeholder="Enter your first name" required />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name *
                      </label>
                      <Input id="lastName" placeholder="Enter your last name" required />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <Input id="email" type="email" placeholder="Enter your email address" required />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                      Company Name
                    </label>
                    <Input id="company" placeholder="Enter your company name" />
                  </div>

                  <div>
                    <label htmlFor="equipment" className="block text-sm font-medium text-slate-700 mb-2">
                      Equipment Needed
                    </label>
                    <Input id="equipment" placeholder="e.g., Excavator, Bulldozer, Crane" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project and equipment requirements..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12">
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Emergency Equipment Rental</h3>
                <p className="text-slate-600 mb-4">
                  Need equipment urgently? Our emergency hotline is available 24/7 for critical projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Call Emergency Hotline: +62 21 5555 0999
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent"
                  >
                    WhatsApp: +62 812 3456 7890
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
