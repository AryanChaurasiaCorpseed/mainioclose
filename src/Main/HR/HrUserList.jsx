import React, { useEffect, useState } from "react"
import SideBox from "../../components/SideBox"
import { useDispatch, useSelector } from "react-redux"
import UserListComponent from "../../Tables/UserListComponent"
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

const HrUserList = () => {
  const dispatch = useDispatch()
  const {
    allUsers: allMainUser,
    userLoading,
    userError,
  } = useSelector((prev) => prev.user)

  const [getId, setGetId] = useState("")
  const [editType, setEditType] = useState(false)

  const userCount = allMainUser.length

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllDepartment())
    dispatch(getAllDesiginations())
    dispatch(getAllRoles())
  }, [dispatch])

  const myNewId = (id) => {
    setGetId(id)
    setEditType(true)
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
      {userLoading && <TableScalaton />}
      {userError && <SomethingWrong />}
      {allMainUser && !userLoading && !userError && (
        <CommonTable
          data={allMainUser}
          columns={columns}
          rowSelection={true}
          scroll={{ y: 650, x: 5500 }}
        />
      )}
    </SideBox>
  )
}

export default HrUserList
