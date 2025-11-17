import Navbar from '@/components/layouts/nav';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  component: Authenticated,
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
})

export default function Authenticated() {
  return <>
    <Navbar />
    <Outlet />
  </>
}
