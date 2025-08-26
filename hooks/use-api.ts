"use client";
import { useState, useEffect, useCallback } from "react";
import { signOut, useSession } from "next-auth/react";

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

  const { data: session } = useSession();

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
          await signOut();
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
    [url, method, body, headers, onSuccess, onError, session, requireAuth]
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
