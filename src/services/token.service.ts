import { type JWTPayload, jwtVerify, SignJWT } from "jose";

import { env } from "@/lib/env";

class TokenService {
  private encodedKey = new TextEncoder().encode(env.SESSION_SECRET);

  async encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(this.encodedKey);
  }

  async decrypt(session: string | undefined = "") {
    try {
      const { payload } = await jwtVerify(session, this.encodedKey, {
        algorithms: ["HS256"],
      });

      return payload;
    } catch (_e) {
      return null;
    }
  }
}

export { TokenService };
