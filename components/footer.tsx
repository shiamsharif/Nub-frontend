"use client";

import Link from "next/link";
import { Coffee, Github, Linkedin, Twitter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Footer() {
  const getYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    return year;
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-blue-700 dark:from-zinc-900 to-purple-700 dark:to-zinc-800 text-gray-100 py-12 overflow-hidden"
    >
      {/* Playful background shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay animate-blob"></div>
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-white/10 rounded-full mix-blend-overlay animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-white/10 rounded-full mix-blend-overlay animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-blue-600 font-bold text-lg">IT</span>
              </div>
              <span className="font-extrabold text-2xl text-white drop-shadow-md">
                NUB IT Support
              </span>
            </div>
            <p className="text-gray-200 mb-4 max-w-md leading-relaxed">
              Making IT support a breeze for Northern University Bangladesh.
              We're here to help you thrive!
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors transform hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors transform hover:scale-110"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors transform hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-200">
              <li>
                <Link
                  href="/login"
                  className="hover:text-white transition-colors hover:underline"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-white transition-colors hover:underline"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors hover:underline"
                >
                  Our Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors hover:underline"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4 text-white">Connect</h3>
            <ul className="space-y-3 text-gray-200">
              <li>
                <a
                  href="mailto:it-support@nub.ac.bd"
                  className="hover:text-white transition-colors hover:underline"
                >
                  it-support@nub.ac.bd
                </a>
              </li>
              <li>
                <a
                  href="tel:+88028833388"
                  className="hover:text-white transition-colors hover:underline"
                >
                  +880-2-8833388
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors hover:underline"
                >
                  Campus Map
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition-colors hover:underline"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-300">
          <p className="text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400 animate-pulse" />{" "}
            for NUB IT Support © {getYear()}
          </p>

          {/* Buy Me a Coffee Button in Footer - now consistent with Navbar */}
          <div className="mt-4 md:mt-0">
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
        </div>
      </div>
      {/* Tailwind CSS for blob animation */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </motion.footer>
  );
}
