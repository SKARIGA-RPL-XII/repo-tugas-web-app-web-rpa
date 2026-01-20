type AttendanceItem = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  data: AttendanceItem[];
};

export default function AttendanceDonut({ data }: Props) {

  const SIZE = 280;
  const CENTER = SIZE / 2;
  const RADIUS = 90;
  const STROKE_WIDTH = 35;
  const CIRC = 2 * Math.PI * RADIUS;

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const mainItem = data.find(d =>
    d.label.toLowerCase().includes('hadir') ||
    d.label.toLowerCase().includes('tepat')
  ) || data[0];

  const mainValue = mainItem?.value ?? 0;
  const percentage = totalValue > 0 ? Math.round((mainValue / totalValue) * 100) : 0;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-xl font-bold text-slate-800">
        Status Kehadiran Karyawan
      </h2>

      <div className="flex items-center justify-between gap-8">

        <div className="relative flex items-center justify-center shrink-0">
          <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="transform -rotate-90">
            <defs>
              <radialGradient id="auraGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d1fae5" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS - STROKE_WIDTH / 2 + 15}
              fill="url(#auraGradient)"
            />

            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke="#f0f0f0"
              strokeWidth={STROKE_WIDTH}
            />

            {data.map((item, index) => {
              const dash = totalValue > 0 ? (item.value / totalValue) * CIRC : 0;
              const offset = data
                .slice(0, index)
                .reduce((sum, d) => sum + (d.value / totalValue) * CIRC, 0);

              return (
                <circle
                  key={item.label}
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={STROKE_WIDTH}
                  strokeDasharray={`${dash} ${CIRC - dash}`}
                  strokeDashoffset={-offset}
                  className="transition-all duration-700 ease-out"
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-medium text-slate-600 mb-1">
              Tepat Waktu
            </span>
            <span className="text-3xl font-bold text-slate-800">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="h-4 w-4 rounded-full shrink-0"
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
    </div>
  );
}