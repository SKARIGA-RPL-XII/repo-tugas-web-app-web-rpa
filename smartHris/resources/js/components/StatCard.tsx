type Props = {
  label: string
  value: string
  icon: React.ReactNode
  iconBg: string
}

export default function StatCard({ label, value, icon, iconBg }: Props) {
  return (
    <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${iconBg}`}
      >
        {icon}
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-800">{value}</h3>
        <p className="text-sm font-medium text-slate-500">{label}</p>
      </div>
    </div>
  )
}
