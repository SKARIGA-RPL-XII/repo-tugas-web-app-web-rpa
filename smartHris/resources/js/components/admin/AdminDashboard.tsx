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
    <div className="min-h-screen bg-[#EAF5F1] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">
            Selamat Datang, Admin !
          </h1>
        <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <AdminStats stats={safeStats} />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-slate-200 p-4 sm:p-6">
              <WeeklyAttendanceChart data={weeklyAttendance ?? []} />
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 p-4 sm:p-6">
              <AttendanceDonut data={attendanceStatus ?? []} />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}