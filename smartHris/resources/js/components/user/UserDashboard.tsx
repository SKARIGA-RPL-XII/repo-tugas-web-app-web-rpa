import { UserCheck, AlertCircle, CalendarX } from 'lucide-react'
import StatsInfoCard from '@/components/stats-info-card'
import CalendarWidget from '@/components/calendar-widget'
import AttendanceChart from '@/components/attendance-chart'
import DailyAttendance from '@/components/daily-attendance'

type AbsenData = {
    status: string
    jamMasuk: string
    jamPulang: string | null
    keterlambatan: string | number | null
    tanggal?: string
}

type StatistikItem = {
    total: number
    hariKerja: number
}

type ChartData = {
    name: string
    value: number
}

type Props = {
    statistik?: {
        hadir: StatistikItem
        terlambat: StatistikItem
        cuti: StatistikItem
    }
    grafikKehadiran?: ChartData[]
    absenHariIni?: AbsenData | null
    jadwalKerja?: {
        jamDatang: string
        jamPulang: string
    }

}

export default function UserDashboard({ statistik, grafikKehadiran, absenHariIni, jadwalKerja }: Props) {
    const stats = statistik || {
        hadir: { total: 0, hariKerja: 0 },
        terlambat: { total: 0, hariKerja: 0 },
        cuti: { total: 0, hariKerja: 0 },
    }

    const chartData = grafikKehadiran || []

    return (
        <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-350">

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                    <StatsInfoCard
                        title="Jumlah Kehadiran"
                        value={stats.hadir.total}
                        valueLabel="Hadir"
                        subtitle={`Dari ${stats.hadir.hariKerja} Hari Kerja`}
                        icon={<UserCheck size={20} strokeWidth={2.5} />}
                    />
                    <StatsInfoCard
                        title="Jumlah Keterlambatan"
                        value={stats.terlambat.total}
                        valueLabel="Kali"
                        subtitle={`Dari ${stats.terlambat.hariKerja} Hari Kerja`}
                        icon={<AlertCircle size={20} strokeWidth={2.5} />}
                    />
                    <StatsInfoCard
                        title="Jumlah Cuti"
                        value={stats.cuti.total}
                        valueLabel="Hari"
                        subtitle={`Dari ${stats.cuti.hariKerja} Hari Kerja`}
                        icon={<CalendarX size={20} strokeWidth={2.5} />}
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start mb-8">
                    <div className="lg:col-span-2 h-105 rounded-xl border border-slate-100 bg-white shadow-sm p-6">
                        <AttendanceChart data={chartData} />
                    </div>

                    <div className="h-105 rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden flex flex-col">
                        <CalendarWidget />
                    </div>
                </div>

                <div className="mt-8">
                    <DailyAttendance
                        absen={absenHariIni}
                        jadwal={jadwalKerja}
                        tanggal={absenHariIni?.tanggal}
                    />
                </div>

            </div>
        </div>
    )
}