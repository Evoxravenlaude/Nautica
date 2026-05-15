import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ShieldCheck, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { AppLayout } from "@/components/nautica/AppLayout";
import { getProofStatus, submitPayment } from "@/lib/nautica.functions";

export const Route = createFileRoute("/send")({
  head: () => ({
    meta: [
      { title: "Send — Nautica" },
      { name: "description", content: "Send private, ZK-proven payments on Nautica." },
    ],
  }),
  component: SendPage,
});

function SendPage() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0.05");
  const [currency, setCurrency] = useState<"ETH" | "USDC">("ETH");
  const [note, setNote] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);

  const submitFn = useServerFn(submitPayment);
  const m = useMutation({
    mutationFn: (vars: { to: string; amount: number; currency: "ETH" | "USDC"; note: string }) =>
      submitFn({ data: vars }),
    onSuccess: (r) => setJobId(r.jobId),
  });

  const statusFn = useServerFn(getProofStatus);
  const { data: status } = useQuery({
    queryKey: ["proof", jobId],
    queryFn: () => statusFn({ data: { jobId: jobId! } }),
    enabled: !!jobId,
    refetchInterval: (q) => (q.state.data?.status === "verified" ? false : 1000),
  });

  return (
    <AppLayout>
      <div>
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Lock className="w-3.5 h-3.5" />
          <span className="text-xs font-medium uppercase tracking-wider">Private payments</span>
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-ink font-bold">Send</h1>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1.2fr_1fr] gap-5">
        <section className="naut-glass p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-16 w-48 h-48 rounded-full opacity-10 blur-[60px]" style={{ background: "oklch(0.72 0.15 175)" }} />

          <div className="flex items-center gap-2 text-muted-foreground mb-6">
            <Lock className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Encrypted draft</span>
          </div>

          <label className="block">
            <span className="text-sm text-muted-foreground">Recipient</span>
            <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="0x… or nautica.eth" className="naut-input mt-1.5" />
          </label>

          <div className="mt-5 rounded-2xl p-5" style={{ background: "linear-gradient(135deg, oklch(0.22 0.05 175), oklch(0.16 0.03 200))" }}>
            <p className="text-[10px] uppercase tracking-wider opacity-70 text-ink">Amount</p>
            <div className="flex items-end gap-3 mt-1">
              <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" className="bg-transparent font-display text-4xl md:text-5xl font-bold outline-none w-full min-w-0 text-ink" />
              <div className="flex rounded-full bg-[oklch(1_0_0/0.08)] p-0.5 text-sm shrink-0">
                {(["ETH", "USDC"] as const).map((c) => (
                  <button key={c} onClick={() => setCurrency(c)} className={"px-3 py-1.5 rounded-full font-medium transition-all text-xs " + (currency === c ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-ink")}>{c}</button>
                ))}
              </div>
            </div>
          </div>

          <label className="block mt-5">
            <span className="text-sm text-muted-foreground">Note (encrypted, optional)</span>
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="For the print, August" className="naut-input mt-1.5" />
          </label>

          <button disabled={m.isPending || !to || !amount} onClick={() => m.mutate({ to, amount: Number(amount), currency, note })} className="naut-btn naut-btn-primary w-full mt-6 !py-3.5 disabled:opacity-40">
            {m.isPending ? "Generating proof…" : "Send Privately"} <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        <aside className="naut-glass p-6 md:p-8 flex flex-col">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider font-medium">Zero-knowledge proof</span>
          </div>

          {!jobId ? (
            <>
              <p className="font-display text-xl text-ink font-bold mt-4 leading-tight">Your payment is verified, never published.</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {["Sender, recipient, and amount stay private", "The network sees a single proof byte string", "You get a receipt only you can decrypt"].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[oklch(0.72_0.15_175/0.15)] grid place-items-center shrink-0 mt-0.5"><ShieldCheck className="w-3 h-3 text-primary" /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="mt-4">
              <p className="font-display text-xl text-ink font-bold">Proof Job</p>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono">id · {jobId}</p>
              <div className="mt-6 space-y-3">
                {(["queued", "proving", "verified"] as const).map((step) => {
                  const idx = ["queued", "proving", "verified"].indexOf(status?.status ?? "queued");
                  const stepIdx = ["queued", "proving", "verified"].indexOf(step);
                  const done = stepIdx <= idx;
                  return (
                    <div key={step} className="flex items-center gap-3">
                      <span className={"w-8 h-8 rounded-xl grid place-items-center text-xs font-bold " + (done ? "bg-primary/20 text-primary" : "bg-[oklch(1_0_0/0.04)] text-muted-foreground")}>
                        {done ? <CheckCircle2 className="w-4 h-4" /> : stepIdx + 1}
                      </span>
                      <span className={`text-sm font-medium ${done ? "text-ink" : "text-muted-foreground"}`}>
                        {step === "queued" ? "Queued in prover" : step === "proving" ? "Generating SP1 proof" : "Verified on-chain"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 h-2 rounded-full bg-[oklch(1_0_0/0.06)] overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700 bg-primary" style={{ width: `${status?.status === "verified" ? 100 : status?.progress ?? 5}%` }} />
              </div>
              {status?.status === "verified" && (
                <div className="mt-4 rounded-xl p-4" style={{ background: "linear-gradient(135deg, oklch(0.22 0.06 145), oklch(0.16 0.04 160))" }}>
                  <p className="text-sm font-semibold text-ink flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[oklch(0.72_0.18_145)]" /> Payment verified!</p>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </AppLayout>
  );
}
