import {
  Button,
  Form,
  Input,
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
    <Form
      layout="vertical"
      size="small"
      onFinish={handleFinish}
      initialValues={{ serviceName: serviceName }}
    >
      <Form.Item
        label="Person name"
        name="contactPersonName"
        rules={[{ required: true, message: "please enter the person name" }]}
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

const Vendors = ({ leadId, userId, urlName }) => {
  const dispatch = useDispatch()
  const vendorList = useSelector((state) => state.leads.vendorsList)
  const [openPopOver, setOpenPopOver] = useState(false)
  const [openPopOver1, setOpenPopOver1] = useState(false)

  useState(() => {
    dispatch(getVendorDetailList({ leadId, userId }))
  }, [leadId, userId])

  const viewVendorsDetails = useCallback(() => {
    return <></>
  }, [])

  return (
    <div className="filter-box">
      <Popover
        title="Vendor's details"
        overlayStyle={{ minWidth: "400px", maxWidth: "750px" }}
        content={
          <VendorForm
            leadId={leadId}
            userId={userId}
            serviceName={urlName}
            setOpenPopOver={setOpenPopOver}
          />
        }
        placement="bottomRight"
        trigger={["click"]}
        open={openPopOver}
        onOpenChange={(e) => setOpenPopOver(e)}
      >
        <Button shape="round" onClick={() => setOpenPopOver(true)}>
          Vendor
        </Button>
      </Popover>
      <Popover
        title="Vendor's details"
        overlayStyle={{ minWidth: "400px", maxWidth: "750px" }}
        content={viewVendorsDetails}
        placement="bottomRight"
        trigger={["click"]}
        open={openPopOver1}
        onOpenChange={(e) => setOpenPopOver1(e)}
      >
        <Button shape="round" onClick={() => setOpenPopOver1(true)}>
          Vendor's status
        </Button>
      </Popover>
    </div>
  )
}

export default Vendors
