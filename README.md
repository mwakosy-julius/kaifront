# React Authentication and Protected Routes

A modern React authentication system with protected routes using React Router v6, Context API, and Cookie-based token management.

## Features

- 🔐 Secure authentication with JWT tokens
- 🍪 Cookie-based token storage for better security
- 🛡️ Protected route guards
- 📱 Public route guards
- ⚡ Lazy loading for better performance
- 🔄 Automatic token refresh
- 📍 Smart redirect handling
- 🎯 TypeScript support

## Project Structure

```
src/
├── context/
│   └── AuthContext.tsx      # Authentication context and provider
├── routes/
│   ├── guard.tsx           # Route guard components
│   ├── public.tsx          # Public routes configuration
│   ├── protected.tsx       # Protected routes configuration
│   └── route-elements.tsx  # Lazy-loaded route components
└── lib/
    └── auth/
        └── auth-utils.tsx  # Authentication utilities
```

## Setup

1. Install dependencies:
```bash
npm install react-router-dom @types/js-cookie jwt-decode
```

2. Configure your environment variables:
```env
VITE_API_BASE_URL=your_api_url
```

3. Set up the AuthProvider in your app:
```typescript
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
```

## Usage

### Protected Routes

```typescript
const ProtectedRoute = () => (
  <AuthGuard>
    <YourComponent />
  </AuthGuard>
);
```

### Public Routes

```typescript
const PublicRoute = () => (
  <PublicGuard>
    <YourComponent />
  </PublicGuard>
);
```

### Authentication Hook

```typescript
const YourComponent = () => {
  const { isAuthenticated, user, login, logout } = useAuth();
  // Your component logic
};
```

## Security Features

- HTTP-only cookies for token storage
- Automatic token refresh
- Route guards for unauthorized access prevention
- Secure redirect handling
- Session management

## Best Practices

- Keep sensitive routes behind AuthGuard
- Use lazy loading for better performance
- Handle authentication loading states
- Implement proper error handling
- Use TypeScript for better type safety
