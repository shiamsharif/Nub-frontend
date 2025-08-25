// // src/hooks/use-api.ts
// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useAuth } from "@/context/auth-context";

// type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// type ApiOptions<T> = {
//   method?: HttpMethod;
//   body?: T;
//   headers?: Record<string, string>;
//   enabled?: boolean;
//   onSuccess?: (data: any) => void;
//   onError?: (error: any) => void;
//   requireAuth?: boolean; // If true, will automatically use token from auth context
//   autoRefresh?: boolean; // If true, will attempt to refresh token on 401
// };

// type ApiState<T> = {
//   data: T | null;
//   isLoading: boolean;
//   error: Error | null;
//   isSuccess: boolean;
//   isError: boolean;
// };

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// const useApi = <T>(url: string, options: ApiOptions<T> = {}) => {
//   const {
//     method = "GET",
//     body,
//     headers = { "Content-Type": "application/json" },
//     enabled = true,
//     onSuccess,
//     onError,
//     requireAuth = false,
//     autoRefresh = true,
//   } = options;

//   const { session, refreshToken, setSession, logout } = useAuth();
//   const [state, setState] = useState<ApiState<T>>({
//     data: null,
//     isLoading: false,
//     error: null,
//     isSuccess: false,
//     isError: false,
//   });

//   const [trigger, setTrigger] = useState(0);

//   const refetch = useCallback(() => {
//     setTrigger((prev) => prev + 1);
//   }, []);

//   const execute = useCallback(
//     async (executionBody?: T): Promise<T | null> => {
//       setState((prev) => ({
//         ...prev,
//         isLoading: true,
//         error: null,
//         isError: false,
//         isSuccess: false,
//       }));

//       try {
//         // Prepare headers
//         const requestHeaders: Record<string, string> = { ...headers };
//         // Add auth token if required
//         if (requireAuth) {
//           if (!session?.accessToken) {
//             throw new Error("Authentication required");
//           }
//           requestHeaders["Authorization"] = `Bearer ${session?.accessToken}`;
//         }
//         const config: RequestInit = {
//           method,
//           headers: requestHeaders,
//         };

//         if (method !== "GET" && (body || executionBody)) {
//           config.body = JSON.stringify(executionBody || body);
//         }

//         let response = await fetch(BASE_URL + url, config);

//         // Handle token refresh if 401 and autoRefresh is enabled
//         if (response.status === 401 && autoRefresh && requireAuth) {
//           const newToken = await refreshToken();
//           if (newToken) {
//             setSession(newToken);
//             // Retry with new token
//             requestHeaders["Authorization"] = `Bearer ${newToken?.accessToken}`;
//             response = await fetch(BASE_URL + url, {
//               ...config,
//               headers: requestHeaders,
//             });
//           } else {
//             logout();
//             throw new Error("Session expired. Please login again.");
//           }
//         }

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         setState({
//           data,
//           isLoading: false,
//           error: null,
//           isSuccess: true,
//           isError: false,
//         });

//         if (onSuccess) {
//           onSuccess(data);
//         }

//         return data;
//       } catch (error) {
//         const err = error as Error;
//         setState({
//           data: null,
//           isLoading: false,
//           error: err,
//           isSuccess: false,
//           isError: true,
//         });

//         if (onError) {
//           onError(err);
//         }

//         throw err;
//       }
//     },
//     [
//       url,
//       method,
//       body,
//       headers,
//       onSuccess,
//       onError,
//       session,
//       requireAuth,
//       autoRefresh,
//       refreshToken,
//       logout,
//     ]
//   );

//   // Auto-fetch for GET requests
//   useEffect(() => {
//     if (method === "GET" && enabled) {
//       execute();
//     }
//   }, [method, enabled, trigger, url]); // remove execute, keep url for refetch

//   // Mutation function
//   const mutate = useCallback(
//     (mutateBody?: T) => {
//       return execute(mutateBody);
//     },
//     [execute]
//   );

//   return {
//     ...state,
//     refetch,
//     mutate,
//   };
// };

// export default useApi;

"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/auth-context";
// import type { ApiState, ApiOptions } from "./types";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiOptions<T> = {
  method?: HttpMethod;
  body?: T;
  headers?: Record<string, string>;
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  requireAuth?: boolean;
  autoRefresh?: boolean;
};

export type ApiState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isSuccess: boolean;
  isError: boolean;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function useApi<T>(url: string, options: ApiOptions<T> = {}) {
  const {
    method = "GET",
    body,
    headers = { "Content-Type": "application/json" },
    enabled = true,
    onSuccess,
    onError,
    requireAuth = false,
  } = options;

  const { session, logout, refetchSession } = useAuth();

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
    isError: false,
  });

  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  const execute = useCallback(
    async (executionBody?: T): Promise<T | null> => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        isError: false,
        isSuccess: false,
      }));

      try {
        if (requireAuth && !session) {
          throw new Error("Authentication required");
        }

        const config: RequestInit = {
          method,
          headers: {
            ...headers,
            ...(requireAuth && {
              Authorization: `Bearer ${session?.accessToken}`,
            }),
          },
        };

        if (method !== "GET" && (body || executionBody)) {
          config.body = JSON.stringify(executionBody || body);
        }

        let response = await fetch(BASE_URL + url, config);

        if (response.status === 401) {
          await refetchSession();

          if (!session) {
            await logout();
            throw new Error("Session expired. Please login again.");
          }

          response = await fetch(BASE_URL + url, config);

          if (response.status === 401) {
            await logout();
            throw new Error("Session expired. Please login again.");
          }
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setState({
          data,
          isLoading: false,
          error: null,
          isSuccess: true,
          isError: false,
        });

        if (onSuccess) {
          onSuccess(data);
        }

        return data;
      } catch (error) {
        const err = error as Error;
        setState({
          data: null,
          isLoading: false,
          error: err,
          isSuccess: false,
          isError: true,
        });

        if (onError) {
          onError(err);
        }

        throw err;
      }
    },
    [
      url,
      method,
      body,
      headers,
      onSuccess,
      onError,
      session,
      requireAuth,
      logout,
      refetchSession,
    ]
  );

  useEffect(() => {
    if (method === "GET" && enabled) {
      execute();
    }
  }, [method, enabled, trigger, execute]);

  const mutate = useCallback(
    (mutateBody?: T) => {
      return execute(mutateBody);
    },
    [execute]
  );

  return {
    ...state,
    refetch,
    mutate,
  };
}

export default useApi;
