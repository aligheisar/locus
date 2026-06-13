import { settingsRoutes } from "@/features/settings/config/settings-routes";
import { BackToProfile } from "@/features/settings/components/BackToProfile";
import { SettingsNav } from "@/features/settings/components/layout/SettingsNav";

const SettingsSidebar = async () => {
  const routes = settingsRoutes.getDesktopRoutes(false);

  return (
    <aside className="flex flex-col gap-2 px-2 py-4">
      <BackToProfile />
      <SettingsNav routes={routes} />
    </aside>
  );
};

export { SettingsSidebar };
