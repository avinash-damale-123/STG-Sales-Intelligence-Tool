interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: string;
}

export function KpiCard({ title, value, subtitle, trend }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-950">{value}</h3>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>
        {trend ? (
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {trend}
          </span>
        ) : null}
      </div>
    </div>
  );
}
