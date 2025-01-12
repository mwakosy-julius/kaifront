export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
    auth: {
        login: '/auth/login/',
        register: '/auth/register/',
        refreshToken: '/auth/refresh-token/',
        logout: '/auth/logout/',
    },
    tools: {
        list: '/api/tools/',
        pairwise_alignment: '/pairwise_alignment/',
        gc_content: '/gc_content/',
    },
    users: {
        profile: '/users/profile/',
        update: '/users/update/',
    },
} as const;