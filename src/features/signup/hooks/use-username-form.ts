import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { asyncDebounce } from "@tanstack/pacer";
import { useForm } from "react-hook-form";

import {
  getUsernameFormSchema,
  type UsernameFormType,
} from "@/features/signup/schemas/signup-form";
import { useSignup } from "@/features/signup/hooks/use-signup";

import { isUsernameExist, signupUserAction } from "@/actions/auth";

const useUsernameForm = () => {
  const router = useRouter();
  const { formData, updateData: updateFormData } = useSignup();

  const debouncedChecker = asyncDebounce(isUsernameExist, { wait: 200 });

  const usernameSchema = getUsernameFormSchema(
    async (input) => !(await debouncedChecker(input)),
  );

  const form = useForm({
    defaultValues: {
      username: formData.username ?? "",
    },
    resolver: valibotResolver(usernameSchema),
  });

  const handleFormSubmit = async (data: UsernameFormType) => {
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
