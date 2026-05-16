// ── Nautica v2 — Expanded mock data ──────────────────────────────────────
// NFT marketplace data: collections, items, traits, offers, activity, rankings.

export type Collection = {
  slug: string;
  name: string;
  creator: string;
  verified: boolean;
  description: string;
  banner: string;
  avatar: string;
  floorPrice: number;
  totalVolume: number;
  listed: number;
  owners: number;
  items: number;
  change24h: number;
  change7d: number;
  category: "art" | "pfp" | "generative" | "photography" | "gaming";
};

export type NFTItem = {
  id: string;
  collectionSlug: string;
  collectionName: string;
  name: string;
  tokenId: number;
  price: number | null;
  lastSale: number | null;
  currency: "ETH" | "USDC";
  rarity: number;
  rarityRank: number;
  owner: string;
  listed: boolean;
  traits: Trait[];
  cover: string;
};

export type Trait = {
  type: string;
  value: string;
  rarity: number;
};

export type Offer = {
  id: string;
  itemId: string;
  from: string;
  amount: number;
  currency: "ETH" | "USDC";
  expiresIn: string;
  createdAt: string;
};

export type Drop = {
  id: string;
  title: string;
  artist: string;
  startsAt: string;
  status: "live" | "upcoming" | "ended";
  pieces: number;
  minted: number;
  mintPrice: number;
  cover: string;
};

export type Activity = {
  id: string;
  kind: "sale" | "listing" | "offer" | "transfer" | "mint" | "send" | "receive";
  title: string;
  collection?: string;
  amount: number;
  currency: "ETH" | "USDC";
  from: string;
  to: string;
  proof: "verified" | "pending" | "none";
  at: string;
  tokenImage?: string;
};

export type PortfolioItem = {
  id: string;
  name: string;
  collection: string;
  purchasePrice: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  cover: string;
};

// ── Collections ──────────────────────────────────────────────────────────
export const MOCK_COLLECTIONS: Collection[] = [
  {
    slug: "chromatic-drift",
    name: "Chromatic Drift",
    creator: "Anouk Vey",
    verified: true,
    description: "Generative gradients born from ocean color spectrometry. 500 unique pieces exploring the interplay of light and water depth.",
    banner: "/images/collections/chromatic-drift.png",
    avatar: "/images/collections/chromatic-drift.png",
    floorPrice: 0.42,
    totalVolume: 186.4,
    listed: 48,
    owners: 312,
    items: 500,
    change24h: 12.5,
    change7d: 34.2,
    category: "generative",
  },
  {
    slug: "phantom-engines",
    name: "Phantom Engines",
    creator: "Hiro Tanaka",
    verified: true,
    description: "Hyper-detailed 3D renders of machines that never existed. Each piece is a meditation on function without purpose.",
    banner: "/images/collections/phantom-engines.png",
    avatar: "/images/collections/phantom-engines.png",
    floorPrice: 1.85,
    totalVolume: 542.1,
    listed: 22,
    owners: 187,
    items: 250,
    change24h: -3.2,
    change7d: 8.7,
    category: "art",
  },
  {
    slug: "grove-memory",
    name: "Grove Memory",
    creator: "Mara Idris",
    verified: true,
    description: "Analog photography of forests across four continents, each captured at the golden hour of its season.",
    banner: "/images/collections/grove-memory.png",
    avatar: "/images/collections/grove-memory.png",
    floorPrice: 0.28,
    totalVolume: 89.3,
    listed: 35,
    owners: 156,
    items: 200,
    change24h: 5.8,
    change7d: -2.1,
    category: "photography",
  },
  {
    slug: "nebula-beings",
    name: "Nebula Beings",
    creator: "Lev Marin",
    verified: true,
    description: "10,000 procedurally generated cosmic entities. Each being carries traits from actual stellar classification data.",
    banner: "/images/collections/nebula-beings.png",
    avatar: "/images/collections/nebula-beings.png",
    floorPrice: 0.08,
    totalVolume: 412.6,
    listed: 890,
    owners: 4200,
    items: 10000,
    change24h: -1.4,
    change7d: 15.3,
    category: "pfp",
  },
  {
    slug: "field-notes",
    name: "Field Notes",
    creator: "P. Okafor",
    verified: false,
    description: "Oil-on-canvas abstractions digitized and tokenized. Each piece comes with a certificate of physical authenticity.",
    banner: "/images/collections/field-notes.png",
    avatar: "/images/collections/field-notes.png",
    floorPrice: 2.15,
    totalVolume: 156.8,
    listed: 12,
    owners: 67,
    items: 80,
    change24h: 22.3,
    change7d: 45.1,
    category: "art",
  },
  {
    slug: "reef-protocol",
    name: "Reef Protocol",
    creator: "Sela Kim",
    verified: true,
    description: "Data-driven art generated from coral reef ecosystem measurements. Proceeds fund ocean conservation.",
    banner: "/images/collections/reef-protocol.jpg",
    avatar: "/images/collections/reef-protocol.jpg",
    floorPrice: 0.15,
    totalVolume: 67.2,
    listed: 78,
    owners: 234,
    items: 1000,
    change24h: 8.1,
    change7d: -5.4,
    category: "generative",
  },
  {
    slug: "lunar-artifacts",
    name: "Lunar Artifacts",
    creator: "J. Moreau",
    verified: true,
    description: "Speculative archaeology of the moon. Rendered relics from a civilization that may have existed before us.",
    banner: "/images/collections/lunar-artifacts.jpg",
    avatar: "/images/collections/lunar-artifacts.jpg",
    floorPrice: 0.55,
    totalVolume: 234.5,
    listed: 31,
    owners: 189,
    items: 333,
    change24h: -7.2,
    change7d: 3.8,
    category: "art",
  },
  {
    slug: "signal-garden",
    name: "Signal Garden",
    creator: "Ada Chen",
    verified: true,
    description: "Biomorphic sculptures grown from WiFi signal maps. Each piece visualizes the invisible electromagnetic landscape of a city block.",
    banner: "/images/collections/signal-garden.jpg",
    avatar: "/images/collections/signal-garden.jpg",
    floorPrice: 0.32,
    totalVolume: 128.9,
    listed: 42,
    owners: 210,
    items: 400,
    change24h: 15.6,
    change7d: 28.4,
    category: "generative",
  },
];

