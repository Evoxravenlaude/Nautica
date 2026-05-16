import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Copy, ExternalLink, User, Settings, LogOut } from "lucide-react";
import { AppLayout } from "@/components/nautica/AppLayout";
import { StatTile } from "@/components/nautica/StatTile";
import { ThemeToggle } from "@/components/nautica/ThemeToggle";
import { getPortfolio } from "@/lib/nautica.functions";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Nautica" },
      { name: "description", content: "Your wallet, owned editions, and Nautica preferences." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { data: portfolio = [] } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolio(),
  });

  const totalValue = portfolio.reduce((s, p) => s + p.currentValue, 0);

  return (
    <AppLayout>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <User className="w-3.5 h-3.5" />
            <span className="text-xs font-medium uppercase tracking-wider">Connected as</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-ink font-bold">Profile</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {/* Wallet card */}
        <div className="naut-glass p-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-15 blur-[50px]" style={{ background: "oklch(0.72 0.15 175)" }} />
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 grid place-items-center">
              <User className="w-6 h-6 text-ink" />
            </div>
            <div>
              <p className="font-display text-xl text-ink font-bold">0x4a7b…f02c</p>
              <p className="text-xs text-muted-foreground">Connected via MetaMask</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="naut-pill hover:bg-[oklch(1_0_0/0.10)] transition"><Copy className="w-3 h-3" /> Copy</button>
            <button className="naut-pill hover:bg-[oklch(1_0_0/0.10)] transition"><ExternalLink className="w-3 h-3" /> Explorer</button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, oklch(0.20 0.04 175), oklch(0.15 0.03 200))" }}>
              <p className="text-[10px] text-ink/60 uppercase">Balance</p>
              <p className="font-display text-2xl text-ink font-bold">2.41 <span className="text-xs opacity-60 font-normal">ETH</span></p>
            </div>
            <div className="rounded-xl p-4" style={{ background: "linear-gradient(135deg, oklch(0.20 0.04 80), oklch(0.15 0.03 60))" }}>
              <p className="text-[10px] text-ink/60 uppercase">Portfolio</p>
              <p className="font-display text-2xl text-ink font-bold">{totalValue.toFixed(2)} <span className="text-xs opacity-60 font-normal">ETH</span></p>
            </div>
          </div>
        </div>

        {/* Privacy card */}
        <div className="naut-glass p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.18 0.04 175), oklch(0.14 0.03 200))" }}>
          <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full opacity-20 blur-[40px]" style={{ background: "oklch(0.72 0.15 175)" }} />
          <p className="text-[10px] uppercase tracking-wider text-ink/60 font-medium">Privacy</p>
          <p className="font-display text-xl text-ink font-bold mt-1">ZK proofs always on</p>
          <p className="text-sm text-ink/60 mt-2">Every send is wrapped in an SP1 proof. Receipts are encrypted with your viewing key.</p>
          <div className="flex items-center justify-between mt-6 p-3 rounded-xl bg-[oklch(1_0_0/0.06)]">
            <span className="text-sm text-ink">Auto-prove sends</span>
            <span className="w-12 h-6 rounded-full bg-primary/30 relative cursor-pointer">
              <span className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-primary shadow-[0_0_8px_oklch(0.72_0.15_175/0.4)]" />
            </span>
          </div>
        </div>

        {/* Collection grid */}
        <div className="naut-glass p-6 md:col-span-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-4">Your Collection</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {portfolio.map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="aspect-square rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <img src={p.cover} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-ink font-medium mt-1.5 truncate">{p.name}</p>
                <p className="text-[10px] text-muted-foreground">{p.currentValue} ETH</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="naut-glass p-6 md:col-span-2">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-4">Settings</p>
          <div className="space-y-2">
            {[
              { icon: Settings, label: "Preferences", desc: "Display, notifications, currency" },
              { icon: ExternalLink, label: "Connected Apps", desc: "Manage dApp connections" },
              { icon: LogOut, label: "Disconnect Wallet", desc: "Sign out of Nautica" },
            ].map((s) => (
              <button key={s.label} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[oklch(1_0_0/0.04)] transition text-left">
                <div className="w-9 h-9 rounded-lg bg-[oklch(1_0_0/0.06)] grid place-items-center shrink-0">
                  <s.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-ink font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
