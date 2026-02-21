import type { SignupFormType } from "@/shared/schemas/signup-form";

type ContextValues = {
  formData: Partial<SignupFormType>;
  updateData: (data: Partial<SignupFormType>) => void;
};

export type { ContextValues };
