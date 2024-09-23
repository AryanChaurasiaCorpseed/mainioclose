import {
  Button,
  Col,
  Drawer,
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
import React, { useCallback, useState } from "react"
import { Icon } from "@iconify/react"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../components/Constants"
import dayjs from "dayjs"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllVendorsRequest,
  getvendorHistoryByLeadId,
  sendVendorsProposal,
  updateVendorStatus,
} from "../../Toolkit/Slices/LeadSlice"
import { useParams } from "react-router-dom"
const { Text, Paragraph } = Typography

const SingleVendorRequestDetails = ({ data }) => {
  const { userid } = useParams()
  const dispatch = useDispatch()
  const historyList = useSelector(
    (state) => state.leads.singleVendorHistoryList
  )
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [form] = Form.useForm()

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const handleOpenDrawer = useCallback(() => {
    setOpenDrawer(true)
    dispatch(
      getvendorHistoryByLeadId({
        userId: userid,
        leadId: data?.leadId,
        vendorRequestId: data?.id,
      })
    )
  }, [dispatch, data, userid])

  const handleUpdateRequest = useCallback(
    (values) => {
      values.quotationFilePath = values?.quotationFilePath?.[0]?.response
      values.serviceName = data?.serviceName
      values.companyName = data?.clientCompanyName
      values.contactPersonName = data?.contactPersonName
      let obj = {
        vendorId: data?.id,
        userId: userid,
        leadId: data?.leadId,
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
                  leadId: data?.leadId,
                  vendorRequestId: data?.id,
                  data: {
                    attachmentPath: values?.quotationFilePath,
                    clientMailId: data?.clientEmailId,
                    comment: values?.description,
                    clientName: data?.clientName,
                    serviceName: data?.serviceName,
                  },
                })
              )
                .then((resp) => {
                  if (resp.meta.requestStatus === "fulfilled") {
                    notification.success({
                      message: "Proposal send to client.",
                    })
                  } else {
                    notification.error({
                      message:
                        "Something went wrong to proposal send to client !.",
                    })
                  }
                })
                .catch(() =>
                  notification.error({
                    message:
                      "Something went wrong to proposal send to client !.",
                  })
                )
            }
            dispatch(
              getvendorHistoryByLeadId({
                userId: userid,
                leadId: data?.leadId,
                vendorRequestId: data?.id,
              })
            )
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
        })
    },
    [dispatch, data, userid]
  )
  return (
    <>
      <Button size="small" shape="round" onClick={handleOpenDrawer}>
        Status
      </Button>
      <Drawer
        open={openDrawer}
        width={"80%"}
        closeIcon={null}
        onClose={() => setOpenDrawer(false)}
      >
        <Flex justify="space-between">
          <Text className="heading-text">Vendor's request status</Text>
          <Button size="small" onClick={() => setOpenModal(true)}>
            Update status
          </Button>
        </Flex>
        <Row>
          <Col span={6}>
            <Flex style={{ width: "100%" }} gap={8} vertical>
              {data?.updatedDate && (
                <Text className="heading-text" type="secondary">
                  {" "}
                  Vendor's detail{" "}
                  {dayjs(data?.updatedDate).format("YYYY-MM-DD , hh:mm a")}{" "}
                </Text>
              )}
              {Object.keys(data)?.length > 0 && (
                <Flex vertical gap={12}>
                  {data?.clientName && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:person-24-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>{data?.clientName}</Text>
                    </Flex>
                  )}

                  {data?.clientEmailId && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:mail-24-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>{data?.clientEmailId}</Text>
                    </Flex>
                  )}

                  {data?.clientCompanyName && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:building-people-24-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>{data?.clientCompanyName}</Text>
                    </Flex>
                  )}

                  {data?.budgetPrice && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:money-24-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>{data?.budgetPrice}</Text>
                    </Flex>
                  )}

                  {data?.serviceName && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:person-settings-20-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>Service name : {data?.serviceName}</Text>
                    </Flex>
                  )}

                  {data?.requirementDescription && (
                    <Flex gap={6}>
                      <Flex>
                        <Icon
                          icon="fluent:document-bullet-list-24-regular"
                          height={BTN_ICON_HEIGHT}
                          width={BTN_ICON_WIDTH}
                        />
                      </Flex>
                      <Paragraph>{data?.requirementDescription}</Paragraph>
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
                historyList?.length > 0
                  ? historyList?.map((item) => ({
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
                            by {item?.user?.fullName}
                          </Text>
                          <Text type="secondary">
                            {dayjs(item?.updateDate).format(
                              "YYYY-MM-DD , hh:mm a"
                            )}
                          </Text>
                        </Flex>
                      ),
                      children: (
                        <Flex vertical gap={2}>
                          <Text strong>
                            Price give by vendor : {item?.externalVendorPrice}
                          </Text>
                          <Text strong>
                            Price given to vendor : {item?.internalVendorPrices}
                          </Text>
                          <Text> {item?.updateDescription}</Text>
                        </Flex>
                      ),
                    }))
                  : []
              }
            />
          </Col>
        </Row>
      </Drawer>
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
                  <>
                    <Form.Item
                      label="Reference attachement"
                      name="quotationFilePath"
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
                      label="Quotation amount"
                      name="vendorSharedPrice"
                    >
                      <Input />
                    </Form.Item>
                  </>
                )}
              </>
            )}
          </Form.Item>

          <Form.Item label="Amount given to vendor" name="internalVendorPrices">
            <Input />
          </Form.Item>
          <Form.Item label="Amount given by vendor" name="externalVendorPrice">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default SingleVendorRequestDetails
