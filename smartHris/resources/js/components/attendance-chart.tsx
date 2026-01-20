import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type ChartData = {
  name: string
  value: number
}

type Props = {
  data: ChartData[]
}

export default function AttendanceChart({ data }: Props) {
  const chartData = Array.isArray(data) ? data : []

  return (
    <div className="flex h-full w-full flex-col">
      <h3 className="mb-4 text-xl font-bold text-slate-900 shrink-0">
        Data Kehadiran
      </h3>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={true} 
                horizontal={true}
                stroke="#E2E8F0" 
            />

            <XAxis 
                dataKey="name" 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: '#64748b' }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: '#1e293b'
              }}
              cursor={{ stroke: '#06b6d4', strokeWidth: 1, strokeDasharray: '4 4' }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              activeDot={{ r: 6, strokeWidth: 0, fill: '#06b6d4' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}