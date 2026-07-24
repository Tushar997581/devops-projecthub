export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export type UserRole = 'ADMIN' | 'USER';

export interface AuthUserPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}
