"use client"
import { Button } from "@workspace/ui/components/button"
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { SignInButton, UserButton } from "@clerk/nextjs";
const WebHomePage=()=> {
  const add = useMutation(api.public.mutations.users.add);
  const users = useQuery(api.public.queries.users.getMany);
  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <UserButton />
          <Button onClick={() => add()}>Add User</Button>
          <div className="max-w-sm w-full mx-auto gap-y-4 flex flex-col">
            <p>apps/web</p>
            {JSON.stringify(users, null, 2)}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Must be Signed In</p>
        <SignInButton>Sign In!</SignInButton>
      </Unauthenticated>
    </>
  );
}
export default WebHomePage