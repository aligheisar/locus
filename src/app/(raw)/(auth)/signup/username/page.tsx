import { ViewTransition } from "react";

import { UsernameForm } from "@/features/signup/components/form/Username";

const UsernamePage = () => {
  return (
    <ViewTransition name="signup-form">
      <UsernameForm />
    </ViewTransition>
  );
};

export default UsernamePage;
