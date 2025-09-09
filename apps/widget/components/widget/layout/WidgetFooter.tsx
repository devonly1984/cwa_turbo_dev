"use client";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { useAtomValue, useSetAtom } from "jotai";
import { Home, Inbox } from "lucide-react";
import { screenAtom } from "../store/widgetAtom";

const WidgetFooter = () => {
  //ATOM
  const screen = useAtomValue(screenAtom);
  //SETTERS
  const setScreen= useSetAtom(screenAtom)
  return (
    <footer className="flex items-center justify-between border-t bg-background">
      <Button
        className="h-14 flex-1 rounded-none"
        size="icon"
        onClick={() => setScreen("selection")}
        variant={"ghost"}
      >
        <Home
          className={cn(
            "size-5",
            screen === "selection" && "text-primary"
          )}
        />
      </Button>
      <Button
        className="h-14 flex-1 rounded-none"
        size="icon"
        onClick={() => setScreen("inbox")}
        variant={"ghost"}
      >
        <Inbox
          className={cn("size-5", screen === "inbox" && "text-primary")}
        />
      </Button>
    </footer>
  );
};
export default WidgetFooter;
