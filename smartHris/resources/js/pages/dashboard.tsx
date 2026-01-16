import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

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

export default function Dashboard(props: PageProps) {
  const { auth, stats, weeklyAttendance, attendanceStatus, userSummary } = props;

  const userRole = auth.user?.role || 'user'; 
  const isAdmin = userRole === 'admin';

  return (
    <AppLayout>
      <Head title="Dashboard" />
      
      <div className="py-6"> 
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            
          {isAdmin ? (
            <AdminDashboard
              stats={stats ?? { 
                 total_karyawan: 0, hadir_hari_ini: 0, pengajuan_cuti: 0, sanksi_aktif: 0 
              }}
              weeklyAttendance={weeklyAttendance ?? []}
              attendanceStatus={attendanceStatus ?? []}
            />
          ) : (
            <UserDashboard 
              summary={userSummary ?? {
                 hadir: 0, terlambat: 0, cuti: 0, hariKerja: 0
              }} 
            />
          )}

        </div>
      </div>
    </AppLayout>
  )
}