import { EventModal } from '@/components/event-modal';
import SuccessModal from '@/components/success-modal';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Holidays from 'date-holidays';
import { ChevronDown, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React, { useState } from 'react';

interface KalenderItem {
    tanggal: string;
    keterangan?: string;
    nama?: string;
    jenis_hari: 'libur' | 'event';
}

interface PageProps {
    kalender: KalenderItem[];
}

export default function Index({ kalender = [] }: PageProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showEventModal, setShowEventModal] = useState(false);
    const [modal, setModal] = useState(false);

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const today = new Date();

    const hd = new Holidays('ID');
    const liburNasional: KalenderItem[] = hd.getHolidays(year).map((h) => ({
        tanggal: h.date.slice(0, 10),
        nama: h.name,
        jenis_hari: 'libur',
    }));
    const liburNasionalBulanan = liburNasional.filter((l) => {
        const date = new Date(l.tanggal);
        return date.getMonth() === month && date.getFullYear() === year;
    });
    const eventBulanan = kalender.filter((e) => {
        const date = new Date(e.tanggal);
        return (
            e.jenis_hari === 'event' &&
            date.getMonth() === month &&
            date.getFullYear() === year
        );
    });

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

                            <button
                                onClick={() => setShowEventModal(true)}
                                className="hover:bg-opacity-90 flex cursor-pointer items-center gap-2 rounded-lg bg-[#0d4436] px-4 py-2 text-sm font-medium text-white shadow-sm transition-all"
                            >
                                <Plus size={18} />
                                Tambah Libur
                            </button>
                        </div>

                        <div className="flex flex-col gap-10 lg:flex-row">
                            <div className="w-full flex-3 rounded-xl border border-gray-200 bg-white p-6 lg:max-w-3xl">
                                <div className="mb-6 flex items-center justify-between px-2">
                                    <div className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-gray-900">
                                        <span className="text-base font-semibold">
                                            {bulanNama[month]} {year}
                                        </span>
                                        <ChevronDown
                                            size={16}
                                            className="text-gray-400"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => changeMonth(-1)}
                                            className="text-gray-300 transition-colors hover:text-gray-600"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={() => changeMonth(1)}
                                            className="text-gray-300 transition-colors hover:text-gray-600"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-4 grid grid-cols-7 text-center">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(
                                        (d, i) => (
                                            <div
                                                key={i}
                                                className="py-2 text-xs font-semibold text-gray-400"
                                            >
                                                {d}
                                            </div>
                                        ),
                                    )}
                                </div>

                                <div className="grid grid-cols-7 gap-y-2 text-center">
                                    {[...Array(firstDay)].map((_, i) => (
                                        <div
                                            key={`empty-${i}`}
                                            className="h-10"
                                        />
                                    ))}

                                    {[...Array(daysInMonth)].map((_, i) => {
                                        const day = i + 1;
                                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                        const event = getEvent(dateStr);

                                        // Cek Hari Ini
                                        const isToday =
                                            day === today.getDate() &&
                                            month === today.getMonth() &&
                                            year === today.getFullYear();

                                        let bgClass =
                                            'bg-transparent text-gray-600 hover:bg-gray-50';

                                        if (event?.jenis_hari === 'libur') {
                                            bgClass =
                                                'bg-[#6344ff] text-white shadow-md shadow-indigo-200';
                                        } else if (
                                            event?.jenis_hari === 'event'
                                        ) {
                                            bgClass =
                                                'bg-[#cc44ff] text-white shadow-md shadow-purple-200';
                                        } else if (isToday) {
                                            bgClass =
                                                'bg-white text-blue-600 border border-blue-600 font-bold';
                                        }

                                        return (
                                            <div
                                                key={day}
                                                className="group relative flex h-10 items-center justify-center"
                                            >
                                                <button
                                                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all ${bgClass} `}
                                                    title={
                                                        event?.nama ||
                                                        event?.keterangan
                                                    }
                                                >
                                                    {day}
                                                </button>
                                            </div>
                                        );
                                    })}

                                    {[1, 2, 3, 4].map((d) => (
                                        <div
                                            key={`next-${d}`}
                                            className="flex h-10 items-center justify-center"
                                        >
                                            <span className="text-sm text-gray-300">
                                                {d}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full flex-1 space-y-4 pt-4 lg:w-64 lg:pt-16">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <div className="h-8 w-8 rounded-full bg-[#6344ff]" />
                                        <div className="flex-1 rounded-md bg-[#e9e4ff] px-4 py-2 text-[#6344ff]">
                                            <p className="text-center text-xs font-bold tracking-wide uppercase">
                                                Libur Nasional
                                            </p>
                                        </div>
                                    </div>

                                    {liburNasionalBulanan.length === 0 && (
                                        <p className="text-center text-xs text-gray-400">
                                            Tidak ada libur nasional
                                        </p>
                                    )}

                                    {liburNasionalBulanan.map((libur, i) => (
                                        <div
                                            key={i}
                                            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700"
                                        >
                                            <p className="font-semibold">
                                                {libur.nama}
                                            </p>
                                            <p className="text-gray-400">
                                                {libur.tanggal}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <div className="h-8 w-8 rounded-full bg-[#cc44ff]" />
                                        <div className="flex-1 rounded-md bg-[#f9e4ff] px-4 py-2 text-[#cc44ff]">
                                            <p className="text-center text-xs font-bold tracking-wide uppercase">
                                                Event Kantor
                                            </p>
                                        </div>
                                    </div>

                                    {eventBulanan.length === 0 && (
                                        <p className="text-center text-xs text-gray-400">
                                            Tidak ada event
                                        </p>
                                    )}

                                    {eventBulanan.map((event, i) => (
                                        <div
                                            key={i}
                                            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700"
                                        >
                                            <p className="font-semibold">
                                                {event.keterangan
                                                }
                                            </p>
                                            <p className="text-gray-400">
                                                {event.tanggal}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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

const ModifiedStyles = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-[#f4f7f6] font-sans antialiased">
        {children}
    </div>
);
