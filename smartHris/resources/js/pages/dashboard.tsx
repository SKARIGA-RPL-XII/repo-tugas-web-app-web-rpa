import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

import AdminDashboard from '@/components/admin/AdminDashboard'
import UserDashboard from '@/components/user/UserDashboard'

type PageProps = {
  auth: {
    user: {
      id: number
      name: string
      email: string
      role: 'admin' | 'user'
    } | null
  }
  role: 'admin' | 'user'

  totalKaryawan?: number
  hadirHariIni?: number
  pengajuanCuti?: number
  sanksiAktif?: number
  attendanceWeekly?: Array<{ date: string; value: number }>
  statusAbsensi?: {
    hadir: number
    alpha: number
    izin: number
    sakit: number
    cuti: number
  }

  user?: { name: string }
  statistik?: {
    hadir: { total: number; hariKerja: number }
    terlambat: { total: number; hariKerja: number }
    cuti: { total: number; hariKerja: number }
  }
  grafikKehadiran?: Array<{ bulan: string; value: number }>
  absenHariIni?: {
    status: string
    jamMasuk: string
    jamPulang: string | null
    keterlambatan: number | null
    tanggal: string
  } | null
  jadwalKerja?: { datang: string; pulang: string }
  tanggalHariIni?: string
  bulanAktif?: string
  tanggalAktif?: number
}

export default function Dashboard(props: PageProps) {
  const { role, totalKaryawan, hadirHariIni, pengajuanCuti, sanksiAktif, attendanceWeekly, statusAbsensi, statistik } = props;

  const isAdmin = role === 'admin';

  const adminStats = {
    total_karyawan: totalKaryawan ?? 0,
    hadir_hari_ini: hadirHariIni ?? 0,
    pengajuan_cuti: pengajuanCuti ?? 0,
    sanksi_aktif: sanksiAktif ?? 0,
  };

  const attendanceStatusData = statusAbsensi ? [
    { label: 'Hadir', value: statusAbsensi.hadir, color: '#10b981' },
    { label: 'Alpha', value: statusAbsensi.alpha, color: '#ef4444' },
    { label: 'Izin', value: statusAbsensi.izin, color: '#f59e0b' },
    { label: 'Sakit', value: statusAbsensi.sakit, color: '#3b82f6' },
    { label: 'Cuti', value: statusAbsensi.cuti, color: '#8b5cf6' },
  ] : [];

  const userSummaryData = statistik ? {
    hadir: statistik.hadir.total,
    terlambat: statistik.terlambat.total,
    cuti: statistik.cuti.total,
    hariKerja: statistik.hadir.hariKerja,
  } : {
    hadir: 0,
    terlambat: 0,
    cuti: 0,
    hariKerja: 0,
  };

  return (
    <AppLayout>
      <Head title="Dashboard" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

          {isAdmin ? (
            <AdminDashboard
              stats={adminStats}
              weeklyAttendance={attendanceWeekly ?? []}
              attendanceStatus={attendanceStatusData}
            />
          ) : (
            <UserDashboard
              summary={userSummaryData}
            />
          )}

        </div>
      </div>
    </AppLayout>
  )
}
