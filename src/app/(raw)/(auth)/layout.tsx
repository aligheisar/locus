import { Main } from "@/components/Main";

const AuthLayout = ({ children }: LayoutProps<"/">) => {
  return <Main className="place-items-center">{children}</Main>;
};

export default AuthLayout;
