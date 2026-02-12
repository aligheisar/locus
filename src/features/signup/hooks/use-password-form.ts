import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { signupFormSchema } from "@/features/signup/schemas/signup-form";
import { useSignup } from "@/features/signup/hooks/use-signup";

const usePasswordForm = () => {
  const { formData, updateData: updateFormData } = useSignup();
  const baseSchema = v.pick(signupFormSchema, ["password", "confirmPassword"]);

  const passwordSchema = v.pipe(
    baseSchema,
    v.forward(
      v.partialCheck(
        [["password"], ["confirmPassword"]],
        ({ confirmPassword, password }) => confirmPassword === password,
        "The passwords are not match.",
      ),
      ["confirmPassword"],
    ),
  );

  type PasswordFormSchema = v.InferOutput<typeof passwordSchema>;

  const form = useForm({
    defaultValues: {
      confirmPassword: formData.confirmPassword ?? "",
      password: formData.password ?? "",
    },
    resolver: valibotResolver(passwordSchema),
  });

  const handleFormSubmit = async (data: PasswordFormSchema) => {
    updateFormData(data);
  };

  return {
    form,
    handleFormSubmit,
  };
};

export { usePasswordForm };
