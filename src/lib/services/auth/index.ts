import api from "@/lib/api";
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  TokenResponse,
  // ForgotPasswordCredentials,
  // ResetPasswordCredentials,
  User,
} from "./types";
import {
  storeAuthData,
  clearAuthData,
  isTokenExpired,
  getStoredAuthData,
} from "./utils";
import { apiLogger } from "@/lib/api/logger";
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await api.client.post<AuthResponse>(
      api.endpoints.auth.login,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access_token, token_type } = response as AuthResponse;
    storeAuthData(access_token, token_type);

    apiLogger.info("User logged in successfully", { email: credentials.email });
    return response.data as AuthResponse;
  } catch (error) {
    apiLogger.error(
      "POST",
      api.endpoints.auth.login,
      error as {
        response?: { status: number; data: unknown };
        message: string;
        stack?: string;
      }
    );
    throw error;
  }
};

export const register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  try {
    const response = await api.client.post<AuthResponse>(
      api.endpoints.auth.register,
      credentials
    );

    apiLogger.info("User registered successfully", {
      email: credentials.email,
    });
    console.log("Registration response:", response);
    return response.data as AuthResponse;
  } catch (error) {
    apiLogger.error(
      "POST",
      api.endpoints.auth.register,
      error as {
        response?: { status: number; data: unknown };
        message: string;
        stack?: string;
      }
    );
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const authData = getStoredAuthData();

    const data = {
      refreshToken: authData?.refreshToken,
    };

    if (authData?.refreshToken) {
      await api.client.post(api.endpoints.auth.logout, {
        data,
      });
    }
  } catch (error) {
    apiLogger.error(
      "POST",
      api.endpoints.auth.logout,
      error as {
        response?: { status: number; data: unknown };
        message: string;
        stack?: string;
      }
    );
  } finally {
    clearAuthData();
  }
};

export const refreshToken = async (): Promise<TokenResponse> => {
  try {
    const authData = getStoredAuthData();
    if (!authData?.refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await api.client.post<TokenResponse>(
      api.endpoints.auth.refreshToken,
      { refreshToken: authData.refreshToken }
    );

    const { access_token } = response as TokenResponse;
    storeAuthData(access_token);

    apiLogger.info("Token refreshed successfully");
    return response.data as TokenResponse;
  } catch (error) {
    apiLogger.error(
      "POST",
      api.endpoints.auth.refreshToken,
      error as {
        response?: { status: number; data: unknown };
        message: string;
        stack?: string;
      }
    );
    clearAuthData();
    throw error;
  }
};

// export const forgotPassword = async (credentials: ForgotPasswordCredentials): Promise<void> => {
//     try {
//         await api.client.post(api.endpoints.auth.forgotPassword, credentials);
//         apiLogger.info('Password reset email sent', { email: credentials.email });
//     } catch (error) {
//         apiLogger.error('POST', api.endpoints.auth.forgotPassword, error as { response?: { status: number; data: unknown }; message: string; stack?: string });
//         throw error;
//     }
// };

// export const resetPassword = async (credentials: ResetPasswordCredentials): Promise<void> => {
//     try {
//         await api.client.post(api.endpoints.auth.resetPassword, credentials);
//         apiLogger.info('Password reset successful');
//     } catch (error) {
//         if (error instanceof Error) {
//             apiLogger.error("POST", "", { message: error.message, stack: error.stack });
//         } else {
//             apiLogger.error("POST", "", { message: String(error) });
//         }
//         throw error;
//     }
// };

// export const validateResetToken = async (token: string): Promise<boolean> => {
//     try {
//         await api.client.post(api.endpoints.auth.validateResetToken, { token });
//         return true;
//     } catch {
//         return false;
//     }
// };

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.client.get(api.endpoints.users.profile);
    return response as User;
  } catch (error) {
    apiLogger.error(
      "GET",
      api.endpoints.users.profile,
      error as {
        response?: { status: number; data: unknown };
        message: string;
        stack?: string;
      }
    );
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const authData = getStoredAuthData();
  return !!(authData?.accessToken && !isTokenExpired(authData.accessToken));
};
