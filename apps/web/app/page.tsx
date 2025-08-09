"use client"
import {useQuery,useMutation} from 'convex/react';
import { api } from '@workspace/backend/convex/_generated/api';
import { Button } from '@workspace/ui/components/button';



const WebHomePage = () => {
  const users = useQuery(api.queries.users.getMany);
  const addUser = useMutation(api.mutations.users.add)
  console.log(users);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <p>apps/web</p>
      <Button onClick={() => addUser()}>Add User</Button>
      <div className="max-w-sm mx-auto w-full">
        {JSON.stringify(users)}
      </div>
    </div>
  );
}
export default WebHomePage