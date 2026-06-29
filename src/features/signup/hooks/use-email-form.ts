import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "@formisch/react";
import * as v from "valibot";

import { showToast } from "@/lib/show-toast";

import { isEmailExist } from "@/server/actions/auth.action";

import { useSignup } from "@/features/signup/hooks/use-signup";

import { signupFormSchema } from "@/shared/schemas/signup-form";

const useEmailForm = () => {
  const router = useRouter();
  const { formData, updateData: updateFormData } = useSignup();
  const emailSchema = v.pick(signupFormSchema, ["email"]);

  const form = useForm({
    schema: emailSchema,
    initialInput: {
      email: formData.email ?? "",
    },
  });

  const handleFormSubmit: SubmitHandler<typeof emailSchema> = async (data) => {
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
