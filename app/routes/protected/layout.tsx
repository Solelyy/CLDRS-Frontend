//this is the guard for authentication
import { Outlet, redirect } from "react-router";
import type { Route } from ".react-router/types/app/+types/root";

import { getAuthUser } from "~/lib/server/getUserSession";
import { userContext } from "~/lib/server/userContext";

// auth middleware
async function authMiddleware({ request, context }: any) {
    const user = await getAuthUser(request);

    if (!user) {
        throw redirect("/unauthorized");
    }

    // make user available to children
    context.set(userContext, user); //it is a key value pair
}

// apply middleware to all child routes
export const middleware = [authMiddleware]; //needs to be wrap in array (standard)
// we can also have not only one guard, ex: [authMiddleware, middleware2, middleware3] rr7 runs it in order

// this is to have shared context to diff ui
export async function loader({ context }: Route.LoaderArgs) {
    const user = context.get(userContext);
    return { user };
}

// layout wrapper
export default function ProtectedLayout() {
    return <Outlet />;
}