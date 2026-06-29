"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { err, ok } from "@/utils/error";

import { sessionService } from "@/server/containers/session.container";

const revokeSessionAction = async (sessionId: string) => {
  const [sessionError, session] = await getSessionAction();
  if (sessionError) redirect("/login");

  const [error] = await sessionService.revoke(sessionId, session.userId);

  revalidatePath("/profile/settings/sessions");

  if (error) {
    return err({ reason: error.reason });
  }
};

const getRawSession = async () => {
  const cookieStore = await cookies();
  const rawSession = cookieStore.get("session")?.value;

  if (!rawSession) return err({ reason: "SESSION_MISSING" });

  return ok(rawSession);
};

const getSessionAction = async () => {
  const [rawSessionError, rawSession] = await getRawSession();

  if (rawSessionError) {
    const reason = rawSessionError.reason;
    return err({ reason });
  }

  const [error, session] = await sessionService.verify(rawSession);

  if (error) {
    const reason = error.reason;
    return err({ reason });
  }

  return ok(session);
};

const getActiveSessionsAction = async () => {
  const [sessionError, session] = await getSessionAction();

  if (sessionError) redirect("/login");

  const [activeSessionsError, activeSessions] =
    await sessionService.findActiveSessions(session.userId, session.id);

  if (activeSessionsError) {
    redirect("/login");
  }

  return activeSessions;
};

const getRevokedSessionsAction = async () => {
  const [sessionError, session] = await getSessionAction();

  if (sessionError) redirect("/login");

  const [revokedSessionError, revokedSessions] =
    await sessionService.findRevokedSessions(session.userId);

  if (revokedSessionError) redirect("/login");

  return revokedSessions;
};

const getCurrentSessionAction = async () => {
  const [error, session] = await getSessionAction();

  if (error) redirect("/login");

  return session;
};

export {
  getActiveSessionsAction,
  getCurrentSessionAction,
  getRevokedSessionsAction,
  getSessionAction,
  revokeSessionAction,
};
