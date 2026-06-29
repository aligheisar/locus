import { Button } from "@/components/ui/button";
import { ItemGroup } from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";

import { getActiveSessionsAction } from "@/server/actions/session.action";

import { SectionWrapper } from "@/features/sessions/components/SectionWrapper";
import {
  SessionItem,
  SessionItemSkeleton,
} from "@/features/sessions/components/SessionItem";

const ActiveSessions = async () => {
  const sessions = await getActiveSessionsAction();

  if (!sessions.length) return null;

  return (
    <SectionWrapper>
      <div className="flex items-center justify-between">
        <h2>Active Sessions</h2>
        <Button size="sm" variant="destructive">
          Revoke All
        </Button>
      </div>
      <ItemGroup className="gap-2">
        {sessions.map((item) => (
          <SessionItem key={item.id} session={item} variant="outline" />
        ))}
      </ItemGroup>
    </SectionWrapper>
  );
};

const ActiveSessionsSkeleton = () => {
  return (
    <SectionWrapper>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-35" />
        <Skeleton className="h-7 w-21.25" />
      </div>

      <ItemGroup className="gap-2">
        {[1, 2].map((item) => (
          <SessionItemSkeleton key={item} variant="outline" />
        ))}
      </ItemGroup>
    </SectionWrapper>
  );
};

export { ActiveSessions, ActiveSessionsSkeleton };
