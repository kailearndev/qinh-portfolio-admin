import { createFileRoute, redirect } from "@tanstack/react-router";
import Authenticated from "./_authenticated";
export const iframeHeight = "800px";
export const description = "A sidebar with a header and a search form.";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: "/_authenticated",
        },
      });
    }
  },
  component: Authenticated
});
