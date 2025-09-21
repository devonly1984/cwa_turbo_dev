"use client"
import WidgetView from "@/components/widget/views/WidgetView";
import { use } from "react";

interface WidgetHomeProps {
  searchParams: Promise<{organizationId:string}>
}

const WidgetHomePage = ({ searchParams }: WidgetHomeProps) => {
  const { organizationId } = use(searchParams);
  return <WidgetView organizationId={organizationId} />;
};
export default WidgetHomePage;
