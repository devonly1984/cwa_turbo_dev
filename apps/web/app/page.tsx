"use client"

import { useMutation, useQuery } from "convex/react"
import { api } from "../../../packages/backend/convex/_generated/api";
import { Button } from "@workspace/ui/components/button";

const WebPage = () => {
  const users = useQuery(api.public.queries.users.getMany);
  const addUser = useMutation(api.public.mutations.users.add);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={() => addUser()}>Add User</Button>
      <p>apps/web</p>
      <div className="max-w-sm w-full mx-auto">
        {JSON.stringify(users, null, 2)}
      </div>
    </div>
  );
};
export default WebPage