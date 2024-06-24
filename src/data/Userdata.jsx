import { Space, Typography } from "antd"
import ColComp from "../components/small/ColComp"
import UserLockerEdit from "../Model/UserLockerEdit";
const { Text } = Typography

export const allUserdataCol = [
  { field: "email", headerName: "Email", width: 240, hideable: false },
  { field: "designation", headerName: "Designation", width: 150 },
  { field: "department", headerName: "Department", width: 150 },
  { field: "role", headerName: "Role", width: 150 },
  {
    field: "lockerSize",
    headerName: "Locker Size",
    width: 120,
    renderCell: (props) => (
      <Space>
        <Text>{props?.row?.lockerSize}</Text>
        <UserLockerEdit data={props?.row} />
      </Space>
    ),
  },
  {
    field: "backupTeam",
    headerName: "Backup Team",
    width: 120,
    renderCell: (props) => (
      <p>
        {props?.row?.backupTeam ? (
          <i className="fa-solid text-success fa-check"></i>
        ) : (
          <i className="fa-solid text-danger fa-xmark"></i>
        )}{" "}
      </p>
    ),
  },
]

export const deactivateUserListCol = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    renderCell: (props) => {
      return <p className="mb-0">CORP00{props?.row?.id}</p>
    },
  },
  { field: "fullName", headerName: "Full Name", width: 150 },
  { field: "email", headerName: "Email", width: 240, hideable: false },
  { field: "designation", headerName: "Designation", width: 150 },
  { field: "department", headerName: "Department", width: 150 },
  { field: "role", headerName: "Role", width: 150 },
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
  { field: "fullName", headerName: "Full Name", width: 150 },
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
    headerName: "Joining Date",
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
    headerName: "Employee ID",
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
    headerName: "pan Number",
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
    headerName: "Permanent Address",
    width: 250,
    renderCell: (props) => <ColComp data={props?.row?.permanentAddress} />,
  },
  {
    field: "residentialAddress",
    headerName: "Residential Address",
    width: 250,
    renderCell: (props) => <ColComp data={props?.row?.residentialAddress} />,
  },
  {
    field: "fatherName",
    headerName: "Father Name",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.fatherName} />,
  },
  {
    field: "fatherContactNo",
    headerName: "Father Contact No",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.fatherContactNo} />,
  },
  {
    field: "fatherOccupation",
    headerName: "Father Occupation",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.fatherOccupation} />,
  },
  {
    field: "motherName",
    headerName: "Mother Name",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.motherName} />,
  },
  {
    field: "motherContactNo",
    headerName: "Mother Contact No",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.motherContactNo} />,
  },
  {
    field: "motherOccupation",
    headerName: "Mother Occupation",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.motherOccupation} />,
  },
  {
    field: "spouseName",
    headerName: "Spouse Name",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.spouseName} />,
  },
  {
    field: "spouseContactNo",
    headerName: "Spouse Contact No",
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
    headerName: "Emergency Number",
    width: 150,
    renderCell: (props) => <ColComp data={props?.row?.emergencyNumber} />,
  },
]
