export default function TodayAttendance() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">Absen Hari Ini</h2>
        <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs text-white">
          Sabtu, 25 Desember 2026
        </span>
      </div>

      <div className="grid grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-sm text-slate-500">Status</p>
          <p className="text-xl font-bold">Hadir</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Datang</p>
          <p className="text-xl font-bold">07:57</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Pulang</p>
          <p className="text-xl font-bold">--:--</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Keterlambatan</p>
          <p className="text-xl font-bold">-</p>
        </div>
      </div>
    </div>
  )
}
