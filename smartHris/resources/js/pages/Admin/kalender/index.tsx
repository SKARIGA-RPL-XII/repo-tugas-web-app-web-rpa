import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Holidays from "date-holidays";

export default function Index({ kalender = [] }) {
    const today = new Date();
    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());

    // Libur nasional Indonesia otomatis
    const hd = new Holidays("ID");
    const liburNasional = hd.getHolidays(year).map((h) => ({
        tanggal: h.date.slice(0, 10),
        nama: h.name,
        jenis_hari: "libur",
    }));

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const bulanNama = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const getEvent = (dateStr) => {
        return (
            kalender.find((e) => e.tanggal === dateStr) ||
            liburNasional.find((l) => l.tanggal === dateStr)
        );
    };

    const prevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
    };

    return (
        <>
            <Head title="Kalender Perusahaan" />

            <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
                <div className="max-w-6xl mx-auto">

                    <h1 className="text-2xl font-bold text-center mb-4">
                        📅 Kalender {bulanNama[month]} {year}
                    </h1>

                    {/* NAVIGASI */}
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={prevMonth}
                            className="px-3 py-1 bg-gray-200 rounded"
                        >
                            ◀ Sebelumnya
                        </button>

                        <Link
                            href="/kalender-event"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            📋 Kelola Event
                        </Link>

                        <button
                            onClick={nextMonth}
                            className="px-3 py-1 bg-gray-200 rounded"
                        >
                            Berikutnya ▶
                        </button>
                    </div>

                    {/* HEADER HARI */}
                    <div className="grid grid-cols-7 text-center font-semibold text-gray-700">
                        {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
                            <div key={d}>{d}</div>
                        ))}
                    </div>

                    {/* KALENDER */}
                    <div className="grid grid-cols-7 gap-2 mt-2">
                        {[...Array(firstDay)].map((_, i) => (
                            <div key={i}></div>
                        ))}

                        {[...Array(daysInMonth)].map((_, i) => {
                            const day = i + 1;
                            const dateStr = `${year}-${String(month + 1).padStart(
                                2,
                                "0"
                            )}-${String(day).padStart(2, "0")}`;

                            const event = getEvent(dateStr);

                            return (
                                <div
                                    key={day}
                                    className={`border h-24 p-1 rounded border-gray-300 ${event?.jenis_hari === "libur"
                                        ? "bg-red-100 border-red-400"
                                        : event?.jenis_hari === "event"
                                            ? "bg-blue-100 border-blue-400"
                                            : "bg-white"
                                        }`}
                                >

                                    <div className="font-bold">{day}</div>

                                    {event && (
                                        <div className="text-xs mt-1 text-gray-700">
                                            {event.nama || event.keterangan}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