// ── NFT Items (sample per collection) ────────────────────────────────────
export const MOCK_ITEMS: NFTItem[] = [
  // Chromatic Drift
  { id: "cd-1", collectionSlug: "chromatic-drift", collectionName: "Chromatic Drift", name: "Tideglass #004", tokenId: 4, price: 0.42, lastSale: 0.35, currency: "ETH", rarity: 95.2, rarityRank: 12, owner: "0x4a7b...f02c", listed: true, cover: "/images/items/cd-1.jpg", traits: [{ type: "Depth", value: "Abyssal", rarity: 3.2 }, { type: "Spectrum", value: "Violet", rarity: 8.5 }, { type: "Motion", value: "Spiral", rarity: 12.1 }] },
  { id: "cd-2", collectionSlug: "chromatic-drift", collectionName: "Chromatic Drift", name: "Tideglass #117", tokenId: 117, price: 0.58, lastSale: 0.40, currency: "ETH", rarity: 88.1, rarityRank: 34, owner: "0x91c3...2d4e", listed: true, cover: "/images/items/cd-2.jpg", traits: [{ type: "Depth", value: "Pelagic", rarity: 15.2 }, { type: "Spectrum", value: "Teal", rarity: 10.4 }, { type: "Motion", value: "Wave", rarity: 18.3 }] },
  { id: "cd-3", collectionSlug: "chromatic-drift", collectionName: "Chromatic Drift", name: "Tideglass #042", tokenId: 42, price: null, lastSale: 0.52, currency: "ETH", rarity: 97.8, rarityRank: 5, owner: "0x3f8a...c1b7", listed: false, cover: "/images/items/cd-3.jpg", traits: [{ type: "Depth", value: "Hadal", rarity: 1.2 }, { type: "Spectrum", value: "Gold", rarity: 4.8 }, { type: "Motion", value: "Vortex", rarity: 2.5 }] },
  // Phantom Engines
  { id: "pe-1", collectionSlug: "phantom-engines", collectionName: "Phantom Engines", name: "Engine IX", tokenId: 9, price: 1.85, lastSale: 1.60, currency: "ETH", rarity: 92.4, rarityRank: 18, owner: "0x7d2e...a9f1", listed: true, cover: "/images/items/pe-1.jpg", traits: [{ type: "Era", value: "Post-Industrial", rarity: 5.6 }, { type: "Material", value: "Obsidian", rarity: 3.8 }, { type: "Function", value: "Unknown", rarity: 1.2 }] },
  { id: "pe-2", collectionSlug: "phantom-engines", collectionName: "Phantom Engines", name: "Engine XXII", tokenId: 22, price: 2.40, lastSale: 2.10, currency: "ETH", rarity: 96.1, rarityRank: 7, owner: "0x1b5c...e8d3", listed: true, cover: "/images/items/pe-2.jpg", traits: [{ type: "Era", value: "Pre-Quantum", rarity: 2.1 }, { type: "Material", value: "Dark Matter", rarity: 1.5 }, { type: "Function", value: "Temporal", rarity: 0.8 }] },
  // Grove Memory
  { id: "gm-1", collectionSlug: "grove-memory", collectionName: "Grove Memory", name: "August, Kyoto", tokenId: 3, price: 0.28, lastSale: 0.22, currency: "ETH", rarity: 78.5, rarityRank: 42, owner: "0x5e9d...b3a6", listed: true, cover: "/images/items/gm-1.jpg", traits: [{ type: "Season", value: "Summer", rarity: 25.0 }, { type: "Region", value: "Asia", rarity: 20.0 }, { type: "Light", value: "Golden", rarity: 15.0 }] },
  { id: "gm-2", collectionSlug: "grove-memory", collectionName: "Grove Memory", name: "March, Patagonia", tokenId: 8, price: 0.35, lastSale: 0.30, currency: "ETH", rarity: 84.2, rarityRank: 28, owner: "0x8c4f...d7e2", listed: true, cover: "/images/items/gm-2.jpg", traits: [{ type: "Season", value: "Autumn", rarity: 18.0 }, { type: "Region", value: "South America", rarity: 12.0 }, { type: "Light", value: "Crimson", rarity: 8.5 }] },
  // Nebula Beings
  { id: "nb-1", collectionSlug: "nebula-beings", collectionName: "Nebula Beings", name: "Being #4281", tokenId: 4281, price: 0.08, lastSale: 0.06, currency: "ETH", rarity: 72.3, rarityRank: 1840, owner: "0xa2c8...f5b1", listed: true, cover: "/images/items/nb-1.jpg", traits: [{ type: "Nebula", value: "Carina", rarity: 8.5 }, { type: "Mass", value: "Dwarf", rarity: 45.0 }, { type: "Emission", value: "UV", rarity: 22.0 }] },
  { id: "nb-2", collectionSlug: "nebula-beings", collectionName: "Nebula Beings", name: "Being #0007", tokenId: 7, price: 4.20, lastSale: 3.80, currency: "ETH", rarity: 99.9, rarityRank: 1, owner: "0xd4e1...a8c3", listed: true, cover: "/images/items/nb-2.jpg", traits: [{ type: "Nebula", value: "Pillars of Creation", rarity: 0.1 }, { type: "Mass", value: "Supergiant", rarity: 0.5 }, { type: "Emission", value: "Gamma", rarity: 0.3 }] },
  // Field Notes
  { id: "fn-1", collectionSlug: "field-notes", collectionName: "Field Notes", name: "Field Notes II", tokenId: 2, price: 2.15, lastSale: 1.80, currency: "ETH", rarity: 90.5, rarityRank: 8, owner: "0x6f3b...c9d4", listed: true, cover: "/images/items/fn-1.jpg", traits: [{ type: "Medium", value: "Oil on Canvas", rarity: 12.5 }, { type: "Scale", value: "Large", rarity: 18.0 }, { type: "Period", value: "2024", rarity: 25.0 }] },
  // Reef Protocol
  { id: "rp-1", collectionSlug: "reef-protocol", collectionName: "Reef Protocol", name: "Coral #088", tokenId: 88, price: 0.15, lastSale: 0.12, currency: "ETH", rarity: 68.2, rarityRank: 245, owner: "0xb7a4...e2f8", listed: true, cover: "/images/items/rp-1.jpg", traits: [{ type: "Reef", value: "Great Barrier", rarity: 10.0 }, { type: "Species", value: "Brain Coral", rarity: 15.0 }, { type: "Health", value: "Thriving", rarity: 30.0 }] },
  // Lunar Artifacts
  { id: "la-1", collectionSlug: "lunar-artifacts", collectionName: "Lunar Artifacts", name: "Relic XLIV", tokenId: 44, price: 0.55, lastSale: 0.48, currency: "ETH", rarity: 86.7, rarityRank: 35, owner: "0xc5d2...b1a9", listed: true, cover: "/images/items/la-1.jpg", traits: [{ type: "Origin", value: "Mare Tranquillitatis", rarity: 5.5 }, { type: "Material", value: "Regolith Alloy", rarity: 8.2 }, { type: "Age", value: "Pre-Holocene", rarity: 3.1 }] },
  // Signal Garden
  { id: "sg-1", collectionSlug: "signal-garden", collectionName: "Signal Garden", name: "Signal #156", tokenId: 156, price: 0.32, lastSale: 0.25, currency: "ETH", rarity: 81.4, rarityRank: 62, owner: "0xe8f3...d4c7", listed: true, cover: "/images/items/sg-1.jpg", traits: [{ type: "City", value: "Tokyo", rarity: 6.0 }, { type: "Band", value: "5GHz", rarity: 18.0 }, { type: "Density", value: "High", rarity: 12.0 }] },
];

