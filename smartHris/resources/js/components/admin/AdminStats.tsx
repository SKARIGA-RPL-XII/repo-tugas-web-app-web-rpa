import StatCard from '@/components/StatCard'

type Stats = {
  total_karyawan: number
  hadir_hari_ini: number
  pengajuan_cuti: number
  sanksi_aktif: number
}

export default function AdminStats({ stats }: { stats: Stats }) {
  return (
    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Karyawan"
        value={`${stats.total_karyawan} Orang`}
        iconBg="bg-blue-50 text-blue-600"
        icon={<span>👥</span>}
      />
      <StatCard
        label="Hadir Hari Ini"
        value={`${stats.hadir_hari_ini} Karyawan`}
        iconBg="bg-green-50 text-green-600"
        icon={<span>✅</span>}
      />
      <StatCard
        label="Pengajuan Cuti"
        value={`${stats.pengajuan_cuti} Pengajuan`}
        iconBg="bg-orange-50 text-orange-600"
        icon={<span>📅</span>}
      />
      <StatCard
        label="Sanksi Aktif"
        value={`${stats.sanksi_aktif} Karyawan`}
        iconBg="bg-red-50 text-red-600"
        icon={<span>⚠️</span>}
      />
    </div>
  )
}
