import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "@formisch/react";
import { asyncDebounce } from "@tanstack/pacer";
import { safeParse } from "valibot";

import { showToast } from "@/lib/show-toast";
import { handleError } from "@/utils/error";

import {
  isUsernameExist,
  signupUserAction,
} from "@/server/actions/auth.action";

import { useSignup } from "@/features/signup/hooks/use-signup";

import {
  getUsernameFormSchema,
  signupFormSchema,
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
    revalidate: "change",
    schema: usernameSchema,
    validate: "change",
    initialInput: {
      username: formData.username ?? "",
    },
  });

  const handleFormSubmit: SubmitHandler<typeof usernameSchema> = async (
    data,
  ) => {
    updateFormData(data);

    const validateUser = safeParse(signupFormSchema, {
      ...formData,
      username: data.username,
    });

    if (!validateUser.success) {
      startTransition(() => {
        router.push("/signup");
      });

      return;
    }

    const validatedUser = validateUser.output;

    const [error] = await signupUserAction(validatedUser);

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
