import React, { useEffect, useState } from "react"
import SideBox from "../../components/SideBox"
import { useDispatch, useSelector } from "react-redux"
import { getAllRoles, getAllUsers } from "../../Toolkit/Slices/UsersSlice"
import TableScalaton from "../../components/TableScalaton"
import CreateHrDashBoard from "../../Model/CreateHrDashBoard"
import MainHeading from "../../components/design/MainHeading"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import { hrUserData } from "../../data/HrData"
import CommonTable from "../../components/CommonTable"
import {
  getAllDepartment,
  getAllDesiginations,
} from "../../Toolkit/Slices/SettingSlice"
import {Icon} from '@iconify/react'
import { Input } from "antd"

const HrUserList = () => {
  const dispatch = useDispatch()
  const {
    allUsers: allMainUser,
    userLoading,
    userError,
  } = useSelector((prev) => prev.user)

  const userCount = allMainUser.length
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllDepartment())
    dispatch(getAllDesiginations())
    dispatch(getAllRoles())
  }, [dispatch])

  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    setFilteredData(allMainUser)
  }, [allMainUser])

  const handleSearch = (e) => {
    const value = e.target.value.trim()
    setSearchText(value)
    const filtered = allMainUser?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

  const columns = [
    ...hrUserData,
    {
      dataIndex: "Action",
      title: "Action",
      render: (_, props) => {
        return (
          <>
            <CreateHrDashBoard
              data={props}
              edit={true}
              modalTitle={"Edit user"}
            />
          </>
        )
      },
    },
  ]

  return (
    <SideBox>
      <div className="create-user-box">
        <MainHeading data={`User list (${userCount})`} />
        <div className="all-center">
          <CreateHrDashBoard modalTitle={"Create user"} />
        </div>
      </div>
      <div className="flex-verti-center-hori-start mt-2">
        <Input
          value={searchText}
          size="small"
          onChange={handleSearch}
          style={{ width: "220px" }}
          placeholder="search"
          prefix={<Icon icon="fluent:search-24-regular" />}
        />
      </div>
      {userLoading && <TableScalaton />}
      {userError && <SomethingWrong />}
      {allMainUser && !userLoading && !userError && (
        <CommonTable
          data={filteredData}
          columns={columns}
          rowSelection={true}
          scroll={{ y: 550, x: 4800 }}
        />
      )}
    </SideBox>
  )
}

export default HrUserList
