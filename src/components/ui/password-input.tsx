"use client";

import { type ComponentProps, useState } from "react";
import { EyeIcon, EyeOff } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export function PasswordInput(
  props: Omit<ComponentProps<typeof Input>, "type">,
) {
  const [showPassword, setShowPassword] = useState(false);

  const icon = showPassword ? EyeOff : EyeIcon;

  return (
    <InputGroup>
      <InputGroupInput {...props} type={showPassword ? "text" : "password"} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          onClick={() => setShowPassword((p) => !p)}
          size="icon-xs"
        >
          <HugeiconsIcon className="size-4.5" icon={icon} />
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
