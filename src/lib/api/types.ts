export interface ApiError {
  message: string;
  code?: string;
  detail?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
}

export type LoginCredentials = {
  email: string;
  password: string;
};
