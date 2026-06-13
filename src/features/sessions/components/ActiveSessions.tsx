import { getActiveSessionsAction } from "@/server/actions/session.action";

const ActiveSessions = async () => {
  const sessions = await getActiveSessionsAction();

  return sessions.map((item) => (
    <p key={item.id}>
      {Intl.DateTimeFormat("en", { dateStyle: "full" }).format(item.expiresAt)}
    </p>
  ));
};

export { ActiveSessions };
