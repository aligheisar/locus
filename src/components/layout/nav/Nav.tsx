import { appRoutes } from "@/config/app-routes";
import { NavItem } from "@/components/layout/nav/NavItem";

import { getUserAction } from "@/server/actions/user.action";

const Nav = async () => {
  const [, user] = await getUserAction();
  const routes = appRoutes.getDesktopRoutes(user !== null);

  return (
    <nav className="flex flex-col justify-center gap-0.5">
      {routes.map((item) => (
        <NavItem key={item.href.toString()} {...item} />
      ))}
    </nav>
  );
};

export { Nav };
