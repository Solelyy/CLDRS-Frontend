import { requireRole } from "~/lib/server/requireRole";
import { UserRole } from "~/lib/types/roles";

export const middleware = [
  requireRole([UserRole.LAB_ASSISTANT]),
];

export default function LabAssistantDashboard() {
  return <h1>Lab Assistant Dashboard</h1>;
}