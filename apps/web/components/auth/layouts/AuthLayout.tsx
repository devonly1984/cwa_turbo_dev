import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen h-full min-w-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
};
export default AuthLayout;
