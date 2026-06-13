import { getRevokedSessionsAction } from "@/server/actions/session.action";

const RevokedSessions = async () => {
  const sessions = await getRevokedSessionsAction();

  return sessions.map((item) => (
    <p key={item.id}>
      {Intl.DateTimeFormat("en", { dateStyle: "full" }).format(item.expiresAt)}
    </p>
  ));
};

export { RevokedSessions };
