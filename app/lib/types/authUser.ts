import { UserRole } from "./roles"

export type LoginCredentials = {
  email: string,
  password: string
}

export type AuthUser = {
  id: string;
  role: UserRole;
  employeeId: string;
  firstname: string;
  lastname: string;
};