import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Popover,
  Select,
  Upload,
} from "antd"
import React, { useCallback, useState } from "react"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../../components/Constants"
import { Icon } from "@iconify/react"
import { useDispatch, useSelector } from "react-redux"
import {
  addVendorsDetail,
  getVendorDetailList,
} from "../../../Toolkit/Slices/LeadSlice"

const VendorForm = ({ leadId, userId, serviceName, setOpenPopOver }) => {
  const { allLeadUrl } = useSelector((prev) => prev?.leadurls)
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
    (data) => {
      data.vendorReferenceFile = data?.vendorReferenceFile?.[0]?.response
      let temData = {
        leadId,
        userId,
        data,
      }
      dispatch(addVendorsDetail(temData))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Vendor's details added successfully",
            })
            setOpenPopOver(false)
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !." }))
    },
    [dispatch, leadId, userId, serviceName]
  )
  return (
    <>
      <Button type="primary" onClick={() => setOpenModal(true)}>
        Add vendor
      </Button>
      <Modal
        title="Vendor's details"
        open={openModal}
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
          initialValues={{ serviceName: serviceName }}
        >
          <Form.Item
            label="Person name"
            name="contactPersonName"
            rules={[
              { required: true, message: "please enter the person name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="concernPersonMailId"
            rules={[
              {
                required: true,
                type: "email",
                message: "please enter email address",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company name"
            name="companyName"
            rules={[{ required: true, message: "please enter company name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select url"
            name="serviceName"
            rules={[{ required: true, message: "please select urls" }]}
          >
            <Select
              options={allLeadUrl?.map((item) => ({
                label: item?.urlsName,
                value: item?.urlsName,
              }))}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            label="Reference attachement"
            name="vendorReferenceFile"
            getValueFromEvent={normFile}
            valuePropName="fileList"
          >
            <Upload
              action="/leadService/api/v1/upload/uploadimageToFileSystem"
              listType="text"
            >
              <Button size="small">
                <Icon
                  icon="fluent:arrow-upload-20-filled"
                  //   height={BTN_ICON_HEIGHT}
                  //   width={BTN_ICON_WIDTH}
                />{" "}
                Upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "please enter description" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

const Vendors = ({ leadId, userId, urlName }) => {
  const dispatch = useDispatch()
  const vendorList = useSelector((state) => state.leads.vendorsList)
  const singleLeadResponseData = useSelector(
    (state) => state.leads.singleLeadResponseData
  )

  useState(() => {
    dispatch(getVendorDetailList({ leadId, userId }))
  }, [leadId, userId])

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div className="filter-box">
          <VendorForm
            leadId={leadId}
            userId={userId}
            serviceName={singleLeadResponseData?.originalName}
          />
        </div>
      </div>
    </div>
  )
}

export default Vendors
