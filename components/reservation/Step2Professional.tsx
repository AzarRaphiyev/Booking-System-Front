"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Professional } from "./types";
import { UserCircle } from "lucide-react";

// In a real app, imageUrl would be actual paths.
const mockProfessionals: Professional[] = [
    { id: "1", name: "Aysel Məmmədova", specialty: "Saç ustası & Kolorist", imageUrl: "" },
    { id: "2", name: "Tahirə Hüseynova", specialty: "Nail art & Manikür", imageUrl: "" },
    { id: "3", name: "Leyla Abdullayeva", specialty: "Kosmetoloq", imageUrl: "" },
    { id: "4", name: "Günel Qasımova", specialty: "Vizajist", imageUrl: "" },
];

interface Step2ProfessionalProps {
    selectedProfessional: Professional | null;
    onSelect: (prof: Professional) => void;
}

export function Step2Professional({ selectedProfessional, onSelect }: Step2ProfessionalProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-foreground">Usta Seçimi</h2>
                <p className="text-sm text-foreground/60">Sizə xidmət göstərəcək peşəkarı seçin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockProfessionals.map((prof) => {
                    const isSelected = selectedProfessional?.id === prof.id;
                    return (
                        <motion.div
                            key={prof.id}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelect(prof)}
                            className={`
                relative flex flex-col items-center justify-center cursor-pointer overflow-hidden rounded-xl border p-6 text-center transition-colors
                ${isSelected
                                    ? "border-primary-500 bg-primary-50 dark:bg-primary-950/20"
                                    : "border-border bg-background hover:bg-zinc-50 dark:hover:bg-zinc-900"}
              `}
                        >
                            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                                {prof.imageUrl ? (
                                    <img src={prof.imageUrl} alt={prof.name} className="h-full w-full rounded-full object-cover" />
                                ) : (
                                    <UserCircle className="h-10 w-10 text-zinc-400" />
                                )}
                            </div>
                            <h3 className="font-semibold text-base text-foreground mb-1">{prof.name}</h3>
                            <p className="text-xs font-medium text-primary-600 dark:text-primary-500">{prof.specialty}</p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
