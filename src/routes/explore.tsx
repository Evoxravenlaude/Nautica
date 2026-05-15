import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search, SlidersHorizontal, Grid3X3, List, TrendingUp } from "lucide-react";
import { AppLayout } from "@/components/nautica/AppLayout";
import { CollectionCard } from "@/components/nautica/CollectionCard";
import { getCollections } from "@/lib/nautica.functions";
import type { Collection } from "@/lib/mock-data";

const CATEGORIES: Array<Collection["category"] | "all"> = ["all", "art", "pfp", "generative", "photography", "gaming"];
const SORT_OPTIONS = [
  { value: "volume", label: "Volume" },
  { value: "floor", label: "Floor Price" },
  { value: "change", label: "24h Change" },
  { value: "items", label: "Items" },
] as const;

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Collections — Nautica" },
      { name: "description", content: "Browse and discover curated NFT collections on Nautica. Filter by category, sort by volume, floor price, and more." },
      { property: "og:title", content: "Explore — Nautica" },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("all");
  const [sort, setSort] = useState<(typeof SORT_OPTIONS)[number]["value"]>("volume");
  const [q, setQ] = useState("");

  const { data: collections = [], isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });

  const filtered = collections
    .filter((c) => cat === "all" || c.category === cat)
    .filter((c) => q === "" || `${c.name} ${c.creator}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => {
      if (sort === "volume") return b.totalVolume - a.totalVolume;
      if (sort === "floor") return b.floorPrice - a.floorPrice;
      if (sort === "change") return b.change24h - a.change24h;
      if (sort === "items") return b.items - a.items;
      return 0;
    });

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wider">Marketplace</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-ink font-bold">Explore</h1>
        </div>
        <span className="naut-pill">{collections.length} collections</span>
      </div>

      {/* Search + filters */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 naut-glass px-4 py-2.5 flex items-center gap-2.5">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search collections or creators…"
            className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-muted-foreground"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="naut-glass px-4 py-2.5 text-sm text-ink bg-transparent outline-none cursor-pointer appearance-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value} className="bg-[oklch(0.15_0.018_260)] text-ink">
              Sort: {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category tabs */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={
              "shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize " +
              (cat === c
                ? "bg-primary/15 text-primary border border-primary/30"
                : "bg-[oklch(1_0_0/0.04)] text-muted-foreground border border-transparent hover:bg-[oklch(1_0_0/0.08)] hover:text-foreground")
            }
          >
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="naut-shimmer aspect-[3/4]" />
            ))
          : filtered.map((c) => <CollectionCard key={c.slug} collection={c} />)}
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No collections found matching your filters.</p>
        </div>
      )}
    </AppLayout>
  );
}
