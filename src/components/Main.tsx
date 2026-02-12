import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const Main = (props: ComponentProps<"main">) => {
  return <main {...props} className={cn("grid", props.className)} />;
};

export { Main };
