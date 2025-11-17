import About from "@/pages/about";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <About />;
}
