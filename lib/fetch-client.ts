import { auth } from "@/auth";

export async function fetchClient(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const session = await auth();
  // console.log(`From the fetchClient ${JSON.stringify(session?.accessToken)}`);

  return fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authorization: `Bearer ${session.accessToken}` }),
    },
  });
}
