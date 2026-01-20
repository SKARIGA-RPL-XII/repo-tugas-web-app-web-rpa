import StatCard from '@/components/stat-card'

type Stats = {
  total_karyawan: number
  hadir_hari_ini: number
  pengajuan_cuti: number
  sanksi_aktif: number
}

export default function AdminStats({ stats }: { stats: Stats }) {
  const iconClass = "h-6 w-6 object-contain"

  return (
    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Karyawan"
        value={`${stats.total_karyawan} Orang`}
        iconBg="bg-blue-50"
        icon={
          <img 
            src="/people.png" 
            alt="Total Karyawan" 
            className={iconClass} 
          />
        }
      />
      <StatCard
        label="Hadir Hari Ini"
        value={`${stats.hadir_hari_ini} Karyawan`}
        iconBg="bg-green-50"
        icon={
          <img 
            src="/time.png" 
            alt="Hadir Hari Ini" 
            className={iconClass} 
          />
        }
      />
      <StatCard
        label="Pengajuan Cuti"
        value={`${stats.pengajuan_cuti} Pengajuan`}
        iconBg="bg-orange-50"
        icon={
          <img 
            src="/calendar.png" 
            alt="Pengajuan Cuti" 
            className={iconClass} 
          />
        }
      />
      <StatCard
        label="Sanksi Aktif"
        value={`${stats.sanksi_aktif} Karyawan`}
        iconBg="bg-red-50"
        icon={
          <img 
            src="/sanksi.png" 
            alt="Sanksi Aktif" 
            className={iconClass} 
          />
        }
      />
    </div>
  )
}