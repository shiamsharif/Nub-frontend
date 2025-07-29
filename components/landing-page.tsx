"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Zap, Shield, Coffee, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { ContactForm } from "./contact-form"
import { FAQSection } from "./faq-section"

export function LandingPage() {
  const contributors = [
    {
      name: "Dr. Ahmed Rahman",
      role: "Project Lead & Backend Developer",
      image: "/placeholder.svg?height=100&width=100",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Sarah Khan",
      role: "Frontend Developer & UI/UX Designer",
      image: "/placeholder.svg?height=100&width=100",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Mohammad Ali",
      role: "Full Stack Developer",
      image: "/placeholder.svg?height=100&width=100",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Fatima Hassan",
      role: "Database Administrator",
      image: "/placeholder.svg?height=100&width=100",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  ]

  const reviews = [
    {
      name: "Prof. Dr. Mahmud Hasan",
      role: "Dean, Faculty of Engineering",
      content:
        "This task management system has revolutionized how we handle IT support requests. The efficiency has improved dramatically.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Rashida Begum",
      role: "Administrative Officer",
      content:
        "User-friendly interface and quick response times. Our staff can now track their IT requests seamlessly.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Karim Ahmed",
      role: "Student, CSE Department",
      content: "Finally, a system that actually works! No more waiting in long queues for IT support.",
      rating: 4,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Dr. Nasreen Sultana",
      role: "Associate Professor",
      content:
        "The dashboard provides excellent insights into task progress. Highly recommended for educational institutions.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IT</span>
                </div>
                <span className="font-semibold text-lg text-gray-900">NUB IT Support</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Animated Buy Me a Coffee Button */}
              <div className="relative group hidden sm:block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white border-0 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                  <Coffee className="w-4 h-4 mr-2 animate-bounce" />
                  <span className="relative z-10">Buy me a Coffee</span>
                </Button>
              </div>

              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Trusted by 5000+ Users at NUB</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Streamline Your
              <span className="text-blue-600 block">IT Support Experience</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The most efficient task management system designed specifically for Northern University Bangladesh.
              Submit, track, and resolve IT issues with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8 py-3">
                  Start Managing Tasks
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                  Sign In to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Submit and track your IT requests in seconds. No more waiting in long queues.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Secure & Reliable</CardTitle>
                <CardDescription>
                  Your data is protected with enterprise-grade security and 99.9% uptime guarantee.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Role-Based Access</CardTitle>
                <CardDescription>
                  Different dashboards for students, faculty, staff, and IT administrators.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Contributors</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented team behind NUB IT Support system, dedicated to making your IT experience seamless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contributors.map((contributor, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <img
                    src={contributor.image || "/placeholder.svg"}
                    alt={contributor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{contributor.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{contributor.role}</p>
                  <div className="flex justify-center space-x-3">
                    <a
                      href={contributor.github}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={contributor.linkedin}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from faculty, staff, and students who have transformed their IT support experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={review.image || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <p className="text-gray-600 text-sm">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{review.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our IT support system? We'd love to hear from you. Send us a message and we'll
              respond as soon as possible.
            </p>
          </div>

          {/* Contact Form - Full Width */}
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-lg">
                Fill out the form below and we'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IT</span>
                </div>
                <span className="font-semibold text-lg">NUB IT Support</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Streamlining IT support for Northern University Bangladesh with efficient task management and seamless
                user experience.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white transition-colors">
                    Register
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">University</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About NUB
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    IT Department
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Northern University Bangladesh. All rights reserved.</p>

            {/* Buy Me a Coffee Button in Footer */}
            <div className="mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Buy Me a Coffee
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
