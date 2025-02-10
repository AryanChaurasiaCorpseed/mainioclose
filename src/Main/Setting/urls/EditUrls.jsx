import { Button, Form, Input, Modal, Select, notification } from "antd"
import React, { useCallback, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editUrls, getAllUrlAction } from "../../../Toolkit/Slices/LeadUrlSlice"
import { Icon } from "@iconify/react"

const EditUrls = ({ data, paginationData }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const slugList = useSelector((state) => state.leadslug.slugList)

  const editFormValues = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({
      name: data?.urlsName,
      urlSlug: data?.urlSlug?.map((item) => item?.id),
      quality: data?.quality,
    })
  }, [data, form, dispatch])

  const handleSubmit = useCallback(
    async (values) => {
      values.urlsId = data?.id
      try {
        await dispatch(editUrls(values)).then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "URL edited successfully !" })
            setOpenModal(false)
            dispatch(getAllUrlAction(paginationData))
            form.resetFields()
          } else {
            notification.error({
              message: "Failed to edit the URL. Please try again.",
            })
          }
        })
      } catch (error) {
        notification.error({
          message: "Failed to edit the URL. Please try again.",
        })
      }
    },
    [data, dispatch, form]
  )
  return (
    <>
      <Button onClick={editFormValues} size="small">
        <Icon icon="fluent:edit-20-regular" /> Edit
      </Button>
      <Modal
        title="Edit url"
        open={openModal}
        onCancel={() => setOpenModal(false)}
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
              maxTagCount="responsive"
              options={
                slugList?.map((item) => ({
                  label: item?.name,
                  value: item?.id,
                })) || []
              }
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