// ── Offers ────────────────────────────────────────────────────────────────
export const MOCK_OFFERS: Offer[] = [
  { id: "o1", itemId: "cd-1", from: "0x91c3...2d4e", amount: 0.38, currency: "ETH", expiresIn: "2h 14m", createdAt: "4m ago" },
  { id: "o2", itemId: "cd-1", from: "0x3f8a...c1b7", amount: 0.36, currency: "ETH", expiresIn: "6h 30m", createdAt: "22m ago" },
  { id: "o3", itemId: "pe-1", from: "0x5e9d...b3a6", amount: 1.70, currency: "ETH", expiresIn: "1d 4h", createdAt: "1h ago" },
  { id: "o4", itemId: "nb-2", from: "0xa2c8...f5b1", amount: 3.50, currency: "ETH", expiresIn: "3h 45m", createdAt: "12m ago" },
  { id: "o5", itemId: "fn-1", from: "0xd4e1...a8c3", amount: 1.95, currency: "ETH", expiresIn: "12h", createdAt: "35m ago" },
];

// ── Drops ─────────────────────────────────────────────────────────────────
export const MOCK_DROPS: Drop[] = [
  { id: "d1", title: "Saltwater Index", artist: "Anouk Vey", startsAt: "Live now", status: "live", pieces: 24, minted: 18, mintPrice: 0.35, cover: "/images/drops/saltwater-index.jpg" },
  { id: "d2", title: "Quiet Algorithms", artist: "Hiro Tanaka", startsAt: "In 2h 14m", status: "upcoming", pieces: 12, minted: 0, mintPrice: 1.50, cover: "/images/drops/quiet-algorithms.jpg" },
  { id: "d3", title: "Notes from August", artist: "Mara Idris", startsAt: "Tomorrow, 18:00", status: "upcoming", pieces: 8, minted: 0, mintPrice: 0.25, cover: "/images/drops/notes-from-august.jpg" },
  { id: "d4", title: "Folded Light Vol I", artist: "Lev Marin", startsAt: "Ended 3d ago", status: "ended", pieces: 50, minted: 50, mintPrice: 0.18, cover: "/images/drops/folded-light.jpg" },
];

