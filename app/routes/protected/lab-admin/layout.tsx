import { Outlet } from "react-router";
import { requireRole } from "~/lib/server/requireRole";
import { UserRole } from "~/lib/types/roles";

export const middleware = [
  requireRole([UserRole.LAB_ADMIN]),
];

export default function LabAdminLayout() {
    return (
        <>
            <Outlet/>
        </>
    );
}

