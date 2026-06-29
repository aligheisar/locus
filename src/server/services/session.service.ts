import { err, ok } from "@/utils/error";

import type { DbClient } from "@/server/db";
import type { SessionRepository } from "@/server/repositories/session.repository";
import type { TokenService } from "@/server/services/token.service";

class SessionService {
  constructor(
    private sessionRepo: SessionRepository,
    private tokenService: TokenService,
  ) {}

  async create(
    userId: string,
    {
      ipAddress,
      userAgent,
    }: { userAgent: string | null; ipAddress: string | null },
    client?: DbClient,
  ) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    try {
      const [{ sessionId }] = await this.sessionRepo.create(
        {
          expiresAt,
          ipAddress,
          userAgent,
          userId,
        },
        client,
      );

      const session = await this.tokenService.encrypt({
        sessionId,
      });

      return ok(session);
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }

  async verify(encryptedSession: string) {
    const session = await this.tokenService.decrypt(encryptedSession);

    if (!session) {
      return err({ reason: "INVALID_SESSION" });
    }

    const sessionId = session.sessionId as string;

    const repoSession = await this.sessionRepo.findSession(sessionId);
    if (!repoSession) {
      return err({ reason: "INVALID_SESSION" });
    }

    await this.sessionRepo.touch(repoSession.id);
    return ok(repoSession);
  }

  async revoke(sessionId: string, userId: string) {
    try {
      await this.sessionRepo.revoke(sessionId, userId);
      return ok(null);
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }

  async findActiveSessions(userId: string, currentSessionId: string) {
    try {
      const sessions = await this.sessionRepo.findActiveSessions(
        userId,
        currentSessionId,
      );
      return ok(sessions);
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }

  async findRevokedSessions(userId: string) {
    try {
      const sessions = await this.sessionRepo.findRevokedSessions(userId);
      return ok(sessions);
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }

  async findSession(sessionId: string) {
    try {
      const sessions = await this.sessionRepo.findSession(sessionId);
      return ok(sessions);
    } catch {
      return err({ reason: "UNEXPECTED_ERROR" });
    }
  }
}

export { SessionService };
