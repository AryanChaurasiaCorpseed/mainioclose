import { Tabs } from "antd";
import React from "react";
import NewCompanyUnitDetails from "./NewCompanyUnitDetails";
import NewCompanyProjectDetails from "./NewCompanyProjectDetails";
import NewCompanyLeadsDetail from "./NewCompanyLeadsDetail";

const NewCompanyDetailsPage = () => {
  const items = [
    {
      label: "Company details",
      key: "companyDetails",
      children:<NewCompanyUnitDetails/>,
    },
    {
      label: "Projects",
      key: "projects",
      children: <NewCompanyProjectDetails/>,
    },
    {
      label: "Leads",
      key: "leads",
      children: <NewCompanyLeadsDetail/>,
    },
  ];

  return (
    <>
      <Tabs items={items} />
    </>
  );
};

export default NewCompanyDetailsPage;
