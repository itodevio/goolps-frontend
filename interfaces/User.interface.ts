export type UserRole = "UNREGISTERED" | "REGISTERED" | "ADMIN";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserLoginRequest {
  email: string;
  token: string;
}

export interface StoredUser extends User {
  _id: string;
}

