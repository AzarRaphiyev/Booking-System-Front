"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
    initialView?: "login" | "register";
};

export function AuthModal({ isOpen, onClose, initialView = "login" }: AuthModalProps) {
    const [view, setView] = React.useState<"login" | "register">(initialView);

    // Sync initial view when modal opens
    React.useEffect(() => {
        if (isOpen) {
            setView(initialView);
        }
    }, [isOpen, initialView]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-2xl sm:p-8"
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="absolute right-4 top-4 h-8 w-8 rounded-full p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        <AnimatePresence mode="wait">
                            {view === "login" ? (
                                <motion.div
                                    key="login"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 20, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="flex flex-col gap-2 text-center">
                                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Giriş</h2>
                                        <p className="text-sm text-foreground/60">Hesabınıza daxil olun</p>
                                    </div>
                                    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                                        <Input label="Email" type="email" placeholder="nümunə@email.az" required />
                                        <Input label="Şifrə" type="password" placeholder="••••••••" required />
                                        <div className="flex justify-end">
                                            <button type="button" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                                                Şifrəni unutmusunuz?
                                            </button>
                                        </div>
                                        <Button type="submit" className="w-full mt-2">
                                            Giriş et
                                        </Button>
                                    </form>
                                    <div className="text-center text-sm text-foreground/60">
                                        Hesabınız yoxdur?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setView("register")}
                                            className="font-medium text-primary-600 hover:text-primary-500"
                                        >
                                            Qeydiyyatdan keçin
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="register"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="flex flex-col gap-2 text-center">
                                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Qeydiyyat</h2>
                                        <p className="text-sm text-foreground/60">Yeni hesab yaradın</p>
                                    </div>
                                    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                                        <Input label="Ad və Soyad" type="text" placeholder="Məmməd Məmmədov" required />
                                        <Input label="Telefon nömrəsi" type="tel" placeholder="+994 (00) 000-00-00" required />
                                        <Input label="Email" type="email" placeholder="nümunə@email.az" required />
                                        <Input label="Şifrə" type="password" placeholder="••••••••" required />
                                        <Button type="submit" className="w-full mt-2">
                                            Qeydiyyatdan keç
                                        </Button>
                                    </form>
                                    <div className="text-center text-sm text-foreground/60">
                                        Artıq hesabınız var?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setView("login")}
                                            className="font-medium text-primary-600 hover:text-primary-500"
                                        >
                                            Giriş edin
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
