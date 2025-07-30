"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";

function Reviews() {
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

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-100 max-w-2xl mx-auto">
            Hear from faculty, staff, and students who have transformed their IT
            support experience.
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
              <Card className="hover:shadow-lg bg-gray-50 dark:bg-zinc-800 transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={review.image || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-100"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-50">
                        {review.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-100 text-sm">
                        {review.role}
                      </p>
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
                  <p className="text-gray-700 dark:text-gray-200 italic">
                    "{review.content}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Reviews;
