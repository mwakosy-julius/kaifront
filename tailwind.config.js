/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				// Custom brand colors - Bioinformatics inspired
				primary: 'hsl(var(--primary))',     // Deep Blue
				secondary: 'hsl(var(--secondary))',   // DNA Green
				tealBlue: "#367588",    // Kept from original
				temperedGrey: "#A1AEB1", // Kept from original
				glacierGrey: "#C5C6C7",  // Kept from original

				// System colors using CSS variables
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',

				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},

				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},

				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},

				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},

				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},

				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},

				// Input, border, and ring colors
				input: 'hsl(var(--input))',
				border: 'hsl(var(--border))',
				ring: 'hsl(var(--ring))',

				// Chart colors - Biological visualization palette
				chart: {
					1: 'hsl(var(--chart-1))',  // Deep Blue
					2: 'hsl(var(--chart-2))',  // Green
					3: 'hsl(var(--chart-3))',  // Orange
					4: 'hsl(var(--chart-4))',  // Teal
					5: 'hsl(var(--chart-5))'   // Purple
				},

				// Sidebar specific colors - Modern lab aesthetic
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			// Add any additional theme customizations
			animation: {
				'fade-in': 'fadeIn 200ms ease-in-out',
				'fade-out': 'fadeOut 200ms ease-in-out',
				'slide-in': 'slideIn 200ms ease-in-out',
				'slide-out': 'slideOut 200ms ease-in-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeOut: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				slideIn: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideOut: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' },
				},
			}
		}
	},
	plugins: [require("tailwindcss-animate")]
}
