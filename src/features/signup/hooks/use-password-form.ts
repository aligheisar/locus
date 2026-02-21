import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { useSignup } from "@/features/signup/hooks/use-signup";

import { signupFormSchema } from "@/shared/schemas/signup-form";

const usePasswordForm = () => {
  const router = useRouter();
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

    startTransition(() => {
      router.push("/signup/username");
    });
  };

  return {
    form,
    handleFormSubmit,
  };
};

export { usePasswordForm };
