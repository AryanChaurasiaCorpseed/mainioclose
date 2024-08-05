import { Tabs } from "antd"
import React, { useEffect } from "react"
import ProjectsComp from "./ProjectsComp"
import CompDetails from "./CompDetails"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import {
    getAllCompanyUnits,
  getCompanyLeadsAction,
  getCompanyProjectAction,
} from "../../../Toolkit/Slices/CompanySlice"
import CompanyUnits from "./CompanyUnits"

const CompanyPageLayout = () => {
  const dispatch = useDispatch()
  const { companyId, userid } = useParams()
  useEffect(() => {
    dispatch(getCompanyLeadsAction({ id: companyId }))
    dispatch(getCompanyProjectAction({ id: companyId }))
    dispatch(getAllCompanyUnits(companyId))
  }, [companyId, dispatch])
  const items = [
    {
      label: "Projects",
      key: "projects",
      children: <ProjectsComp />,
    },
    {
      label: "Leads",
      key: "leads",
      children: <CompDetails />,
    },
    {
      label: "Company units",
      key: "companyUnits",
      children:<CompanyUnits/>
    },
  ]
  return <Tabs defaultActiveKey="1" type="card" size={"large"} items={items} />
}

export default CompanyPageLayout
