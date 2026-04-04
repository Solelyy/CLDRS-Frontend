import { requireRole } from "~/lib/server/requireRole";
import { UserRole } from "~/lib/types/roles";

export const middleware = [
  requireRole([UserRole.LAB_TECHNICIAN]),
];

export default function LabTechnicianDashboard() {
  return <h1>Lab Technician Dashboard</h1>;
}