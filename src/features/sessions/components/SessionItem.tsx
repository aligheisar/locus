"use client";

import { type ComponentProps, startTransition } from "react";
import {
  BlockGameIcon,
  Dots,
  Laptop,
  Mobile,
  Tablet,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";

import { timeAgo } from "@/utils/time-ago";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { revokeSessionAction } from "@/server/actions/session.action";
import type { SessionsTableSelect } from "@/server/repositories/session.repository";

import {
  getDeviceCategory,
  getDeviceLabel,
} from "@/features/sessions/utils/user-agent-parser";

type Props = ComponentProps<typeof Item> & {
  session: SessionsTableSelect;
  hideAction?: boolean;
};

const SessionItem = ({ session, hideAction, ...props }: Props) => {
  const category = getDeviceCategory(session.userAgent);

  let Icon: HugeiconsIconProps["icon"];

  switch (category) {
    case "mobile":
      Icon = Mobile;
      break;
    case "desktop":
      Icon = Laptop;
      break;
    case "tablet":
      Icon = Tablet;
      break;
    default:
      Icon = BlockGameIcon;
  }

  return (
    <Item {...props}>
      <ItemMedia variant="icon">
        <HugeiconsIcon icon={Icon} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{getDeviceLabel(session.userAgent)}</ItemTitle>
        <ItemDescription>{session.ipAddress}</ItemDescription>
      </ItemContent>
      {!hideAction && (
        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button size="icon" variant="outline" />}
            >
              <HugeiconsIcon icon={Dots} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  startTransition(async () => {
                    await revokeSessionAction(session.id);
                  });
                }}
                variant="destructive"
              >
                Revoke
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      )}
      <ItemFooter>
        <ItemDescription suppressHydrationWarning>
          Last seen: {timeAgo(session.lastSeenAt)}
        </ItemDescription>
      </ItemFooter>
    </Item>
  );
};

export { SessionItem };
