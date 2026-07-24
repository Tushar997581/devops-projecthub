interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
}

const StatsCard = ({ title, value, description }: StatsCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
};

export default StatsCard;
