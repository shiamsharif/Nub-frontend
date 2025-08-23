"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { slideVariants } from "@/lib/animate";
import { Controller, useForm } from "react-hook-form";
import { contactUsSchema, ContactUsSchema } from "@/schemas/contact-us";
import { zodResolver } from "@hookform/resolvers/zod";
import useApi from "@/hooks/use-api";

export function ContactForm() {
  const { control, handleSubmit, reset } = useForm<ContactUsSchema>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      body: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);
  const { mutate: contactUsForm, isLoading } = useApi("/task/contact-us/", {
    method: "POST",
  });

  const onSubmit = async (data: ContactUsSchema) => {
    const response = await contactUsForm(data);
    if (response) {
      setSubmitted(true);
      reset();
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">
          Message Sent!
        </h3>
        <p className="text-gray-600 dark:text-gray-100">
          Thank you for contacting us. We'll respond to your inquiry within 24
          hours.
        </p>
        <Button className="mt-4" onClick={() => setSubmitted(false)}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <motion.div variants={slideVariants} className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" placeholder="Enter your full name" {...field} />
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </motion.div>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <motion.div variants={slideVariants} className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...field}
              />
              {fieldState.error && (
                <p className="text-sm text-red-500">
                  {fieldState.error.message}
                </p>
              )}
            </motion.div>
          )}
        />
      </div>

      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <motion.div variants={slideVariants} className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              {...field}
            />
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </motion.div>
        )}
      />

      <Controller
        control={control}
        name="body"
        render={({ field, fieldState }) => (
          <motion.div variants={slideVariants} className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              placeholder="Tell us how we can help you..."
              rows={4}
              {...field}
            />
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </motion.div>
        )}
      />

      <motion.div
        variants={slideVariants}
        className="bg-blue-50 dark:bg-zinc-700 border border-blue-200 dark:border-zinc-600 rounded-lg p-4"
      >
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-50">
              Response Time
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
              We typically respond to all inquiries within 24 hours during
              business days.
            </p>
          </div>
        </div>
      </motion.div>

      <Button type="submit" className="w-full" disabled={isLoading} size="lg">
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-gray-900 mr-2"></div>
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>

      <motion.p
        variants={slideVariants}
        className="text-xs text-gray-500 dark:text-gray-100 text-center"
      >
        By submitting this form, you agree to our privacy policy and terms of
        service.
      </motion.p>
    </form>
  );
}
