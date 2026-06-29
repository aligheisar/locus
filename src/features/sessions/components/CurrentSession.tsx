import { getCurrentSessionAction } from "@/server/actions/session.action";

import { SessionItem } from "@/features/sessions/components/SessionItem";

const CurrentSession = async () => {
  const session = await getCurrentSessionAction();

  return <SessionItem hideAction session={session} variant="muted" />;
};

export { CurrentSession };
