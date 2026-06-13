"use client";

import Link from "next/link";
import { Back } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { buttonVariants } from "@/components/ui/button";

const BackToProfile = () => {
  return (
    <Link
      className={buttonVariants({
        className: "rounded-full!",
        variant: "outline",
      })}
      href="/profile"
    >
      <HugeiconsIcon icon={Back} />
      Back to profile
    </Link>
  );
};

export { BackToProfile };
