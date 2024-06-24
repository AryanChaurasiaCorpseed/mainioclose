import { Button, Form, Input, Modal, Select, message } from "antd"
import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editUrls, getAllUrlAction } from "../../../Toolkit/Slices/LeadUrlSlice"

const EditUrls = ({ data }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const { allLeadSlug } = useSelector((prev) => prev?.leadslug)
  
  const editFormValues = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({
      name: data?.urlsName,
      urlSlug: data?.urlSlug?.map((item) => item?.id),
      quality: data?.quality,
    })
  }, [data])

  const handleSubmit = useCallback(
    async (values) => {
      values.urlsId = data?.id
      try {
        const response = await dispatch(editUrls(values)).unwrap() 
        message.success("URL edited successfully!")
        setOpenModal(false)
        dispatch(getAllUrlAction())
      } catch (error) {
        message.error("Failed to edit the URL. Please try again.")
        setOpenModal(false)
      }
    },
    [data]
  )
  return (
    <>
      <Button onClick={editFormValues}>Edit</Button>
      <Modal
        title="Edit Url"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        width={800}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Enter Url Name"
            name="name"
            rules={[{ required: true, message: "please enter url" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select Slug"
            name="urlSlug"
            rules={[{ required: true, message: "please select slug" }]}
          >
            <Select
              mode="multiple"
              options={allLeadSlug?.map((item) => ({
                label: item?.name,
                value: item?.id,
              }))}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            label="Select Quality"
            name="quality"
            rules={[{ required: true, message: "please select quality" }]}
          >
            <Select
              options={[
                { label: "True", value: true },
                { label: "False", value: false },
              ]}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default EditUrls
