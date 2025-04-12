export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

export const API_ENDPOINTS = {
  auth: {
    login: "/auth/token",
    register: "/auth/signup/",
    refreshToken: "/auth/refresh/",
    logout: "/auth/logout/",
  },
  tools: {
    list: "/auth/users/tools/",
    pairwise_alignment: "/pairwise_alignment/",
    gc_content: "/gc_content/",
  },
  users: {
    profile: "/users/profile/",
    update: "/users/update/",
  },
} as const;
