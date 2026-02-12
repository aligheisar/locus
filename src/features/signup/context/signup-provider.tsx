"use client";

import { type ReactNode, useState } from "react";

import type { ContextValues } from "@/features/signup/types/signup-context";
import { signupContext } from "@/features/signup/context/signup-context";

const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<ContextValues["formData"]>({});

  const updateData: ContextValues["updateData"] = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const contextValues: ContextValues = { formData, updateData };
  return (
    <signupContext.Provider value={contextValues}>
      {children}
    </signupContext.Provider>
  );
};

export { SignupProvider };
