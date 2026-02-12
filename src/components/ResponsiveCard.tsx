import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import * as Default from "@/components/ui/card";

const Card = (props: ComponentProps<typeof Default.Card>) => {
  return (
    <Default.Card
      {...props}
      className={cn(
        "w-full max-w-md max-sm:max-w-none max-sm:bg-transparent max-sm:ring-0",
        props.className,
      )}
    />
  );
};

const CardTitle = (props: ComponentProps<typeof Default.CardTitle>) => {
  return (
    <Default.CardTitle
      {...props}
      className={cn("max-sm:text-xl", props.className)}
    />
  );
};

export { Card, CardTitle };
