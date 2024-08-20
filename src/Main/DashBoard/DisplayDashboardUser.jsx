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
  const [userToggle, setUserToggle] = useState(false)
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
    if (window.confirm("Are you sure to deActivate this User?") === true) {
      try {
        await deleteQuery(`/securityService/api/auth/deleteUser?userId=${id}`)
        await deleteQuery(`/leadService/api/v1/users/deleteUser?id=${id}`)
        setUserSuspand((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const presentUserFun = async (id) => {
    const activeRowData = {
      id: id,
      currentUserId: 2,
    }
    if (window.confirm("Do you really want to Not Assign Any Lead To User?")) {
      await dispatch(allActiveUserFun(activeRowData))
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
            icon="fluent:circle-12-filled"
            height={12}
            width={12}
            color={props?.autoActive ? "#99ff99" : "#ff9999"}
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
            <Link to={`${props.id}/history`}>
              <Button>
                <Icon icon="fluent:history-24-regular" /> History
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
              edit={true}
              modalText={"Edit user"}
            />
            <Button
              type="text"
              size="small"
              danger
              onClick={() => deleteUser(props?.id)}
            >
              <Icon icon="fluent:delete-24-regular" />
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
            <Link to={`deactivateUser`}>
              <Button type="primary">Deactivate users</Button>
            </Link>
            <CreateuserDashboard modalText={"Create user"} />
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
