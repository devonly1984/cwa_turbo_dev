"use client";
import { ArrowLeftRight, Plug } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { Feature } from "@/types";

interface PluginCardProps {
  isDisabled?: boolean;
  serviceName: string;
  serviceImage: string;
  features: Feature[];
  onSubmit: () => void;
}
const PluginCard = ({
  isDisabled,
  serviceName,
  serviceImage,
  features,
  onSubmit,
}: PluginCardProps) => {
  return (
    <div className="h-fit w-full rounded-lg border bg-background p-8">
      <div className="mb-6 flex items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <Image
            src={serviceImage}
            alt={serviceName}
            height={40}
            width={40}
            className="rounded object-contain"
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <ArrowLeftRight />
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/logo.svg"
            alt="Platform"
            height={40}
            width={40}
            className=" object-contain"
          />
        </div>
      </div>
      <div className="mb-6 text-center">
        <p className="text-lg">Connect your {serviceName} account</p>
      </div>
      <div className="mb-6">
        <div className="space-y-4">
          {features.map((feature) => (
            <div className="flex items-center gap-3 " key={feature.label}>
              <div className="flex size-8 items-center justify-center rounded-lg border bg-muted">
                <feature.icon className="text-muted-foreground size-4" />
              </div>
              <div className="">
                <div className="font-medium text-sm">{feature.label}</div>
                <div className="text-muted-foreground text-xs">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <Button
          className="size-full"
          disabled={isDisabled}
          onClick={onSubmit}
          variant={"default"}
        >
          Connect
          <Plug />
        </Button>
      </div>
    </div>
  );
};
export default PluginCard;
