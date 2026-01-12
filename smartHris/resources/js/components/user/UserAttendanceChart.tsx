type Props = {
  data: number[]
}

export default function UserAttendanceChart({ data }: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">Data Kehadiran</h2>

      <svg viewBox="0 0 300 120" className="w-full">
        <polyline
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2"
          points={data.map((v, i) => `${i * 25},${120 - v}`).join(' ')}
        />
      </svg>
    </div>
  )
}
