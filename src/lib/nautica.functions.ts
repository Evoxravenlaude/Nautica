import { createServerFn } from "@tanstack/react-start";
import {
  MOCK_ACTIVITY,
  MOCK_COLLECTIONS,
  MOCK_DROPS,
  MOCK_ITEMS,
  MOCK_OFFERS,
  MOCK_PORTFOLIO,
  MOCK_SPARKLINES,
} from "./mock-data";

// All requests proxy through the server so the browser never talks to the
// Node API directly. Until NAUTICA_API_URL is set, mocks are returned.

async function tryFetch<T>(path: string, fallback: T): Promise<T> {
  const base = process.env.NAUTICA_API_URL;
  if (!base) return fallback;
  try {
    const r = await fetch(`${base}${path}`, { headers: { accept: "application/json" } });
    if (!r.ok) return fallback;
    return (await r.json()) as T;
  } catch {
    return fallback;
  }
}

export const getCollections = createServerFn({ method: "GET" }).handler(async () => {
  return tryFetch("/collections", MOCK_COLLECTIONS);
});

export const getCollection = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    const all = await tryFetch("/collections", MOCK_COLLECTIONS);
    return all.find((c) => c.slug === data.slug) ?? null;
  });

export const getItems = createServerFn({ method: "GET" })
  .inputValidator((d: { collectionSlug?: string }) => d)
  .handler(async ({ data }) => {
    const all = await tryFetch("/items", MOCK_ITEMS);
    if (data.collectionSlug) return all.filter((i) => i.collectionSlug === data.collectionSlug);
    return all;
  });

export const getItem = createServerFn({ method: "GET" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    const all = await tryFetch("/items", MOCK_ITEMS);
    return all.find((i) => i.id === data.id) ?? null;
  });

export const getOffers = createServerFn({ method: "GET" })
  .inputValidator((d: { itemId: string }) => d)
  .handler(async ({ data }) => {
    const all = await tryFetch("/offers", MOCK_OFFERS);
    return all.filter((o) => o.itemId === data.itemId);
  });

export const getDrops = createServerFn({ method: "GET" }).handler(async () => {
  return tryFetch("/drops", MOCK_DROPS);
});

export const getActivity = createServerFn({ method: "GET" }).handler(async () => {
  return tryFetch("/activity", MOCK_ACTIVITY);
});

export const getPortfolio = createServerFn({ method: "GET" }).handler(async () => {
  return tryFetch("/portfolio", MOCK_PORTFOLIO);
});

export const getSparklines = createServerFn({ method: "GET" }).handler(async () => {
  return tryFetch("/sparklines", MOCK_SPARKLINES);
});

// Legacy alias
export const getMarket = createServerFn({ method: "GET" }).handler(async () => {
  return tryFetch("/items", MOCK_ITEMS);
});

export const submitPayment = createServerFn({ method: "POST" })
  .inputValidator((d: { to: string; amount: number; currency: "ETH" | "USDC"; note?: string }) => d)
  .handler(async ({ data }) => {
    const base = process.env.NAUTICA_API_URL;
    if (!base) {
      await new Promise((r) => setTimeout(r, 600));
      return { jobId: `mock_${Date.now()}`, status: "pending" as const };
    }
    const r = await fetch(`${base}/payments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error("Payment failed");
    return (await r.json()) as { jobId: string; status: "pending" };
  });

export const getProofStatus = createServerFn({ method: "GET" })
  .inputValidator((d: { jobId: string }) => d)
  .handler(async ({ data }) => {
    const base = process.env.NAUTICA_PROVER_URL;
    if (!base) {
      const ts = Number(data.jobId.split("_")[1] ?? 0);
      const age = Date.now() - ts;
      const status = age > 6000 ? "verified" : age > 3000 ? "proving" : "queued";
      return { jobId: data.jobId, status, progress: Math.min(100, Math.round(age / 60)) };
    }
    const r = await fetch(`${base}/status/${data.jobId}`);
    if (!r.ok) throw new Error("Status check failed");
    return (await r.json()) as { jobId: string; status: string; progress: number };
  });
