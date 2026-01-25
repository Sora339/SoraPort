export default function Footer() {
  const year = new Date().getFullYear().toString()
  return (
    <div className="h-16 mr-[5%] text-foreground flex flex-row items-center justify-end mt-auto">
      <div>© {year}<span className="font-bold text-2xl"> SoraPort </span>All Rights Reserved.</div>
    </div>
  );
}
