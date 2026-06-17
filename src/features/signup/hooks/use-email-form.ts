import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { showToast } from "@/lib/show-toast";

import { isEmailExist } from "@/server/actions/auth.action";

import { useSignup } from "@/features/signup/hooks/use-signup";

import { signupFormSchema } from "@/shared/schemas/signup-form";

const useEmailForm = () => {
  const router = useRouter();
  const { formData, updateData: updateFormData } = useSignup();
  const emailSchema = v.pick(signupFormSchema, ["email"]);
  type EmailFormSchema = v.InferOutput<typeof emailSchema>;

  const form = useForm({
    resolver: valibotResolver(emailSchema),
    defaultValues: {
      email: formData.email ?? "",
    },
  });

  const handleFormSubmit = async (data: EmailFormSchema) => {
    const [error, flag] = await isEmailExist(data.email);

    if (error) {
      showToast("error", "somethingWentWrong");
      return;
    }

    if (flag) {
      showToast("error", "youAlreadyRegistered");
      return;
    }

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
