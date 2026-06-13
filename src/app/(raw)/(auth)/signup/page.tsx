import { ViewTransition } from "react";

import { EmailForm } from "@/features/signup/components/form/Email";

const EmailPage = async () => {
  return (
    <ViewTransition name="signup-form">
      <EmailForm />
    </ViewTransition>
  );
};

export default EmailPage;
