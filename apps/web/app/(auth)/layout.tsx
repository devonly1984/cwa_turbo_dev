import AuthLayout from "@/components/auth/layouts/AuthLayout"
import { ReactNode } from "react"

const Layout = ({children}:{children:ReactNode}) => {
  return <AuthLayout>{children}</AuthLayout>;
}
export default Layout
