import WeeklyAttendanceChart from '@/components/weekly-attendance-chart'
import AttendanceDonut from '@/components/attendance-donut'
import AdminStats from './AdminStats'

type Stats = {
  total_karyawan: number
  hadir_hari_ini: number
  pengajuan_cuti: number
  sanksi_aktif: number
}

type WeeklyAttendance = {
  date: string
  value: number
}

type AttendanceStatus = {
  label: string
  value: number
  color: string
}

type Props = {
  stats?: Stats
  weeklyAttendance?: WeeklyAttendance[]
  attendanceStatus?: AttendanceStatus[]
}

export default function AdminDashboard({
  stats,
  weeklyAttendance,
  attendanceStatus,
}: Props) {
  const safeStats: Stats = stats ?? {
    total_karyawan: 0,
    hadir_hari_ini: 0,
    pengajuan_cuti: 0,
    sanksi_aktif: 0,
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6 py-8">
      <h1 className="mb-10 text-3xl font-bold text-slate-800">
        Selamat Datang, Admin
      </h1>

      <AdminStats stats={safeStats} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <WeeklyAttendanceChart data={weeklyAttendance ?? []} />
        <AttendanceDonut data={attendanceStatus ?? []} />
      </div>
    </div>
  )
}
