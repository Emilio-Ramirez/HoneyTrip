import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";

export default function Recipes() {
  return (
    <div className="flex flex-col flex-grow items-center  p-10">
      <div className="flex justify-end w-full ">
        <Link to="/NewRecipe" prefetch="intent">
          <Button className="bg-primary">New Recipe</Button>
        </Link>
      </div>
      <div>
        <h1>Table of recipes</h1>
      </div>
      <Outlet />
    </div>
  );
}
