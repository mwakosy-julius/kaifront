// src/components/forms/register-form.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import FormInput from '@/components/ui/FormInput';
import { Link } from 'react-router-dom';
import { SignUpButton } from '@clerk/clerk-react';

const registerSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .regex(
            /^[a-zA-Z0-9](?:[a-zA-Z0-9_]*[a-zA-Z0-9])?$/,
            'Name can only contain alphanumeric characters and underscores, and cannot start or end with an underscore'
        ),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    confirmPassword: z
        .string()
        .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});


export type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
    onSubmit: (data: RegisterFormValues) => Promise<void>;
    error?: string | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, error }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        mode: 'onSubmit',
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {error && (
                <div className="p-4 border border-destructive/50 rounded-md bg-destructive/10 text-destructive flex gap-2 items-center">
                    <AlertCircle size={20} />
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <div className="space-y-4">
                <FormInput
                    {...register('name')}
                    icon={<User size={20} className="text-muted-foreground" />}
                    label="User Name"
                    type="text"
                    placeholder="Enter your user name"
                    error={errors.name?.message}
                    autoComplete="name"
                />

                <FormInput
                    {...register('email')}
                    icon={<Mail size={20} className="text-muted-foreground" />}
                    label="Email address"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    autoComplete="email"
                />

                <FormInput
                    {...register('password')}
                    icon={<Lock size={20} className="text-muted-foreground" />}
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    error={errors.password?.message}
                    autoComplete="new-password"
                />

                <FormInput
                    {...register('confirmPassword')}
                    icon={<Lock size={20} className="text-muted-foreground" />}
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    error={errors.confirmPassword?.message}
                    autoComplete="new-password"
                />
            </div>
            <SignUpButton>
                <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 
                        bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 
                        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                        disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    More options
                    <ArrowRight size={20} />
                </button>
            </SignUpButton>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 
                 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 
                 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        Create Account
                        <ArrowRight size={20} />
                    </>
                )}
            </button>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                    to="/sign-in"
                    className="text-primary hover:text-primary/80 font-medium"
                >
                    Sign in
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;