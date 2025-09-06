import { LayoutProps } from "@/types"

const AuthLayout = ({children}:LayoutProps) => {
  return (
    <div className="min-h-screen min-w-scree h-full flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
export default AuthLayout