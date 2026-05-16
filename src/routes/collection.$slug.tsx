import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, ExternalLink, Search, SlidersHorizontal, Grid3X3, BarChart3 } from "lucide-react";
import { AppLayout } from "@/components/nautica/AppLayout";
import { NFTCard } from "@/components/nautica/NFTCard";
import { StatTile } from "@/components/nautica/StatTile";
import { Sparkline } from "@/components/nautica/Sparkline";
import { getCollection, getItems } from "@/lib/nautica.functions";
import { MOCK_SPARKLINES } from "@/lib/mock-data";

export const Route = createFileRoute("/collection/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Collection — Nautica` },
      { name: "description", content: "Browse NFTs in this collection on Nautica." },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = useParams({ from: "/collection/$slug" });
  const [tab, setTab] = useState<"items" | "activity" | "analytics">("items");
  const [q, setQ] = useState("");

  const { data: collection } = useQuery({
    queryKey: ["collection", slug],
    queryFn: () => getCollection({ data: { slug } }),
  });

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items", slug],
    queryFn: () => getItems({ data: { collectionSlug: slug } }),
  });

  const sparkData = MOCK_SPARKLINES[slug] ?? [];
  const isPositive = (collection?.change24h ?? 0) >= 0;

  const filtered = items.filter(
    (i) => q === "" || i.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <AppLayout>
      <Link to="/explore" className="naut-pill inline-flex mb-4 hover:bg-[oklch(1_0_0/0.10)] transition">
        <ArrowLeft className="w-3 h-3" /> Explore
      </Link>

      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden h-40 md:h-52">
        {collection?.banner && (
          <img src={collection.banner} alt={collection.name} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Collection info */}
      <div className="relative -mt-8 px-2 md:px-4">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl border-4 border-background shrink-0 overflow-hidden">
            {collection?.avatar && (
              <img src={collection.avatar} alt={collection.name} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-2xl md:text-3xl text-ink font-bold truncate">
                {collection?.name ?? "Loading…"}
              </h1>
              {collection?.verified && <BadgeCheck className="w-5 h-5 text-primary shrink-0" />}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">by {collection?.creator}</p>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2 max-w-2xl">{collection?.description}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button className="naut-btn naut-btn-primary !py-2.5 text-sm">Sweep Floor</button>
            <button className="naut-btn naut-btn-secondary !py-2.5 text-sm">
              <ExternalLink className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatTile
            label="Floor Price"
            value={collection?.floorPrice ?? "—"}
            unit="ETH"
            gradient="linear-gradient(135deg, oklch(0.20 0.04 175), oklch(0.15 0.03 200))"
          />
          <StatTile
            label="Total Volume"
            value={collection?.totalVolume?.toFixed(1) ?? "—"}
            unit="ETH"
            gradient="linear-gradient(135deg, oklch(0.20 0.04 280), oklch(0.15 0.03 310))"
          />
          <StatTile
            label="Listed"
            value={collection?.listed ?? "—"}
            gradient="linear-gradient(135deg, oklch(0.20 0.04 80), oklch(0.15 0.03 60))"
          />
          <StatTile
            label="Owners"
            value={collection?.owners?.toLocaleString() ?? "—"}
            gradient="linear-gradient(135deg, oklch(0.20 0.04 145), oklch(0.15 0.03 160))"
          />
          <div className="naut-glass p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">7d Floor</p>
              <span className={`text-xs font-semibold ${isPositive ? "text-[oklch(0.72_0.18_145)]" : "text-[oklch(0.62_0.22_25)]"}`}>
                {isPositive ? "+" : ""}{collection?.change7d}%
              </span>
            </div>
            {sparkData.length > 0 && (
              <div className="h-8 mt-2">
                <Sparkline data={sparkData} positive={isPositive} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-1 border-b border-border/50 overflow-x-auto">
        {(["items", "activity", "analytics"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-4 py-2.5 text-sm font-medium capitalize transition-all border-b-2 -mb-px " +
              (tab === t
                ? "text-primary border-primary"
                : "text-muted-foreground border-transparent hover:text-foreground")
            }
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "items" && (
        <>
          {/* Search */}
          <div className="mt-4 naut-glass px-4 py-2.5 flex items-center gap-2.5">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search items…"
              className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-muted-foreground"
            />
            <button className="w-8 h-8 rounded-lg bg-[oklch(1_0_0/0.06)] grid place-items-center text-muted-foreground hover:text-ink transition">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Items grid */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="naut-shimmer aspect-[3/4]" />)
              : filtered.map((item) => <NFTCard key={item.id} item={item} />)}
          </div>
          {!isLoading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No items found.</p>
          )}
        </>
      )}

      {tab === "activity" && (
        <div className="mt-4 naut-glass p-6 text-center">
          <BarChart3 className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Collection activity will appear here.</p>
          <p className="text-xs text-muted-foreground mt-1">Sales, listings, and transfers in real time.</p>
        </div>
      )}

      {tab === "analytics" && (
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="naut-glass p-6">
            <h3 className="text-sm font-medium text-ink mb-3">Floor Price History</h3>
            {sparkData.length > 0 && (
              <div className="h-32">
                <Sparkline data={sparkData} positive={isPositive} width={400} height={128} />
              </div>
            )}
          </div>
          <div className="naut-glass p-6">
            <h3 className="text-sm font-medium text-ink mb-3">Volume Distribution</h3>
            <div className="space-y-3 mt-4">
              {[
                { label: "Last 24h", value: (collection?.totalVolume ?? 0) * 0.08 },
                { label: "Last 7d", value: (collection?.totalVolume ?? 0) * 0.25 },
                { label: "Last 30d", value: (collection?.totalVolume ?? 0) * 0.55 },
                { label: "All Time", value: collection?.totalVolume ?? 0 },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-sm font-semibold text-ink">{s.value.toFixed(1)} ETH</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
