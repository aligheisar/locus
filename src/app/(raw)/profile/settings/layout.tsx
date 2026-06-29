import { Main } from "@/components/Main";
import { Wrapper } from "@/components/Wrapper";

import { SettingsSidebar } from "@/features/settings/components/layout/SettingsSidebar";

const SettingsLayout = ({ children }: LayoutProps<"/profile/settings">) => {
  return (
    <Main className="grid-cols-[auto_1fr]">
      <SettingsSidebar />
      <Wrapper>{children}</Wrapper>
    </Main>
  );
};

export default SettingsLayout;
