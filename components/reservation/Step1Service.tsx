"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Service } from "./types";
import { Clock, CreditCard } from "lucide-react";

const mockServices: Service[] = [
    { id: "1", name: "Saç kəsimi", duration: "45 dəq", price: "30 ₼", description: "Bütün saç tiplərinə uyğun fərdi yanaşma" },
    { id: "2", name: "Manikür", duration: "60 dəq", price: "20 ₼", description: "Klassik və aparat manikürü, gel lak" },
    { id: "3", name: "Pedikür", duration: "60 dəq", price: "35 ₼", description: "Dabanların təmizlənməsi və qulluq" },
    { id: "4", name: "Kosmetologiya", duration: "90 dəq", price: "80 ₼", description: "Üz təmizlənməsi və yaşlanma əleyhinə qulluq" },
    { id: "5", name: "Makiyaj", duration: "60 dəq", price: "50 ₼", description: "Gündəlik və ya ziyafət üçün xüsusi makiyaj" },
    { id: "6", name: "Saç boyama", duration: "120 dəq", price: "80 ₼-dan", description: "Ombre, balyaj, tam boyama və rəng korreksiyası" },
];

interface Step1ServiceProps {
    selectedService: Service | null;
    onSelect: (service: Service) => void;
}

export function Step1Service({ selectedService, onSelect }: Step1ServiceProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-foreground">Xidmət Seçimi</h2>
                <p className="text-sm text-foreground/60">Sizə uyğun olan xidməti seçin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockServices.map((service) => {
                    const isSelected = selectedService?.id === service.id;
                    return (
                        <motion.div
                            key={service.id}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onSelect(service)}
                            className={`
                relative cursor-pointer overflow-hidden rounded-xl border p-5 transition-colors
                ${isSelected
                                    ? "border-primary-500 bg-primary-50 dark:bg-primary-950/20"
                                    : "border-border bg-background hover:bg-zinc-50 dark:hover:bg-zinc-900"}
              `}
                        >
                            <div className="flex flex-col gap-3">
                                <h3 className="font-semibold text-lg text-foreground">{service.name}</h3>
                                <p className="text-xs text-foreground/70 min-h-[40px]">{service.description}</p>
                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-border/60">
                                    <div className="flex items-center gap-1.5 text-xs text-foreground/60">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{service.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400">
                                        <CreditCard className="w-4 h-4" />
                                        <span>{service.price}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
