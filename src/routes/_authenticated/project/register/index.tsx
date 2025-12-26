import ProjectRegister from "@/pages/project/components/new";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/project/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProjectRegister />;
}
