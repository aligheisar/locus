import type { LinkProps } from "next/link";
import { Home, LogIn, UserIcon } from "@hugeicons/core-free-icons";
import type { HugeiconsIconProps } from "@hugeicons/react";
import { type InferRouteItem, RouteMap } from "@route-map/react";

const appRoutes = new RouteMap<
  "desktop" | "mobile",
  LinkProps<string>["href"],
  HugeiconsIconProps["icon"]
>()
  .add(["desktop", "mobile"], {
    href: "/",
    Icon: Home,
    order: 1,
    title: { desktop: "Home", mobile: "House" },
  })
  .add(["desktop", "mobile"], {
    auth: "authenticated",
    href: "/profile",
    Icon: UserIcon,
    order: 0,
    title: "Profile",
  })
  .add(["desktop", "mobile"], {
    auth: "guest",
    href: "/login",
    Icon: LogIn,
    order: 0,
    title: "Login",
  })
  .build();

export { appRoutes };

export type RouteItemType = InferRouteItem<typeof appRoutes>;
