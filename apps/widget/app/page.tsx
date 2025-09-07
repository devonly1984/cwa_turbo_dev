"use client";
import WidgetView from "@/components/widget/views/WidgetView";
import { use } from "react";

interface WidgetPageProps {
  searchParams: Promise<{organizationId:string}>
}

const WidgetHomePage = ({searchParams}:WidgetPageProps) => {
 const { organizationId } = use(searchParams);
return <WidgetView organizationId={organizationId} />;
};
export default WidgetHomePage;
