export default function MetricCard({ title, value, unit = "", subtext, trend, level }) {
  // Determine color based on risk level if provided
  let valueColor = "text-zinc-100";
  let borderColor = "border-charcoal-800/60";
  
  if (level) {
    if (level.includes("HIGH")) {
      valueColor = "text-red-400/90";
      borderColor = "border-red-900/30";
    } else if (level.includes("MODERATE")) {
      valueColor = "text-sandstone-400";
      borderColor = "border-sandstone-900/30";
    } else if (level.includes("LOW")) {
      valueColor = "text-emerald-400/80";
      borderColor = "border-emerald-900/30";
    }
  }

  return (
    <div className={`bg-charcoal-900/30 border ${borderColor} p-6 flex flex-col transition-colors duration-300`}>
      <h3 className="text-xs uppercase tracking-widest font-medium text-zinc-500 mb-4">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className={`text-4xl font-light font-serif ${valueColor}`}>
          {value}
        </span>
        {unit && <span className="text-sm font-light text-zinc-500">{unit}</span>}
      </div>
      {(subtext || trend) && (
        <div className="mt-4 pt-4 border-t border-charcoal-800/40 flex justify-between items-center">
          {subtext && <span className="text-xs text-zinc-400 font-light">{subtext}</span>}
          {trend && (
            <span className="text-xs tracking-wide text-sandstone-500 font-medium">
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
