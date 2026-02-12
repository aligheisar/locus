"use client";

import { use } from "react";

import { signupContext } from "@/features/signup/context/signup-context";

const useSignup = () => {
  const context = use(signupContext);
  if (!context) throw Error("Context should be used inside its provider");
  return context;
};

export { useSignup };
