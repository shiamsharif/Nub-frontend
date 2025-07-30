import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ContactForm } from "./contact-form";
import { childVariants, parentVariants, slideVariants } from "@/lib/animate";
export default function ContactSection() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={parentVariants}
          viewport={{ once: true, amount: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={slideVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            variants={slideVariants}
            className="text-xl text-gray-600 dark:text-gray-100 max-w-2xl mx-auto"
          >
            Have questions about our IT support system? We'd love to hear from
            you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </motion.div>

        {/* Contact Form - Full Width */}
        <motion.div variants={parentVariants}>
          <Card className="shadow-xl bg-zinc-50 dark:bg-zinc-800 border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                <motion.span variants={childVariants}>
                  Send us a Message
                </motion.span>
              </CardTitle>
              <CardDescription className="text-lg">
                <motion.span variants={childVariants}>
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </motion.span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
