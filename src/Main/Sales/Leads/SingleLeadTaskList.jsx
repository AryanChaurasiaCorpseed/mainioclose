import React, { useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import CommonTable from "../../../components/CommonTable"
import { Input, Tag, Typography } from "antd"
import OverFlowText from "../../../components/OverFlowText"
import { Icon } from "@iconify/react"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
const { Text } = Typography

const SingleLeadTaskList = () => {
  const taskData = useSelector((state) => state.leads.getSingleLeadTask)
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])

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
        return <Text>{props?.name}</Text>
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
        <MainHeading data={`All tasks (${taskData?.length})`} />
        <div>
          <input
            type="date"
            className="mr-2 date-input"
            // onChange={(e) => setDateInput(e.target.value)}
          />
          <button className="common-btn-one mr-2">Filter Task</button>
          <button className="common-btn-one">Today Task</button>
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
        <CommonTable
          data={filteredData}
          columns={columns}
          scroll={{ y: 550 }}
        />
      </div>
    </div>
  )
}

export default SingleLeadTaskList
