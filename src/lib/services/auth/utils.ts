import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { User } from './types';

interface DecodedToken {
    exp: number;
    user: User;
}

interface AuthData {
    accessToken: string;
    refreshToken: string;
    timestamp: number;
}

// Cookie names
export const ACCESS_TOKEN_COOKIE = 'access_token';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';
export const AUTH_TIMESTAMP_COOKIE = 'auth_timestamp';

// Cookie configuration
const COOKIE_CONFIG = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    expires: 30
};

export const storeAuthData = (accessToken: string, refreshToken: string) => {
    Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, COOKIE_CONFIG);
    Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, COOKIE_CONFIG);
    Cookies.set(AUTH_TIMESTAMP_COOKIE, Date.now().toString(), COOKIE_CONFIG);
};

export const clearAuthData = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE, { path: '/' });
    Cookies.remove(REFRESH_TOKEN_COOKIE, { path: '/' });
    Cookies.remove(AUTH_TIMESTAMP_COOKIE, { path: '/' });
};

export const getStoredAuthData = (): AuthData | null => {
    const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE);
    const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);
    const timestamp = Cookies.get(AUTH_TIMESTAMP_COOKIE);

    if (!accessToken || !refreshToken || !timestamp) {
        return null;
    }

    return {
        accessToken,
        refreshToken,
        timestamp: parseInt(timestamp, 10)
    };
};

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const bufferTime = 30 * 1000;
        return (decoded.exp * 1000) - bufferTime < Date.now();
    } catch {
        return true;
    }
};

export const getUserFromToken = (token: string): User | null => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        return decoded.user;
    } catch {
        return null;
    }
};

export const parseJwt = <T = unknown>(token: string): T | null => {
    try {
        return jwtDecode<T>(token);
    } catch {
        return null;
    }
};

export const hasValidAuth = (): boolean => {
    const accessToken = Cookies.get(ACCESS_TOKEN_COOKIE);
    return !!accessToken && !isTokenExpired(accessToken);
};

export const getAccessToken = (): string | null => {
    return Cookies.get(ACCESS_TOKEN_COOKIE) || null;
};

export const getRefreshToken = (): string | null => {
    return Cookies.get(REFRESH_TOKEN_COOKIE) || null;
};

export const getCurrentUser = (): User | null => {
    const accessToken = getAccessToken();
    if (!accessToken) return null;
    return getUserFromToken(accessToken);
};