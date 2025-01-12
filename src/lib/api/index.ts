import { apiClient } from './client';
import { apiLogger } from './logger';
import { API_ENDPOINTS } from './config';

// Initialize API settings
if (import.meta.env.MODE === 'development') {
    apiLogger.enable();
    apiLogger.setLogLevel(['info', 'error', 'debug']);
} else {
    apiLogger.setLogLevel(['error']);
}

// Export everything needed for API usage
export {
    apiClient,
    apiLogger,
    API_ENDPOINTS,
};

// Export types
export type {
    ApiError,
    ApiResponse,
    AuthResponse,
    LoginCredentials,
    User
} from './types';

// default API instance configuration
const api = {
    client: apiClient,
    endpoints: API_ENDPOINTS,
    logger: apiLogger,
};

export default api;