"use client";

import { Moon, Sun } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeSwitcher() {
  const { setTheme } = useTheme();

  const itemKeys = ["light", "dark", "system"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={(props) => {
          return <Button variant="outline" {...props} />;
        }}
      >
        <HugeiconsIcon
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          icon={Sun}
        />
        <HugeiconsIcon
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          icon={Moon}
        />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {itemKeys.map((item, index) => (
          <DropdownMenuItem
            key={item}
            onClick={() => setTheme(itemKeys[index] ?? "system")}
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
