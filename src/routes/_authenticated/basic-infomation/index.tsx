import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/basic-infomation/")({
  component: RouteComponent,
  // loader: async () => {
  //   const data = await BasicInfomationService.list();
  //   return data.items.at(0);
  //   // You can perform data fetching or other asynchronous operations here
  //   // before the route is loaded.
  // },
});

function RouteComponent() {
  // const data = Route.useLoaderData();
  return <>ss</>
}
