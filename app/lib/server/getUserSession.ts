// lib/server/getUserSession.ts
import type { AuthUser } from "../types/authUser";
import { API_BASE_URL } from "../utils/api";
import { UserRole } from "../types/roles";

// Optional proxy user for dev mode
const PROXY_USER: AuthUser = {
  id: "dev-1",
  role: UserRole.LAB_ASSISTANT,
  employeeId: "DEV123",
  firstname: "Jessa",
  lastname: "Gozun",
};

// In-memory cache per cookie
const userCache = new Map<string, AuthUser>();

export async function getAuthUser(request: Request): Promise<AuthUser | null> {
  if (process.env.NODE_ENV === "development") {
    return PROXY_USER;
  }

  const cookie = request.headers.get("cookie") || "";
  if (userCache.has(cookie)) return userCache.get(cookie)!;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: { cookie },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data: AuthUser = await response.json();
    userCache.set(cookie, data);
    return data;
  } catch (error) {
    console.error("Session fetch error:", error);
    return null;
  }
}