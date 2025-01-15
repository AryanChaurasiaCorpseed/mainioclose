import React, { useEffect, useState } from "react"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import { headHrUser } from "../../Toolkit/Slices/UsersSlice"
import ColComp from "../../components/small/ColComp"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import { ApproveduserByHr } from "../../Toolkit/Slices/ApprovedStatus"
import CommonTable from "../../components/CommonTable"
import { Button, Input, Typography } from "antd"
import { Icon } from "@iconify/react"
import CreateHrDashBoard from "../../Model/CreateHrDashBoard"
import OverFlowText from "../../components/OverFlowText"
const { Text } = Typography

const HRApprovalList = () => {
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)
  const [approvedUserDep, setApprovedUserDep] = useState(true)

  const {
    allHRUsers: hrApprovalUser,
    userHRLoading,
    userHRError,
  } = useSelector((state) => state?.user)

  const { hrLoading } = useSelector((data) => data?.approved)

  useEffect(() => {
    dispatch(headHrUser(currentUserId))
  }, [dispatch, approvedUserDep, currentUserId])

  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])

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
      render: (_, props) => <OverFlowText>{props?.email}</OverFlowText>,
    },
    {
      dataIndex: "designation",
      title: "Designation",
      render: (_, props) => <OverFlowText> {props?.designation} </OverFlowText>,
    },
    {
      dataIndex: "department",
      title: "Department",
      render: (_, props) => <OverFlowText> {props?.department} </OverFlowText>,
    },

    {
      dataIndex: "role",
      title: "Role",
      render: (_, props) => <OverFlowText> {props?.role} </OverFlowText>,
    },
    {
      dataIndex: "aadharCard",
      title: "Aadhar card",
      render: (_, props) => <OverFlowText> {props?.aadharCard} </OverFlowText>,
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
      render: (_, props) => <OverFlowText> {props?.employeeId} </OverFlowText>,
    },
    {
      dataIndex: "epfNo",
      title: "Employee id",
      render: (_, props) => <OverFlowText> {props?.epfNo} </OverFlowText>,
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
      render: (_, props) => <OverFlowText> {props?.managers?.fullName} </OverFlowText>,
    },
    {
      dataIndex: "panNumber",
      title: "Pan number",
      render: (_, props) => <OverFlowText> {props?.panNumber} </OverFlowText>,
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
    dispatch(ApproveduserByHr({ currid: currentUserId, userid: userId.ids }))
    setApprovedUserDep((prev) => !prev)
  }

  useEffect(() => {
    setFilteredData(hrApprovalUser)
  }, [hrApprovalUser])

  const handleSearch = (e) => {
    const value = e.target.value.trim()
    setSearchText(value)
    const filtered = hrApprovalUser?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

  return (
    <TableOutlet>
      <MainHeading data={"Approval list"} />
      <div className="flex-verti-center-hori-start mt-2">
        <Input
          value={searchText}
          size="small"
          onChange={handleSearch}
          style={{ width: "220px" }}
          placeholder="search"
          prefix={<Icon icon="fluent:search-24-regular" />}
        />
      </div>
      <div className="mt-3">
        {userHRLoading && <TableScalaton />}
        {userHRError && <SomethingWrong />}
        {hrApprovalUser && !userHRLoading && !userHRError && (
          <CommonTable
            data={filteredData}
            columns={columns}
            scroll={{ x: 5000, y: 510 }}
            rowSelection={true}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default HRApprovalList
