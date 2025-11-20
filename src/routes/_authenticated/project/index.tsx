import Project from "@/pages/project";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/project/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Project />;
}
