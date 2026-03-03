"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const TIME_SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];

interface Step3DateTimeProps {
    selectedDate: Date | null;
    selectedTime: string | null;
    onSelectDate: (date: Date) => void;
    onSelectTime: (time: string) => void;
}

export function Step3DateTime({ selectedDate, selectedTime, onSelectDate, onSelectTime }: Step3DateTimeProps) {
    const [currentMonth, setCurrentMonth] = React.useState(new Date());

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    // Adjust to make Monday the first day of week (0 index)
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const weekDays = ["B.e", "Ç.a", "Çər", "C.a", "Cüm", "Şən", "Baz"];

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const isSameDay = (d1: Date, d2: Date | null) => {
        if (!d2) return false;
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    const isPastDay = (day: number) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    return (
        <div className="flex flex-col gap-8 md:flex-row">
            {/* Calendar Area */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-foreground">Tarix Seçimi</h2>
                    <p className="text-sm text-foreground/60">Uyğun olan ən yaxşı günü seçin.</p>
                </div>

                <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">
                            {currentMonth.toLocaleString('az-AZ', { month: 'long', year: 'numeric' })}
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={handlePrevMonth}
                                className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                disabled={currentMonth.getMonth() <= new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNextMonth}
                                className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {weekDays.map(day => (
                            <div key={day} className="text-xs font-medium text-foreground/50 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center">
                        {Array.from({ length: startDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="p-2" />
                        ))}
                        {days.map(day => {
                            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                            const selected = isSameDay(date, selectedDate);
                            const disabled = isPastDay(day);

                            return (
                                <button
                                    key={day}
                                    disabled={disabled}
                                    onClick={() => onSelectDate(date)}
                                    className={`
                    flex h-10 w-full items-center justify-center rounded-lg text-sm transition-all
                    ${disabled ? 'text-foreground/20 cursor-not-allowed' : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer'}
                    ${selected ? 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 font-bold' : ''}
                  `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Time Slots Area */}
            <div className="w-full md:w-64 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-foreground">Saat</h2>
                    <p className="text-sm text-foreground/60">Boş vaxtlar</p>
                </div>

                {selectedDate ? (
                    <div className="grid grid-cols-2 gap-3">
                        {TIME_SLOTS.map((time) => {
                            const selected = selectedTime === time;
                            return (
                                <motion.button
                                    key={time}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onSelectTime(time)}
                                    className={`
                    py-2.5 rounded-lg text-sm font-medium border transition-colors
                    ${selected
                                            ? 'border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/30 dark:text-primary-400'
                                            : 'border-border bg-background hover:bg-zinc-50 dark:hover:bg-zinc-800'}
                  `}
                                >
                                    {time}
                                </motion.button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border bg-zinc-50 dark:bg-zinc-900/50">
                        <p className="text-sm text-foreground/50 text-center px-4">
                            Xahiş edirik əvvəlcə tarixi seçin.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
