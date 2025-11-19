import type { AuthContextType } from "@/hooks/AuthContext";
import { createRootRouteWithContext, Outlet, redirect } from "@tanstack/react-router";

interface MyRouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: ({ context, location }) => {
    const { user, isLoading } = context.auth;
    const path = location.pathname;

    const isPublic = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
    ].includes(path);

    // 1️⃣ Quan trọng NHẤT — đang load session thì KHÔNG redirect
    if (isLoading) return;

    // 2️⃣ Nếu chưa login và vào private route → đá về login
    if (!user && !isPublic) {
      throw redirect({ to: "/auth/login" });
    }

    // 3️⃣ Nếu đã login mà vào trang public → đá về /home
    if (user && isPublic) {
      throw redirect({ to: "/home" });
    }
  },
  component: () => <Outlet />,
});
