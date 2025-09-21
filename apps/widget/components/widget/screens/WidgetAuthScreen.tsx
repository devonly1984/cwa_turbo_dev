import WidgetChatForm from "../forms/WidgetChatForm";
import WidgetHeader from "../layouts/WidgetHeader";

const WidgetAuthScreen = () => {
  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
          <p className="text-3xl">Hi There!</p>
          <p className="text-lg">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <WidgetChatForm />
    </>
  );
};
export default WidgetAuthScreen;
