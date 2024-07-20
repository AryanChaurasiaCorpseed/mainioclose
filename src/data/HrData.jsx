import { Typography } from "antd"
import ColComp from "../components/small/ColComp"
import { Icon } from "@iconify/react"
const { Text } = Typography

export const hrUserData = [
  {
    dataIndex: "id",
    title: "Id",
    fixed:'left',
    width:100,
    render: (_, props) => {
      return <Text>CORP00{props?.id}</Text>
    },
  },
  { dataIndex: "fullName", title: "Full name",fixed:'left' },
  {
    dataIndex: "email",
    title: "Email",
    width:300,
    render: (_, props) => <Text>{props?.email} </Text>,
  },
  {
    dataIndex: "designation",
    title: "Designation",
  },
  {
    dataIndex: "department",
    title: "Department",
  },

  {
    dataIndex: "role",
    title: "Role",
  },
  {
    dataIndex: "aadharCard",
    title: "Aadhar card",
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
      <p className="m-0">
        {props?.expInYear ? props?.expInYear + " years" : "NA"} and{" "}
        {props?.expInMonth ? props?.expInMonth + " months" : "NA"}
      </p>
    ),
  },
  {
    dataIndex: "managers",
    title: "Manager",
    render: (_, props) => <Text>{props?.managers?.fullName}</Text>,
  },
  {
    dataIndex: "panNumber",
    title: "Pan number",
  },
  {
    dataIndex: "nationality",
    title: "Nationality",
  },
  {
    dataIndex: "permanentAddress",
    title: "Permanent address",
  },
  {
    dataIndex: "residentialAddress",
    title: "Residential address",
  },
  {
    dataIndex: "fatherName",
    title: "Father name",
  },
  {
    dataIndex: "fatherContactNo",
    title: "Father contact no.",
  },
  {
    dataIndex: "fatherOccupation",
    title: "Father occupation",
  },
  {
    dataIndex: "motherName",
    title: "Mother name",
  },
  {
    dataIndex: "motherContactNo",
    title: "Mother contact no.",
  },
  {
    dataIndex: "motherOccupation",
    title: "Mother occupation",
  },
  {
    dataIndex: "spouseName",
    title: "Spouse name",
  },
  {
    dataIndex: "spouseContactNo",
    title: "Spouse contact no",
  },
  {
    dataIndex: "language",
    title: "Language",
  },
  {
    dataIndex: "emergencyNumber",
    title: "Emergency number",
  },
  {
    dataIndex: "lockerSize",
    title: "Locker size",
  },
  {
    dataIndex: "backupTeam",
    title: "Backup team",
    render: (_, props) => (
      <p>
        {props?.backupTeam ? (
          <Icon icon="fluent:checkmark-20-filled" color="green" />
        ) : (
          <Icon icon="fluent:dismiss-20-filled" color="red" />
        )}{" "}
      </p>
    ),
  },
]
