import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Search } from "lucide-react";
import { AppLayout } from "@/components/nautica/AppLayout";
import { NFTCard } from "@/components/nautica/NFTCard";
import { getItems } from "@/lib/nautica.functions";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Market — Nautica" },
      { name: "description", content: "Browse on-chain art editions on Nautica." },
    ],
  }),
  component: () => {
    // Redirect to explore
    return (
      <AppLayout>
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Market has moved to Explore.</p>
          <Link to="/explore" className="naut-btn naut-btn-primary">Go to Explore</Link>
        </div>
      </AppLayout>
    );
  },
});
