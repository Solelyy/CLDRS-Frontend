import { requireRole } from "~/lib/server/requireRole";
import { UserRole } from "~/lib/types/roles";

export const middleware = [
  requireRole([UserRole.LAB_ADMIN]),
];

export default function LabAdminDashboard() {
  return <h1>Lab Admin Dashboard</h1>;
}