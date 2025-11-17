import type { AuthContextType } from "@/hooks/AuthContext";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface MyRouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({

  component: () => <Outlet />
});
