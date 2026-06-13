import { getCurrentSessionAction } from "@/server/actions/session.action";

const CurrentSession = async () => {
  const session = await getCurrentSessionAction();

  return (
    <div>
      <h3>Current session.</h3>
      <div>
        <h4>{session.userAgent}</h4>
        {session.ipAddress && <span>ip: {session.ipAddress}</span>}
      </div>
    </div>
  );
};

export { CurrentSession };
