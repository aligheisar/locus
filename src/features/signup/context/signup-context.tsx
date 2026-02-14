import { createContext } from "react";

import type { ContextValues } from "@/features/signup/types/signup-context";

const signupContext = createContext<ContextValues | null>(null);

export { signupContext };
