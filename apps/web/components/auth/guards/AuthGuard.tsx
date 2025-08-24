"use client"
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import AuthLayout from "../layouts/AuthLayout";
import SignInView from "../views/SignInView";
import { ReactNode } from "react";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AuthLoading>
        <AuthLayout>
          <p>Loading...</p>
        </AuthLayout>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SignInView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
};
export default AuthGuard