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
  rowSelection,
  onRowSelection,
  selectedRowKeys,
}) => {
  const dispatch = useDispatch()
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={scroll}
        rowKey={(record) => record?.id}
        rowSelection={
          rowSelection && {
            type: "checkbox",
            selectedRowKeys: selectedRowKeys,
            onChange: onRowSelection,
          }
        }
        footer={
          pagination
            ? () => (
                <div className="table-footer">
                  <Space>
                    <Tooltip title="Prev page" arrow={false}>
                      <Button
                        size="small"
                        disabled={prevDisable}
                        onClick={() => dispatch(prevPage())}
                      >
                        <Icon icon="fluent:chevron-left-20-regular" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Next page" arrow={false}>
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
