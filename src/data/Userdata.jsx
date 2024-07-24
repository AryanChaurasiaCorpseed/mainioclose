import { Space, Typography } from "antd"
import ColComp from "../components/small/ColComp"
import UserLockerEdit from "../Model/UserLockerEdit"
import { Icon } from "@iconify/react"
const { Text } = Typography

export const allUserdataCol = [
  { dataIndex: "email", title: "Email", width: 350 },
  {
    dataIndex: "designation",
    title: "Designation",
    render: (_, data) => <Text>{data?.userDesignation?.name}</Text>,
  },
  {
    dataIndex: "department",
    title: "Department",
    render: (_, data) => <Text>{data?.userDepartment?.name}</Text>,
  },
  { dataIndex: "role", title: "Role" },
  {
    dataIndex: "managers",
    title: "Manager",
    render: (_, props) =>
      props?.manager ? <Text>{props?.managers?.fullName}</Text> : "NA",
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
    field: "id",
    headerName: "ID",
    width: 150,
    renderCell: (props) => {
      return <p className="mb-0">CORP00{props?.row?.id}</p>
    },
  },
  { field: "fullName", headerName: "Full name", width: 150 },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    renderCell: (props) => <ColComp data={props?.row?.email} />,
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.designation} />,
  },
  {
    field: "department",
    headerName: "Department",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.department} />,
  },

  {
    field: "role",
    headerName: "Role",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.role} />,
  },
  {
    field: "aadharCard",
    headerName: "Aadhar card",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.aadharCard} />,
  },
  {
    field: "dateOfJoining",
    headerName: "Joining date",
    width: 150,
    renderCell: (props) => (
      <p className="m-0">
        {props?.row?.dateOfJoining
          ? new Date(props?.row?.dateOfJoining)?.toLocaleDateString()
          : "NA"}
      </p>
    ),
  },
  {
    field: "employeeId",
    headerName: "Employee id",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.employeeId} />,
  },
  {
    field: "epfNo",
    headerName: "Employee ID",
    width: 150,

    renderCell: (props) => <ColComp data={props?.row?.epfNo} />,
  },
  {
    field: "experience",
    headerName: "Experience",
    width: 180,
    renderCell: (props) => (
      <p className="m-0">
        {props?.row?.expInYear ? props?.row?.expInYear + " years" : "NA"} and{" "}
        {props?.row?.expInMonth ? props?.row?.expInMonth + " months" : "NA"}
      </p>
    ),
  },
  {
    field: "managers",
    headerName: "Manager",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.managers?.fullName} />,
  },
  {
    field: "panNumber",
    headerName: "Pan number",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.panNumber} />,
  },
  {
    field: "nationality",
    headerName: "Nationality",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.nationality} />,
  },
  {
    field: "permanentAddress",
    headerName: "Permanent address",
    width: 250,
    renderCell: (props) => <ColComp data={props?.row?.permanentAddress} />,
  },
  {
    field: "residentialAddress",
    headerName: "Residential address",
    width: 250,
    renderCell: (props) => <ColComp data={props?.row?.residentialAddress} />,
  },
  {
    field: "fatherName",
    headerName: "Father name",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.fatherName} />,
  },
  {
    field: "fatherContactNo",
    headerName: "Father contact no.",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.fatherContactNo} />,
  },
  {
    field: "fatherOccupation",
    headerName: "Father occupation",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.fatherOccupation} />,
  },
  {
    field: "motherName",
    headerName: "Mother name",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.motherName} />,
  },
  {
    field: "motherContactNo",
    headerName: "Mother contact no.",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.motherContactNo} />,
  },
  {
    field: "motherOccupation",
    headerName: "Mother occupation",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.motherOccupation} />,
  },
  {
    field: "spouseName",
    headerName: "Spouse name",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.spouseName} />,
  },
  {
    field: "spouseContactNo",
    headerName: "Spouse contact no",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.spouseContactNo} />,
  },
  {
    field: "language",
    headerName: "Language",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.language} />,
  },
  {
    field: "emergencyNumber",
    headerName: "Emergency number",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.emergencyNumber} />,
  },
]
