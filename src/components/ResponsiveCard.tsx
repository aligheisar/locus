import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const ResponsiveCard = (props: ComponentProps<typeof Card>) => {
  return (
    <Card
      {...props}
      className={cn(
        "w-full max-w-md max-sm:max-w-none max-sm:bg-transparent max-sm:ring-0",
        props.className,
      )}
    />
  );
};

export { ResponsiveCard };
