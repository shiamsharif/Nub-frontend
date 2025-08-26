"use server";
import { signIn, signOut } from "@/auth";

export async function doLogOut() {
  console.log("Log out ----->");
  await signOut({ redirectTo: "/auth/login", redirect: true });
}

// Credentials Sign In
export async function doCredentialsSignIn(formData: FormData): Promise<any> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.log(error);
    switch (error) {
      case "CredentialsSignin":
        return {
          error: "Check your Credentials",
        };
      case "SessionRequired":
        return {
          error: "Session Required",
        };

      case "CallbackRouteError":
        return {
          error: "Callback Route Error",
        };
    }
    throw error;
  }
}
