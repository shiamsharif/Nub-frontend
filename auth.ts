/* eslint-disable @typescript-eslint/no-explicit-any */
// Next Auth
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { authConfig } from "./auth.config";
import { jwtDecode } from "jwt-decode";
import axios, { isAxiosError } from "axios";

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT): Promise<JWT> {
  console.log("Refreshing access token");
  try {
    console.log("Beaarer token", `Bearer ${token.refreshToken}`);

    const response = await fetch(
      `${process.env.API_SERVER_BASE_URL}/v1/refresh-token/`,
      {
        headers: {
          Authorization: `Bearer ${token.refreshToken}`,
        },
      }
    );

    console.log("Response -------> ", response);

    if (!response.ok) {
      throw {
        type: "InvalidCredentialsError",
      };
    }
    const newTokens = await response.json();

    console.log("New Tokens -------> ", newTokens);

    /*const refreshednewTokens = {
        "access_token": "acess-token",
        "expires_in": 2,
        "refresh_token": "refresh-token"
      }*/

    //return token;

    return {
      ...token,
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

async function fetchUser(accessToken: string): Promise<User> {
  const emptyUser: User = {
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    is_varified: false,
    last_login: "",
    phone_number: "",
    registration_date: "",
    role: "user",
    university_id: "",
    user_type: "Student",
    accessToken: "",
    image: "",
    name: "",
    refreshToken: "",
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/account/me/profile/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return emptyUser;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return emptyUser;
  }
}

// ==============================|| AUTH HANDLERS ||============================== //
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const url: string = `${process.env.NEXT_PUBLIC_API_URL}/account/login/`;

          const payload = {
            email: credentials.email,
            password: credentials.password,
          };

          // console.log("Payload ------->", payload);

          const res = await axios.post(url, payload);
          console.log(res);

          if (res.status === 200) {
            // console.log("Response from server ------->", res.data);
            const user = await fetchUser(res.data.access);
            // console.log("User ------->", user);
            return {
              ...user,
              accessToken: res.data?.access ?? null,
              refreshToken: res.data?.refresh ?? null,
            };
          }

          return null;
        } catch (error) {
          console.log("Error from server ------->", error);
          if (isAxiosError(error) && error.response?.status === 400) {
            throw new Error("Invalid email or password");
          }
          throw new Error("Failed to login");
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
    jwt: async ({ token, account, user }) => {
      if (token.accessToken) {
        const decodedToken: any = jwtDecode(token?.accessToken);
        token.accessTokenExpires = decodedToken?.exp * 1000;
      }

      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires && Date.now() < token?.accessTokenExpires) {
        console.log("**** returning previous token ******");
        return token;
      }

      // Access token has expired, try to update it
      console.log("**** Update Refresh token ******");
      return refreshAccessToken(token);
    },
    session: async ({ session, token }) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user as any;
      }

      return session;
    },
  },
});
