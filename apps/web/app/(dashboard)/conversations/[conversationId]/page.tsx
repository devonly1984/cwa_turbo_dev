import ConversationsIdView from "@/components/conversation/views/ConversationsIdView"
import { Id } from "@workspace/backend/_generated/dataModel";
interface ConversationIdPageProps {
  params: Promise<{conversationId:string}>
}
const ConversationIdPage = async({params}:ConversationIdPageProps) => {
  const { conversationId } = await params;

  return (
    <ConversationsIdView
      conversationId={conversationId as Id<"conversations">}
    />
  );
};
export default ConversationIdPage;
