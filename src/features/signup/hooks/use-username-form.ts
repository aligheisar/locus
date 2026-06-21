import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { asyncDebounce } from "@tanstack/pacer";
import { useForm } from "react-hook-form";

import { showToast } from "@/lib/show-toast";
import { handleError } from "@/utils/error";

import {
  isUsernameExist,
  signupUserAction,
} from "@/server/actions/auth.action";

import { useSignup } from "@/features/signup/hooks/use-signup";

import {
  getUsernameFormSchema,
  type UsernameFormType,
} from "@/shared/schemas/signup-form";

const useUsernameForm = () => {
  const router = useRouter();
  const { formData, updateData: updateFormData } = useSignup();

  const debouncedChecker = asyncDebounce(isUsernameExist, { wait: 200 });

  const usernameSchema = getUsernameFormSchema(async (input) => {
    const result = await debouncedChecker(input);

    if (!result) return false;

    if (result[0]) {
      showToast("error", "somethingWentWrong");
      return false;
    }

    return !result[1];
  });

  const form = useForm({
    mode: "onChange",
    resolver: valibotResolver(usernameSchema),
    defaultValues: {
      username: formData.username ?? "",
    },
  });

  const handleFormSubmit = async (data: UsernameFormType) => {
    updateFormData(data);

    const [error] = await signupUserAction({
      ...formData,
      username: data.username,
    });

    if (!error) {
      startTransition(() => {
        router.push("/");
      });

      return;
    }

    handleError(error.reason, {
      INVALID_INPUT: () => showToast("error", "invalidInput"),
      UNEXPECTED_ERROR: () => showToast("error", "somethingWentWrong"),
    });
  };

  return {
    form,
    handleFormSubmit,
  };
};

export { useUsernameForm };
