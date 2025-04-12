import { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { register } from "@/lib/services/auth";
import RegisterForm, { RegisterFormValues } from "./forms/register-form";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast()
  const navigate = useNavigate()

  const handleRegister = async (data: RegisterFormValues) => {

    try {
      setError(null);
      await register({
        email: data.email,
        password: data.password,
        username: data.name
      }).then(() =>
        toast({
          title: "Your account has been created successfully!",
          action: <ToastAction altText="Sign In" onClick={() => navigate('/sign-in')}>Go to Sign In</ToastAction>,
        })
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }

  };

  return (
    <div className="min-h-screen bg-background">
      <AuthLayout
        title="Create an account"
        subtitle="Sign up to get started with our platform"
      >
        <RegisterForm onSubmit={handleRegister} error={error} />
      </AuthLayout>
    </div>
  );
};

export default Register;