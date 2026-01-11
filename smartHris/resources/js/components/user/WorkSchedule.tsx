export default function WorkSchedule() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">Jadwal Masuk</h2>

      <div className="grid grid-cols-2 gap-6 text-center">
        <div>
          <p className="text-sm text-slate-500">Datang</p>
          <p className="text-2xl font-bold">08:00</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Pulang</p>
          <p className="text-2xl font-bold">17:00</p>
        </div>
      </div>
    </div>
  )
}
