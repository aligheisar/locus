"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";

import type { RouteItemType } from "@/config/app-routes";
import { buttonVariants } from "@/components/ui/button";

const NavItem = (item: RouteItemType) => {
  const pathname = usePathname();

  return (
    <Link
      className={buttonVariants({ variant: "nav" })}
      data-active={
        item.href === "/"
          ? item.href === pathname
          : item.href === pathname
            ? true
            : pathname.includes(item.href.toString())
              ? "partial"
              : false
      }
      href={item.href}
      key={item.href.toString()}
    >
      {item.Icon && <HugeiconsIcon icon={item.Icon} />}
      {item.title}
    </Link>
  );
};

export { NavItem };
