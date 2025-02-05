export default function Card({
  children,
  rowSpan,
  title,
}: {
  children: React.ReactNode;
  rowSpan: string;
  title: string;
}) {
  return (
    <div className={`bg-slate-900/50 ${rowSpan} rounded-xl shadow border-slate-400/50 border-2`}>
      <div className="opacity-100 text-4xl mx-6 mt-6 mb-4">{title}</div>
      <div className="mx-6">{children}</div>
    </div>
  );
}
