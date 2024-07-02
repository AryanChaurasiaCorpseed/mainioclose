import { Button, Form,  Modal, Select, notification } from "antd"
import React, { useCallback, useState } from "react"
import { Icon } from "@iconify/react"
import { useDispatch, useSelector } from "react-redux"
import { editTicketStatus, getAllTickets } from "../Toolkit/Slices/TicketSlice"

export const EditTicketStaus = ({ data }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)
  const [openModal, setOpenModal] = useState(false)

  const handleEdit = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({ status: data?.status })
  }, [form, data])

  console.log("dkjfgudgysdy", data)

  const handleSubmit = useCallback(
    (values) => {
      values.userId = currentUserId
      values.ticketId = data?.id
      dispatch(editTicketStatus(values)).then(() => {
        dispatch(getAllTickets(currentUserId))
        setOpenModal(false)
        notification.success({ message: "Status updated successfully" })
      })
    },
    [dispatch, data, currentUserId]
  )


  return (
    <>
      <Button size="small" onClick={handleEdit}>
        <Icon icon="fluent:edit-20-filled" />
      </Button>
      <Modal
        title="Edit Ticket Status"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Status" name="status">
            <Select
              options={[
                { label: "To-Do", value: "To-Do" },
                { label: "In-Progress", value: "In-Progress" },
                { label: "Done", value: "Done" },
                { label: "Close", value: "Close" },
                { label: "Re-Open", value: "Re-Open" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
