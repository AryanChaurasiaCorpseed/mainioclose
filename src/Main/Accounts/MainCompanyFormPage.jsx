import { Tabs } from "antd"
import React from "react"
import CompanyForm from "./CompanyForm"
import Companies from "./Companies"

const MainCompanyFormPage = () => {
  const items = [
    {
      label: "Company form",
      key: "companyForm",
      children: <CompanyForm />,
    },
    {
      label: "Companies",
      key: "companies",
      children: <Companies />,
    },
  ]

  return (
    <>
      <Tabs defaultActiveKey="companyForm" size="small" items={items} />
    </>
  )
}

export default MainCompanyFormPage
