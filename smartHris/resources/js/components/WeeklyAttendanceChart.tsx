type Data = {
  date: string
  value: number
}

type Props = {
  data: Data[]
}

const MAX_Y = 30
const HEIGHT = 200

const getY = (value: number) =>
  HEIGHT - (value / MAX_Y) * HEIGHT

export default function WeeklyAttendanceChart({ data }: Props) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-800">
        Rekap Absensi Mingguan
      </h2>

      <svg width="100%" height="260" viewBox="0 0 500 260">
        {[0, 5, 10, 15, 20, 25, 30].map((v, i) => (
          <line
            key={i}
            x1="40"
            x2="480"
            y1={getY(v)}
            y2={getY(v)}
            stroke="#E2E8F0"
            strokeDasharray="4 4"
          />
        ))}

        <polyline
          fill="none"
          stroke="#429375"
          strokeWidth="3"
          points={data
            .map((d, i) => `${60 + i * 60},${getY(d.value)}`)
            .join(' ')}
        />

        {data.map((d, i) => (
          <circle
            key={i}
            cx={60 + i * 60}
            cy={getY(d.value)}
            r="5"
            fill="white"
            stroke="#429375"
            strokeWidth="2"
          />
        ))}

        {data.map((d, i) => (
          <text
            key={i}
            x={60 + i * 60}
            y="240"
            textAnchor="middle"
            fontSize="12"
            fill="#64748B"
          >
            {d.date}
          </text>
        ))}
      </svg>
    </div>
  )
}
