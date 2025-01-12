import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen h-screen flex transition-all duration-300 ease-linear">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-card items-center justify-center relative overflow-hidden">
                <div className="relative z-10 px-12">
                    <div className="flex gap-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-muted-foreground"
                            />
                        ))}
                    </div>
                </div>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary transform translate-x-1/2 translate-y-1/2" />
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full overflow-y-auto lg:w-1/2 flex transition-all duration-300 ease-linear items-center justify-center md:justify-start p-8 sm:px-12 lg:px-16 bg-background">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center space-y-1">
                        <h1 className="text-3xl font-bold text-foreground">
                            {title}
                        </h1>
                        <p className="text-muted-foreground">{subtitle}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;