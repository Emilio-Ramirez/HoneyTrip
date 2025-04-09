import { Label } from "@radix-ui/react-dropdown-menu";
import { Form } from "react-router";
import { Equipment } from "~/components/equipment";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

export default function NewRecipe() {
  return (
    <div className="flex justify-center">
      <Form method="post" className="w-full max-w-md">
        <div className="p-10 border-accent border-2 rounded-xl">
          <Label className="text-secondary border-b-2 pb-2 mb-2">
            Basic Recipe Information
          </Label>
          <div className="grid gap-5 pb-5">
            <div>
              <Label className="text-muted">Name your recipe</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Name your recipe..."
                required
              />
            </div>
            <div>
              <Label className="text-muted">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your recipe..."
                className="resize-none"
                required
              />
            </div>
            <div>
              <Select>
                <Label className="text-muted">Servings</Label>
                <SelectTrigger className="w-[180px]" name="servings">
                  <SelectValue placeholder="Select..."></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Number of Servings</SelectLabel>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <Label className="text-muted">Prep Time</Label>
                <SelectTrigger className="w-[180px]" name="prepTime">
                  <SelectValue placeholder="Select..."></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Minutes</SelectLabel>
                    {[15, 30, 45, "60+"].map((prepTime) => (
                      <SelectItem key={prepTime} value={prepTime.toString()}>
                        {prepTime}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <Label className="text-muted">Cooking Time</Label>
                <SelectTrigger className="w-[180px]" name="cookingTime">
                  <SelectValue placeholder="Select..."></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Minutes</SelectLabel>
                    {[15, 30, 45, "60+"].map((cookingTime) => (
                      <SelectItem
                        key={cookingTime}
                        value={cookingTime.toString()}
                      >
                        {cookingTime}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <Label className="text-muted">Difficulty Level</Label>
                <SelectTrigger className="w-[180px]" name="difficulty">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Label className="text-secondary border-b-2 pb-2 mb-2">
            Kitchen Requirements
          </Label>
          <div className="grid gap-5 pb-5">
            <div>
              <Select>
                <Label className="text-muted">Kitchen Type</Label>
                <SelectTrigger className="w-[180px]" name="kitchenType">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Kitchen Type</SelectLabel>
                    <SelectItem value="FullKitchen">Full Kitchen</SelectItem>
                    <SelectItem value="BasicKitchen">Basic Kitchen</SelectItem>
                    <SelectItem value="CampStove">Camp Stove</SelectItem>
                    <SelectItem value="NoCooking">No Cooking</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <Label className="text-muted">Equipment</Label>
                <Equipment />
              </Select>
            </div>
          </div>

          <Button type="submit">Create Recipe</Button>
        </div>
      </Form>
    </div>
  );
}
