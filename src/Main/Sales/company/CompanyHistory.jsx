import { Button, Drawer, Flex, Timeline, Typography } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getHistoryByCompanyId } from "../../../Toolkit/Slices/CompanySlice"
import dayjs from "dayjs"
const { Text } = Typography

const CompanyHistory = ({ companyId }) => {
  const dispatch = useDispatch()
  const [openDrawer, setOpenDrawer] = useState(false)

  const historyList = useSelector((state) => state.company.companyHistoryList)

  const handleOpenDrawer = useCallback(() => {
    dispatch(getHistoryByCompanyId(companyId))
    setOpenDrawer(true)
  }, [companyId])

  return (
    <>
      <Button size="small" onClick={handleOpenDrawer}>
        History
      </Button>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        closeIcon={null}
        width={"80%"}
      >
        <Flex justify="space-between">
          <Text className="heading-text">Company history</Text>
        </Flex>
        <Timeline
        mode="left"
          items={
            historyList?.length > 0
              ? historyList?.map((item) => ({
                  label: (
                    <Flex vertical gap="2" justify="flex-end">
                      <Text>{item?.eventType}</Text>
                      <Text type="secondary">
                        {dayjs(item?.createDate).format("YYYY-MM-DD , hh:mm a")}
                      </Text>
                    </Flex>
                  ),
                  children: item?.description,
                }))
              : []
          }
        />
      </Drawer>
    </>
  )
}

export default CompanyHistory
