type UserSummary = {
  hadir: number
  terlambat: number
  cuti: number
  hariKerja: number
}

type Props = {
  summary?: UserSummary
}

export default function UserDashboard({ summary }: Props) {
  const s: UserSummary = summary ?? {
    hadir: 0,
    terlambat: 0,
    cuti: 0,
    hariKerja: 0,
  }

  return (
    <div className=" px-6 py-8">
      <div className="mb-8 rounded-3xl bg-linear-to-r from-[#0F4C3A] to-[#1B6B57] px-8 py-10 text-white">
        <h1 className="text-3xl font-bold">Hallo, Steve Harrington!</h1>
        <p className="opacity-90">Sabtu, 25 Desember 2026</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Jumlah Kehadiran</p>
          <h3 className="text-2xl font-bold text-slate-600">{s.hadir} Hadir</h3>
          <p className="text-sm text-slate-400">
            Dari {s.hariKerja} Hari Kerja
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Jumlah Keterlambatan</p>
          <h3 className="text-2xl font-bold text-slate-600">{s.terlambat} Kali</h3>
          <p className="text-sm text-slate-400">
            Dari {s.hariKerja} Hari Kerja
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500 ">Jumlah Cuti</p>
          <h3 className="text-2xl font-bold text-slate-600">{s.cuti} Hari</h3>
          <p className="text-sm text-slate-400">
            Dari {s.hariKerja} Hari Kerja
          </p>
        </div>
      </div>
    </div>
  )
}
