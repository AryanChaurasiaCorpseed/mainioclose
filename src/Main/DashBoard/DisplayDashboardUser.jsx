import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import CreateuserDashboard from "../../Model/CreateuserDashboard"
import { deleteQuery } from "../../API/DeleteQuery"
import {
  allActiveUserFun,
  getAllRoles,
  getAllUsers,
} from "../../Toolkit/Slices/UsersSlice"
import { useDispatch, useSelector } from "react-redux"
import TableScalaton from "../../components/TableScalaton"
import MainHeading from "../../components/design/MainHeading"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import { allUserdataCol } from "../../data/Userdata"
import { Button, Space, Typography } from "antd"
import { Icon } from "@iconify/react"
import CommonTable from "../../components/CommonTable"
import {
  getAllDepartment,
  getAllDesiginations,
} from "../../Toolkit/Slices/SettingSlice"
const { Text } = Typography

const DisplayDashboardUser = () => {
  const [userSuspand, setUserSuspand] = useState(false)
  const [getId, setGetId] = useState("")
  const [userToggle, setUserToggle] = useState(false)
  const [editType, setEditType] = useState(false)
  const dispatch = useDispatch()

  const {
    allUsers: allMainUser,
    userLoading,
    userError,
  } = useSelector((prev) => prev.user)

  const userCount = allMainUser.length

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch, userSuspand, userToggle])

  useEffect(() => {
    dispatch(getAllDepartment())
    dispatch(getAllDesiginations())
    dispatch(getAllRoles())
  }, [dispatch])

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to deActivate this User?") == true) {
      try {
        const suspandUser = await deleteQuery(
          `/securityService/api/auth/deleteUser?userId=${id}`
        )
        const deleteUser = await deleteQuery(
          `/leadService/api/v1/users/deleteUser?id=${id}`
        )
        setUserSuspand((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const myNewId = (id) => {
    setGetId(id)
    setEditType(true)
  }

  const presentUserFun = async (id) => {
    const activeRowData = {
      id: id,
      currentUserId: 2,
    }
    if (window.confirm("Do you really want to Not Assign Any Lead To User?")) {
      const toggleData = await dispatch(allActiveUserFun(activeRowData))
      setUserToggle((prev) => !prev)
    }
  }

  const columns = [
    {
      dataIndex: "id",
      title: "Employer id",
      fixed: "left",
      width: 120,
      render: (_, props) => {
        return <Text>CORP00{props?.id}</Text>
      },
    },
    {
      dataIndex: "fullName",
      title: "Full name",
      fixed: "left",
      render: (_, props) => (
        <div className="flex-vert-hori-center">
          <Icon
            icon="fluent:circle-20-filled"
            color={props?.autoActive ? "green" : "red"}
          />
          <Text>{props?.fullName} </Text>
        </div>
      ),
    },
    ...allUserdataCol,
    {
      dataIndex: "viewHistory",
      title: "View history",
      render: (_, props) => {
        return (
          <>
            <Link to={`${props?.id}/history`}>
              <Button>
                <Icon icon="fluent:history-20-regular" /> History
              </Button>
            </Link>
          </>
        )
      },
    },

    {
      dataIndex: "autoActive",
      title: "Present",
      render: (_, props) => {
        return (
          <>
            <Button
              onClick={() => presentUserFun(props?.id)}
              type={props?.autoActive ? "primary" : "default"}
              danger={props?.autoActive ? false : true}
            >
              {props?.autoActive ? "Present" : "Absent"}
            </Button>
          </>
        )
      },
    },

    {
      dataIndex: "Action",
      title: "Action",
      render: (_, props) => {
        return (
          <>
            <CreateuserDashboard
              data={props}
              type={editType}
              edit={true}
              modalText={"Edit user"}
            />
            <Button
              type="text"
              size="small"
              danger
              onClick={() => deleteUser(props?.id)}
            >
              <Icon icon="fluent:delete-20-regular" />
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <>
      <div className="create-user-box">
        <MainHeading data={`User list (${userCount})`} />
        <div className="all-center">
          <Space>
            <Link to={`deactivateuser`}>
              <Button type="primary">Deactivate Users</Button>
            </Link>
            <CreateuserDashboard
              data={getId}
              type={editType}
              modalText={"Create user"}
            />
          </Space>
        </div>
      </div>
      {userLoading && <TableScalaton />}
      {userError && <SomethingWrong />}
      {allMainUser && !userLoading && !userError && (
        <CommonTable
          columns={columns}
          data={allMainUser}
          rowSelection={true}
          scroll={{ y: 550, x: 2000 }}
        />
      )}
    </>
  )
}

export default DisplayDashboardUser
