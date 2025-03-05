import { Button } from "~/components/ui/button";

import type { Route } from "./+types/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Honey Trip" },
    { name: "description", content: " Sweet adventures start with planning " },
    { name: "theme-color", content: "#423839" }, // Add this line
  ];
}
export default function Landing() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button> Sweet adventures start with planning </Button>
      </div>
    </div>
  );
}
