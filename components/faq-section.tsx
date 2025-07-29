"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, HelpCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: "general" | "technical" | "account" | "features"
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const faqData: FAQItem[] = [
    {
      id: "1",
      question: "How do I create a new IT support task?",
      answer:
        "After logging into your account, click the 'Create Task' button on your dashboard. Fill in the task details including title, description, priority level, and submit. You'll receive a confirmation and can track the progress in real-time.",
      category: "general",
    },
    {
      id: "2",
      question: "What types of IT issues can I report through this system?",
      answer:
        "You can report various IT issues including network connectivity problems, software installation requests, hardware malfunctions, printer issues, email problems, password resets, and any other technology-related concerns within the university.",
      category: "technical",
    },
    {
      id: "3",
      question: "How long does it typically take to resolve an IT support request?",
      answer:
        "Response times vary based on priority level: High priority issues are addressed within 2-4 hours, medium priority within 24 hours, and low priority within 48-72 hours. You'll receive updates throughout the resolution process.",
      category: "general",
    },
    {
      id: "4",
      question: "Can I track the status of my submitted tasks?",
      answer:
        "Yes! Once you submit a task, you can track its status in real-time through your dashboard. You'll see updates when the task moves from 'Pending' to 'In Progress' to 'Resolved', along with any comments from IT staff.",
      category: "features",
    },
    {
      id: "5",
      question: "I forgot my password. How can I reset it?",
      answer:
        "Click on 'Forgot Password' on the login page, enter your registered email address, and you'll receive a password reset link. Follow the instructions in the email to create a new password securely.",
      category: "account",
    },
    {
      id: "6",
      question: "What information should I include when reporting a technical issue?",
      answer:
        "Please provide: detailed description of the problem, steps you've already tried, error messages (if any), affected devices/software, location where the issue occurs, and urgency level. Screenshots are also helpful when applicable.",
      category: "technical",
    },
    {
      id: "7",
      question: "Can I update or modify a task after submitting it?",
      answer:
        "Yes, you can edit tasks that you've created as long as they haven't been marked as resolved. Click on the task in your dashboard and select 'Edit' to modify the details or add additional information.",
      category: "features",
    },
    {
      id: "8",
      question: "Who can access the IT Support system?",
      answer:
        "The system is available to all NUB community members including students, faculty, staff, and administrators. Each user type has appropriate access levels - regular users can manage their own tasks, while IT staff have administrative privileges.",
      category: "account",
    },
    {
      id: "9",
      question: "Is there a mobile app available?",
      answer:
        "Currently, the system is web-based and fully responsive, working seamlessly on mobile browsers. A dedicated mobile app is planned for future release. You can access all features through your mobile browser.",
      category: "technical",
    },
    {
      id: "10",
      question: "How do I escalate an urgent issue?",
      answer:
        "When creating a task, set the priority to 'High' and include 'URGENT' in the title. For critical emergencies affecting multiple users, you can also call the IT helpdesk directly at +880-2-8833388 during office hours.",
      category: "general",
    },
    {
      id: "11",
      question: "Can I attach files or screenshots to my support request?",
      answer:
        "File attachment functionality is currently being developed and will be available soon. For now, you can include detailed descriptions and mention that you have screenshots available - IT staff can request them via email if needed.",
      category: "features",
    },
    {
      id: "12",
      question: "What happens after my issue is resolved?",
      answer:
        "Once resolved, you'll receive a notification and the task status will update to 'Resolved'. You can view the resolution details and provide feedback. The task remains in your history for future reference.",
      category: "general",
    },
  ]

  const categories = [
    { value: "all", label: "All Categories", count: faqData.length },
    { value: "general", label: "General", count: faqData.filter((item) => item.category === "general").length },
    { value: "technical", label: "Technical", count: faqData.filter((item) => item.category === "technical").length },
    { value: "account", label: "Account", count: faqData.filter((item) => item.category === "account").length },
    { value: "features", label: "Features", count: faqData.filter((item) => item.category === "features").length },
  ]

  const filteredFAQs = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "general":
        return "bg-blue-100 text-blue-800"
      case "technical":
        return "bg-red-100 text-red-800"
      case "account":
        return "bg-green-100 text-green-800"
      case "features":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our IT support system. Can't find what you're looking for?
            Contact us below.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.value)}
                className="rounded-full"
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search terms or browse different categories.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}
                            >
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 pr-8">{item.question}</h3>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {openItems.includes(item.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </button>

                    {openItems.includes(item.id) && (
                      <div className="px-6 pb-6">
                        <div className="border-t pt-4">
                          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-sm border p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our support team is here to help you get the assistance you
              need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Contact Support Team
              </Button>
              <Button variant="outline" size="lg">
                Browse Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
