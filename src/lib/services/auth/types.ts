export interface LoginCredentials {
    email: string;
    password: string;
    rememberMe?: boolean;
  }
  
  export interface RegisterCredentials {
    email: string;
    password: string;
    name: string;
  }
  
  export interface ForgotPasswordCredentials {
    email: string;
  }
  
  export interface ResetPasswordCredentials {
    token: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
    message?: string | undefined;
    error?: string | undefined;
  }
  
  export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
  }