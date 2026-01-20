import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { id } from "date-fns/locale";

interface FilterTanggalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (date: Date) => void;
    initialDate?: string;
}

export default function FilterTanggalModal({
    isOpen,
    onClose,
    onConfirm,
    initialDate
}: FilterTanggalModalProps) {
    const [date, setDate] = useState<Date | undefined>(
        initialDate ? new Date(initialDate) : undefined
    );

    const handleConfirm = () => {
        if (date) {
            onConfirm(date);
        }
    };

    const PRIMARY_GREEN = "#114F38";
    const DANGER_RED = "#EF4444";

    // Add dynamic styles for calendar elements
    useEffect(() => {
        if (isOpen) {
            // Create style element for calendar nav buttons
            const style = document.createElement('style');
            style.innerHTML = `
                [data-calendar-modal] .rdp-nav_button {
                    background-color: ${PRIMARY_GREEN} !important;
                    color: white !important;
                    border: none !important;
                    cursor: pointer !important;
                }
                [data-calendar-modal] .rdp-nav_button:hover {
                    background-color: #0d3f2d !important;
                    opacity: 1 !important;
                }
                [data-calendar-modal] .rdp-day_selected {
                    background-color: ${PRIMARY_GREEN} !important;
                    color: white !important;
                }
                [data-calendar-modal] .rdp-day_today {
                    color: ${PRIMARY_GREEN} !important;
                }
                [data-calendar-modal] .rdp-head_cell:first-child {
                    color: #EF4444 !important;
                    font-weight: 600 !important;
                }
                [data-calendar-modal] .calendar-sunday {
                    color: #EF4444 !important;
                }
            `;
            document.head.appendChild(style);
            return () => {
                document.head.removeChild(style);
            };
        }
    }, [isOpen, PRIMARY_GREEN]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent data-calendar-modal className="w-auto p-8 rounded-4xl bg-white shadow-2xl border-none [&>button]:hidden flex flex-col items-center sm:max-w-100">
                <div className="mb-6 w-full">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={id}
                        className="p-0 w-full"
                        classNames={{
                            month: "space-y-6 w-full",
                            caption: "flex justify-center pt-1 relative items-center mb-4 w-full",
                            caption_label: "text-xl font-bold text-gray-900",
                            nav: "space-x-1 flex items-center",
                            nav_button: "bg-[#3e5f44] text-white border-none h-10 w-10 rounded-xl shadow-sm flex items-center justify-center hover:opacity-80 font-bold",
                            nav_button_previous: "absolute left-0 top-0",
                            nav_button_next: "absolute right-0 top-0",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex justify-between mb-2",
                            head_cell: "text-gray-900 font-semibold text-base w-10 h-10 flex items-center justify-center",
                            row: "flex w-full mt-2 justify-between",
                            cell: "h-10 w-10 text-center p-0 relative flex items-center justify-center",
                            day: "h-10 w-10 p-0 font-medium text-base text-gray-900 aria-selected:opacity-100 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors cursor-pointer",
                            day_selected: "bg-[#3e5f44] text-white font-bold shadow-md rounded-full hover:bg-[#3e5f44] hover:text-white focus:bg-[#3e5f44] focus:text-white",
                            day_today: "font-bold rounded-full text-[#3e5f44] border border-[#3e5f44]",
                            day_outside: "text-gray-300 opacity-50 hover:bg-transparent hover:text-gray-300 cursor-default",
                        }}
                    />
                </div>

                <div className="flex w-full items-center justify-between gap-4 mt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="bg-white flex-1 h-12 hover:bg-red-50 rounded-xl text-base font-semibold transition-all box-border"
                        style={{ color: DANGER_RED, borderColor: DANGER_RED }}
                    >
                        Batal
                    </Button>

                    <Button
                        onClick={handleConfirm}
                        disabled={!date}
                        className="flex-1 h-12 text-white rounded-xl text-base font-semibold shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                        style={{ backgroundColor: PRIMARY_GREEN }}
                    >
                        Simpan
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}