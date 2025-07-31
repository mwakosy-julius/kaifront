import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import FormInput from '@/components/ui/FormInput';
import { useNavigate } from 'react-router-dom';
import { SignInButton } from '@clerk/clerk-react';

const signInSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
    rememberMe: z.boolean().optional(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

interface SignInFormProps {
    onSubmit: (data: SignInFormValues) => Promise<void>;
    error: string | null;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit, error }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 transition-all duration-300 ease-linear">

            {error && (
                <div className="p-4 border border-destructive/50 rounded-md bg-destructive/10 text-destructive flex gap-2 items-center">
                    <AlertCircle size={20} />
                    <p className="text-sm">{error}</p>
                </div>
            )}
            
            <div className="space-y-4">
                <FormInput
                    {...register('email')}
                    icon={<Mail size={16} className="text-muted-foreground" />}
                    label="Email address"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    autoComplete="email"
                />

                <FormInput
                    {...register('password')}
                    icon={<Lock size={16} className="text-muted-foreground" />}
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    autoComplete="current-password"
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        {...register('rememberMe')}
                        className="h-4 w-4 rounded border-input text-primary 
                        focus:ring-ring focus:ring-offset-background"
                    />
                    <label htmlFor="rememberMe" className="ml-2 text-sm text-muted-foreground">
                        Remember me
                    </label>
                </div>
                <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80"
                >
                    Forgot password?
                </button>
            </div>
            <SignInButton>
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
            </SignInButton>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 
                    bg-primary text-primary-foreground rounded-md hover:bg-primary/90 
                    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
                    disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent !rounded-full animate-spin" />
                ) : (
                    <>
                        Sign in
                        <ArrowRight size={20} />
                    </>
                )}
            </button>

            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                    type="button"
                    className="text-primary hover:text-primary/80 font-medium"
                    onClick={() => navigate('/sign-up')}
                >
                    Create an account
                </button>
            </p>
        </form>
    );
};

export default SignInForm;