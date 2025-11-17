import LoginForm from "@/pages/auth/login";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    // ✅ Nếu đã có token → redirect về home (hoặc dashboard)
    if (context.auth?.user) {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <LoginForm />;
}
