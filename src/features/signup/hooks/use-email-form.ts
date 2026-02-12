import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { signupFormSchema } from "@/features/signup/schemas/signup-form";
import { useSignup } from "@/features/signup/hooks/use-signup";

const useEmailForm = () => {
  const router = useRouter();
  const { formData, updateData: updateFormData } = useSignup();
  const emailSchema = v.pick(signupFormSchema, ["email"]);
  type EmailFormSchema = v.InferOutput<typeof emailSchema>;

  const form = useForm({
    defaultValues: {
      email: formData.email ?? "",
    },
    resolver: valibotResolver(emailSchema),
  });

  const handleFormSubmit = async (data: EmailFormSchema) => {
    updateFormData(data);

    startTransition(() => {
      router.push("/signup/password");
    });
  };

  return {
    form,
    handleFormSubmit,
  };
};

export { useEmailForm };
