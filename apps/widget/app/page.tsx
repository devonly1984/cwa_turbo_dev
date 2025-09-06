"use client"

import { useQuery } from "convex/react"
import { api } from "../../../packages/backend/convex/_generated/api"

const WidgetHomePage = () => {
  const users = useQuery(api.public.queries.users.getMany)
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <p>apps/widget</p>
      <div className="max-w-sm w-full mx-auto">
        {JSON.stringify(users, null, 2)}
      </div>
    </div>
  );
}
export default WidgetHomePage