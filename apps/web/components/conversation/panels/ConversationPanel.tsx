import ConversationSelect from "../custom/ConversationSelect";

const ConversationPanel = () => {
  return (
    <div className="flex h-full w-full flex-col bg-background text-sidebar-foreground">
      <div className="flex flex-col border-b p-2 gap-3.5">
        <ConversationSelect />
      </div>
    </div>
  );
}
export default ConversationPanel