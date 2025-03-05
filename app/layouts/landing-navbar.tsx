import { Button } from "~/components/ui/button";
import type { Route } from "./+types/landing-navbar";
import { Link, Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Honey Trip" },
    { name: "description", content: " Sweet adventures start with planning " },
  ];
}

export default function LandingNavbar() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full h-16 bg-foreground z-5"></div>
      <nav className="bg-foreground p-4 flex justify-between sticky top-0 z-10 w-full">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-primary text-2xl md:text-4xl  font-bold tracking-wide"
          >
            Honey Trip 🍯
          </Link>
        </div>
        <div className="flex gap-4 md:gap-10">
          <Link to="/login" prefetch="intent">
            <Button className="bg-primary">Login</Button>
          </Link>
          <Link to="/sign-up" prefetch="intent">
            <Button className="bg-primary">Sign Up</Button>
          </Link>
        </div>
      </nav>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
}
