import { ItemGroup } from "@/components/ui/item";

import { getActiveSessionsAction } from "@/server/actions/session.action";

import { SessionItem } from "@/features/sessions/components/SessionItem";

const ActiveSessions = async () => {
  const sessions = await getActiveSessionsAction();
  return (
    <ItemGroup className="gap-2">
      {sessions.map((item) => (
        <SessionItem key={item.id} session={item} variant="outline" />
      ))}
    </ItemGroup>
  );
};

export { ActiveSessions };
