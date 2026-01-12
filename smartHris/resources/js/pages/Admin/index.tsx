import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

/* ================= TYPES ================= */
interface AttendanceWeekly {
    date: string
    value: number
}

interface Props {
    totalKaryawan: number
    hadirHariIni: number
    pengajuanCuti: number
    sanksiAktif: number
    attendanceWeekly: AttendanceWeekly[]
    statusAbsensi: {
        hadir: number
        alpha: number
        izin: number
        sakit: number
        cuti: number
    }
}

export default function Dashboard({
    totalKaryawan,
    hadirHariIni,
    pengajuanCuti,
    sanksiAktif,
    attendanceWeekly,
    statusAbsensi,
}: Props) {

    const attendanceData = attendanceWeekly

    const totalStatus =
        statusAbsensi.hadir +
        statusAbsensi.alpha +
        statusAbsensi.izin +
        statusAbsensi.sakit +
        statusAbsensi.cuti

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
                            Berikut adalah ringkasan aktivitas absensi karyawan Anda.
                        </p>
                    </div>
                </div>

                {/* Stats Cards Section */}
                <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        value={`${totalKaryawan} Orang`}
                        label="Total Karyawan"
                        iconColor="bg-blue-50 text-blue-600"
                    />
                    <StatCard
                        value={`${hadirHariIni} Karyawan`}
                        label="Hadir Hari Ini"
                        iconColor="bg-green-50 text-green-600"
                    />
                    <StatCard
                        value={`${pengajuanCuti} Pengajuan`}
                        label="Pengajuan Cuti"
                        iconColor="bg-orange-50 text-orange-600"
                    />
                    <StatCard
                        value={`${sanksiAktif} Karyawan`}
                        label="Sanksi Aktif"
                        iconColor="bg-red-50 text-red-600"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Rekap Absensi Mingguan */}
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="mb-10 text-xl font-bold text-[#1E293B]">
                            Rekap Absensi Mingguan
                        </h2>

                        <svg width="100%" height="260" viewBox="0 0 500 260">
                            {[0, 5, 10, 15, 20, 25, 30].map((v, i) => (
                                <line
                                    key={i}
                                    x1="40"
                                    y1={220 - (v / 30) * 200}
                                    x2="480"
                                    y2={220 - (v / 30) * 200}
                                    stroke="#E2E8F0"
                                    strokeDasharray="4,4"
                                />
                            ))}

                            <polyline
                                fill="none"
                                stroke="#429375"
                                strokeWidth="3"
                                points={attendanceData
                                    .map(
                                        (d, i) =>
                                            `${60 + i * 60},${220 - (d.value / 30) * 200
                                            }`,
                                    )
                                    .join(' ')}
                            />

                            {attendanceData.map((d, i) => (
                                <circle
                                    key={i}
                                    cx={60 + i * 60}
                                    cy={220 - (d.value / 30) * 200}
                                    r="5"
                                    fill="#429375"
                                />
                            ))}

                            {attendanceData.map((d, i) => (
                                <text
                                    key={i}
                                    x={60 + i * 60}
                                    y="245"
                                    fontSize="12"
                                    fill="#64748B"
                                    textAnchor="middle"
                                >
                                    {d.date}
                                </text>
                            ))}
                        </svg>
                    </div>

                    {/* Status Kehadiran */}
                    <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                        <h2 className="mb-6 text-center text-xl font-bold text-gray-900 lg:text-left">
                            Status Kehadiran Karyawan
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <LegendItem color="bg-green-500" label={`Hadir (${statusAbsensi.hadir})`} />
                            <LegendItem color="bg-red-500" label={`Alpha (${statusAbsensi.alpha})`} />
                            <LegendItem color="bg-yellow-400" label={`Cuti (${statusAbsensi.cuti})`} />
                            <LegendItem color="bg-orange-500" label={`Izin (${statusAbsensi.izin})`} />
                            <LegendItem color="bg-blue-500" label={`Sakit (${statusAbsensi.sakit})`} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

/* ================= COMPONENT ================= */

function StatCard({
    iconColor,
    value,
    label,
}: {
    iconColor: string
    value: string
    label: string
}) {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center space-x-4">
                <div className={`rounded-xl p-4 ${iconColor}`} />
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
    )
}

function LegendItem({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center space-x-2.5">
            <div className={`h-3 w-3 rounded-full ${color}`} />
            <span className="text-sm font-semibold text-slate-600">
                {label}
            </span>
        </div>
    )
}
