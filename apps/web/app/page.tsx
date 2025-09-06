"use client";

import {
  useMutation,
  useQuery,
  Authenticated,
  Unauthenticated,
} from "convex/react";
import { api } from "../../../packages/backend/convex/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
const WebPage = () => {
  const users = useQuery(api.public.queries.users.getMany);
  const addUser = useMutation(api.public.mutations.users.add);
  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <Button onClick={() => addUser()}>Add User</Button>
          <p>apps/web</p>
          <UserButton />
          <div className="max-w-sm w-full mx-auto">
            {JSON.stringify(users, null, 2)}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be signed in</p>
        <SignInButton>Sign In!</SignInButton>
      </Unauthenticated>
    </>
  );
};
export default WebPage;
