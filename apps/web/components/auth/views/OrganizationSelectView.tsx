import { OrganizationList } from "@clerk/nextjs";


const OrganizationSelectView = () => {
  return (
    <OrganizationList
      afterCreateOrganizationUrl={"/"}
      afterSelectOrganizationUrl={"/"}
      hidePersonal
      skipInvitationScreen
    />
  );
};
export default OrganizationSelectView;
