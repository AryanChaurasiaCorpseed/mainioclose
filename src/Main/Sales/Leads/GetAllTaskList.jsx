import React, { useEffect, useState } from "react"
import { useCustomRoute } from "../../../Routes/GetCustomRoutes"
import { Link, useParams } from "react-router-dom"
import UserLeadComponent from "../../../Tables/UserLeadComponent"
import MainHeading from "../../../components/design/MainHeading"
import CommonTable from "../../../components/CommonTable"
import { Drawer, Input, Tag, Typography } from "antd"
import OverFlowText from "../../../components/OverFlowText"
import { Icon } from "@iconify/react"
import dayjs from "dayjs"
import LeadDetailsPage from "../Inbox/LeadDetailsPage"
import LeadsDetailsMainPage from "./LeadsDetailsMainPage"
import { useDispatch } from "react-redux"
import { getAllUsers } from "../../../Toolkit/Slices/UsersSlice"
import { getAllContactDetails, getAllStatusData } from "../../../Toolkit/Slices/LeadSlice"
const { Text } = Typography

const GetAllTaskList = () => {
  const { userid } = useParams()
  const dispatch=useDispatch()
  const [dateInput, setDateInput] = useState("")
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [leadId, setLeadId] = useState(null)

  const allTasksByUser = `/leadService/api/v1/task/getAllTaskByAssignee?assigneeId=${userid}`
  const allTaskDep = [dateInput]

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllContactDetails())
    dispatch(getAllStatusData())
  }, [dispatch])

  const {
    productData: taskData,
    setProductData,
    loading: taskLoading,
    error: taskError,
  } = useCustomRoute(allTasksByUser, allTaskDep)

  const taskCount = taskData.length
  // let inputDataBefore = new Date(dateInput).getTime()

  let currentDateNew = new Date(new Date().toJSON().slice(0, 10)).getTime()

  let currentDate = Date.now()
  let currentDate2 = new Date().getTime()

  let beforeDate = currentDateNew
  let endDate = beforeDate + 86400000

  const todayTaskData2 = () => {
    let taskData2 = taskData
    const data = taskData.filter((task) => {
      let taskD = new Date(task.expectedDate).getTime()
      return taskD >= beforeDate && taskD <= endDate
    })
    const newData = data.sort(
      (a, b) =>
        new Date(b.expectedDate).getTime() - new Date(a.expectedDate).getTime()
    )
    setProductData(newData.reverse())
  }

  const todayTaskData = () => {
    let taskData2 = taskData
    let inputDataBefore = new Date(dateInput).getTime()
    const data = taskData.filter((task) => {
      let taskD = new Date(task.expectedDate).getTime()
      return taskD >= inputDataBefore
    })
    const newData = data.sort(
      (a, b) =>
        new Date(b.expectedDate).getTime() - new Date(a.expectedDate).getTime()
    )
    setProductData(newData.reverse())
  }

  const columns = [
    {
      dataIndex: "id",
      title: "S.No",
      width: 60,
      filterable: false,
      render: (_, props, index) => <Text>{index + 1}</Text>,
    },
    {
      dataIndex: "name",
      title: "Name",
      render: (_, props) => {
        return (
          // <Link className="link-heading" to={`/erp/${userid}/sales/leads/${props?.leadId}`}>{props?.name}</Link>
          // <Link
          //   className="link-heading"
          //   onClick={() => {
          //     setLeadId(props?.leadId)
          //     setOpenDrawer(true)
          //   }}
          // >
          //   {props?.name}
          // </Link>
          <LeadsDetailsMainPage leadId={props?.leadId} data={props}>
            {props?.name}
          </LeadsDetailsMainPage>
        )
      },
    },
    {
      dataIndex: "description",
      title: "Description",
      render: (_, props) => <OverFlowText>{props?.description}</OverFlowText>,
    },
    {
      dataIndex: "statusName",
      title: "Status",
      render: (_, props) => {
        return (
          <Tag
            color={
              props?.taskStatus === "Re-Open"
                ? "error"
                : props?.status === "Done"
                ? "green"
                : ""
            }
          >
            {props?.statusName}
          </Tag>
        )
      },
    },

    {
      dataIndex: "expectedDate",
      title: "Date",
      sorter: (a, b) => {
        const dateA = dayjs(a.expectedDate)
        const dateB = dayjs(b.expectedDate)
        return dateA?.isBefore(dateB) ? -1 : dateA?.isAfter(dateB) ? 1 : 0
      },
      render: (expectedDate) => {
        return expectedDate === null || expectedDate === undefined ? (
          "NA"
        ) : (
          <Text>{dayjs(expectedDate).format("YYYY-MM-DD HH:mm")}</Text>
        )
      },
    },
  ]

  useEffect(() => {
    const taskDatas = [...taskData]
    setFilteredData(taskDatas)
  }, [taskData])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filtered = taskData?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

  return (
    <div className="lead-module small-box-padding">
      <div className="create-user-box">
        <MainHeading data={`All tasks (${taskCount})`} />
        <div>
          <input
            type="date"
            className="mr-2 date-input"
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button className="common-btn-one mr-2" onClick={todayTaskData}>
            Filter Task
          </button>
          <button className="common-btn-one" onClick={todayTaskData2}>
            Today Task
          </button>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex-verti-center-hori-start mt-2">
          <Input
            placeholder="search"
            size="small"
            value={searchText}
            onChange={handleSearch}
            style={{ width: "250px" }}
            prefix={<Icon icon="fluent:search-24-regular" />}
          />
        </div>
        {taskData && !taskLoading && !taskError && (
          // <UserLeadComponent row={taskData} columns={columns} />
          <CommonTable
            data={filteredData}
            columns={columns}
            scroll={{ y: 550 }}
          />
        )}
      </div>

      {/* <Drawer
        title="Lead detail"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        width={'80%'}
      >
        <LeadDetailsPage leadid={leadId} />
      </Drawer> */}
    </div>
  )
}

export default GetAllTaskList
