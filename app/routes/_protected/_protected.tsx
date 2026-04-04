//this is the guard for authentication
import { Outlet, redirect } from "react-router";
import type { Route } from ".react-router/types/app/+types/root";

import { getUserFromSession } from "~/lib/server/getUserSession";
import { userContext } from "~/lib/server/userContext";

// auth middleware
async function authMiddleware({ request, context }: any) {
    const user = await getUserFromSession(request);

    if (!user) {
        throw redirect("/");
    }

    // make user available to children
    context.set(userContext, user);
}

// apply middleware to all child routes
export const middleware = [authMiddleware];

// optional loader (useful later if you want layout UI like header)
export async function loader({ context }: Route.LoaderArgs) {
    const user = context.get(userContext);
    return { user };
}

// layout wrapper
export default function ProtectedLayout() {
    return <Outlet />;
}