import { Main } from "@/components/Main";

import { SignupProvider } from "@/features/signup/context/signup-provider";

const SignupLayout = ({ children }: LayoutProps<"/signup">) => {
  return (
    <Main className="place-items-center">
      <SignupProvider>{children}</SignupProvider>
    </Main>
  );
};

export default SignupLayout;