// ── Activity feed ────────────────────────────────────────────────────────
export const MOCK_ACTIVITY: Activity[] = [
  { id: "a1", kind: "sale", title: "Tideglass #004", collection: "Chromatic Drift", amount: 0.42, currency: "ETH", from: "0x91c3...2d4e", to: "0x4a7b...f02c", proof: "verified", at: "2m ago", tokenImage: "/images/items/cd-1.jpg" },
  { id: "a2", kind: "listing", title: "Engine IX", collection: "Phantom Engines", amount: 1.85, currency: "ETH", from: "0x7d2e...a9f1", to: "", proof: "none", at: "5m ago", tokenImage: "/images/items/pe-1.jpg" },
  { id: "a3", kind: "offer", title: "Being #0007", collection: "Nebula Beings", amount: 3.50, currency: "ETH", from: "0xa2c8...f5b1", to: "0xd4e1...a8c3", proof: "none", at: "12m ago", tokenImage: "/images/items/nb-2.jpg" },
  { id: "a4", kind: "send", title: "Private payment to 0x91…2c", collection: undefined, amount: 120, currency: "USDC", from: "0x4a7b...f02c", to: "0x91c3...2d4e", proof: "verified", at: "1h ago" },
  { id: "a5", kind: "transfer", title: "Coral #088", collection: "Reef Protocol", amount: 0, currency: "ETH", from: "0xb7a4...e2f8", to: "0xc5d2...b1a9", proof: "verified", at: "2h ago", tokenImage: "/images/items/rp-1.jpg" },
  { id: "a6", kind: "mint", title: "Signal #156", collection: "Signal Garden", amount: 0.25, currency: "ETH", from: "0x0000...0000", to: "0xe8f3...d4c7", proof: "verified", at: "3h ago", tokenImage: "/images/items/sg-1.jpg" },
  { id: "a7", kind: "sale", title: "Field Notes II", collection: "Field Notes", amount: 2.15, currency: "ETH", from: "0x3f8a...c1b7", to: "0x6f3b...c9d4", proof: "verified", at: "5h ago", tokenImage: "/images/items/fn-1.jpg" },
  { id: "a8", kind: "receive", title: "From 0x4a…f0", collection: undefined, amount: 0.05, currency: "ETH", from: "0x4a7b...f02c", to: "0x91c3...2d4e", proof: "verified", at: "8h ago" },
];

