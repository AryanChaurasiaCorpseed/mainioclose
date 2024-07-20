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
import { Typography } from "antd"
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
      render: (props) => <ColComp data={props?.row?.email} />,
    },
    {
      dataIndex: "designation",
      title: "Designation",
      render: (props) => <ColComp data={props?.row?.designation} />,
    },
    {
      dataIndex: "department",
      title: "Department",
      render: (props) => <ColComp data={props?.row?.department} />,
    },

    {
      dataIndex: "role",
      title: "Role",
      render: (props) => <ColComp data={props?.row?.role} />,
    },
    {
      dataIndex: "aadharCard",
      title: "Aadhar card",
      render: (props) => <ColComp data={props?.row?.aadharCard} />,
    },
    {
      dataIndex: "dateOfJoining",
      title: "Joining date",
      render: (props) => (
        <Text>
          {props?.row?.dateOfJoining
            ? new Date(props?.row?.dateOfJoining)?.toLocaleDateString()
            : "NA"}
        </Text>
      ),
    },
    {
      dataIndex: "employeeId",
      title: "Employee id",
      render: (props) => <ColComp data={props?.row?.employeeId} />,
    },
    {
      dataIndex: "epfNo",
      title: "Employee id",
      render: (props) => <ColComp data={props?.row?.epfNo} />,
    },
    {
      dataIndex: "experience",
      title: "Experience",
      render: (props) => (
        <Text>
          {props?.row?.expInYear ? props?.row?.expInYear + " years" : "NA"} and{" "}
          {props?.row?.expInMonth ? props?.row?.expInMonth + " months" : "NA"}
        </Text>
      ),
    },
    {
      dataIndex: "managers",
      title: "Manager",
      render: (props) => <ColComp data={props?.row?.managers?.fullName} />,
    },
    {
      dataIndex: "panNumber",
      title: "Pan number",
      render: (props) => <ColComp data={props?.row?.panNumber} />,
    },
    {
      dataIndex: "nationality",
      title: "Nationality",
      render: (props) => <ColComp data={props?.row?.nationality} />,
    },
    {
      dataIndex: "permanentAddress",
      title: "Permanent address",
      render: (props) => <ColComp data={props?.row?.permanentAddress} />,
    },
    {
      dataIndex: "residentialAddress",
      title: "Residential address",
      render: (props) => <ColComp data={props?.row?.residentialAddress} />,
    },
    {
      dataIndex: "fatherName",
      title: "Father name",
      render: (props) => <ColComp data={props?.row?.fatherName} />,
    },
    {
      dataIndex: "fatherContactNo",
      title: "Father contact no.",
      render: (props) => <ColComp data={props?.row?.fatherContactNo} />,
    },
    {
      dataIndex: "fatherOccupation",
      title: "Father occupation",
      render: (props) => <ColComp data={props?.row?.fatherOccupation} />,
    },
    {
      dataIndex: "motherName",
      title: "Mother name",
      render: (props) => <ColComp data={props?.row?.motherName} />,
    },
    {
      dataIndex: "motherContactNo",
      title: "Mother contact no.",
      render: (props) => <ColComp data={props?.row?.motherContactNo} />,
    },
    {
      dataIndex: "motherOccupation",
      title: "Mother occupation",
      render: (props) => <ColComp data={props?.row?.motherOccupation} />,
    },
    {
      dataIndex: "spouseName",
      title: "Spouse name",
      render: (props) => <ColComp data={props?.row?.spouseName} />,
    },
    {
      dataIndex: "spouseContactNo",
      title: "Spouse contact no.",
      render: (props) => <ColComp data={props?.row?.spouseContactNo} />,
    },
    {
      dataIndex: "language",
      title: "Language",
      render: (props) => <ColComp data={props?.row?.language} />,
    },
    {
      dataIndex: "emergencyNumber",
      title: "Emergency number",
      render: (props) => <ColComp data={props?.row?.emergencyNumber} />,
    },

    {
      dataIndex: "Action",
      title: "Action",
      render: (props) => {
        return (
          <>
            <button
              className="common-btn-one mr-2"
              data-toggle="modal"
              data-target="#createhrdashboard"
              onClick={() => approvedUserFun("data")}
            >
              Edit
            </button>
          </>
        )
      },
    },

    {
      dataIndex: "Approved",
      title: "Appproved",
      render: (props) => {
        return (
          <button
            className="common-btn-one mr-2"
            onClick={() => approvedUserFun(props.row.id)}
          >
            {hrLoading ? "Please Wait..." : "Approved"}{" "}
            <i className="fa-solid mr-2 fa-check"></i>
          </button>
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
          // <UserListComponent
          //   tableName={""}
          //   columns={columns}
          //   row={hrApprovalUser}
          // />
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
