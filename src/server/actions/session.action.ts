"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { err, ok } from "@/utils/error";

import { sessionService } from "@/server/containers/session.container";
import { getUserAction } from "@/server/actions/user.action";

const getSessionAction = async () => {
  const cookieStore = await cookies();
  const rawSession = cookieStore.get("session")?.value;

  if (!rawSession) return err({ reason: "SESSION_MISSING" });

  const [error, session] = await sessionService.verify(rawSession);

  if (error) {
    const reason = error.reason;
    return err({ reason });
  }

  return ok(session);
};

const getActiveSessionsAction = async () => {
  const [error, user] = await getUserAction();

  if (error || !user.id) redirect("/login");

  const [sessionError, sessions] = await sessionService.findActiveSessions(
    user.id,
  );

  if (sessionError) {
    redirect("/login");
  }

  return sessions;
};

const getRevokedSessionsAction = async () => {
  const [error, user] = await getUserAction();

  if (error || !user.id) redirect("/login");

  const [sessionError, sessions] = await sessionService.findRevokedSessions(
    user.id,
  );

  if (sessionError) redirect("/login");

  return sessions;
};

const getCurrentSessionAction = async () => {
  const [error, cookieSession] = await getSessionAction();

  if (error) redirect("/login");

  const [sessionError, session] = await sessionService.findSession(
    cookieSession.sessionId,
  );

  if (sessionError) redirect("/login");

  return session;
};

export {
  getActiveSessionsAction,
  getCurrentSessionAction,
  getRevokedSessionsAction,
  getSessionAction,
};
