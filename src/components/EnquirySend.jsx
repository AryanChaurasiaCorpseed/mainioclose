import React, { useCallback } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllTickets } from "../Toolkit/Slices/TicketSlice"
import { Button, Form, Input, notification, Popover } from "antd"
import { Icon } from "@iconify/react"
import { createTicket } from "../Toolkit/Slices/LeadSlice"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "./Constants"

const EnquirySend = () => {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)

  const handleSubmit = useCallback(
    (values) => {
      values.userId = currentUserId
      dispatch(createTicket(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Ticket submitted successfully" })
            setOpenModal(false)
            dispatch(getAllTickets(currentUserId))
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
        })
    },
    [currentUserId, dispatch]
  )

  return (
    <Popover
      title="Raise ticket"
      trigger={["click"]}
      placement="bottomLeft"
      overlayStyle={{ width: "400px" }}
      open={openModal}
      onOpenChange={(e) => setOpenModal(e)}
      content={
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "please write subject" }]}
          >
            <Input placeholder="Write subject here..." />
          </Form.Item>
          <Form.Item
            label="Message"
            name="description"
            rules={[{ required: true, message: "please write message" }]}
          >
            <Input.TextArea placeholder="Write message here..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      }
    >
      <Button size="small" type="text" onClick={() => setOpenModal(true)}>
        <Icon
          icon="fluent:question-circle-24-regular"
          height={BTN_ICON_HEIGHT}
          width={BTN_ICON_WIDTH}
        />
      </Button>
    </Popover>
  )
}

export default EnquirySend
