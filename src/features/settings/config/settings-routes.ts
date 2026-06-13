import type { LinkProps } from "next/link";
import { Phone, Settings } from "@hugeicons/core-free-icons";
import type { HugeiconsIconProps } from "@hugeicons/react";
import { type InferRouteItem, RouteMap } from "@route-map/react";

const settingsRoutes = new RouteMap<
  "desktop" | "mobile",
  LinkProps<string>["href"],
  HugeiconsIconProps["icon"]
>()
  .add(["desktop", "mobile"], {
    href: "/profile/settings",
    Icon: Settings,
    order: 0,
    title: "General",
  })
  .add(["desktop", "mobile"], {
    href: "/profile/settings/sessions",
    Icon: Phone,
    order: 1,
    title: "Sessions",
  })
  .build();

export { settingsRoutes };

export type RouteItemType = InferRouteItem<typeof settingsRoutes>;
