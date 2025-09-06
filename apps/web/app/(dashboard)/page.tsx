"use client";

import { useMutation, useQuery } from "convex/react";

import { Button } from "@workspace/ui/components/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { api } from "../../../../packages/backend/convex/_generated/api";
const WebPage = () => {
  const users = useQuery(api.public.queries.users.getMany);
  const addUser = useMutation(api.public.mutations.users.add);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button onClick={() => addUser()}>Add User</Button>
        <p>apps/web</p>
        <UserButton />
        <OrganizationSwitcher hidePersonal />
        <div className="max-w-sm w-full mx-auto">
          {JSON.stringify(users, null, 2)}
        </div>
      </div>
    </>
  );
};
export default WebPage;
