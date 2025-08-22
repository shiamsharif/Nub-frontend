import * as z from "zod";

// Register Schema
const appliedForSchema = z.enum(["Student", "Staff"], {
  required_error: "Applied for is required",
});

export const registerSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email()
    .toLowerCase(),
  username: z.string({ required_error: "Username is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .refine((value) => {
      // should be at least 8 characters long and will contain at least one uppercase letter, one lowercase letter, and one number
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return regex.test(value);
    }, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"),
  phone_number: z.string({ required_error: "Phone number is required" }),
  university_id: z.string({ required_error: "University ID is required" }),
  applied_for: appliedForSchema,
});

// Registration Type
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type Role = "Teacher" | "Student" | "Staff" | "ItStaff";

// Login Schema
export const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(1, { message: "Password is required" }),
});

// Login Type
export type LoginSchemaType = z.infer<typeof loginSchema>;

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email().toLowerCase(),
});

// Forgot Password Type
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

// Set New Password Schema
export const setNewPasswordSchema = z
  .object({
    otp: z.string({ required_error: "OTP is required" }),
    password: z
      .string({ required_error: "Password is required" })
      .refine((value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value), {
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirm_password: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"], // error will be shown on confirm_password field
    message: "Passwords do not match",
  });

// Set New Password Type
export type SetNewPasswordSchemaType = z.infer<typeof setNewPasswordSchema>;

// Password Reset Schema
export const resetPasswordSchema = z
  .object({
    old_password: z.string().min(1, { message: "Old Password is required" }),
    new_password: z
      .string({ required_error: "Password is required" })
      .refine((value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value), {
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirm_new_password: z.string({
      required_error: "Confirm password is required",
    }),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    path: ["confirm_new_password"], // error will be shown on confirm_password field
    message: "Passwords do not match",
  });

// Password Reset Type
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export const userProfileSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  university_id: z.string().min(1, { message: "University ID is required" }),
});

export type UserProfileSchemaType = z.infer<typeof userProfileSchema>;

export type User = {
  id: number;
  email: string;
  username: string;
  phone_number: string;
  university_id: string;
  first_name: string;
  last_name: string;
  user_type: "Student" | "Staff";
  is_varified: boolean;
  registration_date: string;
  last_login: string;
  role: "user" | "technician" | "admin";
};
