import { redirect } from "react-router";
import { userContext } from "./userContext";
import type { UserRole } from "~/lib/types/roles";

export function requireRole(allowedRoles: UserRole[]) {
  return async function roleMiddleware({ context }: any) {
    const user = context.get(userContext);

    if (!user || !allowedRoles.includes(user.role)) {
        throw redirect("/unauthorized"); 
    }
  };
}