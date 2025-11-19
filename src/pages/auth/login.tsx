import LoginForm from "@/components/login-form";
import { Link } from "@tanstack/react-router";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">out
          <Link to="/" className="flex items-center gap-2 font-medium">
            <img src="/logo.gif" alt="Logo" className="h-20 " />
            <h2 className="text-zinc-200 text-2xl">Adminnnn deiiii</h2>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/bg_login.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
