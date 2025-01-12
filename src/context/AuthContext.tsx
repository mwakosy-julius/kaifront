import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  storeAuthData,
  clearAuthData,
  getCurrentUser,
  hasValidAuth,
  getAccessToken,
} from '@/lib/services/auth/utils';
import { User } from '@/lib/api/types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const initializeAuth = () => {
      const isValid = hasValidAuth();
      setIsAuthenticated(isValid);

      if (isValid) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    storeAuthData(accessToken, refreshToken);
    setIsAuthenticated(true);

    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  const logout = () => {
    clearAuthData();
    setIsAuthenticated(false);
    setUser(null);

    // Optionally redirect to login page
    window.location.href = '/sign-in';
  };

  const getToken = () => {
    return getAccessToken();
  };

  // Don't render children until initial auth check is complete
  if (loading) {
    return null; // Or return a loading spinner/placeholder
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        getToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const { user } = useAuth();
  return user;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};