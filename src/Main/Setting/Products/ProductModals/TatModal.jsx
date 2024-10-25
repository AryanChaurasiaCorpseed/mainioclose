import { Button, Form, Input, Modal, notification } from "antd"
import React, { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import {
  addTATforProduct,
  getSingleProductByProductId,
} from "../../../../Toolkit/Slices/ProductSlice"
import { Icon } from "@iconify/react"

const TatModal = ({ data }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)

  const handleFinish = useCallback(
    (values) => {
      values.productId = data?.id
      dispatch(addTATforProduct(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "TAT added successfully .",
            })
            dispatch(getSingleProductByProductId(data?.id))
            setOpenModal(false)
            form.resetFields()
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !." }))
    },
    [data, dispatch, form]
  )
  return (
    <>
      <Button size="small" type="text" onClick={() => setOpenModal(true)}>
        <Icon icon="fluent:add-24-filled" />
      </Button>
      <Modal
        title="Amount details"
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form
          layout="vertical"
          size="small"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Tat duration"
            name="tatValue"
            rules={[{ required: true, message: "please enter the Tat" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type of TAT"
            name="tatType"
            rules={[
              { required: true, message: "please enter the type of TAT" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Remarks"
            name="remarks"
            rules={[{ required: true, message: "please give remarks" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default TatModal
