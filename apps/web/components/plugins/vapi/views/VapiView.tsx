"use client"

import { vapiFeatures } from "@/plugins/vapi";
import PluginCard from "../cards/PluginCard";
import {  useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useState } from "react";
import ConnectDialog from "../dialogs/ConnectDialog";

const VapiView = () => {
  const vapiPlugin = useQuery(api.private.queries.plugins.getOne, {
    service: "vapi",
  });
  const [connectOpen, setConnectOpen] = useState(false)
  const [removeOpen, setRemoveOpen] = useState(false)
  const handleSubmit = ()=>{
    if (vapiPlugin) {
      setRemoveOpen(true);
    } else {
      setConnectOpen(true);
    }
  }
  return (
    <>
      <ConnectDialog open={connectOpen} setOpen={setConnectOpen} />
      <div className="flex min-h-screen flex-col bg-muted p-8">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl">Vapi Plugin</h1>
            <p className="text-muted-foreground">
              Connect Vapi to enable AI voice calls and phone support
            </p>
          </div>
          <div className="mt-8">
            {vapiPlugin ? (
              <p>Connected!!!</p>
            ) : (
              <PluginCard
                serviceImage="/vapi.jpg"
                serviceName="Vapi"
                features={vapiFeatures}
                isDisabled={vapiPlugin === undefined}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default VapiView