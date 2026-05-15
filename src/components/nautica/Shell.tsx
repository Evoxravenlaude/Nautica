import { Link, useLocation } from "@tanstack/react-router";
import {
  Compass,
  Sparkles,
  Send,
  Activity as ActivityIcon,
  User,
  BarChart3,
  Trophy,
  Wallet,
  Search,
  Menu,
  X,
} from "lucide-react";
import type { ComponentType } from "react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import logo from "@/assets/nautica-logo.png";

type Item = { to: string; label: string; Icon: ComponentType<{ className?: string }> };

const NAV: Item[] = [
  { to: "/explore", label: "Explore", Icon: Compass },
  { to: "/drops", label: "Drops", Icon: Sparkles },
  { to: "/portfolio", label: "Portfolio", Icon: Wallet },
  { to: "/rankings", label: "Rankings", Icon: Trophy },
  { to: "/activity", label: "Activity", Icon: ActivityIcon },
  { to: "/send", label: "Send", Icon: Send },
];

const BOTTOM_NAV: Item[] = [
  { to: "/explore", label: "Explore", Icon: Compass },
  { to: "/drops", label: "Drops", Icon: Sparkles },
  { to: "/portfolio", label: "Portfolio", Icon: Wallet },
  { to: "/activity", label: "Activity", Icon: ActivityIcon },
  { to: "/profile", label: "Profile", Icon: User },
];

export function SideRail() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden md:flex md:w-[240px] lg:w-[260px] shrink-0 flex-col gap-1 p-5 sticky top-0 h-screen border-r border-border/50">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2.5 mb-6 px-2">
        <img src={logo} alt="" width={32} height={32} className="w-8 h-8 rounded-lg" />
        <span className="font-display text-xl text-ink font-bold tracking-tight">Nautica</span>
      </Link>

      {/* Search */}
      <Link
        to="/explore"
        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-muted-foreground bg-[oklch(1_0_0/0.04)] border border-[oklch(1_0_0/0.06)] mb-4 hover:bg-[oklch(1_0_0/0.07)] transition"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search collections…</span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5">
        {NAV.map(({ to, label, Icon }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 " +
                (active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-[oklch(1_0_0/0.05)] hover:text-foreground")
              }
            >
              <Icon className="w-4 h-4" />
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_oklch(0.72_0.15_175/0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col gap-3">
        {/* Stats card */}
        <div className="naut-glass p-4 relative overflow-hidden">
          <div
            className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, oklch(0.72 0.15 175), transparent 70%)" }}
          />
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Volume 24h</p>
          <p className="font-display text-xl text-ink mt-0.5 font-bold">186.4 <span className="text-xs text-muted-foreground font-normal">ETH</span></p>
        </div>

        {/* Profile row */}
        <div className="flex items-center gap-2 px-1">
          <Link to="/profile" className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 grid place-items-center">
              <User className="w-3.5 h-3.5 text-ink" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink truncate">0x4a7b…f02c</p>
              <p className="text-[10px] text-muted-foreground">2.41 ETH</p>
            </div>
          </Link>
          <ThemeToggle compact />
        </div>
      </div>
    </aside>
  );
}

export function BottomDock() {
  const { pathname } = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[oklch(0.13_0.015_260/0.85)] backdrop-blur-xl border-t border-[oklch(1_0_0/0.06)] p-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {BOTTOM_NAV.map(({ to, label, Icon }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(to));
          return (
            <Link
              key={to}
              to={to}
              className={
                "flex-1 flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-xl transition-all duration-200 " +
                (active ? "text-primary" : "text-muted-foreground")
              }
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {active && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_oklch(0.72_0.15_175/0.6)]" />
                )}
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header className="md:hidden flex items-center justify-between px-5 pt-4 pb-2">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="" width={28} height={28} className="w-7 h-7 rounded-lg" />
        <span className="font-display text-lg text-ink font-bold">Nautica</span>
      </Link>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="w-9 h-9 rounded-xl bg-[oklch(1_0_0/0.05)] border border-[oklch(1_0_0/0.08)] grid place-items-center text-muted-foreground"
        >
          <Search className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 grid place-items-center">
          <User className="w-3.5 h-3.5 text-ink" />
        </div>
      </div>
    </header>
  );
}
