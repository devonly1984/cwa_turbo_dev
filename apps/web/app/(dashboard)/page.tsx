"use client";

import { useMutation } from "convex/react";

import { Button } from "@workspace/ui/components/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { api } from "../../../../packages/backend/convex/_generated/api";
const WebPage = () => {
  const addUser = useMutation(api.public.mutations.users.add);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <p>apps/web</p>
        <UserButton />
        
        <OrganizationSwitcher hidePersonal />
        <Button onClick={() => addUser()}>Add User</Button>{" "}
      </div>
    </>
  );
};
export default WebPage;
