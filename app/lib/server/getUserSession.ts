import type { AuthUser } from "../types/authUser";
import { API_BASE_URL } from "../utils/api";

export async function getUserFromSession( request: Request ): Promise<AuthUser | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
        cache: "no-store",
        credentials: "include",
    });

    if (!response.ok) {
        return null;
    }

    const result = await response.json();
    return result.data.user as AuthUser;
  } catch (error) {
    console.error("Session fetch error:", error);
    return null;
  }
}