import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { signupFormSchema } from "@/features/signup/schemas/signup-form";

const useEmailForm = () => {
  const router = useRouter();
  const emailSchema = v.pick(signupFormSchema, ["email"]);
  type EmailFormSchema = v.InferOutput<typeof emailSchema>;

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: valibotResolver(emailSchema),
  });

  const handleFormSubmit = async (data: EmailFormSchema) => {
    console.log(data);

    startTransition(() => {
      router.push("/signup/generate-password");
    });
  };

  return {
    form,
    handleFormSubmit,
  };
};

export { useEmailForm };
