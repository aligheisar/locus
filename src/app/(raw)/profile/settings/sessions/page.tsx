import { Suspense } from "react";

import { Button } from "@/components/ui/button";

import { ActiveSessions } from "@/features/sessions/components/ActiveSessions";
import { CurrentSession } from "@/features/sessions/components/CurrentSession";
import { SectionWrapper } from "@/features/sessions/components/SectionWrapper";

const SessionsPage = () => {
  return (
    <section className="grid gap-2">
      <SectionWrapper>
        <h2>Current Session</h2>
        <Suspense fallback={<p>loading current session ...</p>}>
          <CurrentSession />
        </Suspense>
      </SectionWrapper>

      <SectionWrapper>
        <div className="flex items-center justify-between">
          <h2>Active Sessions</h2>
          <Button size="sm" variant="destructive">
            Revoke All
          </Button>
        </div>
        <Suspense fallback={<p>loading sessions ...</p>}>
          <ActiveSessions />
        </Suspense>
      </SectionWrapper>
    </section>
  );
};

export default SessionsPage;
