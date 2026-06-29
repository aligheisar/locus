import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const Wrapper = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cn("container px-2 py-4", className)} {...props} />;
};

export { Wrapper };
