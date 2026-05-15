import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, TrendingUp, Zap, Shield, BarChart3, ChevronRight } from "lucide-react";
import { GlowBlob } from "@/components/nautica/GlowBlob";
import { CollectionCard } from "@/components/nautica/CollectionCard";
import { StatTile } from "@/components/nautica/StatTile";
import { getCollections } from "@/lib/nautica.functions";
import logo from "@/assets/nautica-logo.png";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "Nautica — Premium NFT Marketplace" },
      { name: "description", content: "Discover, collect, and trade premium digital art. Explore curated NFT collections with zero-knowledge private payments." },
      { property: "og:title", content: "Nautica — Premium NFT Marketplace" },
      { property: "og:description", content: "Discover, collect, and trade premium digital art with zero-knowledge proofs." },
    ],
  }),
  component: SplashPage,
});

const FEATURES = [
  { icon: Zap, title: "Instant Trades", desc: "Buy, sell, and sweep collections in seconds", gradient: "linear-gradient(135deg, oklch(0.25 0.08 175), oklch(0.18 0.05 200))" },
  { icon: Shield, title: "ZK Payments", desc: "Private transfers verified by zero-knowledge proofs", gradient: "linear-gradient(135deg, oklch(0.28 0.08 280), oklch(0.18 0.05 310))" },
  { icon: BarChart3, title: "Portfolio Intel", desc: "Track P&L, floor prices, and rarity analytics", gradient: "linear-gradient(135deg, oklch(0.28 0.10 80), oklch(0.18 0.06 60))" },
];

function SplashPage() {
  const { data: collections = [] } = useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });

  const trending = [...collections].sort((a, b) => b.change24h - a.change24h).slice(0, 4);
  const totalVolume = collections.reduce((s, c) => s + c.totalVolume, 0);
  const totalItems = collections.reduce((s, c) => s + c.items, 0);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background blobs */}
      <GlowBlob color="oklch(0.72 0.15 175)" size={500} top="-150px" right="-100px" delay={0} opacity={0.15} />
      <GlowBlob color="oklch(0.75 0.14 330)" size={400} bottom="10%" left="-120px" delay={5} opacity={0.12} />
      <GlowBlob color="oklch(0.80 0.12 80)" size={350} top="40%" right="20%" delay={10} opacity={0.08} />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 naut-dotgrid opacity-40 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-10 py-6 md:py-10">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" width={36} height={36} className="w-9 h-9 rounded-lg" />
            <span className="font-display text-2xl text-ink font-bold tracking-tight">Nautica</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/explore" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-ink transition">
              Explore
            </Link>
            <Link to="/drops" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-ink transition">
              Drops
            </Link>
            <Link to="/explore" className="naut-btn naut-btn-primary !py-2.5 !px-5 text-sm">
              Launch App <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Hero */}
        <div className="mt-12 md:mt-20 text-center max-w-3xl mx-auto naut-slide-up">
          <div className="inline-flex items-center gap-2 naut-pill mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            v1 · NFT Marketplace + ZK Payments
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-ink leading-[1.05] font-bold">
            Collect digital art,{" "}
            <span className="bg-gradient-to-r from-primary via-[oklch(0.75_0.14_220)] to-accent bg-clip-text text-transparent">
              trade fearlessly
            </span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A premium marketplace for curated NFT collections — with portfolio analytics,
            collection sweeps, and payments that don't leak your wallet history.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/explore" className="naut-btn naut-btn-primary !py-3.5 !px-7">
              Start Exploring <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/drops" className="naut-btn naut-btn-secondary !py-3.5 !px-7">
              View Drops
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3" style={{ animationDelay: "0.15s" }}>
          <StatTile
            label="Total Volume"
            value={totalVolume.toFixed(1)}
            unit="ETH"
            gradient="linear-gradient(135deg, oklch(0.22 0.04 175), oklch(0.16 0.03 200))"
          />
          <StatTile
            label="Collections"
            value={collections.length}
            gradient="linear-gradient(135deg, oklch(0.22 0.04 280), oklch(0.16 0.03 310))"
          />
          <StatTile
            label="Total Items"
            value={totalItems.toLocaleString()}
            gradient="linear-gradient(135deg, oklch(0.22 0.04 80), oklch(0.16 0.03 60))"
          />
          <StatTile
            label="ZK Proofs"
            value="98.4"
            unit="k"
            gradient="linear-gradient(135deg, oklch(0.22 0.04 330), oklch(0.16 0.03 350))"
          />
        </div>

        {/* Trending collections */}
        <section className="mt-12 md:mt-16">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="font-display text-xl text-ink font-bold">Trending Collections</h2>
            </div>
            <Link to="/explore" className="text-sm text-muted-foreground hover:text-primary transition flex items-center gap-1">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trending.map((c) => (
              <CollectionCard key={c.slug} collection={c} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mt-12 md:mt-16 grid md:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="naut-glass p-6 relative overflow-hidden group hover:border-[oklch(1_0_0/0.12)] transition-all duration-300">
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full opacity-20 group-hover:opacity-40 transition-opacity" style={{ background: `radial-gradient(circle, oklch(0.72 0.15 175), transparent 70%)` }} />
              <div className="w-10 h-10 rounded-xl grid place-items-center mb-4" style={{ background: f.gradient }}>
                <f.icon className="w-5 h-5 text-ink" />
              </div>
              <h3 className="font-display text-lg text-ink font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-16 md:mt-20 pb-8 flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-6">
          <p>© 2026 Nautica. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-ink transition">Docs</a>
            <a href="#" className="hover:text-ink transition">Discord</a>
            <a href="#" className="hover:text-ink transition">Twitter</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
