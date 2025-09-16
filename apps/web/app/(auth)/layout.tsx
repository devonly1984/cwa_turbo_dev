import { LayoutProps } from "@/types";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full min-h-screen min-w-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
export default Layout;
