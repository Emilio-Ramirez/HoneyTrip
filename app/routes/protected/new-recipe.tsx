import { Label } from "@radix-ui/react-dropdown-menu";
import { Form } from "react-router";
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

export default function NewRecipie() {
  return (
    <div className="flex flex-col flex-grow items-center justify-center h-full">
      <Form method="post" className="w-full max-w-md">
        <div className="grid p-10 gap-10 border-accent border-2 rounded-xl">
          <div>
            <Label className="text-muted">Name your recipe</Label>
            <Input id="name" name="name" type="text" />
          </div>
          <div>
            <Label className="text-muted">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your recipe..."
              className="resize-none"
            />
          </div>
          <div>
            <Select>
              <Label className="text-muted">Servings</Label>
              <SelectTrigger className="w-[180px]">
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select..."></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Minutes</SelectLabel>
                  {[15, 30, 45, "60+"].map((time) => (
                    <SelectItem key={time} value={time.toString()}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select>
              <Label className="text-muted">Kitchen requirements</Label>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Kitchen requirements</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Update Profile</Button>
        </div>
      </Form>
    </div>
  );
}
