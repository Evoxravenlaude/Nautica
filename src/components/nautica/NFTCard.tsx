import { Link } from "@tanstack/react-router";
import type { NFTItem } from "@/lib/mock-data";
import { ShoppingCart } from "lucide-react";

export function NFTCard({ item }: { item: NFTItem }) {
  return (
    <Link
      to="/asset/$id"
      params={{ id: item.id }}
      className="naut-glass overflow-hidden group cursor-pointer transition-all duration-300 hover:border-[oklch(1_0_0/0.14)] hover:-translate-y-1 hover:shadow-[0_8px_32px_oklch(0_0_0/0.3)]"
    >
      {/* Cover */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.cover}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Rarity badge */}
        <div className="absolute top-3 left-3">
          <span className={
            "naut-pill text-[10px] !py-1 !px-2 backdrop-blur-md " +
            (item.rarity >= 95 ? "!bg-[oklch(0.80_0.12_80/0.2)] !text-[oklch(0.85_0.14_80)] !border-[oklch(0.80_0.12_80/0.3)]"
              : item.rarity >= 85 ? "!bg-[oklch(0.72_0.15_175/0.2)] !text-primary !border-[oklch(0.72_0.15_175/0.3)]"
              : "")
          }>
            #{item.rarityRank}
          </span>
        </div>
        {/* Quick buy overlay */}
        {item.listed && item.price && (
          <div className="absolute inset-0 bg-[oklch(0_0_0/0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="naut-btn naut-btn-primary !py-2.5 !px-5 text-sm"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Buy now
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-[10px] text-muted-foreground truncate">{item.collectionName}</p>
        <h3 className="font-display text-sm text-ink font-semibold truncate mt-0.5">{item.name}</h3>

        <div className="mt-2.5 flex items-end justify-between gap-2">
          {item.price ? (
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Price</p>
              <p className="text-sm font-bold text-ink">
                {item.price} <span className="text-[10px] text-muted-foreground font-normal">{item.currency}</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="text-[10px] text-muted-foreground">Not listed</p>
            </div>
          )}
          {item.lastSale && (
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground">Last sale</p>
              <p className="text-xs text-muted-foreground">{item.lastSale} {item.currency}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// Compact version for grids with more items
export function NFTCardCompact({ item }: { item: NFTItem }) {
  return (
    <Link
      to="/asset/$id"
      params={{ id: item.id }}
      className="naut-glass overflow-hidden group cursor-pointer transition-all duration-200 hover:border-[oklch(1_0_0/0.14)]"
    >
      <img
        src={item.cover}
        alt={item.name}
        className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="p-2.5">
        <p className="text-xs font-medium text-ink truncate">{item.name}</p>
        {item.price && (
          <p className="text-xs text-muted-foreground mt-0.5">{item.price} {item.currency}</p>
        )}
      </div>
    </Link>
  );
}
