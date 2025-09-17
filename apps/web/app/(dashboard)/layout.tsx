import Guards from "@/components/auth/Guards";

import { LayoutProps } from "@/types";

const Layout = ({ children }: LayoutProps) => {
  return (
    <Guards>
      {children}
    </Guards>
  );
};
export default Layout;
