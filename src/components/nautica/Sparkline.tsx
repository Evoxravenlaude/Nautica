/** Tiny SVG sparkline — no dependencies */
export function Sparkline({
  data,
  positive = true,
  width = 120,
  height = 32,
}: {
  data: number[];
  positive?: boolean;
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const lineColor = positive ? "oklch(0.72 0.18 145)" : "oklch(0.62 0.22 25)";
  const gradId = `spark-${positive ? "up" : "down"}-${Math.random().toString(36).slice(2, 6)}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Fill area */}
      <polygon
        points={`${padding},${height} ${points.join(" ")} ${width - padding},${height}`}
        fill={`url(#${gradId})`}
      />
      {/* Line */}
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      <circle
        cx={points[points.length - 1].split(",")[0]}
        cy={points[points.length - 1].split(",")[1]}
        r="2"
        fill={lineColor}
      />
    </svg>
  );
}
