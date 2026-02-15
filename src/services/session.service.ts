import type { SessionRepository } from "@/repositories/session.repository";
import type { TokenService } from "@/services/token.service";

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
  ) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const [{ sessionId }] = await this.sessionRepo.create({
      expiresAt,
      ipAddress,
      userAgent,
      userId,
    });

    const session = await this.tokenService.encrypt({
      sessionId,
    });

    return session;
  }

  async verify(encryptedSession: string) {
    const session = await this.tokenService.decrypt(encryptedSession);

    if (!session) {
      return null;
    }

    return {
      sessionId: session.sessionId as string,
    };
  }

  async revoke(sessionId: string) {
    return this.sessionRepo.revoke(sessionId);
  }
}

export { SessionService };
