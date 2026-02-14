import { ViewTransition } from "react";

import { Main } from "@/components/Main";

import { LoginForm } from "@/features/login/components/LoginForm";

const LoginPage = () => {
  return (
    <Main className="place-items-center">
      <ViewTransition name="login-signup-forms">
        <LoginForm />
      </ViewTransition>
    </Main>
  );
};

export default LoginPage;
