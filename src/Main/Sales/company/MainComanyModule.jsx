import { Tabs } from "antd"
import React, { useEffect, useMemo } from "react"
import MainCompanyPage from "./MainCompanyPage"
import TemporaryCompanies from "./TemporaryCompanies"
import { useDispatch } from "react-redux"
import { getAllUsers } from "../../../Toolkit/Slices/UsersSlice"
import ConsultantCompanies from "./ConsultantCompanies"

const MainComanyModule = () => {
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])



  const items = useMemo(() => {
    return [
      { label: "Company", key: "company", children: <MainCompanyPage /> },
      {
        label: "Temporary companies",
        key: "temporaryCompanies",
        children: <TemporaryCompanies />,
      },
      {
        label: "Consultant companies",
        key: "consultantCompanies",
        children: <ConsultantCompanies />,
      },
    ]
  }, [])

  return (
    <Tabs
      defaultActiveKey="company"
      size="small"
      items={items}
      style={{height:'93vh'}}
    />
  )
}

export default MainComanyModule
