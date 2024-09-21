import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Timeline,
  Typography,
  Upload,
} from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { useDispatch, useSelector } from "react-redux"
import {
  addVendorsDetail,
  getVendorDetailList,
  sendVendorsProposal,
  updateVendorStatus,
} from "../../Toolkit/Slices/LeadSlice"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../components/Constants"
const { Text, Paragraph } = Typography

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
      data.saleTeamAttachmentReference = data?.saleTeamAttachmentReference?.[0]?.response
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
            setOpenModal(false)
            dispatch(getVendorDetailList({ leadId, userid: userId }))
            form.resetFields()
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
        })
    },
    [dispatch, leadId, userId, serviceName, form]
  )
  return (
    <>
      <Button type="primary" onClick={() => setOpenModal(true)}>
        Add vendor's request
      </Button>
      <Modal
        title="Vendor's details"
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
          initialValues={{ serviceName: serviceName }}
          style={{ maxHeight: "80vh", overflow: "auto" }}
        >
          <Form.Item
            label="Person name"
            name="clientName"
            rules={[
              { required: true, message: "please enter the person name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="clientMailId"
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
          <Form.Item
            label="Contact number"
            name="clientMobileNumber"
            rules={[{ required: true, message: "please give contact number" }]}
          >
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item label="Budget price" name="clientBudgetPrice">
            <Input />
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

const Vendors = ({ leadId }) => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const [form] = Form.useForm()
  const vendorList = useSelector((state) => state.leads.vendorsList)
  const singleLeadResponseData = useSelector(
    (state) => state.leads.singleLeadResponseData
  )
  const [vendor, setVendor] = useState([])
  const [vendorDetail, setVendorDetail] = useState({})
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    dispatch(getVendorDetailList({ leadId, userid }))
  }, [leadId, userid])

  useEffect(() => {
    if (vendorList?.length > 0) {
      setVendor(vendorList?.[0]?.updateHistory)
      setVendorDetail(vendorList?.[0])
    }
  }, [vendorList])

  const handleSelectVendor = useCallback(
    (e) => {
      let result = vendorList?.find((item) => item?.id === e)
      setVendorDetail(result)
      setVendor(result?.updateHistory)
    },
    [vendorList]
  )

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const handleUpdateRequest = useCallback(
    (values) => {
      values.vendorReferenceFile = values?.vendorReferenceFile?.[0]?.response
      values.serviceName = vendorDetail?.serviceName
      values.companyName = vendorDetail?.clientCompanyName
      values.contactPersonName = vendorDetail?.contactPersonName
      let obj = {
        vendorId: vendorDetail?.id,
        userId: userid,
        leadId: leadId,
        data: values,
      }
      dispatch(updateVendorStatus(obj))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Vendor's status updated successfully",
            })
            setOpenModal(false)
            form.resetFields()
            if (values?.status === "Finished") {
              dispatch(
                sendVendorsProposal({
                  userId: userid,
                  leadId: leadId,
                  vendorRequestId: vendorDetail?.id,
                  data: {
                    attachmentPath: values?.vendorReferenceFile,
                    clientMailId: vendorDetail?.clientEmailId,
                    comment: values?.description,
                    clientName: vendorDetail?.contactPersonName,
                    serviceName: vendorDetail?.serviceName,
                  },
                })
              )
                .then((resp) => {
                  if (resp.meta.requestStatus === "fulfilled") {
                    notification.success({ message: "Proposal send to client." })
                  } else {
                    notification.error({
                      message:
                        "Something went wrong to proposal send to client !.",
                    })
                  }
                })
                .catch(() =>
                  notification.error({
                    message: "Something went wrong to proposal send to client !.",
                  })
                )
            }
            dispatch(getVendorDetailList({ leadId, userid }))
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
        })
    },
    [dispatch, vendorDetail, userid, leadId]
  )

  console.log("sxcnbXNCBJJSDB", vendorList)

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 2px",
          border: "0.5px solid #f2f2f2",
          borderRadius: "4px",
        }}
      >
        <Select
          showSearch
          allowClear
          size="small"
          value={vendorDetail?.id}
          placeholder="select vendor request"
          style={{ width: "25%" }}
          options={
            vendorList?.length > 0
              ? vendorList?.map((item) => ({
                  label: `${item?.contactPersonName}${
                    item?.contactNumber ? ` || ${item?.contactNumber}` : ""
                  }`,
                  value: item?.id,
                }))
              : []
          }
          filterOption={(input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
          onChange={handleSelectVendor}
        />
        <div className="filter-box">
          <VendorForm
            leadId={leadId}
            userId={userid}
            serviceName={singleLeadResponseData?.originalName}
          />
        </div>
      </div>

      <div style={{ marginTop: "12px" }}>
        <Flex justify="space-between">
          <Text className="heading-text">Vendor's request status</Text>
          <Button size="small" onClick={() => setOpenModal(true)}>
            Update status
          </Button>
        </Flex>
        <Row>
          <Col span={6}>
            <Flex style={{ width: "100%" }} gap={8} vertical>
              {vendorDetail?.updatedDate && (
                <Text className="heading-text" type="secondary">
                  {" "}
                  Vendor's detail{" "}
                  {dayjs(vendorDetail?.updatedDate).format(
                    "YYYY-MM-DD , hh:mm a"
                  )}{" "}
                </Text>
              )}
              {Object.keys(vendorDetail)?.length > 0 && (
                <Flex vertical gap={12}>
                  {vendorDetail?.contactPersonName && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:person-24-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>{vendorDetail?.contactPersonName}</Text>
                    </Flex>
                  )}

                  {vendorDetail?.clientEmailId && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:mail-24-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>{vendorDetail?.clientEmailId}</Text>
                    </Flex>
                  )}

                  {vendorDetail?.clientCompanyName && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:building-people-24-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>{vendorDetail?.clientCompanyName}</Text>
                    </Flex>
                  )}

                  {vendorDetail?.budgetPrice && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:money-24-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>{vendorDetail?.budgetPrice}</Text>
                    </Flex>
                  )}

                  {vendorDetail?.serviceName && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:person-settings-20-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>Service name : {vendorDetail?.serviceName}</Text>
                    </Flex>
                  )}

                  {vendorDetail?.requirementDescription && (
                    <Flex gap={6}>
                      <Flex>
                        <Icon
                          icon="fluent:document-bullet-list-24-regular"
                          height={BTN_ICON_HEIGHT}
                          width={BTN_ICON_WIDTH}
                        />
                      </Flex>
                      <Paragraph>
                        {vendorDetail?.requirementDescription}
                      </Paragraph>
                    </Flex>
                  )}
                </Flex>
              )}
            </Flex>
          </Col>
          <Col span={18}>
            <Timeline
              mode="left"
              items={
                vendor?.length > 0
                  ? vendor?.map((item) => ({
                      color:
                        item?.requestStatus === "Unavailable"
                          ? "red"
                          : item?.requestStatus === "Finished"
                          ? "green"
                          : item?.requestStatus === "Processing"
                          ? "yellow"
                          : "blue",
                      dot:
                        item?.requestStatus === "Processing" ? (
                          <Icon icon="fluent:clock-24-regular" color="yellow" />
                        ) : item?.requestStatus === "Finished" ? (
                          <Icon
                            icon="fluent:checkmark-24-filled"
                            color="green"
                          />
                        ) : (
                          ""
                        ),
                      label: (
                        <Flex vertical gap="2" justify="flex-end">
                          <Text>{item?.requestStatus}</Text>
                          <Text type="secondary">
                            {dayjs(item?.updateDate).format(
                              "YYYY-MM-DD , hh:mm a"
                            )}
                          </Text>
                        </Flex>
                      ),
                      children: item?.updateDescription,
                    }))
                  : []
              }
            />
          </Col>
        </Row>
      </div>
      <Modal
        title="Update status"
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" onFinish={handleUpdateRequest} form={form}>
          <Form.Item label="Status" name="status">
            <Select
              options={[
                {
                  label: "Initiated",
                  value: "Initiated",
                },
                {
                  label: "Processing",
                  value: "Processing",
                },
                {
                  label: "Unavailable",
                  value: "Unavailable",
                },
                {
                  label: "Finished",
                  value: "Finished",
                },
              ]}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.status !== currentValues.status
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("status") === "Finished" && (
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
                        <Icon icon="fluent:arrow-upload-20-filled" />
                        Upload
                      </Button>
                    </Upload>
                  </Form.Item>
                )}
              </>
            )}
          </Form.Item>
          <Form.Item label="Quotation amount" name="vendorSharedPrice">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Vendors
