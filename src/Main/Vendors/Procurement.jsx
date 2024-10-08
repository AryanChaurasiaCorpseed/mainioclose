import { Flex, Select } from "antd"
import React, { useMemo } from "react"
import CommonTable from "../../components/CommonTable"
import MainHeading from "../../components/design/MainHeading"

const Procurement = () => {
  const column = useMemo(() => {
    const item = [
      {
        dataIndex: "id",
        title: "Id",
      },
      {
        dataIndex: "catagory",
        title: "Catagory name",
      },
      {
        dataIndex: "assignee",
        title: "Assignee",
      },
    ]
    return item
  })
  return (
    <>
      <Flex vertical gap={12}>
        <MainHeading data={`Procurement catagory list`} />
        <Select
          style={{ width: "30%" }}
          options={[]}
          placeholder="Select the catagory"
        />
        <CommonTable data={[]} columns={column} scroll={{ y: 480 }} />
      </Flex>
    </>
  )
}

export default Procurement
