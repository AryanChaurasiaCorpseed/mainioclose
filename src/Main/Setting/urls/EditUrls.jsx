import { Button, Form, Input, Modal, Select, message } from "antd"
import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editUrls, getAllUrlAction } from "../../../Toolkit/Slices/LeadUrlSlice"
import { Icon } from "@iconify/react"

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
        dispatch(getAllUrlAction(0))
      } catch (error) {
        message.error("Failed to edit the URL. Please try again.")
        setOpenModal(false)
      }
    },
    [data]
  )
  return (
    <>
      <Button type="text" onClick={editFormValues} size="small">
        <Icon icon="fluent:edit-20-regular" />
      </Button>
      <Modal
        title="Edit Url"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        width={800}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
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
            allowClear
            showSearch
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
            allowClear
            showSearch
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
