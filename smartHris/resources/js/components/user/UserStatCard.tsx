type Props = {
  title: string
  value: string
  sub: string
}

export default function UserStatCard({ title, value, sub }: Props) {
  return (
    <div className="relative rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-slate-700">{title}</p>
        <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
          Desember
        </span>
      </div>

      <h3 className="text-2xl font-bold text-slate-700">{value}</h3>
      <p className="mt-1 text-sm text-slate-500">{sub}</p>
    </div>
  )
}