// ── Portfolio ─────────────────────────────────────────────────────────────
export const MOCK_PORTFOLIO: PortfolioItem[] = [
  { id: "cd-1", name: "Tideglass #004", collection: "Chromatic Drift", purchasePrice: 0.35, currentValue: 0.42, pnl: 0.07, pnlPercent: 20.0, cover: "/images/items/cd-1.jpg" },
  { id: "pe-1", name: "Engine IX", collection: "Phantom Engines", purchasePrice: 1.60, currentValue: 1.85, pnl: 0.25, pnlPercent: 15.6, cover: "/images/items/pe-1.jpg" },
  { id: "gm-1", name: "August, Kyoto", collection: "Grove Memory", purchasePrice: 0.30, currentValue: 0.28, pnl: -0.02, pnlPercent: -6.7, cover: "/images/items/gm-1.jpg" },
  { id: "nb-2", name: "Being #0007", collection: "Nebula Beings", purchasePrice: 3.80, currentValue: 4.20, pnl: 0.40, pnlPercent: 10.5, cover: "/images/items/nb-2.jpg" },
  { id: "la-1", name: "Relic XLIV", collection: "Lunar Artifacts", purchasePrice: 0.48, currentValue: 0.55, pnl: 0.07, pnlPercent: 14.6, cover: "/images/items/la-1.jpg" },
  { id: "sg-1", name: "Signal #156", collection: "Signal Garden", purchasePrice: 0.25, currentValue: 0.32, pnl: 0.07, pnlPercent: 28.0, cover: "/images/items/sg-1.jpg" },
];

// ── Sparkline data (7-day floor prices) ──────────────────────────────────
export const MOCK_SPARKLINES: Record<string, number[]> = {
  "chromatic-drift": [0.30, 0.32, 0.28, 0.35, 0.38, 0.40, 0.42],
  "phantom-engines": [1.90, 1.88, 1.92, 1.85, 1.80, 1.82, 1.85],
  "grove-memory": [0.30, 0.32, 0.29, 0.27, 0.30, 0.29, 0.28],
  "nebula-beings": [0.06, 0.07, 0.065, 0.08, 0.075, 0.082, 0.08],
  "field-notes": [1.50, 1.65, 1.70, 1.80, 1.90, 2.05, 2.15],
  "reef-protocol": [0.16, 0.14, 0.15, 0.13, 0.14, 0.15, 0.15],
  "lunar-artifacts": [0.60, 0.58, 0.56, 0.54, 0.52, 0.54, 0.55],
  "signal-garden": [0.22, 0.24, 0.25, 0.28, 0.30, 0.31, 0.32],
};

// Legacy export alias
export type MarketItem = NFTItem;
export const MOCK_MARKET = MOCK_ITEMS;
