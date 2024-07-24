import React, { useEffect, useState } from "react"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import UserListComponent from "../../Tables/UserListComponent"
import { useDispatch, useSelector } from "react-redux"
import { headHrUser } from "../../Toolkit/Slices/UsersSlice"
import ColComp from "../../components/small/ColComp"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import { ApproveduserByHr } from "../../Toolkit/Slices/ApprovedStatus"
import CommonTable from "../../components/CommonTable"
import { Button, Typography } from "antd"
import { Icon } from "@iconify/react"
import CreateHrDashBoard from "../../Model/CreateHrDashBoard"
const { Text } = Typography

const HRApprovalList = () => {
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)
  const [flagDataT, setFlagDataT] = useState(true)
  const [approvedUserDep, setApprovedUserDep] = useState(true)

  const {
    allHRUsers: hrApprovalUser,
    userHRLoading,
    userHRError,
  } = useSelector((state) => state?.user)

  const { Hrflag, hrLoading, hrError } = useSelector((data) => data?.approved)

  useEffect(() => {
    dispatch(headHrUser(currentUserId))
  }, [dispatch, approvedUserDep, currentUserId])

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      fixed: "left",
      render: (_, props) => {
        return <Text>CORP00{props?.id}</Text>
      },
    },
    { dataIndex: "fullName", title: "Full name", fixed: "left" },
    {
      dataIndex: "email",
      title: "Email",
      render: (_, props) => <ColComp data={props?.email} />,
    },
    {
      dataIndex: "designation",
      title: "Designation",
      render: (_, props) => <ColComp data={props?.designation} />,
    },
    {
      dataIndex: "department",
      title: "Department",
      render: (_, props) => <ColComp data={props?.department} />,
    },

    {
      dataIndex: "role",
      title: "Role",
      render: (_, props) => <ColComp data={props?.role} />,
    },
    {
      dataIndex: "aadharCard",
      title: "Aadhar card",
      render: (_, props) => <ColComp data={props?.aadharCard} />,
    },
    {
      dataIndex: "dateOfJoining",
      title: "Joining date",
      render: (_, props) => (
        <Text>
          {props?.dateOfJoining
            ? new Date(props?.dateOfJoining)?.toLocaleDateString()
            : "NA"}
        </Text>
      ),
    },
    {
      dataIndex: "employeeId",
      title: "Employee id",
      render: (_, props) => <ColComp data={props?.employeeId} />,
    },
    {
      dataIndex: "epfNo",
      title: "Employee id",
      render: (_, props) => <ColComp data={props?.epfNo} />,
    },
    {
      dataIndex: "experience",
      title: "Experience",
      render: (_, props) => (
        <Text>
          {props?.expInYear ? props?.row?.expInYear + " years" : "NA"} and{" "}
          {props?.expInMonth ? props?.row?.expInMonth + " months" : "NA"}
        </Text>
      ),
    },
    {
      dataIndex: "managers",
      title: "Manager",
      render: (_, props) => <ColComp data={props?.managers?.fullName} />,
    },
    {
      dataIndex: "panNumber",
      title: "Pan number",
      render: (_, props) => <ColComp data={props?.panNumber} />,
    },
    {
      dataIndex: "nationality",
      title: "Nationality",
      render: (_, props) => <ColComp data={props?.nationality} />,
    },
    {
      dataIndex: "permanentAddress",
      title: "Permanent address",
      render: (_, props) => <ColComp data={props?.permanentAddress} />,
    },
    {
      dataIndex: "residentialAddress",
      title: "Residential address",
      render: (_, props) => <ColComp data={props?.residentialAddress} />,
    },
    {
      dataIndex: "fatherName",
      title: "Father name",
      render: (_, props) => <ColComp data={props?.fatherName} />,
    },
    {
      dataIndex: "fatherContactNo",
      title: "Father contact no.",
      render: (_, props) => <ColComp data={props?.fatherContactNo} />,
    },
    {
      dataIndex: "fatherOccupation",
      title: "Father occupation",
      render: (_, props) => <ColComp data={props?.fatherOccupation} />,
    },
    {
      dataIndex: "motherName",
      title: "Mother name",
      render: (_, props) => <ColComp data={props?.motherName} />,
    },
    {
      dataIndex: "motherContactNo",
      title: "Mother contact no.",
      render: (_, props) => <ColComp data={props?.motherContactNo} />,
    },
    {
      dataIndex: "motherOccupation",
      title: "Mother occupation",
      render: (_, props) => <ColComp data={props?.motherOccupation} />,
    },
    {
      dataIndex: "spouseName",
      title: "Spouse name",
      render: (_, props) => <ColComp data={props?.spouseName} />,
    },
    {
      dataIndex: "spouseContactNo",
      title: "Spouse contact no.",
      render: (_, props) => <ColComp data={props?.spouseContactNo} />,
    },
    {
      dataIndex: "language",
      title: "Language",
      render: (_, props) => <ColComp data={props?.language} />,
    },
    {
      dataIndex: "emergencyNumber",
      title: "Emergency number",
      render: (_, props) => <ColComp data={props?.emergencyNumber} />,
    },

    {
      dataIndex: "Action",
      title: "Action",
      render: (_, props) => {
        return (
          <CreateHrDashBoard
            data={props}
            edit={true}
            modalTitle={"Edit user"}
          />
        )
      },
    },
    {
      dataIndex: "Approved",
      title: "Appproved",
      render: (_, props) => {
        return (
          <Button onClick={() => approvedUserFun(props.id)}>
            {hrLoading ? "Please Wait..." : "Approved"}
            <Icon icon="fluent:checkmark-20-filled" color="green" />
          </Button>
        )
      },
    },
  ]

  const approvedUserFun = (id) => {
    const userId = { ids: id }
    const getApproval = dispatch(
      ApproveduserByHr({ currid: currentUserId, userid: userId.ids })
    )
    setApprovedUserDep((prev) => !prev)
  }

  return (
    <TableOutlet>
      <MainHeading data={"Approval list"} />
      <div className="mt-3">
        {userHRLoading && <TableScalaton />}
        {userHRError && <SomethingWrong />}
        {hrApprovalUser && !userHRLoading && !userHRError && (
          <CommonTable
            data={hrApprovalUser}
            columns={columns}
            scroll={{ x: 5000, y: 550 }}
            rowSelection={true}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default HRApprovalList
