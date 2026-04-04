import { createContext } from "react-router";
import type { AuthUser } from "~/lib/types/authUser";

export const userContext = createContext<AuthUser | null>(null);