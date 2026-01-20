type Data = {
  date: string
  value: number
}

type Props = {
  data: Data[]
}

const MAX_Y = 30
const HEIGHT = 200
const PADDING_LEFT = 50
const CHART_WIDTH = 450

const getY = (value: number) =>
  HEIGHT - (value / MAX_Y) * HEIGHT

export default function WeeklyAttendanceChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-slate-800">
          Rekap Absensi Mingguan
        </h2>
        <div className="flex h-64 items-center justify-center text-slate-500">
          Tidak ada data absensi untuk minggu ini
        </div>
      </div>
    )
  }

  const pointSpacing = CHART_WIDTH / (data.length - 1 || 1)

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-xl font-bold text-slate-800">
        Rekap Absensi Mingguan
      </h2>

      <svg width="100%" height="300" viewBox={`0 0 550 300`} className="overflow-visible">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#429375" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#429375" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line
          x1={PADDING_LEFT - 10}
          y1="20"
          x2={PADDING_LEFT - 10}
          y2={HEIGHT + 20}
          stroke="#cbd5e1"
          strokeWidth="2"
        />

        <line
          x1={PADDING_LEFT - 10}
          y1={HEIGHT + 20}
          x2={PADDING_LEFT + CHART_WIDTH + 10}
          y2={HEIGHT + 20}
          stroke="#cbd5e1"
          strokeWidth="2"
        />

        {[0, 5, 10, 15, 20, 25, 30].map((v) => (
          <g key={`y-${v}`}>
            <line
              x1={PADDING_LEFT - 15}
              x2={PADDING_LEFT + CHART_WIDTH + 10}
              y1={20 + getY(v)}
              y2={20 + getY(v)}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
            />
            <text
              x={PADDING_LEFT - 20}
              y={25 + getY(v)}
              textAnchor="end"
              fontSize="11"
              fill="#94a3b8"
            >
              {v}
            </text>
          </g>
        ))}

        {data.length > 0 && (
          <path
            fill="url(#areaGradient)"
            d={`
              M ${PADDING_LEFT + 0} ${20 + getY(data[0].value)}
              ${data.map((d, i) => `L ${PADDING_LEFT + i * pointSpacing} ${20 + getY(d.value)}`).join(' ')}
              L ${PADDING_LEFT + (data.length - 1) * pointSpacing} ${20 + HEIGHT}
              L ${PADDING_LEFT} ${20 + HEIGHT}
              Z
            `}
          />
        )}

        <polyline
          fill="none"
          stroke="#429375"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={data
            .map((d, i) => `${PADDING_LEFT + i * pointSpacing},${20 + getY(d.value)}`)
            .join(' ')}
        />

        {data.map((d, i) => (
          <g key={`point-${i}`}>
            <circle
              cx={PADDING_LEFT + i * pointSpacing}
              cy={20 + getY(d.value)}
              r="6"
              fill="white"
              stroke="#429375"
              strokeWidth="3"
            />
            <text
              x={PADDING_LEFT + i * pointSpacing}
              y={5 + getY(d.value)}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#429375"
            >
              {d.value}
            </text>
          </g>
        ))}

        {data.map((d, i) => (
          <text
            key={`date-${i}`}
            x={PADDING_LEFT + i * pointSpacing}
            y={HEIGHT + 45}
            textAnchor="middle"
            fontSize="12"
            fill="#64748b"
            fontWeight="500"
          >
            {d.date}
          </text>
        ))}
      </svg>
    </div>
  )
}
