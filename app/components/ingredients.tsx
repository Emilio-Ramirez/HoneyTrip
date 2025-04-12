import { useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { type Ingredient } from "app/data/ingredient-data"; // Move sidebarDAta to this file
import { ingredientList } from "app/data/ingredient-data"; // Move sidebarDAta to this file
import { X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// TODO: Fix the number of each ingredient
// TODO: Remove the selected values from the list so the user can see new values
export function Ingredients() {
  const [open, setOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient[]>([]);
  return (
    <div>
      <div className="flex items-center space-x-4 pb-5">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              <>+ Set Ingredient </>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Change status..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {ingredientList.map((status) => (
                    <CommandItem
                      key={status.value}
                      value={status.value}
                      onSelect={() => {
                        const ingredient = {
                          value: status.value,
                          label: status.label,
                        };

                        // Check if the ingredient is already selected
                        const isAlreadySelected = selectedIngredient.some(
                          (item) => item.value === ingredient.value
                        );

                        if (!isAlreadySelected) {
                          setSelectedIngredient([
                            ...selectedIngredient,
                            ingredient,
                          ]);
                          console.log("Updated ingredient:", [
                            ...selectedIngredient,
                            ingredient,
                          ]);
                        }
                        setOpen(false);
                      }}
                    >
                      {status.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {selectedIngredient.map((ingredient, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-[150px] justify-start"
            type="button"
            onClick={() => {
              const updatedIngredient = selectedIngredient.filter(
                (item) => item.value !== ingredient.value
              );
              setSelectedIngredient(updatedIngredient);
              console.log("Updated ingredient:", updatedIngredient);
            }}
          >
            <>{ingredient.label}</>
            <X className="ml-auto" />
          </Button>
        ))}
      </div>
    </div>
  );
}
