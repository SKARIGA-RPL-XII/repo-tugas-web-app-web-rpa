type AttendanceItem = {
  label: string
  value: number
  color: string
}

type Props = {
  data: AttendanceItem[]
}

export default function AttendanceDonut({ data }: Props) {
  const RADIUS = 70
  const CIRC = 2 * Math.PI * RADIUS

  const circles = data.map((item, index) => {
    const offset = data
      .slice(0, index)
      .reduce((sum, d) => sum + (d.value / 100) * CIRC, 0)

    const dash = (item.value / 100) * CIRC

    return (
      <circle
        key={item.label}
        cx="110"
        cy="110"
        r={RADIUS}
        fill="none"
        stroke={item.color}
        strokeWidth="40"
        strokeDasharray={`${dash} ${CIRC}`}
        strokeDashoffset={-offset}
        transform="rotate(-90 110 110)"
      />
    )
  })

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Status Kehadiran Karyawan
      </h2>

      <div className="flex items-center gap-10">
        <svg width="220" height="220" viewBox="0 0 220 220">
          {circles}

          <circle cx="110" cy="110" r="55" fill="#e0f2f1" />

          <text
            x="110"
            y="105"
            textAnchor="middle"
            fontSize="14"
            fill="#0f172a"
          >
            Hadir
          </text>
          <text
            x="110"
            y="130"
            textAnchor="middle"
            fontSize="22"
            fontWeight="bold"
            fill="#0f172a"
          >
            {data[0]?.value ?? 0}%
          </text>
        </svg>

        <div className="grid grid-cols-2 gap-3">
          {data.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-slate-600">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
