"use client";

import * as React from "react";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/Button";
import { AuthModal } from "./auth/AuthModal";

const navLinks = [
    { name: "Ana Səhifə", href: "/" },
    { name: "Xidmətlər", href: "/#xidmetler" },
    { name: "Haqqımızda", href: "/#haqqimizda" },
    { name: "Əlaqə", href: "/#elaqe" },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const [isAuthOpen, setIsAuthOpen] = React.useState(false);
    const [authView, setAuthView] = React.useState<"login" | "register">("login");

    const openAuth = (view: "login" | "register") => {
        setAuthView(view);
        setIsAuthOpen(true);
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold tracking-tight text-primary-600 dark:text-primary-500">
                                Gözəllik Salonu
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-full" onClick={() => openAuth("login")}>
                            <User className="h-5 w-5" />
                            <span className="sr-only">Profil</span>
                        </Button>
                        <div className="flex items-center gap-2 border-l border-zinc-200 pl-4 dark:border-zinc-800">
                            <Button variant="ghost" size="sm" onClick={() => openAuth("login")}>
                                Giriş
                            </Button>
                            <Button size="sm" onClick={() => openAuth("register")}>
                                Qeydiyyat
                            </Button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-9 h-9 p-0"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-b border-border/40 bg-background px-4 py-4 shadow-sm">
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-foreground/80 hover:text-foreground"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800">
                                <Button variant="outline" className="w-full justify-center" onClick={() => openAuth("login")}>
                                    Giriş
                                </Button>
                                <Button className="w-full justify-center" onClick={() => openAuth("register")}>
                                    Qeydiyyat
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialView={authView}
            />
        </>
    );
}
