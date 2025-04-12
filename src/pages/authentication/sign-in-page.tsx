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
        {
          window.location.href = "/";
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
        <SignInForm onSubmit={handleSignIn} error={error} />
      </AuthLayout>
    </div>
  );
};

export default SignIn;
