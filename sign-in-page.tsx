import AuthLayout from "@/components/layouts/AuthLayout";
import SignInForm, { SignInFormValues } from "./forms/sign-in-form";
import { login } from "@/lib/services/auth";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (data: SignInFormValues) => {
    try {
      setError(null);
      await login(data).then(() => {
        {
          window.location.href = "/dashboard";
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AuthLayout
        title="Sign in to your account"
        subtitle="Enter your credentials to access your account"
      >
        <div className="mb-4">
          <GoogleLogin
            onSuccess={async credentialResponse => {
              const res = await fetch("http://localhost:8000/auth/google", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: credentialResponse.credential }),
              });
              const data = await res.json();
              if (res.ok && data.access_token) {
                localStorage.setItem("token", data.access_token);
                window.location.href = "/dashboard";
              } else {
                setError(data.detail || "Google login failed");
              }
            }}
            onError={() => setError("Google login failed")}
          />
        </div>
        <SignInForm onSubmit={handleSignIn} error={error} />
      </AuthLayout>
    </div>
  );
};

export default SignIn;
