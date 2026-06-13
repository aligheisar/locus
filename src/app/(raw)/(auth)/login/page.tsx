import { ViewTransition } from "react";

import { LoginForm } from "@/features/login/components/LoginForm";

const LoginPage = () => {
  return (
    <ViewTransition name="login-signup-forms">
      <LoginForm />
    </ViewTransition>
  );
};

export default LoginPage;
