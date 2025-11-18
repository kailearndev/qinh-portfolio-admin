import type { AuthContextType } from "@/hooks/AuthContext";
import { createRootRouteWithContext, Outlet, redirect } from "@tanstack/react-router";

interface MyRouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: ({ context, location }) => {
    const path = location.pathname;

    // ✅ chặn route protected nếu chưa login
    const isPublic = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
    ].includes(path);
    if (context.auth.isLoading) {
      return
    }
    if (!context.auth?.user && !isPublic) {
      throw redirect({ to: "/auth/login" });
    }
  },
  component: () => <Outlet />
});
