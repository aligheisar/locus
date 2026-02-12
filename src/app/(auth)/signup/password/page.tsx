import { ViewTransition } from "react";

import { PasswordForm } from "@/features/signup/components/form/Password";

const PasswordPage = () => {
  return (
    <ViewTransition name="signup-form">
      <PasswordForm />
    </ViewTransition>
  );
};

export default PasswordPage;
