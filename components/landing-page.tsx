"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Zap, Shield, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "./contact-form";
import { FAQSection } from "./faq-section";
import { motion } from "framer-motion";
import { AuroraText } from "./ui/aurora-text";
import { FlipWords } from "./ui/flip-words";
import MeetContributors from "./meet-contibuters";

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
  ];

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
      content:
        "Finally, a system that actually works! No more waiting in long queues for IT support.",
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
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardClasses = `
    pricing-card bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl
    border rounded-2xl p-4  flex flex-col transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl
  `;

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-[#f8fafc] relative">
        {/* Top Fade Grid Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
            backgroundSize: "40px 40px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        {/* Your Content/Components */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="relative overflow-hidden py-24 md:py-32"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100 text-sm px-3 py-1">
                  Trusted by 5000+ Users at NUB
                </Badge>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
              >
                Get
                <FlipWords words={["Swift", "Smart", "Sharp"]} />
                IT Support
                <span className="block">For a Better Experience</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              >
                The most efficient task management system designed specifically
                for Northern University Bangladesh. Submit, track, and resolve
                IT issues with ease.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/register">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all"
                  >
                    Start Managing Tasks
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-3 bg-transparent shadow-lg hover:shadow-xl transition-all"
                  >
                    Sign In to Dashboard
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
              }}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div className={cardClasses} variants={cardVariants}>
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle>Lightning Fast</CardTitle>
                    <CardDescription>
                      Submit and track your IT requests in seconds. No more
                      waiting in long queues.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div className={cardClasses} variants={cardVariants}>
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle>Secure & Reliable</CardTitle>
                    <CardDescription>
                      Your data is protected with enterprise-grade security and
                      99.9% uptime guarantee.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>

              <motion.div className={cardClasses} variants={cardVariants}>
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle>Role-Based Access</CardTitle>
                    <CardDescription>
                      Different dashboards for students, faculty, staff, and IT
                      administrators.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Contributors Section */}
      <MeetContributors />

      {/* Reviews Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from faculty, staff, and students who have transformed their
              IT support experience.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid md:grid-cols-2 gap-8"
          >
            {reviews.map((review, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={review.image || "/placeholder.svg"}
                        alt={review.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-100"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {review.name}
                        </h4>
                        <p className="text-gray-600 text-sm">{review.role}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{review.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our IT support system? We'd love to hear from
              you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Form - Full Width */}
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-lg">
                Fill out the form below and we'll get back to you within 24
                hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </motion.section>
    </div>
  );
}
