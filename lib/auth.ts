import { User } from "@/schemas/auth";
import { fetchClient } from "./fetch-client";

// Get user profile with automatic token management
export async function getUserProfile(): Promise<User | null> {
  try {
    const response = await fetchClient("/account/me/profile");

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
