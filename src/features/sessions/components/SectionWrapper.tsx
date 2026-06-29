import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const SectionWrapper = ({ className, ...props }: ComponentProps<"section">) => {
  return <section className={cn("grid gap-2", className)} {...props} />;
};

export { SectionWrapper };
