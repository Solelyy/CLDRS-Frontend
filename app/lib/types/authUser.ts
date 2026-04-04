import { UserRole } from "./roles"

export type LoginCredentials = {
  employeeId: string,
  password: string
}

export type AuthUser = {
  role: UserRole;
  employeeId: string;
  firstname: string;
  lastname: string;
};