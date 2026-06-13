import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { Main } from "@/components/Main";

const AppLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
};

export default AppLayout;
