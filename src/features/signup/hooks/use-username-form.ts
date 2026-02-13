import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

import { showToast } from "@/lib/show-toast";

import { signupFormSchema } from "@/features/signup/schemas/signup-form";
import { useSignup } from "@/features/signup/hooks/use-signup";

import { signupUserAction } from "@/actions/auth";
import { isUsernameExist } from "@/actions/profile";

const useUsernameForm = () => {
  const router = useRouter();
  const { formData, updateData: updateFormData } = useSignup();
  const usernameSchema = v.pick(signupFormSchema, ["username"]);
  type UsernameFormSchema = v.InferOutput<typeof usernameSchema>;

  const form = useForm({
    defaultValues: {
      username: formData.username ?? "",
    },
    resolver: valibotResolver(usernameSchema),
  });

  const handleFormSubmit = async (data: UsernameFormSchema) => {
    if (await isUsernameExist(data.username)) {
      showToast("error", "usernameTaken");
      return;
    }

    updateFormData(data);

    await signupUserAction({ ...formData, username: data.username });

    startTransition(() => {
      router.push("/");
    });
  };

  return {
    form,
    handleFormSubmit,
  };
};

export { useUsernameForm };
