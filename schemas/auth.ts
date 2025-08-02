import * as z from "zod";

// Register Schema
const appliedForSchema = z.enum(["Teacher", "Student", "Staff", "ItStaff"]);
export const registerSchema = z.object({
  username: z.string(),
  email: z.string().email().toLowerCase(),
  password: z.string().refine((value) => {
    // should be at least 8 characters long and will contain at least one uppercase letter, one lowercase letter, and one number
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(value);
  }, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"),
  phone_number: z.string(),
  applied_for: appliedForSchema,
});

// Registration Type
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type Role = "Teacher" | "Student" | "Staff" | "ItStaff";

// Login Schema
export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string(),
});

// Login Type
export type LoginSchemaType = z.infer<typeof loginSchema>;

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email().toLowerCase(),
});

// Forgot Password Type
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
