import { AspectRatio } from "~/components/ui/aspect-ratio";
import type { Route } from "./+types/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Honey Trip" },
    { name: "description", content: "Sweet adventures start with planning" },
    { name: "theme-color", content: "#423839" },
  ];
}

export default function Landing() {
  return (
    <div className="h-auto flex flex-col ">
      <div className="p-10 md:p-20 text-center">
        <h1 className="font-bold text-3xl lg:text-4xl text-primary mb-4">
          The climbing community's answer to{" "}
          <span className="text-lavender underline decoration-primary">
            'What's for dinner?'
          </span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between px-10 pb-10 gap-5">
        <div className="w-full max-w-2xl">
          <AspectRatio ratio={16 / 10}>
            <img
              src="/alexMegosEating.jpg"
              alt="Alex Megos enjoying a meal"
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="max-w-xl text-center font-bold text-muted text-2xl md:p-10">
          <h2 className="text-secondary mb-8 text-3xl">Honey Trip:</h2>
          <h2 className="">
            <span></span>Meal planning that works as hard as you climb.
          </h2>
        </div>
      </div>

      <div className="bg-secondary p-10 min-h-[30vh]">
        <h2 className="text-center text-3xl font-bold pb-10 text-primary tracking-tight underline decoration-background">
          Future Features
        </h2>
        <div className="flex flex-col md:flex-row justify-around gap-8 px-4">
          <ul className="list-inside  space-y-4  text-background font-medium">
            <li>Trip planning with dates, location, and group size</li>
            <li>Kitchen/accommodation type selection</li>
            <li>Personal recipe library</li>
            <li>Shopping list generation</li>
          </ul>
          <ul className="list-inside  space-y-4  text-background font-medium">
            <li>Offline data storage</li>
            <li>Basic user profiles</li>
            <li>Mobile-responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
