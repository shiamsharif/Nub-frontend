"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Lightbulb, ShieldCheck, Handshake, Award } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously exploring new technologies to enhance IT services and campus experience.",
    },
    {
      icon: ShieldCheck,
      title: "Security",
      description: "Prioritizing data protection and cybersecurity to ensure a safe digital environment.",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description: "Working closely with all university departments to meet their unique IT needs.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering high-quality, reliable, and efficient IT solutions.",
    },
  ]

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 md:py-32 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md">About NUB IT Support</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Dedicated to empowering Northern University Bangladesh with cutting-edge technology and reliable support.
          </p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Mission Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            At NUB IT Support, our mission is to provide seamless, secure, and innovative technological solutions that
            empower students, faculty, and staff to achieve their academic and professional goals. We strive to be the
            backbone of Northern University Bangladesh's digital infrastructure, ensuring uninterrupted learning and
            operational excellence.
          </p>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-2 text-gray-900">{value.title}</CardTitle>
                  <CardDescription className="text-gray-700">{value.description}</CardDescription>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Our History Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our History</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Established alongside Northern University Bangladesh, the IT Support department has grown from a small team
            managing basic network infrastructure to a comprehensive unit overseeing all technological aspects of the
            university. Over the years, we have adapted to rapid technological advancements, consistently upgrading our
            systems and services to meet the evolving needs of a modern educational institution.
          </p>
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            src="/placeholder.svg?height=400&width=800"
            alt="NUB Campus"
            className="mt-12 rounded-lg shadow-xl mx-auto w-full max-w-4xl"
          />
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center bg-blue-600 text-white p-12 rounded-lg shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Seamless IT?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied users at NUB who rely on our efficient IT support system.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Today
            </Button>
          </Link>
        </motion.section>
      </div>
    </div>
  )
}
