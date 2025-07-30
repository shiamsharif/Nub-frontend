"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { parentVariants, slideVariants } from "@/lib/animate";

interface Story {
  id: number;
  imageUrl: string;
  title: string;
}

const storiesData: Story[] = [
  {
    id: 1,
    imageUrl:
      "https://i.pinimg.com/736x/d6/8a/12/d68a121e960094f99ad8acd37505fb7d.jpg",
    title: "Crimson Forest",
  },
  {
    id: 2,
    imageUrl:
      "https://i.pinimg.com/736x/21/16/f7/2116f71f9d51d875e44d809f074ff079.jpg",
    title: "Misty Mountains",
  },
  {
    id: 3,
    imageUrl:
      "https://i.pinimg.com/1200x/fe/c2/0d/fec20d2958059b8463bffb138d4eaac6.jpg",
    title: "Floating Islands",
  },
  {
    id: 4,
    imageUrl:
      "https://i.pinimg.com/736x/84/dc/62/84dc62de850a34a9d420c97f3a2d58f4.jpg",
    title: "Crystal Cave",
  },
  {
    id: 5,
    imageUrl:
      "https://i.pinimg.com/1200x/be/c3/7e/bec37e2c43e703f922f887db2578ce2e.jpg",
    title: "Sunset Peaks",
  },
  {
    id: 6,
    imageUrl:
      "https://i.pinimg.com/736x/47/dd/47/47dd47b0d66c2fa641e03e370bcb5433.jpg",
    title: "Night Sky",
  },
  {
    id: 7,
    imageUrl:
      "https://i.pinimg.com/736x/05/01/bc/0501bcd327d9df915e83154bbf9456e3.jpg",
    title: "Ancient Ruins",
  },
  {
    id: 8,
    imageUrl:
      "https://i.pinimg.com/736x/c1/46/be/c146bebffca026d2c4fa76cc85aac917.jpg",
    title: "Magical Tree",
  },
  {
    id: 9,
    imageUrl:
      "https://i.pinimg.com/736x/91/7a/51/917a51df0d444def3cade8d626305a67.jpg",
    title: "Celestial Waters",
  },
];

const contributors = [
  {
    name: "Dr. Ahmed Rahman",
    role: "Project Lead & Backend Developer",
    image:
      "https://i.pinimg.com/736x/91/7a/51/917a51df0d444def3cade8d626305a67.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Sarah Khan",
    role: "Frontend Developer & UI/UX Designer",
    image:
      "https://i.pinimg.com/736x/c1/46/be/c146bebffca026d2c4fa76cc85aac917.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Mohammad Ali",
    role: "Full Stack Developer",
    image:
      "https://i.pinimg.com/736x/05/01/bc/0501bcd327d9df915e83154bbf9456e3.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Fatima Hassan",
    role: "Database Administrator",
    image:
      "https://i.pinimg.com/736x/47/dd/47/47dd47b0d66c2fa641e03e370bcb5433.jpg",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
];

type Contributor = {
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
};

const ContributorCard = ({ contributor }: { contributor: Contributor }) => {
  return (
    <motion.div
      className="relative w-72 h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-xl group"
      initial="initial"
      whileInView={"animate"}
      viewport={{ once: true, amount: 0.8 }}
      variants={parentVariants}
    >
      <img
        src={contributor.image}
        alt={contributor.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
        <motion.h3
          variants={slideVariants}
          className="font-bold text-2xl tracking-wide"
        >
          {contributor.name}
        </motion.h3>
        <motion.p variants={slideVariants} className="text-sm mb-4">
          {contributor.role}
        </motion.p>
        <div className="flex items-center space-x-3">
          <a
            href={contributor.github}
            className="bg-gray-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-github-icon lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href={contributor.linkedin}
            className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors transform hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-linkedin-icon lucide-linkedin"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function MeetContributors() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraint, setDragConstraint] = useState(0);

  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        setDragConstraint(containerWidth - trackWidth);
      }
    };

    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);

    return () => window.removeEventListener("resize", calculateConstraints);
  }, []);

  return (
    <div className="font-sans w-full py-12 md:py-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.header
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          variants={parentVariants}
          className="text-center mb-12"
        >
          <motion.h1
            variants={slideVariants}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white "
          >
            Meet our Contributors
          </motion.h1>
          <motion.p
            variants={slideVariants}
            className="mt-4 text-lg text-gray-400"
          >
            The talented team behind NUB IT Support system, dedicated to making
            your IT experience seamless.
          </motion.p>
        </motion.header>

        <motion.div
          ref={containerRef}
          className="overflow-hidden cursor-grab"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            ref={trackRef}
            className="flex space-x-6 pb-6 px-4"
            drag="x"
            dragConstraints={{
              right: 0,
              left: dragConstraint - 32,
            }}
            dragElastic={0.15}
          >
            {contributors.map((contributor, idx) => (
              <ContributorCard key={idx} contributor={contributor} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
