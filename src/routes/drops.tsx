import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Clock, CheckCircle2 } from "lucide-react";
import { AppLayout } from "@/components/nautica/AppLayout";
import { GlowBlob } from "@/components/nautica/GlowBlob";
import { getDrops } from "@/lib/nautica.functions";

export const Route = createFileRoute("/drops")({
  head: () => ({
    meta: [
      { title: "Drops — Nautica" },
      { name: "description", content: "Live and upcoming NFT drops on Nautica. Curated editions from working artists." },
    ],
  }),
  component: DropsPage,
});

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: typeof Sparkles }> = {
  live: { label: "Live", className: "naut-badge-success", icon: Sparkles },
  upcoming: { label: "Upcoming", className: "naut-badge-warning", icon: Clock },
  ended: { label: "Ended", className: "", icon: CheckCircle2 },
};

function DropsPage() {
  const { data = [] } = useQuery({ queryKey: ["drops"], queryFn: () => getDrops() });

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wider">Minting</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-ink font-bold">Drops</h1>
        </div>
        <span className="naut-pill">
          <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.72_0.18_145)] animate-pulse" />
          {data.filter((d) => d.status === "live").length} live now
        </span>
      </div>

      {/* Drops list */}
      <div className="mt-6 grid gap-4">
        {data.map((d) => {
          const cfg = STATUS_CONFIG[d.status] ?? STATUS_CONFIG.ended;
          const progress = d.pieces > 0 ? (d.minted / d.pieces) * 100 : 0;
          const Icon = cfg.icon;

          return (
            <article key={d.id} className="naut-glass overflow-hidden relative group">
              <div className="flex flex-col sm:flex-row gap-0">
                {/* Cover */}
                <div className="relative sm:w-56 md:w-64 shrink-0 overflow-hidden">
                  <img
                    src={d.cover}
                    alt={d.title}
                    className="h-48 sm:h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {d.status === "live" && (
                    <GlowBlob color="oklch(0.72 0.18 145)" size={150} top="-40px" right="-40px" opacity={0.25} />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 p-5 md:p-6 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`naut-pill ${cfg.className}`}>
                        {d.status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                        <Icon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{d.startsAt}</span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-ink font-bold mt-2 leading-tight">{d.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">by {d.artist}</p>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Mint Price</p>
                      <p className="text-sm font-bold text-ink">{d.mintPrice} <span className="text-xs text-muted-foreground font-normal">ETH</span></p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Supply</p>
                      <p className="text-sm font-bold text-ink">{d.pieces}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Minted</p>
                      <p className="text-sm font-bold text-ink">{d.minted} / {d.pieces}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div>
                    <div className="h-1.5 rounded-full bg-[oklch(1_0_0/0.06)] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                          background: d.status === "live"
                            ? "linear-gradient(90deg, oklch(0.72 0.15 175), oklch(0.72 0.18 145))"
                            : d.status === "ended"
                            ? "oklch(0.5 0.02 260)"
                            : "oklch(0.80 0.14 80)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {d.status === "live" ? "Editions selling fast — mint now" : d.status === "upcoming" ? "Set a reminder" : "Sold out"}
                    </span>
                    <button className={
                      "naut-btn text-sm !py-2.5 " +
                      (d.status === "live" ? "naut-btn-primary" : d.status === "upcoming" ? "naut-btn-accent" : "naut-btn-secondary")
                    }>
                      {d.status === "live" ? "Mint Now" : d.status === "upcoming" ? "Remind Me" : "View"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </AppLayout>
  );
}
