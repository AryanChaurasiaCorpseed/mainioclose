import { Button, Space, Table, Tooltip } from "antd"
import React from "react"
import { Icon } from "@iconify/react"
import { useDispatch } from "react-redux"
import "./CommonTable.scss"

const CommonTable = ({
  data,
  columns,
  scroll,
  nextPage,
  prevPage,
  pagination,
  prevDisable,
  nextDisable,
}) => {
  const dispatch = useDispatch()
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={scroll}
        footer={
          pagination
            ? () => (
                <div className="table-footer">
                  <Space>
                    <Tooltip title="Prev page">
                      <Button
                        size="small"
                        disabled={prevDisable}
                        onClick={() => dispatch(prevPage())}
                      >
                        <Icon icon="fluent:chevron-left-20-regular" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Next page">
                      <Button
                        size="small"
                        disabled={nextDisable}
                        onClick={() => dispatch(nextPage())}
                      >
                        <Icon icon="fluent:chevron-right-20-regular" />
                      </Button>
                    </Tooltip>
                  </Space>
                </div>
              )
            : null
        }
      />
    </>
  )
}

export default CommonTable
