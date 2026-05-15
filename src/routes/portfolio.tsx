import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AppLayout } from "@/components/nautica/AppLayout";
import { StatTile } from "@/components/nautica/StatTile";
import { NFTCardCompact } from "@/components/nautica/NFTCard";
import { getPortfolio, getItems } from "@/lib/nautica.functions";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Nautica" },
      { name: "description", content: "Track your NFT portfolio performance, P&L, and collection value on Nautica." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { data: portfolio = [] } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolio(),
  });

  const { data: allItems = [] } = useQuery({
    queryKey: ["items-all"],
    queryFn: () => getItems({ data: {} }),
  });

  const totalValue = portfolio.reduce((s, p) => s + p.currentValue, 0);
  const totalCost = portfolio.reduce((s, p) => s + p.purchasePrice, 0);
  const totalPnl = totalValue - totalCost;
  const totalPnlPercent = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

  // Get owned items' full data
  const ownedItems = allItems.filter((i) => portfolio.some((p) => p.id === i.id));

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Wallet className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wider">Your collection</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-ink font-bold">Portfolio</h1>
        </div>
        <span className="naut-pill">{portfolio.length} items owned</span>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile
          label="Portfolio Value"
          value={totalValue.toFixed(2)}
          unit="ETH"
          gradient="linear-gradient(135deg, oklch(0.22 0.05 175), oklch(0.16 0.03 200))"
        />
        <StatTile
          label="Total Cost"
          value={totalCost.toFixed(2)}
          unit="ETH"
          gradient="linear-gradient(135deg, oklch(0.20 0.04 260), oklch(0.15 0.03 280))"
        />
        <StatTile
          label="Total P&L"
          value={`${totalPnl >= 0 ? "+" : ""}${totalPnl.toFixed(2)}`}
          unit="ETH"
          gradient={totalPnl >= 0
            ? "linear-gradient(135deg, oklch(0.22 0.06 145), oklch(0.16 0.04 160))"
            : "linear-gradient(135deg, oklch(0.22 0.06 25), oklch(0.16 0.04 10))"}
        >
          <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${totalPnl >= 0 ? "text-[oklch(0.72_0.18_145)]" : "text-[oklch(0.62_0.22_25)]"}`}>
            {totalPnl >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(totalPnlPercent).toFixed(1)}%
          </div>
        </StatTile>
        <StatTile
          label="Unrealized Gains"
          value={portfolio.filter(p => p.pnl > 0).length.toString()}
          unit={`/ ${portfolio.length}`}
          gradient="linear-gradient(135deg, oklch(0.20 0.04 80), oklch(0.15 0.03 60))"
        />
      </div>

      {/* Holdings table */}
      <div className="mt-6 naut-glass overflow-hidden">
        <div className="px-5 py-3 border-b border-[oklch(1_0_0/0.05)]">
          <h2 className="font-display text-lg text-ink font-semibold">Holdings</h2>
        </div>
        <div className="divide-y divide-[oklch(1_0_0/0.05)]">
          {portfolio.map((p) => {
            const isPos = p.pnl >= 0;
            return (
              <div key={p.id} className="naut-table-row gap-4">
                {/* Thumbnail */}
                <div
                  className="w-12 h-12 rounded-xl shrink-0"
                  style={{ backgroundImage: p.cover }}
                />
                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.collection}</p>
                </div>
                {/* Purchase */}
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-muted-foreground uppercase">Cost</p>
                  <p className="text-sm text-ink">{p.purchasePrice} ETH</p>
                </div>
                {/* Current */}
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase">Value</p>
                  <p className="text-sm font-semibold text-ink">{p.currentValue} ETH</p>
                </div>
                {/* P&L */}
                <div className="text-right min-w-[70px]">
                  <p className="text-[10px] text-muted-foreground uppercase">P&L</p>
                  <p className={`text-sm font-semibold ${isPos ? "text-[oklch(0.72_0.18_145)]" : "text-[oklch(0.62_0.22_25)]"}`}>
                    {isPos ? "+" : ""}{p.pnl.toFixed(2)}
                  </p>
                  <p className={`text-[10px] ${isPos ? "text-[oklch(0.72_0.18_145)]" : "text-[oklch(0.62_0.22_25)]"}`}>
                    {isPos ? "+" : ""}{p.pnlPercent.toFixed(1)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual grid of owned items */}
      <div className="mt-6">
        <h2 className="font-display text-lg text-ink font-semibold mb-4">Your NFTs</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {ownedItems.map((item) => (
            <NFTCardCompact key={item.id} item={item} />
          ))}
          {ownedItems.length === 0 && portfolio.map((p) => (
            <div key={p.id} className="naut-glass overflow-hidden">
              <div className="aspect-square w-full" style={{ backgroundImage: p.cover }} />
              <div className="p-2.5">
                <p className="text-xs font-medium text-ink truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.currentValue} ETH</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
