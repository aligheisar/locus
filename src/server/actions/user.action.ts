"use server";

import { err, ok } from "@/utils/error";

import { userService } from "@/server/containers/user.container";
import { getSessionAction } from "@/server/actions/session.action";

const getUserAction = async () => {
  const [error, session] = await getSessionAction();

  if (error) {
    const reason = error.reason;
    return err({ reason });
  }

  const [userError, user] = await userService.findBySessionId(session.id);

  if (userError) {
    const reason = userError.reason;
    return err({ reason });
  }

  return ok(user);
};

export { getUserAction };
