"use server";

import { err, ok } from "@/utils/error";

import { getSessionAction } from "@/server/actions/session.action";
import { userService } from "@/server/containers/user.container";

const getUserAction = async () => {
  const [error, session] = await getSessionAction();

  if (error) {
    const reason = error.reason;
    return err({ reason });
  }

  const [userError, user] = await userService.findBySessionId(
    session.sessionId,
  );

  if (userError) {
    const reason = userError.reason;
    return err({ reason });
  }

  return ok(user);
};

export { getUserAction };
