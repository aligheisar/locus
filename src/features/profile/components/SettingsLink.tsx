import Link from "next/link";
import { Settings } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";

const SettingsLink = () => {
  return (
    <Button
      nativeButton={false}
      render={
        <Link href="/profile/settings">
          <HugeiconsIcon icon={Settings} />
        </Link>
      }
      size="icon-lg"
      variant="outline"
    />
  );
};

export { SettingsLink };
