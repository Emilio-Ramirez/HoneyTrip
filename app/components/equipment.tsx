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
import { type Equipment } from "app/data/equipment-data"; // Move sidebarDAta to this file
import { equipmentList } from "app/data/equipment-data"; // Move sidebarDAta to this file

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

// TODO: Fix the number of each equipment
export function Equipment() {
  const [open, setOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>([]);
  return (
    <div>
      <div className="flex items-center space-x-4 pb-5">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-start">
              <>+ Set Equipment </>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="right" align="start">
            <Command>
              <CommandInput placeholder="Change status..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {equipmentList.map((status) => (
                    <CommandItem
                      key={status.value}
                      value={status.value}
                      onSelect={() => {
                        const equipment = {
                          value: status.value,
                          label: status.label,
                        };

                        // Check if the equipment is already selected
                        const isAlreadySelected = selectedEquipment.some(
                          (item) => item.value === equipment.value
                        );

                        if (!isAlreadySelected) {
                          setSelectedEquipment([
                            ...selectedEquipment,
                            equipment,
                          ]);
                          console.log("Updated equipment:", [
                            ...selectedEquipment,
                            equipment,
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
        {selectedEquipment.map((equipment, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-[150px] justify-start"
            type="button"
            onClick={() => {
              const updatedEquipment = selectedEquipment.filter(
                (item) => item.value !== equipment.value
              );
              setSelectedEquipment(updatedEquipment);
              console.log("Updated equipment:", updatedEquipment);
            }}
          >
            <>{equipment.label}</>
          </Button>
        ))}
      </div>
    </div>
  );
}
