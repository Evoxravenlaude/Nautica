import { Link } from "@tanstack/react-router";
import type { Collection } from "@/lib/mock-data";
import { Sparkline } from "./Sparkline";
import { MOCK_SPARKLINES } from "@/lib/mock-data";
import { BadgeCheck } from "lucide-react";

export function CollectionCard({ collection }: { collection: Collection }) {
  const sparkData = MOCK_SPARKLINES[collection.slug] ?? [];
  const isPositive = collection.change24h >= 0;

  return (
    <Link
      to="/collection/$slug"
      params={{ slug: collection.slug }}
      className="naut-glass overflow-hidden group cursor-pointer transition-all duration-300 hover:border-[oklch(1_0_0/0.14)] hover:-translate-y-1 hover:shadow-[0_8px_32px_oklch(0_0_0/0.3)]"
    >
      {/* Banner */}
      <div className="h-28 w-full relative overflow-hidden">
        <img
          src={collection.banner}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.018_260)] to-transparent" />
        {/* Avatar */}
        <div className="absolute -bottom-5 left-4 w-12 h-12 rounded-xl border-2 border-[oklch(0.15_0.018_260)] overflow-hidden">
          <img
            src={collection.avatar}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-8">
        <div className="flex items-center gap-1.5">
          <h3 className="font-display text-base text-ink font-semibold truncate">{collection.name}</h3>
          {collection.verified && (
            <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">by {collection.creator}</p>

        {/* Stats row */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Floor</p>
            <p className="text-sm font-semibold text-ink">{collection.floorPrice} <span className="text-[10px] text-muted-foreground font-normal">ETH</span></p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Volume</p>
            <p className="text-sm font-semibold text-ink">{collection.totalVolume.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">24h</p>
            <p className={`text-sm font-semibold ${isPositive ? "text-[oklch(0.72_0.18_145)]" : "text-[oklch(0.62_0.22_25)]"}`}>
              {isPositive ? "+" : ""}{collection.change24h}%
            </p>
          </div>
        </div>

        {/* Sparkline */}
        {sparkData.length > 0 && (
          <div className="mt-3 h-8 opacity-60 group-hover:opacity-100 transition-opacity">
            <Sparkline data={sparkData} positive={isPositive} />
          </div>
        )}
      </div>
    </Link>
  );
}
