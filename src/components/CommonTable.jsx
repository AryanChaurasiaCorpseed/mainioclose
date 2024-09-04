import { Button, Space, Table, Tooltip } from "antd"
import React, { useEffect, useRef } from "react"
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
  rowClassName,
  footerContent,
}) => {
  const dispatch = useDispatch()
  const tableContainerRef = useRef(null)
  const scrollIntervalRef = useRef(null);
  

  const startScrolling = (direction) => {
    scrollIntervalRef.current = setInterval(() => {
      scrollTable(direction);
    }, 50);
  };

  const stopScrolling = () => {
    clearInterval(scrollIntervalRef.current);
  };


  const scrollTable = (direction) => {
    if (tableContainerRef.current) {
      const scrollAmount = 150 
      if (direction === "left") {
        tableContainerRef.current.scrollLeft -= scrollAmount
      } else {
        tableContainerRef.current.scrollLeft += scrollAmount
      }
    }
  }

  useEffect(() => {
    const tableBody = document.querySelector(".ant-table-body")
    if (tableBody) {
      tableContainerRef.current = tableBody
    }
  }, [])

  return (
    <div className="table-container">
      <Button
        shape="round"
        size="small"
        className="scroll-button scroll-left"
        onMouseDown={() => startScrolling("left")}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
      >
        <Icon icon="fluent:chevron-left-20-regular" />
      </Button>
      <Button
        shape="round"
        size="small"
        className="scroll-button scroll-right"
        onMouseDown={() => startScrolling("right")}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
      >
        <Icon icon="fluent:chevron-right-20-regular" />
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={scroll}
        rowKey={(record) => record?.id}
        rowClassName={rowClassName}
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
                  <div>{footerContent}</div>
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
    </div>
  )
}

export default CommonTable
