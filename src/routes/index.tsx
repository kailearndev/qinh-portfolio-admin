import { createFileRoute, redirect } from "@tanstack/react-router";
export const iframeHeight = "800px";
export const description = "A sidebar with a header and a search form.";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/home" });
  },
});
