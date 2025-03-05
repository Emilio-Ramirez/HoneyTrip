import { Button } from "~/components/ui/button";

import type { Route } from "./+types/landing-navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Honey Trip" },
    { name: "description", content: " Sweet adventures start with planning " },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button> Sweet adventures start with planning </Button>
    </div>
  );
}
