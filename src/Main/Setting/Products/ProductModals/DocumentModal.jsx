import { Button, Form, Input, Modal, notification, Select, Upload } from "antd"
import React, { useCallback, useState } from "react"
import { Icon } from "@iconify/react"
import { useDispatch } from "react-redux"
import { addDocumentProduct, getSingleProductByProductId } from "../../../../Toolkit/Slices/ProductSlice"
import { getAllProductData } from "../../../../Toolkit/Slices/LeadSlice"

const DocumentModal = ({ data }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const handleFinish = useCallback(
    (values) => {
      values.productId = data?.id
      dispatch(addDocumentProduct(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Document is added successfully." })
            dispatch(getSingleProductByProductId(data?.id))
            setOpenModal(false)
            form.resetFields()
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !." }))
    },
    [dispatch, form, data]
  )

  return (
    <>
      <Button size="small" type="text" onClick={() => setOpenModal(true)}>
        <Icon icon="fluent:add-24-filled" />
      </Button>
      <Modal
        title="Document details"
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
            label="Document name"
            name="name"
            rules={[
              { required: true, message: "please enter the document name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "please enter the description" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "please select type" }]}
          >
            <Select
              options={[
                { label: "Client", value: "client" },
                { label: "Agent", value: "agent" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Document attachement"
            name="saleTeamAttachmentReference"
            getValueFromEvent={normFile}
            valuePropName="fileList"
          >
            <Upload
              action="/leadService/api/v1/upload/uploadimageToFileSystem"
              listType="text"
            >
              <Button size="small">
                <Icon icon="fluent:arrow-upload-20-filled" />
                Upload
              </Button>
            </Upload>
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  )
}

export default DocumentModal
