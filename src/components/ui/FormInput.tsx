import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.ReactNode;
    label: string;
    error?: string;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ icon, label, error, ...props }, ref) => (
        <div className="space-y-1">
            <label className="block text-xs font-medium text-foreground">
                {label}
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-muted-foreground">
                    {icon}
                </div>
                <input
                    ref={ref}
                    className={`block w-full pl-8 px-2 py-2 border text-sm rounded-md
                     bg-background text-foreground
                     focus:outline-none focus:ring-1 focus:ring-ring 
                     focus:border-transparent transition-colors
                     ${error
                            ? 'border-destructive focus:ring-destructive'
                            : 'border-input'
                        }`}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-destructive mt-0.5">{error}</p>
            )}
        </div>
    )
);

FormInput.displayName = 'FormInput';

export default FormInput;