import { Button, Space, Table, Tooltip } from "antd"
import React, { useEffect, useRef, useState } from "react"
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
  rowKey,
}) => {
  const dispatch = useDispatch()
  const tableContainerRef = useRef(null)
  const scrollIntervalRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const scrollTable = (direction) => {
    if (tableContainerRef.current) {
      const scrollAmount = 150
      const currentScrollLeft = tableContainerRef.current.scrollLeft
      const maxScrollLeft =
        tableContainerRef.current.scrollWidth -
        tableContainerRef.current.clientWidth

      if (direction === "left") {
        const newScrollLeft = Math.max(0, currentScrollLeft - scrollAmount)
        tableContainerRef.current.scrollLeft = newScrollLeft
      } else if (direction === "right") {
        const newScrollLeft = Math.min(
          maxScrollLeft,
          currentScrollLeft + scrollAmount
        )
        tableContainerRef.current.scrollLeft = newScrollLeft
      }

      checkScrollButtons()
    }
  }

  const checkScrollButtons = () => {
    if (tableContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
    }
  }

  const startScrolling = (direction) => {
    stopScrolling()
    scrollIntervalRef.current = setInterval(() => {
      scrollTable(direction)
    }, 50)
  }

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current)
      scrollIntervalRef.current = null
    }
  }

  useEffect(() => {
    const tableBody = document.querySelector(".ant-table-body")
    if (tableBody) {
      tableContainerRef.current = tableBody
      checkScrollButtons()
      tableBody.addEventListener("scroll", checkScrollButtons)
    }

    return () => {
      if (tableBody) {
        tableBody.removeEventListener("scroll", checkScrollButtons)
      }
      stopScrolling()
    }
  }, [data, columns])

  return (
    <div className="table-container">
      {canScrollLeft && (
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
      )}
      {canScrollRight && (
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
      )}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={scroll}
        rowKey={rowKey}
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
                  {nextPage && prevPage && (
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
                  )}
                </div>
              )
            : null
        }
      />
    </div>
  )
}

export default CommonTable
