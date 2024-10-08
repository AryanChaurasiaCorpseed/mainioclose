import { Button, Flex, List, notification, Select, Typography } from "antd"
import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addLeadChild } from "../../../Toolkit/Slices/LeadSlice"
const { Text } = Typography

const LeadChilds = () => {
  const dispatch = useDispatch()
  const singleLeadResponseData = useSelector(
    (state) => state.leads.singleLeadResponseData
  )
  const leadChildData = useSelector((state) => state.leads.leadChildData)
  const [selectedItem, setSelectedItem] = useState([])

  const handleAddChildLead = useCallback(() => {
    dispatch(
      addLeadChild({
        leadId: singleLeadResponseData?.leadId,
        serviceName: selectedItem,
      })
    )
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Child lead added successfully ." })
          setSelectedItem([])
        } else {
          notification.error({ message: "Something went wrong !." })
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }))
  }, [singleLeadResponseData, selectedItem, dispatch])

  return (
    <>
      <Flex vertical gap={12}>
        <Flex  gap={8}>
          <Select
            style={{ width: "35%" }}
            value={selectedItem}
            mode="multiple"
            size="small"
            maxTagCount="responsive"
            placeholder="Select the lead child's"
            options={
              leadChildData?.length > 0
                ? leadChildData?.map((item) => ({
                    label: item?.name,
                    value: item?.name,
                  }))
                : []
            }
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            onChange={setSelectedItem}
          />{" "}
          <Button
            size="small"
            type="primary"
            disabled={selectedItem?.length === 0}
            onClick={handleAddChildLead}
          >
            Submit
          </Button>
        </Flex>
        <Flex >
          <List
            itemLayout="horizontal"
            dataSource={singleLeadResponseData?.childLead}
            style={{ width: "70%" }}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={item.childLeadName}
                  description={`Assignee name : ${item?.childAssigneeName}`}
                />
                <Text> {item?.childAssigneeEmail}</Text>
              </List.Item>
            )}
          />
        </Flex>
      </Flex>
    </>
  )
}

export default LeadChilds
