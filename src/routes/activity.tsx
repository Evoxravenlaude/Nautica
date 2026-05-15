import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, Sparkles, Send, ArrowRightLeft, Tag, ShieldCheck } from "lucide-react";
import { AppLayout } from "@/components/nautica/AppLayout";
import { StatTile } from "@/components/nautica/StatTile";
import { getActivity } from "@/lib/nautica.functions";
import type { Activity } from "@/lib/mock-data";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Activity — Nautica" },
      { name: "description", content: "Your Nautica activity: collected pieces, trades, private payments, and proof status." },
    ],
  }),
  component: ActivityPage,
});

const ICONS: Record<Activity["kind"], typeof ShoppingBag> = {
  sale: ShoppingBag,
  listing: Tag,
  offer: ArrowUpRight,
  transfer: ArrowRightLeft,
  mint: Sparkles,
  send: ArrowUpRight,
  receive: ArrowDownLeft,
};

const KIND_LABELS: Record<Activity["kind"], string> = {
  sale: "Sale",
  listing: "Listed",
  offer: "Offer",
  transfer: "Transfer",
  mint: "Mint",
  send: "Sent",
  receive: "Received",
};

const KIND_COLORS: Record<Activity["kind"], string> = {
  sale: "oklch(0.72 0.18 145)",
  listing: "oklch(0.80 0.14 80)",
  offer: "oklch(0.72 0.15 175)",
  transfer: "oklch(0.65 0.10 260)",
  mint: "oklch(0.75 0.14 330)",
  send: "oklch(0.62 0.22 25)",
  receive: "oklch(0.72 0.18 145)",
};

function ActivityPage() {
  const { data = [] } = useQuery({ queryKey: ["activity"], queryFn: () => getActivity() });

  const sales = data.filter(a => a.kind === "sale");
  const totalSaleVolume = sales.reduce((s, a) => s + a.amount, 0);
  const verifiedCount = data.filter(a => a.proof === "verified").length;

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wider">Transaction log</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-ink font-bold">Activity</h1>
        </div>
        <span className="naut-pill">{data.length} events</span>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile
          label="Sales Volume"
          value={totalSaleVolume.toFixed(2)}
          unit="ETH"
          gradient="linear-gradient(135deg, oklch(0.22 0.05 145), oklch(0.16 0.03 160))"
        />
        <StatTile
          label="Transactions"
          value={data.length}
          gradient="linear-gradient(135deg, oklch(0.20 0.04 260), oklch(0.15 0.03 280))"
        />
        <StatTile
          label="ZK Verified"
          value={verifiedCount}
          unit={`/ ${data.length}`}
          gradient="linear-gradient(135deg, oklch(0.20 0.04 175), oklch(0.15 0.03 200))"
        />
        <StatTile
          label="Private Sends"
          value={data.filter(a => a.kind === "send").length}
          gradient="linear-gradient(135deg, oklch(0.20 0.04 330), oklch(0.15 0.03 350))"
        />
      </div>

      {/* Activity list */}
      <div className="mt-6 naut-glass overflow-hidden">
        <div className="divide-y divide-[oklch(1_0_0/0.05)]">
          {data.map((a) => {
            const Icon = ICONS[a.kind];
            const color = KIND_COLORS[a.kind];
            return (
              <div key={a.id} className="naut-table-row gap-4 group">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl grid place-items-center shrink-0"
                  style={{ background: `color-mix(in oklch, ${color} 15%, transparent)` }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color }} />
                </div>

                {/* Token image (if exists) */}
                {a.tokenImage && (
                  <div
                    className="w-10 h-10 rounded-lg shrink-0 hidden sm:block"
                    style={{ backgroundImage: a.tokenImage }}
                  />
                )}

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-ink truncate">{a.title}</p>
                    <span className="naut-pill text-[10px] !py-0.5" style={{ background: `color-mix(in oklch, ${color} 12%, transparent)`, color, borderColor: `color-mix(in oklch, ${color} 20%, transparent)` }}>
                      {KIND_LABELS[a.kind]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {a.collection && <span className="text-xs text-muted-foreground">{a.collection}</span>}
                    <span className="text-xs text-muted-foreground">· {a.at}</span>
                    {a.proof === "verified" && (
                      <span className="naut-pill naut-badge-primary text-[10px] !py-0">
                        <ShieldCheck className="w-2.5 h-2.5" /> ZK
                      </span>
                    )}
                    {a.proof === "pending" && (
                      <span className="naut-pill naut-badge-warning text-[10px] !py-0">proving…</span>
                    )}
                  </div>
                </div>

                {/* Amount */}
                {a.amount > 0 && (
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-ink">
                      {a.kind === "send" ? "−" : a.kind === "receive" ? "+" : ""}{a.amount}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{a.currency}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
