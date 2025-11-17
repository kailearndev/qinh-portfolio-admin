import LoginForm from "@/components/login-form";
import { Link } from "@tanstack/react-router";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
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
          src="https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/529937939_24541725165419388_8653757167859959468_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=qyvvRztAP4IQ7kNvwF1Awv5&_nc_oc=Adn0Xjr6kKa0hyvW0iNoYSpTjtFTpv6wlGJiCtcD1MtfVb10eLqbGsNuQckTo3Qscps&_nc_zt=23&_nc_ht=scontent.fhan4-3.fna&_nc_gid=3fDRqlEkqH3tygUkz9Zw6g&oh=00_AfgCYmLfu6E4TzQGZjdBAORGsXIPNlrz5z7zTBftHoHQ0g&oe=6917546E"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
