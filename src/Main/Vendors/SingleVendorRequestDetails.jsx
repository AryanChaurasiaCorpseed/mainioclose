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
} from "antd";
import React, { useCallback, useState } from "react";
import { Icon } from "@iconify/react";
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../components/Constants";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelVendorsRequest,
  getAllVendorsRequest,
  getvendorHistoryByLeadId,
  sendVendorsProposal,
  updateVendorStatus,
  vendorsRequestView,
} from "../../Toolkit/Slices/LeadSlice";
import { useParams } from "react-router-dom";
import { getHighestPriorityRole } from "../Common/Commons";
const { Text, Paragraph } = Typography;

const SingleVendorRequestDetails = ({ data,paginationData }) => {
  const { userid } = useParams();
  const dispatch = useDispatch();
  const historyList = useSelector(
    (state) => state.leads.singleVendorHistoryList
  );
  const vendorsStatus = useSelector((state) => state.leads.vendorsStatus);
  const currentRoles = useSelector((state) => state?.auth?.roles);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDocModal, setOpenDocModal] = useState(false);
  const [openDocModal1, setOpenDocModal1] = useState(false);
  const [index, setIndex] = useState(0);

  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleOpenDrawer = useCallback(() => {
    setOpenDrawer(true);
    dispatch(vendorsRequestView({ id: data?.id, userid }));
    dispatch(
      getvendorHistoryByLeadId({
        userId: userid,
        leadId: data?.leadId,
        vendorRequestId: data?.id,
      })
    );
  }, [dispatch, data, userid]);

  const handleUpdateRequest = useCallback(
    (values) => {
      values.quotationFilePath = values?.quotationFilePath?.[0]?.response;
      values.agreementWithClientDocumentPath =
        values?.agreementWithClientDocumentPath?.[0]?.response;
      values.companyName = data?.clientCompanyName;
      values.contactPersonName = data?.contactPersonName;
      values.vendorCategoryId = data?.vendorCategoryId;
      values.subVendorCategoryId = data?.vendorSubCategoryId;
      let obj = {
        vendorId: data?.id,
        userId: userid,
        leadId: data?.leadId,
        data: values,
      };

      if (values?.requestStatus === "Cancel") {
        dispatch(
          cancelVendorsRequest({
            vendorRequestId: data?.id,
            userId: userid,
            cancelReason: values?.cancelReason,
          })
        )
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Vendors request cancelled successfully!.",
              });
              setOpenModal(false);
              form.resetFields();
              dispatch(
                getvendorHistoryByLeadId({
                  userId: userid,
                  leadId: data?.leadId,
                  vendorRequestId: data?.id,
                })
              );
              dispatch(
                getAllVendorsRequest({
                  id: userid,
                  page: paginationData?.page,
                  size: paginationData?.size,
                })
              );
            } else {
              notification.error({
                message: "Something went wrong  !.",
              });
            }
          })
          .catch(() =>
            notification.error({
              message: "Something went wrong !.",
            })
          );
      } else {
        dispatch(updateVendorStatus(obj))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Vendor's status updated successfully",
              });
              setOpenModal(false);
              form.resetFields();
              if (values?.requestStatus === "Finished") {
                dispatch(
                  sendVendorsProposal({
                    userId: userid,
                    leadId: data?.leadId,
                    vendorRequestId: data?.id,
                    data: {
                      clientMailId: data?.clientEmailId,
                      clientName: data?.clientName,
                      clientContactNumber: data?.clientMobileNumber,
                      budgetPrice: data?.budgetPrice,
                      ...values,
                    },
                  })
                )
                  .then((resp) => {
                    if (resp.meta.requestStatus === "fulfilled") {
                      notification.success({
                        message: "Proposal send to client.",
                      });
                      dispatch(
                        getAllVendorsRequest({
                          id: userid,
                          page: paginationData?.page,
                          size: paginationData?.size,
                        })
                      );
                    } else {
                      notification.error({
                        message:
                          "Something went wrong to proposal send to client !.",
                      });
                    }
                  })
                  .catch(() =>
                    notification.error({
                      message:
                        "Something went wrong to proposal send to client !.",
                    })
                  );
              }
              dispatch(
                getvendorHistoryByLeadId({
                  userId: userid,
                  leadId: data?.leadId,
                  vendorRequestId: data?.id,
                })
              );
            } else {
              notification.error({ message: "Something went wrong !." });
            }
          })
          .catch(() => {
            notification.error({ message: "Something went wrong !." });
          });
      }
    },
    [dispatch, data, userid, form]
  );

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

                  {data?.clientEmailId &&
                    getHighestPriorityRole(currentRoles) === "ADMIN" && (
                      <Flex gap={6}>
                        <Icon
                          icon="fluent:mail-24-regular"
                          height={BTN_ICON_HEIGHT}
                          width={BTN_ICON_WIDTH}
                        />
                        <Text>{data?.clientEmailId}</Text>
                      </Flex>
                    )}

                  {data?.contactNumber &&
                    getHighestPriorityRole(currentRoles) === "ADMIN" && (
                      <Flex gap={6}>
                        <Icon
                          icon="fluent:call-24-regular"
                          height={BTN_ICON_HEIGHT}
                          width={BTN_ICON_WIDTH}
                        />
                        <Text>{data?.contactNumber}</Text>
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

                  {data?.vendorCategoryName && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:person-settings-20-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>Category name : {data?.vendorCategoryName}</Text>
                    </Flex>
                  )}

                  {data?.vendorSubCategoryName && (
                    <Flex gap={6}>
                      <Icon
                        icon="fluent:person-settings-20-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                      />
                      <Text>
                        Sub category name : {data?.vendorSubCategoryName}
                      </Text>
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
            <Flex vertical gap={8}>
              <Text className="heading-text">Attachements</Text>
              <Flex gap={12}>
                <Flex>
                  <Button onClick={() => setOpenDocModal(true)} size="small">
                    Sales attachement
                  </Button>
                  <Modal
                    title="Documents"
                    width={800}
                    centered
                    open={openDocModal}
                    onClose={() => setOpenDocModal(false)}
                    onCancel={() => setOpenDocModal(false)}
                    footer={null}
                  >
                    <iframe
                      title=""
                      src={data?.salesAttachmentImage?.[index]}
                      height={500}
                      width={"100%"}
                    />
                    <Flex justify="space-between">
                      <Button
                        size="small"
                        disabled={index === 0}
                        onClick={() => setIndex((prev) => prev - 1)}
                      >
                        Prev
                      </Button>
                      <Button
                        size="small"
                        disabled={index >= data?.salesAttachmentImage?.length}
                        onClick={() => setIndex((prev) => prev + 1)}
                      >
                        Next
                      </Button>
                    </Flex>
                  </Modal>
                </Flex>
                <Flex>
                  <Button onClick={() => setOpenDocModal1(true)} size="small">
                    Vendor attachement
                  </Button>
                  <Modal
                    title="Documents"
                    width={800}
                    centered
                    open={openDocModal1}
                    onClose={() => setOpenDocModal1(false)}
                    onCancel={() => setOpenDocModal1(false)}
                    footer={null}
                  >
                    <iframe
                      title=""
                      src={
                        historyList?.[historyList?.length - 1]
                          ?.quotationFilePath
                      }
                      height={500}
                      width={"100%"}
                    />
                  </Modal>
                </Flex>
              </Flex>
            </Flex>
          </Col>
          <Col span={18}>
            <Timeline
              mode="left"
              items={
                historyList?.length > 0
                  ? historyList?.map((item) => {
                      return {
                        color:
                          item?.requestStatus === "Unavailable"
                            ? "red"
                            : item?.requestStatus === "Finished"
                            ? "green"
                            : item?.requestStatus === "Processing"
                            ? "orange"
                            : item?.requestStatus === "Cancel"
                            ? "black"
                            : "blue",
                        dot:
                          item?.requestStatus === "Processing" ? (
                            <Icon
                              icon="fluent:clock-24-regular"
                              color="orange"
                            />
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
                            {item?.raisedBy?.fullName && (
                              <Text>
                                {" "}
                                Raised by : {item?.raisedBy?.fullName}
                              </Text>
                            )}
                            {item?.updatedName && (
                              <Text type="secondary">
                                Updated by : {item?.updatedName}
                              </Text>
                            )}
                            <Text type="secondary">
                              {dayjs(item?.updateDate).format(
                                "YYYY-MM-DD , hh:mm a"
                              )}
                            </Text>
                          </Flex>
                        ),
                        children: (
                          <Flex vertical gap={2}>
                            {item?.externalVendorPrice && (
                              <Text>
                                Price give by vendor :{" "}
                                {item?.externalVendorPrice}
                              </Text>
                            )}

                            {item?.internalVendorPrices && (
                              <Text>
                                Price given to vendor :{" "}
                                {item?.internalVendorPrices}
                              </Text>
                            )}

                            {item?.quotationAmount && (
                              <Text>
                                Quotation amount : {item?.quotationAmount}
                              </Text>
                            )}

                            <Text> {item?.updateDescription}</Text>
                          </Flex>
                        ),
                      };
                    })
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
          <Form.Item label="Status" name="requestStatus">
            <Select
              options={
                //   [
                //   {
                //     label: "Initiated",
                //     value: "Initiated",
                //   },
                //   {
                //     label: "Processing",
                //     value: "Processing",
                //   },
                //   {
                //     label: "Unavailable",
                //     value: "Unavailable",
                //   },
                //   {
                //     label: "Cancel",
                //     value: "Cancel",
                //   },
                //   {
                //     label: "Finished",
                //     value: "Finished",
                //   },
                // ]
                vendorsStatus?.length > 0
                  ? vendorsStatus?.map((item) => ({
                      label: item?.statusName,
                      value: item?.statusName,
                    }))
                  : []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.requestStatus !== currentValues.requestStatus
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("requestStatus") === "Finished" && (
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
                        multiple={true}
                      >
                        <Button size="small">
                          <Icon icon="fluent:arrow-upload-20-filled" />
                          Upload
                        </Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item label="Quotation amount" name="quotationAmount">
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Additional email"
                      name="additionalMailId"
                      rules={[{ type: "email" }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item label="Agreement name" name="agreementName">
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Agreement document attachment"
                      name="agreementWithClientDocumentPath"
                      getValueFromEvent={normFile}
                      valuePropName="fileList"
                    >
                      <Upload
                        action="/leadService/api/v1/upload/uploadimageToFileSystem"
                        listType="text"
                        multiple={true}
                      >
                        <Button size="small">
                          <Icon icon="fluent:arrow-upload-20-filled" />
                          Upload
                        </Button>
                      </Upload>
                    </Form.Item>

                    <Form.Item label="Research name" name="researchName">
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Research document name"
                      name="researchDocumentName"
                    >
                      <Input />
                    </Form.Item>
                  </>
                )}
              </>
            )}
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.requestStatus !== currentValues.requestStatus
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("requestStatus") === "Cancel" ? (
                  <Form.Item
                    label="Reason for canceling"
                    name="cancelReason "
                    rules={[
                      {
                        required: true,
                        message: "please enter cancelling reason",
                      },
                    ]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                ) : (
                  <>
                    <Form.Item
                      label="Amount given to vendor"
                      name="internalVendorPrices"
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Amount given by vendor"
                      name="externalVendorPrice"
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item label="Description" name="comment">
                      <Input.TextArea />
                    </Form.Item>
                  </>
                )}
              </>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SingleVendorRequestDetails;
