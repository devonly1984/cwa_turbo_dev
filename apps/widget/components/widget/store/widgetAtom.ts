import { CONTACT_SESSION_KEY } from "@/constants";
import { WidgetScreen } from "@/types";
import { Id } from "@workspace/backend/convex/_generated/dataModel";
import { atom } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";

//Widget State Atoms

export const screenAtom = atom<WidgetScreen>("auth");
export const organizationIdAtom = atom<string | null>(null);

//Else 
export const contactSessionIdAtomFamily = atomFamily(
  (organizationId: string) =>
    atomWithStorage<Id<"contactSessions"> | null>(
      `${CONTACT_SESSION_KEY}_${organizationId}`,
      null
    )
);
export const errorMessageAtom = atom<string | null>(null);
export const loadingMessageAtom = atom<string | null>(null);
