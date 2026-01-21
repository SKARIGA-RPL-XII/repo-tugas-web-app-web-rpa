import SuccessModal from '@/components/success-modal';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Holidays from 'date-holidays';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { EventModal } from './EventModal';

/* ===============================
    TYPE DEFINITIONS
================================ */
interface KalenderItem {
    tanggal: string;
    nama: string;
    jenis_hari: 'libur' | 'event';
}

interface PageProps {
    kalender: KalenderItem[];
}

/* ===============================
    COMPONENT
================================ */
export default function Index({ kalender = [] }: PageProps) {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 11, 1));
    const [showEventModal, setShowEventModal] = useState(false);
    const [modal, setModal] = useState(false);

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    /* ===============================
        LIBUR NASIONAL INDONESIA
    ================================ */
    const hd = new Holidays('ID');
    const liburNasional: KalenderItem[] = hd.getHolidays(year).map((h) => ({
        tanggal: h.date.slice(0, 10),
        nama: h.name,
        jenis_hari: 'libur',
    }));

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const bulanNama = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    /* ===============================
        HELPERS
    ================================ */
    const getEvent = (dateStr: string): KalenderItem | undefined => {
        const companyEvent = kalender.find((e) => e.tanggal === dateStr);
        const nationalHoliday = liburNasional.find(
            (l) => l.tanggal === dateStr,
        );
        return companyEvent || nationalHoliday;
    };

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(year, month + offset, 1));
    };

    /* ===============================
        RENDER
    ================================ */
    return (
        <ModifiedStyles>
            <AppLayout>
                <Head title="Libur / Cuti Kalender" />

                <div className="p-8">
                    <h1 className="mb-6 text-xl font-semibold text-gray-800">
                        Libur / Cuti Kalender
                    </h1>

                    <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                        <div className="mb-8 flex items-start justify-between">
                            <h2 className="text-lg font-bold text-gray-800">
                                Kalender
                            </h2>

                            {/* 🔥 TOMBOL POPUP (TIDAK PINDAH HALAMAN) */}
                            <button
                                onClick={() => setShowEventModal(true)}
                                className="hover:bg-opacity-90 flex cursor-pointer items-center gap-2 rounded-lg bg-[#0d4436] px-4 py-2 text-sm font-medium text-white transition-all"
                            >
                                <Plus size={18} />
                                Tambah Libur
                            </button>
                        </div>

                        <div className="flex flex-col gap-9 lg:flex-row">
                            {/* ===============================
                               CALENDAR SECTION
                            ================================ */}
                            <div className="flex-3 rounded-xl border border-gray-200 bg-white p-6">
                                <div className="mb-8 flex items-center justify-between px-2">
                                    <div className="group flex cursor-pointer items-center gap-2">
                                        <span className="text-base font-bold text-gray-700">
                                            {bulanNama[month]} {year}
                                        </span>
                                        <span className="text-[10px] text-gray-400 transition-colors group-hover:text-gray-600">
                                            ▼
                                        </span>
                                    </div>

                                    <div className="flex gap-6">
                                        <button
                                            onClick={() => changeMonth(-1)}
                                            className="text-gray-300 transition-colors hover:text-gray-600"
                                        >
                                            <ChevronLeft size={22} />
                                        </button>
                                        <button
                                            onClick={() => changeMonth(1)}
                                            className="text-gray-300 transition-colors hover:text-gray-600"
                                        >
                                            <ChevronRight size={22} />
                                        </button>
                                    </div>
                                </div>

                                {/* HEADER HARI */}
                                <div className="mb-4 grid grid-cols-7 text-center">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(
                                        (d, i) => (
                                            <div
                                                key={i}
                                                className="py-3 text-xs font-semibold text-gray-400"
                                            >
                                                {d}
                                            </div>
                                        ),
                                    )}
                                </div>

                                {/* TANGGAL GRID */}
                                <div className="grid grid-cols-7 text-center">
                                    {[...Array(firstDay)].map((_, i) => (
                                        <div
                                            key={`empty-${i}`}
                                            className="h-12"
                                        />
                                    ))}

                                    {[...Array(daysInMonth)].map((_, i) => {
                                        const day = i + 1;
                                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                                        const event = getEvent(dateStr);

                                        let bgColor = '';
                                        let textColor = 'text-gray-600';

                                        if (event?.jenis_hari === 'libur') {
                                            bgColor = 'bg-[#6344ff] text-white';
                                        } else if (
                                            event?.jenis_hari === 'event'
                                        ) {
                                            bgColor = 'bg-[#cc44ff] text-white';
                                        }

                                        return (
                                            <div
                                                key={day}
                                                className="flex h-12 items-center justify-center"
                                            >
                                                <div
                                                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all ${bgColor} ${textColor} ${!bgColor && 'cursor-pointer hover:bg-gray-100'}`}
                                                >
                                                    {day}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {[1, 2, 3, 4].map((d) => (
                                        <div
                                            key={`next-${d}`}
                                            className="flex h-12 items-center justify-center"
                                        >
                                            <span className="text-sm text-gray-300">
                                                {d}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ===============================
                                LEGEND
                            ================================ */}
                            <div className="w-full flex-1 space-y-5 pt-4 lg:w-72">
                                <LegendItem
                                    color="#6344ff"
                                    label="Libur Nasional"
                                    bg="#e9e4ff"
                                />
                                <LegendItem
                                    color="#cc44ff"
                                    label="Anniversary HR"
                                    bg="#f9e4ff"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===============================
                    MODAL TAMBAH LIBUR
                ================================ */}

                <SuccessModal isOpen={modal} onClose={() => setModal(false)} />

                <EventModal
                    isOpen={showEventModal}
                    success={() => setModal(true)}
                    onClose={() => setShowEventModal(false)}
                />
            </AppLayout>
        </ModifiedStyles>
    );
}

/* ===============================
    LEGEND COMPONENT
================================ */
function LegendItem({
    color,
    label,
    bg,
}: {
    color: string;
    label: string;
    bg: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <div
                className="h-10 w-10 rounded-full shadow-sm"
                style={{ backgroundColor: color }}
            />
            <div
                className="flex-1 rounded-full px-5 py-2.5"
                style={{ backgroundColor: bg , color:color }}
            >
                <p className="text-md font-extrabold tracking-widest text-center">
                    {label}
                </p>
            </div>
        </div>
    );
}

/* ===============================
    WRAPPER STYLES
================================ */
const ModifiedStyles = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-[#f4f7f6] font-sans antialiased">
        {children}
    </div>
);
