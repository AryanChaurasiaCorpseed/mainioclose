import { Button, Form, Modal, notification, Tag, Upload } from "antd"
import React, { useCallback, useState } from "react"
import { Icon } from "@iconify/react"
import { useDispatch } from "react-redux"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../components/Constants"
import { getAllCompliances, uploadDocuments } from "../../Toolkit/Slices/ComplianceSlice"

export const ViewComplianceDoc = ({ data }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [openModal1, setOpenModal1] = useState(false)
  const [docLink, setDocLink] = useState("")

  const handleFinish = useCallback(
    (values) => {
      values.categoryId = data?.id
      values.docList = values?.docList?.fileList?.map((item) => item?.response)?.[0]
      dispatch(uploadDocuments(values))
        .then((resp) => {
          if (resp?.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Document uploaded successfully" })
            dispatch(getAllCompliances())
            setOpenModal1(false)
            form.resetFields()
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
        })
    },
    [dispatch, data,form]
  )

  return (
    <>
      {data?.documents?.map((item, idx) => (
        <Tag
          className="btn-tag"
          onClick={() => {
            setDocLink(item)
            setOpenModal(true)
          }}
        >
          Doc {idx + 1}
        </Tag>
      ))}
      <Tag className="btn-tag" onClick={() => setOpenModal1(true)}>
        <Icon icon="fluent:add-20-regular" />
      </Tag>

      <Modal
        title="Compliance document"
        open={openModal}
        width={800}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        footer={null}
      >
        <iframe title="" width={"100%"} height={500} src={docLink} />
      </Modal>

      <Modal
        title="Upload document"
        open={openModal1}
        onCancel={() => setOpenModal1(false)}
        onClose={() => setOpenModal1(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Upload document"
            name="docList"
            rules={[{ required: true, message: "please upload the document" }]}
          >
            <Upload
              action="/leadService/api/v1/upload/uploadimageToFileSystem"
              listType="text"
            >
              <Button>
                <Icon
                  icon="fluent:arrow-upload-20-filled"
                  height={BTN_ICON_HEIGHT}
                  width={BTN_ICON_WIDTH}
                />{" "}
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
