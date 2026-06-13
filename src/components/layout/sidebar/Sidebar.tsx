import { Suspense } from "react";

import { Nav } from "@/components/layout/nav/Nav";
import { ModeSwitcher } from "@/components/ModeSwitcher";

const Sidebar = () => {
  return (
    <aside className="grid justify-center gap-3 px-2 py-4">
      <ModeSwitcher />
      <Suspense fallback={<p>nav skeleton</p>}>
        <Nav />
      </Suspense>
      <div />
    </aside>
  );
};

export { Sidebar };
