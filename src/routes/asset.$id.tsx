import { createFileRoute, Link, useParams, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShieldCheck, Sparkles, ExternalLink, Heart, Share2, Clock, Tag } from "lucide-react";
import { AppLayout } from "@/components/nautica/AppLayout";
import { getItem, getOffers } from "@/lib/nautica.functions";
import { GlowBlob } from "@/components/nautica/GlowBlob";

export const Route = createFileRoute("/asset/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `NFT ${params.id} — Nautica` },
      { name: "description", content: "View NFT details, traits, offers, and provenance on Nautica." },
    ],
  }),
  component: AssetPage,
  notFoundComponent: () => (
    <AppLayout>
      <p className="text-muted-foreground">Asset not found.</p>
      <Link to="/explore" className="naut-pill mt-3">Back to explore</Link>
    </AppLayout>
  ),
});

function AssetPage() {
  const { id } = useParams({ from: "/asset/$id" });

  const { data: item, isLoading } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItem({ data: { id } }),
  });

  const { data: offers = [] } = useQuery({
    queryKey: ["offers", id],
    queryFn: () => getOffers({ data: { itemId: id } }),
  });

  if (!isLoading && !item) throw notFound();

  return (
    <AppLayout>
      <Link to="/explore" className="naut-pill inline-flex mb-4 hover:bg-[oklch(1_0_0/0.10)] transition">
        <ArrowLeft className="w-3 h-3" /> Back
      </Link>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6">
        {/* Left — Image */}
        <div className="relative">
          <div
            className="naut-glass aspect-square w-full overflow-hidden relative"
            style={{ backgroundImage: item?.cover }}
          >
            <GlowBlob color="oklch(0.72 0.15 175)" size={200} top="-50px" right="-50px" opacity={0.15} />
          </div>
          {/* Action buttons under image */}
          <div className="flex gap-2 mt-3">
            <button className="naut-btn naut-btn-ghost !py-2 flex-1 text-xs">
              <Heart className="w-3.5 h-3.5" /> Favorite
            </button>
            <button className="naut-btn naut-btn-ghost !py-2 flex-1 text-xs">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button className="naut-btn naut-btn-ghost !py-2 flex-1 text-xs">
              <ExternalLink className="w-3.5 h-3.5" /> Etherscan
            </button>
          </div>
        </div>

        {/* Right — Details */}
        <div className="flex flex-col gap-4">
          {/* Title card */}
          <div className="naut-glass p-5 md:p-6">
            <Link
              to="/collection/$slug"
              params={{ slug: item?.collectionSlug ?? "" }}
              className="text-sm text-primary hover:underline"
            >
              {item?.collectionName ?? "—"}
            </Link>
            <h1 className="font-display text-3xl md:text-4xl text-ink font-bold leading-tight mt-1">
              {item?.name ?? "Loading…"}
            </h1>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="naut-pill">#{item?.rarityRank} Rank</span>
              <span className="naut-pill">{item?.rarity?.toFixed(1)}% Rarity</span>
              <span className="naut-pill">Token #{item?.tokenId}</span>
            </div>

            {/* Price & Actions */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, oklch(0.20 0.04 175), oklch(0.15 0.03 200))" }}>
                <p className="text-[10px] uppercase tracking-wider opacity-70">Current Price</p>
                <p className="font-display text-3xl font-bold text-ink leading-none mt-1">
                  {item?.price ?? "—"}
                  <span className="text-xs ml-1 opacity-60 font-normal">{item?.currency}</span>
                </p>
              </div>
              <div className="rounded-xl bg-[oklch(1_0_0/0.04)] border border-[oklch(1_0_0/0.06)] p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Last Sale</p>
                <p className="font-display text-3xl font-bold text-ink leading-none mt-1">
                  {item?.lastSale ?? "—"}
                  <span className="text-xs ml-1 text-muted-foreground font-normal">{item?.currency}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button className="naut-btn naut-btn-primary flex-1 !py-3.5">
                {item?.listed ? "Buy Now" : "Make Offer"}
              </button>
              <Link to="/send" className="naut-btn naut-btn-accent flex-1 !py-3.5">
                Pay Privately
              </Link>
            </div>
          </div>

          {/* Traits */}
          <div className="naut-glass p-5">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <Tag className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-medium">Traits</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(item?.traits ?? []).map((t) => (
                <div key={t.type} className="rounded-xl bg-[oklch(1_0_0/0.04)] border border-[oklch(1_0_0/0.06)] p-3 text-center hover:bg-[oklch(1_0_0/0.07)] transition cursor-pointer">
                  <p className="text-[10px] text-primary uppercase tracking-wider font-medium">{t.type}</p>
                  <p className="text-sm text-ink font-semibold mt-0.5">{t.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{t.rarity}% have this</p>
                </div>
              ))}
            </div>
          </div>

          {/* Offers */}
          <div className="naut-glass p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-medium">Offers</span>
              </div>
              <span className="text-xs text-muted-foreground">{offers.length} active</span>
            </div>
            {offers.length > 0 ? (
              <div className="space-y-2">
                {offers.map((o) => (
                  <div key={o.id} className="flex items-center justify-between py-2.5 border-b border-[oklch(1_0_0/0.05)] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-ink">{o.amount} {o.currency}</p>
                      <p className="text-xs text-muted-foreground">from {o.from} · {o.createdAt}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">expires {o.expiresIn}</p>
                      <button className="text-xs text-primary hover:underline mt-0.5">Accept</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No offers yet.</p>
            )}
          </div>

          {/* Provenance */}
          <div className="naut-glass p-5">
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-medium">Provenance</span>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-ink">Minted by {item?.collectionName}</span>
                <span className="text-muted-foreground text-xs">3d ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink">Listed on Nautica</span>
                <span className="text-muted-foreground text-xs">2d ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-ink">2 transfers · ZK verified</span>
                <span className="naut-pill naut-badge-primary text-[10px]">verified</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
