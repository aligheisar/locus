import { ViewTransition } from "react";

import { SignupProvider } from "@/features/signup/context/signup-provider";

const SignupLayout = ({ children }: LayoutProps<"/signup">) => {
  return (
    <ViewTransition name="login-signup-forms">
      <SignupProvider>{children}</SignupProvider>
    </ViewTransition>
  );
};

export default SignupLayout;
