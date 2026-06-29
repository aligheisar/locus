import { Suspense } from "react";

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

      <Suspense fallback={<p>loading sessions ...</p>}>
        <ActiveSessions />
      </Suspense>
    </section>
  );
};

export default SessionsPage;
