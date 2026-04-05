import type { AuthUser } from "../types/authUser";
import { API_BASE_URL } from "../utils/api";
import { UserRole } from "../types/roles";

// proxy user for development for us not to run backend every time
const PROXY_USER: AuthUser = {
  role: UserRole.LAB_ADMIN,
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
  if (userCache.has(cookie)) return userCache.get(cookie)!; // use non-null assertion operator to guarantee TS the cookie exists
  //it returns the user if cookie exists already in userCache so we dont need to call the api again.

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: { cookie },
      credentials: "include",
      cache: "no-store",
    });
    console.log("Cookie from header: ", cookie);
    if (!response.ok) return null;

    const data: AuthUser = await response.json();
    userCache.set(cookie, data);
    return data;
  } catch (error) {
    console.error("Session fetch error:", error);
    return null;
  }
}