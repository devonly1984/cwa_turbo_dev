import ConversationIdView from "@/components/conversations/views/ConversationIdView"
import { Id } from "@workspace/backend/convex/_generated/dataModel";
interface ConversationIdPageProps {
  params: Promise<{
    conversationId:string
  }>
}
const ConversationIdPage = async({params}:ConversationIdPageProps) => {
  const { conversationId } = await params;
  return (
    <ConversationIdView
      conversationId={conversationId as Id<"conversations">}
    />
  );
};
export default ConversationIdPage;
