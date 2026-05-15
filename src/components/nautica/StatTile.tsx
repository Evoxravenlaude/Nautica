import type { ReactNode } from "react";

/** Gradient stat tile — inspired by Veri health app cards */
export function StatTile({
  label,
  value,
  unit,
  gradient,
  children,
}: {
  label: string;
  value: string | number;
  unit?: string;
  gradient?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="naut-stat-tile relative overflow-hidden"
      style={{
        background: gradient || "oklch(1 0 0 / 0.04)",
        color: gradient ? "oklch(0.97 0 0)" : "var(--color-ink)",
      }}
    >
      <p className="text-[10px] uppercase tracking-wider opacity-70 font-medium">{label}</p>
      <p className="font-display text-2xl md:text-3xl font-bold leading-none mt-1.5">
        {value}
        {unit && <span className="text-xs ml-1 opacity-60 font-normal">{unit}</span>}
      </p>
      {children}
    </div>
  );
}
