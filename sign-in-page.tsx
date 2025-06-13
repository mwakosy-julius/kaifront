import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import AuthLayout from "@/components/layouts/AuthLayout";
import SignInForm, { SignInFormValues } from "./forms/sign-in-form";
import { login } from "@/lib/services/auth";
import { useState } from "react";

const SignIn = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (data: SignInFormValues) => {
    try {
      setError(null);
      await login(data).then(() => {
        window.location.href = "/dashboard";
      });
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  // Google Login handler function
  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      try {
        // Send Google credential to backend for verification & login
        const res = await fetch("http://localhost:5000/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ credential: credentialResponse.credential }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        // Store your backend's JWT/session token
        localStorage.setItem("token", data.token);

        window.location.href = "/dashboard";
      } catch (err) {
        console.error("Google login backend failed:", err);
        setError("Google login failed");
      }
    } else {
      console.error("Google Login Failed");
      setError("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthLayout
        title="Sign in to your account"
        subtitle="Enter your credentials to access your account"
      >
        <SignInForm onSubmit={handleSignIn} error={error} />
        {/* Add Google Login Button Below the Form */}
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("Google login error")}
          />
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignIn;
