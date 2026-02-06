import { useForm } from "@tanstack/react-form";

import { signupFormSchema } from "@/features/sign-up/schemas/signup-form";

const useSignupForm = () => {
  const form = useForm({
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
      username: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
    validators: {
      onSubmit: signupFormSchema,
    },
  });
  return {
    form,
  };
};

export { useSignupForm };
