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
import { parentVariants, slideVariants } from "@/lib/animate";

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
    pricing-card bg-zinc-50 dark:bg-zinc-900 backdrop-blur-xl
    border rounded-2xl p-4  flex flex-col transition-all duration-300
    hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-2xl
  `;

  return (
    <div className="w-full bg-[#f8fafc] dark:bg-zinc-900 relative">
      {/* Top Fade Grid Background */}
      <div
        className={`absolute inset-0 z-0 bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,_#000_60%,_transparent_100%)] [background-image:linear-gradient(to_right,_#e2e8f0_1px,_transparent_1px),_linear-gradient(to_bottom,_#e2e8f0_1px,_transparent_1px),_linear-gradient(to_right,_#1e293b_1px,_transparent_1px),_linear-gradient(to_bottom,_#1e293b_1px,_transparent_1px)] dark:[background-image:linear-gradient(to_right,_#1e293b_1px,_transparent_1px),_linear-gradient(to_bottom,_#1e293b_1px,_transparent_1px),_linear-gradient(to_right,_#374151_1px,_transparent_1px),_linear-gradient(to_bottom,_#374151_1px,_transparent_1px)]`}
      />
      {/* Your Content/Components */}
      <motion.section
        initial="initial"
        whileInView={"animate"}
        viewport={{ once: true, amount: 0.8 }}
        variants={parentVariants}
        className="relative overflow-hidden py-24 md:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div variants={slideVariants}>
              {/* <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100 text-sm px-3 py-1">
                Trusted by 5000+ Users at NUB
              </Badge> */}
              <ShimmerButton />
            </motion.div>

            <motion.h1
              variants={slideVariants}
              className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white   mb-6 leading-tight"
            >
              Get
              <FlipWords words={["Swift", "Smart", "Sharp"]} />
              IT Support
              <span className="block">For a Better Experience</span>
            </motion.h1>
            <motion.p
              variants={slideVariants}
              className="text-xl text-gray-600 dark:text-gray-100 mb-8 max-w-3xl mx-auto"
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
              <Card className="border-0 shadow-xl bg-gray-50 dark:bg-zinc-800 hover:shadow-2xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
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
              <Card className="border-0 shadow-xl bg-gray-50 dark:bg-zinc-800 hover:shadow-2xl transition-shadow duration-300">
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
              <Card className="border-0 shadow-xl bg-gray-50 dark:bg-zinc-800 hover:shadow-2xl transition-shadow duration-300">
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

// The main App component that renders our ShimmerButton
function ShimmerButton() {
  const customCss = `
    /* This is the key to the seamless animation.
      The @property rule tells the browser that '--angle' is a custom property
      of type <angle>. This allows the browser to smoothly interpolate it
      during animations, preventing the "jump" at the end of the loop.
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

  return (
    // Main container to center the button on the page
    <div className="flex items-center justify-center font-sans mb-6">
      <style>{customCss}</style>
      <button className="relative inline-flex items-center justify-center p-[1.5px] bg-gray-300 dark:bg-black rounded-full overflow-hidden group bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 dark:border-purple-500/30 mb-6 sm:mb-10 backdrop-blur-md shadow-lg shadow-blue-500/10 dark:shadow-purple-500/20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "conic-gradient(from var(--angle), transparent 25%, #7a00e6, transparent 50%)",
            animation: "shimmer-spin 1.5s linear infinite",
          }}
        />
        <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-8 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-300">
          ✨ Trusted by 5000+ Users at NUB
        </span>
      </button>
    </div>
  );
}
