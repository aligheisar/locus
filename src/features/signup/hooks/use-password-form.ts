import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "@formisch/react";
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

  const form = useForm({
    schema: passwordSchema,
    initialInput: {
      confirmPassword: formData.confirmPassword ?? "",
      password: formData.password ?? "",
    },
  });

  const handleFormSubmit: SubmitHandler<typeof passwordSchema> = async (
    data,
  ) => {
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
