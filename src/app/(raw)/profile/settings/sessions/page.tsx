import { Suspense } from "react";

import {
  ActiveSessions,
  ActiveSessionsSkeleton,
} from "@/features/sessions/components/ActiveSessions";
import { CurrentSession } from "@/features/sessions/components/CurrentSession";
import { SectionWrapper } from "@/features/sessions/components/SectionWrapper";
import { SessionItemSkeleton } from "@/features/sessions/components/SessionItem";

const SessionsPage = () => {
  return (
    <section className="grid gap-2">
      <SectionWrapper>
        <h2>Current Session</h2>
        <Suspense fallback={<SessionItemSkeleton hideAction variant="muted" />}>
          <CurrentSession />
        </Suspense>
      </SectionWrapper>

      <Suspense fallback={<ActiveSessionsSkeleton />}>
        <ActiveSessions />
      </Suspense>
    </section>
  );
};

export default SessionsPage;
