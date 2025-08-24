"use client"
import {
  useQuery,
  useMutation,

} from "convex/react";
import { api } from '@workspace/backend/convex/_generated/api';
import { Button } from '@workspace/ui/components/button';

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const WebHomePage = () => {
  const users = useQuery(api.public.queries.users.getMany);
  const addUser = useMutation(api.public.mutations.users.add);

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <p>apps/web</p>
      <UserButton />
      <OrganizationSwitcher hidePersonal />
      <Button onClick={() => addUser()}>Add User</Button>
     
    </div>
  );
}
export default WebHomePage