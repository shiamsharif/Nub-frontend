"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { childVariants, parentVariants, slideVariants } from "@/lib/animate";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Enhancing Campus Connectivity with Wi-Fi 6",
      description:
        "Discover how NUB IT is upgrading the campus network for faster and more reliable internet access.",
      date: "July 25, 2024",
      category: "Technology",
      image: "/placeholder.svg?height=400&width=600",
      slug: "enhancing-campus-connectivity-with-wifi-6",
    },
    {
      id: 2,
      title: "Cybersecurity Best Practices for Students",
      description:
        "Learn essential tips to protect your data and devices from online threats and scams.",
      date: "July 20, 2024",
      category: "Security",
      image: "/placeholder.svg?height=400&width=600",
      slug: "cybersecurity-best-practices-for-students",
    },
    {
      id: 3,
      title: "Introducing Our New Task Management System",
      description:
        "A deep dive into the features and benefits of the new NUB IT Support task management platform.",
      date: "July 15, 2024",
      category: "Updates",
      image: "/placeholder.svg?height=400&width=600",
      slug: "introducing-new-task-management-system",
    },
    {
      id: 4,
      title: "Troubleshooting Common Laptop Issues",
      description:
        "Quick fixes for common laptop problems you can solve yourself before contacting IT support.",
      date: "July 10, 2024",
      category: "Tips & Tricks",
      image: "/placeholder.svg?height=400&width=600",
      slug: "troubleshooting-common-laptop-issues",
    },
    {
      id: 5,
      title: "The Future of Smart Classrooms at NUB",
      description:
        "Exploring the integration of AI and IoT to create more interactive learning environments.",
      date: "July 05, 2024",
      category: "Innovation",
      image: "/placeholder.svg?height=400&width=600",
      slug: "future-of-smart-classrooms",
    },
    {
      id: 6,
      title: "How to Access NUB's Online Resources Remotely",
      description:
        "A step-by-step guide to accessing library databases, software, and other resources from home.",
      date: "July 01, 2024",
      category: "Guides",
      image: "/placeholder.svg?height=400&width=600",
      slug: "access-online-resources-remotely",
    },
  ];

  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 md:py-32 text-center bg-gradient-to-r rom-blue-600 dark:from-zinc-900 to-purple-600 dark:bg-zinc-800 text-gray-50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-md text-gray-900 dark:text-gray-50">
            NUB IT Blog
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-gray-200">
            Stay updated with the latest IT news, tips, and announcements from
            Northern University Bangladesh.
          </p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={parentVariants}
          className="mb-16"
        >
          <motion.h2
            variants={slideVariants}
            className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 text-center"
          >
            Featured Post
          </motion.h2>
          <motion.div variants={slideVariants}>
            <Card className="overflow-hidden shadow-xl bg-gray-50 dark:bg-zinc-800 hover:shadow-2xl transition-shadow duration-300 border-0">
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-full object-cover rounded-l-lg"
                />
                <CardContent className="p-6 flex flex-col justify-center">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-3 self-start">
                    <Tag className="w-3 h-3 mr-1" /> {featuredPost.category}
                  </Badge>
                  <CardTitle className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-50">
                    {featuredPost.title}
                  </CardTitle>
                  <CardDescription className="text-gray-700 dark:text-gray-200 mb-4 text-lg">
                    {featuredPost.description}
                  </CardDescription>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-6">
                    <CalendarDays className="w-4 h-4 mr-2" />{" "}
                    {featuredPost.date}
                  </div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600 hover:text-blue-800"
                    >
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Recent Posts */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={parentVariants}
        >
          <motion.h2
            variants={slideVariants}
            className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-8 text-center"
          >
            Recent Posts
          </motion.h2>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={childVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {recentPosts.map((post) => (
              <motion.div key={post.id} variants={slideVariants}>
                <Card className="overflow-hidden shadow-lg bg-zinc-50 dark:bg-zinc-800 hover:shadow-xl transition-shadow duration-300 border-0 h-full flex flex-col">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6 flex flex-col flex-grow">
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 mb-3 self-start">
                      <Tag className="w-3 h-3 mr-1" /> {post.category}
                    </Badge>
                    <CardTitle className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-700 dark:text-gray-200 mb-4 flex-grow">
                      {post.description}
                    </CardDescription>
                    <div className="flex items-center text-gray-500 dark:text-gray-200 text-sm mb-4">
                      <CalendarDays className="w-4 h-4 mr-2" /> {post.date}
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 hover:text-blue-800"
                      >
                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
