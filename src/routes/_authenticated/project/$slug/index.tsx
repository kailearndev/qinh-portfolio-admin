import ProjectDetail from "@/pages/project/components/detail";
import { ProjectService } from "@/services/project";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/project/$slug/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const data = await ProjectService.getProjectById(params.slug);
    return data;
  },
});

function RouteComponent() {
  const data = Route.useLoaderData(); // <-- lấy data từ loader
  return <ProjectDetail data={data.data} />;
}
