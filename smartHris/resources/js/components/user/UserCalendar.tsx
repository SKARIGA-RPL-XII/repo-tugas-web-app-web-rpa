export default function UserCalendar() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">Kalender</h2>

      <div className="grid grid-cols-7 gap-3 text-center text-sm">
        {['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map(d => (
          <span key={d} className="font-semibold text-slate-500">{d}</span>
        ))}

        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            className={`rounded-full px-3 py-2 ${
              i + 1 === 25
                ? 'bg-emerald-700 text-white'
                : 'text-slate-700'
            }`}
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  )
}
