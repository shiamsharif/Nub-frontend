import * as z from "zod";

export const contactUsSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().toLowerCase(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  body: z.string().min(1, { message: "Message is required" }),
});

export type ContactUsSchema = z.infer<typeof contactUsSchema>;
