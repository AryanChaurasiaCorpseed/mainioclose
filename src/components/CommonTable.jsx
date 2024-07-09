import { Table } from "antd"
import React from "react"

const CommonTable = ({ data, columns }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{
          x: 1500,
          y: 550,
        }}
      />
    </>
  )
}

export default CommonTable
