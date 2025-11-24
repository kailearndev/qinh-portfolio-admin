import Jobs from "@/pages/jobs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/jobs/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Jobs />;
}
