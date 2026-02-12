import type { SignupFormType } from "@/features/signup/schemas/signup-form";

type ContextValues = {
  formData: Partial<SignupFormType>;
  updateData: (data: Partial<SignupFormType>) => void;
};

export type { ContextValues };
