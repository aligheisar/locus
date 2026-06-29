import type { ReactNode } from "react";

import { handleError } from "@/utils/error";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/Wrapper";

import { logoutAction } from "@/server/actions/auth.action";
import { getUserAction } from "@/server/actions/user.action";

const HomePage = async () => {
  const [error, user] = await getUserAction();

  if (error) {
    let elem: ReactNode;

    handleError(error.reason, {
      INVALID_SESSION: () => {
        elem = <h1>session is invalid.</h1>;
      },
      SESSION_MISSING: () => {
        elem = <h1>session is missing.</h1>;
      },
      UNEXPECTED_ERROR: () => {
        elem = <h1>unexpected error.</h1>;
      },
    });

    return elem;
  }

  return (
    <Wrapper>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <form
        action={async () => {
          "use server";
          await logoutAction();
        }}
      >
        <Button type="submit">logout</Button>
      </form>
    </Wrapper>
  );
};

export default HomePage;
