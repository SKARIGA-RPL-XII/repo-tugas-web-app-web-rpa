import AppLayout from '@/layouts/app-layout'
import { Head, usePage } from '@inertiajs/react'

import AdminDashboard from '@/components/admin/AdminDashboard'
import UserDashboard from '@/components/user/UserDashboard'

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

type UserSummary = {
  hadir: number
  terlambat: number
  cuti: number
  hariKerja: number
}

type PageProps = {
  role?: 'admin' | 'user'
  stats?: Stats
  weeklyAttendance?: WeeklyAttendance[]
  attendanceStatus?: AttendanceStatus[]
  userSummary?: UserSummary
}



export default function Dashboard() {
  const {
    role,
    stats,
    weeklyAttendance,
    attendanceStatus,
    userSummary,
  } = usePage<PageProps>().props

  const currentRole = role ?? 'user'

  return (
    <AppLayout>
      <Head title="Dashboard" />

      {currentRole === 'admin' && (
        <AdminDashboard
          stats={stats}
          weeklyAttendance={weeklyAttendance}
          attendanceStatus={attendanceStatus}
        />
      )}

      {currentRole === 'user' && (
        <UserDashboard summary={userSummary} />
      )}
    </AppLayout>
  )
}
