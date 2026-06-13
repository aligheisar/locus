import { SessionRepository } from "@/server/repositories/session.repository";
import { SessionService } from "@/server/services/session.service";
import { TokenService } from "@/server/services/token.service";

const sessionRepo = new SessionRepository();
const tokenService = new TokenService();

const sessionService = new SessionService(sessionRepo, tokenService);

export { sessionService };
