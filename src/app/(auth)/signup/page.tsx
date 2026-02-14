import { ViewTransition } from "react";

import { EmailForm } from "@/features/signup/components/form/Email";

const EmailPage = async () => {
  return (
    <ViewTransition name="login-signup-forms">
      <ViewTransition name="signup-form">
        <EmailForm />
      </ViewTransition>
    </ViewTransition>
  );
};

export default EmailPage;
