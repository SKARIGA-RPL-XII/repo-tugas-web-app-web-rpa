import WeeklyAttendanceChart from '@/components/weekly-attendance-chart'
import AttendanceDonut from '@/components/attendance-donut'
import AdminStats from './AdminStats'
import ProfileMenu from '@/components/profile-menu';





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
  <div className="min-h-screen bg-[#EAF5F1]">
    
    {/* HEADER */}
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">
            Absensi Karyawan
          </h1>

          <ProfileMenu />
        </div>
      </div>
    </div>

    {/* CONTENT */}
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* isi halaman */}
        <AdminStats stats={safeStats} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <WeeklyAttendanceChart data={weeklyAttendance ?? []} />
          <AttendanceDonut data={attendanceStatus ?? []} />
        </div>
      </div>
    </div>

  </div>
)



}
