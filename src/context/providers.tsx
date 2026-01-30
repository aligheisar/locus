import type { ReactNode } from "react";

import { ThemeProvider } from "@/context/theme-provider";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export { Providers };
