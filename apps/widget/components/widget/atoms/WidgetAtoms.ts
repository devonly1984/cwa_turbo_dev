import { CONSTACT_SESSION_KEY } from "@/constants";
import { WidgetScreen } from "@/types";
import { Id } from "@workspace/backend/convex/_generated/dataModel";
import { atom } from "jotai";
import { atomFamily,atomWithStorage } from "jotai/utils";

export const screenAtom = atom<WidgetScreen>("loading");
export const organizationIdAtom = atom<string | null>(null);

//Organization-scoped contact session atom

export const contactSessionIdAtomFamily = atomFamily((organizationId: string) => {
  return atomWithStorage<Id<"contactSessions"> | null>(
    `${CONSTACT_SESSION_KEY}_${organizationId}`,
    null
  );

});

export const errorMessageAtom = atom<string | null>(null);
export const loadingMessageAtom =atom<string|null>(null);
export const conversationIdAtom = atom<Id<"conversations"> | null>(null);


