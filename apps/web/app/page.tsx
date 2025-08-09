"use client"
import {useQuery} from 'convex/react';
import { api } from '@workspace/backend/convex/_generated/api';



const WebHomePage = () => {
  const users = useQuery(api.queries.users.getMany);
  console.log(users);
  return (
    <div></div>
  )
}
export default WebHomePage