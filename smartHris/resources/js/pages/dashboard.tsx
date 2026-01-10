import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    const attendanceData = [
        { date: '1 Mei', value: 16 },
        { date: '2 Mei', value: 15.5 },
        { date: '3 Mei', value: 24 },
        { date: '4 Mei', value: 20 },
        { date: '5 Mei', value: 27 },
        { date: '6 Mei', value: 21 },
        { date: '7 Mei', value: 28.5 },
    ];

    const maxValue = 30; // Ditetapkan 30 sesuai skala di gambar

    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="min-h-screen w-full bg-[#F8FAFC] px-6 py-8 md:px-10">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1E293B]">
                            Selamat Datang, Admin!
                        </h1>
                        <p className="text-[#64748B]">
                            Berikut adalah ringkasan aktivitas absensi karyawan
                            Anda.
                        </p>
                    </div>

                    <div className="mt-4 flex items-center space-x-4 md:mt-0">
                        {/* Bell Icon */}
                        <button className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50">
                            <svg
                                className="h-6 w-6 text-slate-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="absolute top-3.5 right-3.5 flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
                            </span>
                        </button>

                        {/* Profile Pill */}
                        <button className="flex items-center space-x-3 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="font-semibold text-slate-700">
                                Hi, Admin
                            </span>
                            <svg
                                className="h-4 w-4 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Stats Cards Section */}
                <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Total Karyawan */}
                    <StatCard
                        iconColor="bg-blue-50 text-blue-600"
                        value="30 Orang"
                        label="Total Karyawan"
                        svg={
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        }
                    />

                    {/* Hadir Hari Ini */}
                    <StatCard
                        iconColor="bg-green-50 text-green-600"
                        value="27 Karyawan"
                        label="Hadir Hari Ini"
                        svg={
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        }
                    />

                    {/* Pengajuan Cuti */}
                    <StatCard
                        iconColor="bg-orange-50 text-orange-600"
                        value="3 Pengajuan"
                        label="Pengajuan Cuti"
                        svg={
                            <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                            />
                        }
                    />

                    {/* Sanksi Aktif - PERSIS GAMBAR */}
                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm ring-1 ring-slate-100">
                        <div className="flex items-center space-x-5">
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#FFF1F1]">
                                <svg
                                    width="34"
                                    height="34"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z"
                                        fill="#EF4444"
                                    />
                                    <rect
                                        x="11.2"
                                        y="7"
                                        width="1.6"
                                        height="6"
                                        rx="0.8"
                                        fill="white"
                                    />
                                    <circle
                                        cx="12"
                                        cy="16"
                                        r="1.2"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">
                                    3 Karyawan
                                </h3>
                                <p className="text-sm font-medium text-slate-500">
                                    Sanksi Aktif
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Rekap Absensi Mingguan - PERSIS GAMBAR */}
                    <div className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-10 text-xl font-bold text-[#1E293B]">
                            Rekap Absensi Mingguan
                        </h2>

                        <div className="relative h-72 w-full">
                            <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 500 240"
                                preserveAspectRatio="none"
                            >
                                {/* Horizontal Grid Lines */}
                                {[0, 5, 10, 15, 20, 25, 30].map((v, i) => (
                                    <line
                                        key={i}
                                        x1="40"
                                        y1={200 - (v / 30) * 200}
                                        x2="480"
                                        y2={200 - (v / 30) * 200}
                                        stroke="#E2E8F0"
                                        strokeWidth="1"
                                        strokeDasharray="4,4"
                                    />
                                ))}

                                {/* Vertical Grid Lines */}
                                {attendanceData.map((_, i) => (
                                    <line
                                        key={i}
                                        x1={60 + i * 65}
                                        y1="0"
                                        x2={60 + i * 65}
                                        y2="200"
                                        stroke="#E2E8F0"
                                        strokeWidth="1"
                                        strokeDasharray="4,4"
                                    />
                                ))}

                                {/* Area Gradient */}
                                <defs>
                                    <linearGradient
                                        id="lineGrad"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#429375"
                                            stopOpacity="0.1"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#429375"
                                            stopOpacity="0"
                                        />
                                    </linearGradient>
                                </defs>
                                <path
                                    d={`M 60,${200 - (attendanceData[0].value / 30) * 200} 
                                       ${attendanceData.map((d, i) => `L ${60 + i * 65},${200 - (d.value / 30) * 200}`).join(' ')} 
                                       L ${60 + (attendanceData.length - 1) * 65},200 L 60,200 Z`}
                                    fill="url(#lineGrad)"
                                />

                                {/* Main Path Line */}
                                <polyline
                                    fill="none"
                                    stroke="#429375"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points={attendanceData
                                        .map(
                                            (d, i) =>
                                                `${60 + i * 65},${200 - (d.value / 30) * 200}`,
                                        )
                                        .join(' ')}
                                />

                                {/* Points with white border */}
                                {attendanceData.map((d, i) => (
                                    <circle
                                        key={i}
                                        cx={60 + i * 65}
                                        cy={200 - (d.value / 30) * 200}
                                        r="5"
                                        fill="white"
                                        stroke="#429375"
                                        strokeWidth="2"
                                    />
                                ))}

                                {/* Labels */}
                                {[0, 5, 10, 15, 20, 25, 30].map((v, i) => (
                                    <text
                                        key={i}
                                        x="30"
                                        y={205 - (v / 30) * 200}
                                        fontSize="12"
                                        fill="#94A3B8"
                                        textAnchor="end"
                                    >
                                        {v}
                                    </text>
                                ))}
                                {attendanceData.map((d, i) => (
                                    <text
                                        key={i}
                                        x={60 + i * 65}
                                        y="230"
                                        fontSize="12"
                                        fill="#64748B"
                                        textAnchor="middle"
                                    >
                                        {d.date}
                                    </text>
                                ))}
                            </svg>
                        </div>

                        {/* Chart Legend */}
                        <div className="mt-6 flex items-center justify-center space-x-2">
                            <div className="flex items-center">
                                <div className="h-[2px] w-3 bg-[#429375]"></div>
                                <div className="mx-[1px] h-2 w-2 rounded-full border border-[#429375] bg-white"></div>
                                <div className="h-[2px] w-3 bg-[#429375]"></div>
                            </div>
                            <span className="text-sm font-medium text-[#64748B]">
                                Mei 2024
                            </span>
                        </div>
                    </div>
                    {/* Status Kehadiran Karyawan */}
                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-center text-xl font-bold text-gray-900 lg:text-left">
                            Status Kehadiran Karyawan
                        </h2>
                        <div className="flex h-72 items-center justify-center">
                            <div className="relative">
                                <svg
                                    width="220"
                                    height="220"
                                    viewBox="0 0 220 220"
                                >
                                    {/* Donut chart segments */}
                                    <circle
                                        cx="110"
                                        cy="110"
                                        r="70"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="40"
                                        strokeDasharray="220 220"
                                        transform="rotate(-90 110 110)"
                                    />
                                    <circle
                                        cx="110"
                                        cy="110"
                                        r="70"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="40"
                                        strokeDasharray="55 220"
                                        strokeDashoffset="-220"
                                        transform="rotate(-90 110 110)"
                                    />
                                    <circle
                                        cx="110"
                                        cy="110"
                                        r="70"
                                        fill="none"
                                        stroke="#ef4444"
                                        strokeWidth="40"
                                        strokeDasharray="11 220"
                                        strokeDashoffset="-275"
                                        transform="rotate(-90 110 110)"
                                    />
                                    <circle
                                        cx="110"
                                        cy="110"
                                        r="70"
                                        fill="none"
                                        stroke="#f97316"
                                        strokeWidth="40"
                                        strokeDasharray="22 220"
                                        strokeDashoffset="-286"
                                        transform="rotate(-90 110 110)"
                                    />
                                    <circle
                                        cx="110"
                                        cy="110"
                                        r="70"
                                        fill="none"
                                        stroke="#eab308"
                                        strokeWidth="40"
                                        strokeDasharray="44 220"
                                        strokeDashoffset="-308"
                                        transform="rotate(-90 110 110)"
                                    />
                                    <circle
                                        cx="110"
                                        cy="110"
                                        r="70"
                                        fill="none"
                                        stroke="#f59e0b"
                                        strokeWidth="40"
                                        strokeDasharray="33 220"
                                        strokeDashoffset="-352"
                                        transform="rotate(-90 110 110)"
                                    />

                                    {/* Center circle */}
                                    <circle
                                        cx="110"
                                        cy="110"
                                        r="55"
                                        fill="#e0f2f1"
                                    />

                                    {/* Center text */}
                                    <text
                                        x="110"
                                        y="105"
                                        fontSize="14"
                                        fontWeight="600"
                                        fill="#000"
                                        textAnchor="middle"
                                    >
                                        Tepat Waktu
                                    </text>
                                    <text
                                        x="110"
                                        y="125"
                                        fontSize="20"
                                        fontWeight="bold"
                                        fill="#000"
                                        textAnchor="middle"
                                    >
                                        50%
                                    </text>
                                </svg>
                            </div>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <LegendItem
                                    color="bg-green-500"
                                    label="Hadir"
                                />
                                <LegendItem color="bg-red-500" label="Alpha" />
                                <LegendItem
                                    color="bg-yellow-400"
                                    label="Cuti"
                                />
                                <LegendItem
                                    color="bg-orange-500"
                                    label="Izin"
                                />
                                <LegendItem color="bg-blue-500" label="Sakit" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Reusable Components
function StatCard({
    iconColor,
    value,
    label,
    svg,
}: {
    iconColor: string;
    value: string;
    label: string;
    svg: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
            <div className="flex items-center space-x-4">
                <div className={`rounded-xl p-4 ${iconColor}`}>
                    <svg
                        className="h-7 w-7"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        {svg}
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800">
                        {value}
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    );
}

function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center space-x-2.5">
            <div className={`h-3 w-3 rounded-full ${color}`}></div>
            <span className="text-sm font-semibold text-slate-600">
                {label}
            </span>
        </div>
    );
}
