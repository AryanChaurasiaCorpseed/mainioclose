import { Button, Form, Input, Modal } from "antd"
import React, { useCallback, useState } from "react"
import { Icon } from "@iconify/react"
import { useDispatch } from "react-redux"
import { editLeadStatus } from "../../../Toolkit/Slices/LeadSlice"

const EditStatus = ({ data }) => {
  const [form] = Form.useForm()
  const dispatch=useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const handleEdit = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({ name: data?.name, description: data?.description })
  }, [data])
  const handleSubmit = useCallback(
    (values) => {
      values.id = data?.id
      dispatch(editLeadStatus(values))
      setOpenModal(false)
      window.location.reload()
    },
    [data]
  )

  return (
    <>
      <Button size="small" onClick={handleEdit}>
        <Icon icon="fluent:edit-20-regular" />
      </Button>
      <Modal
        title="Edit status"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "please enter the description" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditStatus
