"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";

import type { RouteItemType } from "@/features/settings/config/settings-routes";

const SettingsNav = ({ routes }: { routes: readonly RouteItemType[] }) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5">
      {routes.map((item) => (
        <Link
          className={buttonVariants({
            className: "rounded-full!",
            variant: "nav",
          })}
          data-active={
            item.href === "/"
              ? item.href === pathname
              : pathname.endsWith(item.href.toString())
          }
          href={item.href}
          key={item.href.toString()}
        >
          {item.Icon && <HugeiconsIcon icon={item.Icon} />}
          {item.title}
        </Link>
      ))}
    </nav>
  );
};

export { SettingsNav };
