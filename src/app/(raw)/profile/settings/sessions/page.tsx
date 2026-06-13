import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import { ActiveSessions } from "@/features/sessions/components/ActiveSessions";
import { CurrentSession } from "@/features/sessions/components/CurrentSession";
import { RevokedSessions } from "@/features/sessions/components/RevokedSessions";

const SessionsPage = () => {
  return (
    <section>
      <Suspense fallback={<p>loading current session ...</p>}>
        <CurrentSession />
      </Suspense>

      <Separator />

      <Suspense fallback={<p>loading sessions ...</p>}>
        <ActiveSessions />
      </Suspense>

      <Separator />

      <Suspense fallback={<p>loading revoked session ...</p>}>
        <RevokedSessions />
      </Suspense>
    </section>
  );
};

export default SessionsPage;
