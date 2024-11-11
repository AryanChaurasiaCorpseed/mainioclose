import { Tabs } from "antd"
import React, { useEffect, useMemo } from "react"
import MainCompanyPage from "./MainCompanyPage"
import TemporaryCompanies from "./TemporaryCompanies"
import { useDispatch } from "react-redux"
import { getAllUsers } from "../../../Toolkit/Slices/UsersSlice"

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
    ]
  }, [])

  return (
    <Tabs
      defaultActiveKey="company"
      size="small"
      items={items}
    />
  )
}

export default MainComanyModule
