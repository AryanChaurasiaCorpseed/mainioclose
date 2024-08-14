import { Typography } from "antd"
import ColComp from "../components/small/ColComp"
import UserLockerEdit from "../Model/UserLockerEdit"
import { Icon } from "@iconify/react"
import OverFlowText from "../components/OverFlowText"
const { Text } = Typography

export const allUserdataCol = [
  { dataIndex: "email", title: "Email", width: 300 },
  {
    dataIndex: "designation",
    title: "Designation",
    render: (_, data) => (
      <OverFlowText>
        {data?.userDesignation?.name ? data?.userDesignation?.name : "NA"}
      </OverFlowText>
    ),
  },
  {
    dataIndex: "department",
    title: "Department",
    render: (_, data) => (
      <OverFlowText>{data?.userDepartment?.name}</OverFlowText>
    ),
  },
  { dataIndex: "role", title: "Role" },
  {
    dataIndex: "managers",
    title: "Manager",
    render: (_, props) =>
      props?.manager ? (
        <OverFlowText>{props?.managers?.fullName}</OverFlowText>
      ) : (
        "NA"
      ),
  },
  {
    dataIndex: "lockerSize",
    title: "Locker size",
    render: (_, props) => (
      <div className="flex-vert-hori-center">
        <Text>{props?.lockerSize}</Text>
        <UserLockerEdit data={props} />
      </div>
    ),
  },
  {
    dataIndex: "backupTeam",
    title: "Backup team",
    render: (_, props) => (
      <div className="flex-vert-hori-center">
        {props?.backupTeam ? (
          <Icon icon="fluent:checkmark-20-filled" color="green" />
        ) : (
          <Icon icon="fluent:dismiss-20-filled" color="red" />
        )}
      </div>
    ),
  },
]

export const deactivateUserListCol = [
  {
    dataIndex: "id",
    title: "Id",
    fixed: "left",
    width: 120,
    render: (_, props) => {
      return <Text>CORP00{props?.id}</Text>
    },
  },
  { dataIndex: "fullName", title: "Full name", width: 150, fixed: "left" },
  { dataIndex: "email", title: "Email" },
  { dataIndex: "designation", title: "Designation" },
  { dataIndex: "department", title: "Department" },
  { dataIndex: "role", title: "Role" },
]

export const allManagerCol = [
  {
    dataIndex: "id",
    title: "Id",
    width: 150,
    fixed: "left",
    render: (_, props) => {
      return <p className="mb-0">CORP00{props?.id}</p>
    },
  },
  {
    dataIndex: "fullName",
    title: "Full name",
    fixed: "left",
    render: (_, props) => <OverFlowText>{props?.fullName}</OverFlowText>,
  },
  {
    dataIndex: "email",
    title: "Email",
    render: (_, props) => <OverFlowText>{props?.email}</OverFlowText>,
  },
  {
    dataIndex: "designation",
    title: "Designation",
    width: 150,
    render: (_, props) => (
      <OverFlowText>
        {props?.designation ? props?.designation : "NA"}
      </OverFlowText>
    ),
  },
  {
    dataIndex: "department",
    title: "Department",
    render: (_, props) => <ColComp data={props?.department} />,
  },

  {
    dataIndex: "role",
    title: "Role",
    render: (_, props) => <OverFlowText>{props?.role}</OverFlowText>,
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
      <p className="m-0">
        {props?.dateOfJoining
          ? new Date(props?.dateOfJoining)?.toLocaleDateString()
          : "NA"}
      </p>
    ),
  },
  {
    dataIndex: "employeeId",
    title: "Employee id",
    render: (_, props) => <ColComp data={props?.employeeId} />,
  },
  {
    dataIndex: "epfNo",
    title: "Employee ID",
    render: (_, props) => <ColComp data={props?.epfNo} />,
  },
  {
    dataIndex: "experience",
    title: "Experience",
    width:200,
    render: (_, props) => (
      <p className="m-0">
        {props?.expInYear ? props?.expInYear + " years" : "NA"} and{" "}
        {props?.expInMonth ? props?.expInMonth + " months" : "NA"}
      </p>
    ),
  },
  {
    dataIndex: "managers",
    title: "Manager",
    render: (_, props) => (
      <OverFlowText>{props?.managers?.fullName}</OverFlowText>
    ),
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
    render: (_, props) => (
      <OverFlowText>{props?.permanentAddress}</OverFlowText>
    ),
  },
  {
    dataIndex: "residentialAddress",
    title: "Residential address",
    render: (_, props) => (
      <OverFlowText>{props?.residentialAddress}</OverFlowText>
    ),
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
    title: "Spouse contact no",
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
]
