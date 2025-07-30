import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { FlipWords } from "./ui/flip-words";

export default function Hero() {
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

  const cardClasses = `
    pricing-card bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl
    border rounded-2xl p-4  flex flex-col transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl
  `;

  return (
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
              for Northern University Bangladesh. Submit, track, and resolve IT
              issues with ease.
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
  );
}
