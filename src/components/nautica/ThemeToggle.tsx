import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={
        "inline-flex items-center gap-2 rounded-full border border-border bg-card text-ink transition-colors hover:bg-muted " +
        (compact ? "w-9 h-9 justify-center" : "px-3 py-2 text-xs font-medium")
      }
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      {!compact && <span>{isDark ? "Light" : "Dark"}</span>}
    </button>
  );
}
