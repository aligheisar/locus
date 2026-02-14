import { useRouter } from "next/navigation";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";

import {
  type LoginFormType,
  loginFormSchema,
} from "@/features/login/schemas/login-form";

const useLoginForm = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
    resolver: valibotResolver(loginFormSchema),
  });

  const handleFormSubmit = async (data: LoginFormType) => {
    console.log(data);
    router.push("/");
  };

  return {
    form,
    handleFormSubmit,
  };
};

export { useLoginForm };
