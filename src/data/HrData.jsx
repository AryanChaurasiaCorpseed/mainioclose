import { Typography } from "antd"
import { Icon } from "@iconify/react"
import OverFlowText from "../components/OverFlowText"
const { Text } = Typography

export const hrUserData = [
  {
    dataIndex: "id",
    title: "Employer id",
    fixed: "left",
    width: 120,
    render: (_, props) => {
      return <Text>CORP00{props?.id}</Text>
    },
  },
  { dataIndex: "fullName", title: "Full name", fixed: "left" },
  {
    dataIndex: "email",
    title: "Email",
    width: 300,
    render: (_, props) => <OverFlowText>{props?.email}</OverFlowText>,
  },
  {
    dataIndex: "contactNo",
    title: "Contact number",
    render: (_, props) => <OverFlowText>{props?.contactNo}</OverFlowText>,
  },
  {
    dataIndex: "designation",
    title: "Designation",
    render: (_, data) => <OverFlowText>{data?.userDesignation?.name}</OverFlowText>,
  },
  {
    dataIndex: "department",
    title: "Department",
    render: (_, data) => <OverFlowText>{data?.userDepartment?.name}</OverFlowText>,
  },

  {
    dataIndex: "role",
    title: "Role",
    render: (_, data) => <OverFlowText>{data?.role?.[0]}</OverFlowText>,
  },
  {
    dataIndex: "aadharCard",
    title: "Aadhar card",
    render: (_, data) => <OverFlowText>{data?.aadharCard}</OverFlowText>,
  },
  {
    dataIndex: "dateOfJoining",
    title: "Joining date",
    render: (_, props) => (
      <OverFlowText>
        {props?.dateOfJoining
          ? new Date(props?.dateOfJoining)?.toLocaleDateString()
          : "NA"}
      </OverFlowText>
    ),
  },
  {
    dataIndex: "employeeId",
    title: "Employee id",
  },
  {
    dataIndex: "epfNo",
    title: "Employee id",
    render: (_, props) =><OverFlowText>{props?.epfNo}</OverFlowText>,
  },
  {
    dataIndex: "experience",
    title: "Experience",
    render: (_, props) => (
      <OverFlowText>
        {props?.expInYear ? props?.expInYear + " years" : "NA"} and{" "}
        {props?.expInMonth ? props?.expInMonth + " months" : "NA"}
      </OverFlowText>
    ),
  },
  {
    dataIndex: "managers",
    title: "Manager",
    render: (_, props) => <OverFlowText>{props?.managers?.fullName}</OverFlowText>,
  },
  {
    dataIndex: "panNumber",
    title: "Pan number",
    render: (_, props) => <OverFlowText>{props?.panNumber}</OverFlowText>,
  },
  {
    dataIndex: "nationality",
    title: "Nationality",
    render: (_, props) => <OverFlowText>{props?.nationality}</OverFlowText>,
  },
  {
    dataIndex: "permanentAddress",
    title: "Permanent address",
    render: (_, data) => <OverFlowText>{data?.permanentAddress}</OverFlowText>,
  },
  {
    dataIndex: "residentialAddress",
    title: "Residential address",
    render: (_, data) => (
      <OverFlowText>{data?.residentialAddress}</OverFlowText>
    ),
  },
  {
    dataIndex: "fatherName",
    title: "Father name",
    render: (_, data) => <OverFlowText>{data?.fatherName}</OverFlowText>,
  },
  {
    dataIndex: "fatherContactNo",
    title: "Father contact no.",
    render: (_, data) => <OverFlowText>{data?.fatherContactNo}</OverFlowText>,
  },
  {
    dataIndex: "fatherOccupation",
    title: "Father occupation",
    render: (_, data) => <OverFlowText>{data?.fatherOccupation}</OverFlowText>,
  },
  {
    dataIndex: "motherName",
    title: "Mother name",
    render: (_, data) => <OverFlowText>{data?.motherName}</OverFlowText>,
  },
  {
    dataIndex: "motherContactNo",
    title: "Mother contact no.",
    render: (_, data) => <OverFlowText>{data?.motherContactNo}</OverFlowText>,
  },
  {
    dataIndex: "motherOccupation",
    title: "Mother occupation",
    render: (_, data) => <OverFlowText>{data?.motherOccupation}</OverFlowText>,
  },
  {
    dataIndex: "spouseName",
    title: "Spouse name",
    render: (_, data) => <OverFlowText>{data?.spouseName}</OverFlowText>,
  },
  {
    dataIndex: "spouseContactNo",
    title: "Spouse contact no",
    render: (_, data) => <OverFlowText>{data?.spouseContactNo}</OverFlowText>,
  },
  {
    dataIndex: "language",
    title: "Language",
    render: (_, data) => <OverFlowText>{data?.language}</OverFlowText>,
  },
  {
    dataIndex: "emergencyNumber",
    title: "Emergency number",
    render: (_, data) => <OverFlowText>{data?.emergencyNumber}</OverFlowText>,
  },
  {
    dataIndex: "lockerSize",
    title: "Locker size",
    render: (_, data) => <OverFlowText>{data?.lockerSize}</OverFlowText>,
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
