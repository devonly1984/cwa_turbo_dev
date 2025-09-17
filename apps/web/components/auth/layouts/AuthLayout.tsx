import { LayoutProps } from "@/types"

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full min-h-screen min-w-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
export default AuthLayout