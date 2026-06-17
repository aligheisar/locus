import { useRouter } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";

import { showToast } from "@/lib/show-toast";
import { handleError } from "@/utils/error";

import { loginUserAction } from "@/server/actions/auth.action";

import {
  type LoginFormType,
  loginFormSchema,
} from "@/shared/schemas/login-form";

const useLoginForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: valibotResolver(loginFormSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data: LoginFormType) => {
    const [error] = await loginUserAction(data);

    if (!error) {
      router.push("/");
      return;
    }

    handleError(error.reason, {
      INVALID_CREDENTIALS: () => {
        showToast("error", "invalidCredentials");
      },
      INVALID_INPUT: () => {
        showToast("error", "invalidInput");
      },
      UNEXPECTED_ERROR: () => {
        showToast("error", "somethingWentWrong");
      },
      USER_NOT_EXIST: () => {
        showToast("error", "userNotExist");
      },
    });
  };

  return {
    form,
    handleFormSubmit,
  };
};

export { useLoginForm };
