import ConversationIdView from "@/components/dashboard/views/ConversationIdView";
import { Id } from "@workspace/backend/convex/_generated/dataModel";

interface ConversationIdPageProps {
  params: Promise<{conversationId: Id<'conversations'>}>
}

const ConversationIdPage = async ({ params }: ConversationIdPageProps) => {
  const { conversationId } = await params;

  return <ConversationIdView conversationId={conversationId} />;
};
export default ConversationIdPage;
