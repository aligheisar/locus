import { Main } from "@/components/Main";

import { SettingsSidebar } from "@/features/settings/components/layout/SettingsSidebar";

const SettingsLayout = ({ children }: LayoutProps<"/profile/settings">) => {
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <SettingsSidebar />
      <Main>{children}</Main>
    </div>
  );
};

export default SettingsLayout;
