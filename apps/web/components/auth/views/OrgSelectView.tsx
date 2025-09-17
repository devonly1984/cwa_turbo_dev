import { OrganizationList } from "@clerk/nextjs";


const OrgSelectView = () => {
  return (
    <OrganizationList
      afterCreateOrganizationUrl={"/"}
      afterSelectOrganizationUrl={"/"}
      hidePersonal
      skipInvitationScreen
    />
  );
};
export default OrgSelectView;
