import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

export const Footer = () => {
    const links = {
        product: [
            { name: "Features", href: "/features" },
            { name: "Documentation", href: "/docs" },
            { name: "API", href: "/api" },
        ],
        company: [
            { name: "About", href: "/about" },
            { name: "Blog", href: "/blog" },
            { name: "Careers", href: "/careers" },
        ],
        legal: [
            { name: "Privacy", href: "/privacy" },
            { name: "Terms", href: "/terms" },
            { name: "License", href: "/license" },
        ],
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border relative mt-auto">
            <div className="mx-auto py-12">
                <div className="grid px-6 grid-cols-2 gap-8 md:grid-cols-4">
                    {/* Logo and description */}
                    <div className="col-span-2 md:col-span-1">
                        <img
                            src="/kaidoku-logo.svg"
                            alt="Kaidoku"
                            className="h-8 w-auto"
                        />
                        <p className="mt-4 text-sm text-muted-foreground">
                            Advanced bioinformatics tools for sequence analysis and data interpretation.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Product</h3>
                        <ul className="mt-4 space-y-2">
                            {links.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary-foreground"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Company</h3>
                        <ul className="mt-4 space-y-2">
                            {links.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary-foreground"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            {links.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary-foreground"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-12 px-6 border-t border-border pt-8">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Kaidoku. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a
                                href="https://github.com/kaidoku"
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-primary-foreground"
                            >
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a
                                href="https://twitter.com/kaidoku"
                                target="_blank"
                                rel="noreferrer"
                                className="text-muted-foreground hover:text-primary-foreground"
                            >
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
