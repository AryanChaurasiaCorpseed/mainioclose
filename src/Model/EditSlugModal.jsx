import { Button, Form, Input, Modal, notification } from "antd"
import React, { useCallback, useState } from "react"
import LongInput from "../components/Inputs/LongInput"
import SmOneBtn from "../components/button/SmOneBtn"
import { useDispatch } from "react-redux"
import { editSulg } from "../Toolkit/Slices/LeadSlugSlice"
import { Icon } from "@iconify/react"

const EditSlugModal = ({ data }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)

  const handleFinish = useCallback(
    (values) => {
      values.id = data?.id
      dispatch(editSulg(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Slug edited successfully." })
            setOpenModal(false)
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
        })
    },
    [dispatch, data]
  )

  return (
    <div>
      <Button
        type="text"
        onClick={() => {
          form.setFieldsValue({ name: data?.name })
          setOpenModal(true)
        }}
        size="small"
      >
        <Icon icon="fluent:edit-20-regular" />
      </Button>
      <Modal
        title="Edit slug"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Enter slug name"
            name="name"
            rules={[{ required: true, message: "Please enter slug name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default EditSlugModal
