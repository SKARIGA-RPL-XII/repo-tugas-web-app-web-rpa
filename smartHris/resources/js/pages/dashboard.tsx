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
  auth: {
    user: {
      id: number
      name: string
      email: string
      role: 'admin' | 'user'
    } | null
  }
  stats?: Stats
  weeklyAttendance?: WeeklyAttendance[]
  attendanceStatus?: AttendanceStatus[]
  userSummary?: UserSummary
}

export default function Dashboard() {
  const {
    auth,
    stats,
    weeklyAttendance,
    attendanceStatus,
    userSummary,
  } = usePage<PageProps>().props

  const isAdmin = auth.user?.role === 'admin'

  return (
    <AppLayout>
      <Head title="Dashboard" />

      {isAdmin ? (
        <AdminDashboard
          stats={stats}
          weeklyAttendance={weeklyAttendance}
          attendanceStatus={attendanceStatus}
        />
      ) : (
        <UserDashboard summary={userSummary} />
      )}
    </AppLayout>
  )
}
