import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/nautica/AppLayout";

export const Route = createFileRoute("/market/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Edition ${params.id} — Nautica` }],
  }),
  component: () => {
    return (
      <AppLayout>
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Item pages have moved.</p>
          <Link to="/explore" className="naut-btn naut-btn-primary">Go to Explore</Link>
        </div>
      </AppLayout>
    );
  },
});
