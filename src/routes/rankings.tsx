import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Trophy, BadgeCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AppLayout } from "@/components/nautica/AppLayout";
import { Sparkline } from "@/components/nautica/Sparkline";
import { getCollections, getSparklines } from "@/lib/nautica.functions";

const TIME_RANGES = ["24h", "7d", "30d", "All"] as const;

export const Route = createFileRoute("/rankings")({
  head: () => ({
    meta: [
      { title: "Rankings — Nautica" },
      { name: "description", content: "Top NFT collections ranked by volume, floor price, and growth on Nautica." },
    ],
  }),
  component: RankingsPage,
});

function RankingsPage() {
  const [range, setRange] = useState<(typeof TIME_RANGES)[number]>("24h");

  const { data: collections = [] } = useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });

  const { data: sparklines = {} } = useQuery({
    queryKey: ["sparklines"],
    queryFn: () => getSparklines(),
  });

  const sorted = [...collections].sort((a, b) => b.totalVolume - a.totalVolume);

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wider">Leaderboard</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-ink font-bold">Rankings</h1>
        </div>
        <div className="flex gap-1 bg-[oklch(1_0_0/0.04)] rounded-full p-1 border border-[oklch(1_0_0/0.06)]">
          {TIME_RANGES.map((t) => (
            <button
              key={t}
              onClick={() => setRange(t)}
              className={
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all " +
                (range === t
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 naut-glass overflow-hidden">
        {/* Header row */}
        <div className="hidden md:flex items-center px-5 py-3 border-b border-[oklch(1_0_0/0.05)] text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
          <span className="w-10">#</span>
          <span className="flex-1">Collection</span>
          <span className="w-24 text-right">Floor</span>
          <span className="w-24 text-right">Volume</span>
          <span className="w-20 text-right">Change</span>
          <span className="w-16 text-right">Items</span>
          <span className="w-20 text-right">Owners</span>
          <span className="w-28 text-right">7d Trend</span>
        </div>

        {/* Rows */}
        {sorted.map((c, i) => {
          const isPos = c.change24h >= 0;
          const spark = sparklines[c.slug] ?? [];
          return (
            <Link
              key={c.slug}
              to="/collection/$slug"
              params={{ slug: c.slug }}
              className="naut-table-row gap-3 hover:bg-[oklch(1_0_0/0.04)] cursor-pointer"
            >
              {/* Rank */}
              <span className={
                "w-10 text-sm font-bold shrink-0 " +
                (i === 0 ? "text-[oklch(0.85_0.14_80)]" : i === 1 ? "text-[oklch(0.70_0.04_260)]" : i === 2 ? "text-[oklch(0.65_0.10_50)]" : "text-muted-foreground")
              }>
                {i + 1}
              </span>

              {/* Collection */}
              <div className="flex-1 flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl shrink-0 overflow-hidden">
                  <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-ink truncate">{c.name}</p>
                    {c.verified && <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground md:hidden">
                    {c.floorPrice} ETH · {c.totalVolume.toFixed(0)} ETH vol
                  </p>
                </div>
              </div>

              {/* Floor */}
              <span className="hidden md:block w-24 text-right text-sm text-ink font-medium">
                {c.floorPrice} <span className="text-xs text-muted-foreground">ETH</span>
              </span>

              {/* Volume */}
              <span className="hidden md:block w-24 text-right text-sm text-ink font-medium">
                {c.totalVolume.toFixed(1)}
              </span>

              {/* Change */}
              <span className={
                "w-20 text-right text-sm font-semibold flex items-center justify-end gap-0.5 " +
                (isPos ? "text-[oklch(0.72_0.18_145)]" : "text-[oklch(0.62_0.22_25)]")
              }>
                {isPos ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(c.change24h)}%
              </span>

              {/* Items */}
              <span className="hidden md:block w-16 text-right text-sm text-muted-foreground">
                {c.items.toLocaleString()}
              </span>

              {/* Owners */}
              <span className="hidden md:block w-20 text-right text-sm text-muted-foreground">
                {c.owners.toLocaleString()}
              </span>

              {/* Sparkline */}
              <div className="hidden md:block w-28 h-6 pl-4">
                {spark.length > 0 && <Sparkline data={spark} positive={isPos} width={100} height={24} />}
              </div>
            </Link>
          );
        })}
      </div>
    </AppLayout>
  );
}
