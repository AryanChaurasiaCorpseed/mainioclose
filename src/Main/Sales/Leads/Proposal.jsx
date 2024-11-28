import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  notification,
  Radio,
  Row,
  Select,
  Upload,
  Modal,
  Typography,
  Col,
  Switch,
  Card,
  Space,
  Spin,
  Badge,
  Divider,
} from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { getSingleProductByProductId } from "../../../Toolkit/Slices/ProductSlice";
import {
  editLeadPropposal,
  getAllContactDetails,
  leadProposalSentRequest,
} from "../../../Toolkit/Slices/LeadSlice";
import { createContacts } from "../../../Toolkit/Slices/CommonSlice";
import dayjs from "dayjs";
import "./EstimateDesignPage.scss";
import { maskEmail, maskMobileNumber } from "../../Common/Commons";
import logo from "../../../Images/CORPSEED.webp";
import numWords from "num-words";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const { Text, Title } = Typography;

const Proposal = ({ leadid }) => {
  const [form] = Form.useForm();
  const [contactForm] = Form.useForm();
  const dispatch = useDispatch();
  const pdfRef = useRef();
  const productList = useSelector((state) => state.product.productData);
  const contactList = useSelector((state) => state?.leads?.allContactList);
  const leadUserNew = useSelector((state) => state.leads.getAllLeadUserData);
  const companyUnits = useSelector((state) => state?.leads?.companyUnits);
  const details = useSelector((state) => state.leads.proposalDetails);
  const proposalLoading = useSelector((state) => state.leads.proposalLoading);
  const companyDetails = useSelector(
    (state) => state?.leads?.companyDetailsById
  );
  const [productData, setProductData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editProposal, setEditProposal] = useState(false);

  useEffect(() => {
    if (Object.keys(companyDetails) > 0) {
      form.setFieldsValue({
        companyId: companyDetails?.name,
        isUnit: false,
      });
    }
  }, [companyDetails, form]);

  const handleFinishContact = (values) => {
    dispatch(createContacts(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Contact created successfully !." });
          setOpenModal(false);
          contactForm.resetFields();
          dispatch(getAllContactDetails());
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  function getFileName(file) {
    if (file) {
      let temp = file?.split("/");
      return temp[temp?.length - 1];
    }
  }

  const handleGetProduct = (e) => {
    dispatch(getSingleProductByProductId(e)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        setProductData(resp?.payload?.productAmount);
        const data = resp?.payload?.productAmount;
        data?.forEach((item) => {
          if (item?.name === "Government") {
            form.setFieldsValue({
              govermentfees: item?.fees,
              govermentCode: item?.hsnNo,
              govermentGst: item?.taxAmount,
            });
          }
          if (item?.name === "Professional fees") {
            form.setFieldsValue({
              professionalFees: item?.fees,
              professionalCode: item?.hsnNo,
              profesionalGst: item?.taxAmount,
            });
          }
          if (item?.name === "Service charges") {
            form.setFieldsValue({
              serviceCharge: item?.fees,
              serviceCode: item?.hsnNo,
              serviceGst: item?.taxAmount,
            });
          }

          if (item?.name === "Other fees") {
            form.setFieldsValue({
              otherFees: item?.fees,
              otherCode: item?.hsnNo,
              otherGst: item?.taxAmount,
            });
          }
        });
      }
    });
  };

  const handleEditProposal = useCallback(() => {
    form.setFieldsValue({
      admin: details?.admin,
      cc: details?.cc,
      companyId: details?.companyId,
      companyName: details?.companyName,
      isUnit: details?.isUnit,
      unitId: details?.unitId,
      unitName: details?.unitName,
      panNo: details?.panNo,
      gstType: details?.gstType,
      companyAge: details?.companyAge,
      gstNo: details?.gstNo,
      gstDocuments: [
        {
          uid: "-1",
          name: getFileName(details?.gstDocuments),
          status: "done",
          response: details?.gstDocuments,
        },
      ],
      salesType: details?.salesType,
      secondaryContact: details?.secondaryContact?.id,
      primaryContact: details?.primaryContact?.id,
      productId: details?.product?.id,
      professionalFees: details?.professionalFees,
      professionalCode: details?.professionalCode,
      profesionalGst: details?.profesionalGst,
      serviceCharge: details?.serviceCharge,
      serviceCode: details?.serviceCode,
      serviceGst: details?.serviceGst,
      govermentfees: details?.govermentfees,
      govermentCode: details?.govermentCode,
      govermentGst: details?.govermentGst,
      otherFees: details?.otherFees,
      otherCode: details?.otherCode,
      otherGst: details?.otherGst,
      assigneeId: details?.assigneeId,
      orderNumber: details?.orderNumber,
      purchaseDate: dayjs(details?.purchaseDate),
      invoiceNote: details?.invoiceNote,
      remarksForOption: details?.remarksForOption,
      address: details?.address,
    });
  }, [details, form]);

  const handleFinish = useCallback(
    (values) => {
      values.leadId = leadid;
      values.gstDocuments = values?.gstDocuments?.[0]?.response;
      if (editProposal) {
        values.id = details?.id;
        dispatch(editLeadPropposal(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Proposal updated successfully !.",
              });
            } else {
              notification.error({ message: "Something went wrong !." });
            }
          })
          .catch(() =>
            notification.error({ message: "Something went wrong !." })
          );
      } else {
        dispatch(leadProposalSentRequest(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Proposal sent successfully !.",
              });
            } else {
              notification.error({ message: "Something went wrong !." });
            }
          })
          .catch(() =>
            notification.error({ message: "Something went wrong !." })
          );
      }
    },
    [leadid, details, editProposal, dispatch]
  );

  const generatePDF = async () => {
    const element = pdfRef.current;

    const canvas = await html2canvas(element, {
      scale: 1.5, // Improves resolution
      useCORS: true, // Handles cross-origin images
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    pdf.save("document.pdf");
  };

  return (
    <Spin size="large" spinning={proposalLoading === "pending" ? true : false}>
      <Flex justify="space-between" align="center" style={{ width: "100%",paddingLeft:'24px' }}>
        <Text className="heading-text">
          {Object.keys(details)?.length > 0 && !editProposal
            ? "Proposal details"
            : editProposal
            ? "Edit proposal"
            : "Create proposal"}
        </Text>
        <Flex justify="flex-end" gap={4}>
          {Object.keys(details)?.length > 0 && !editProposal && (
            <Button onClick={generatePDF}>Export as pdf</Button>
          )}
          {Object.keys(details)?.length > 0 && (
            <Button onClick={handleEditProposal}>
              {editProposal ? "Show proposal detail" : "Edit"}
            </Button>
          )}
        </Flex>
      </Flex>
      {editProposal || Object.keys(details)?.length === 0 ? (
        <Flex
          style={{ maxHeight: "86vh", overflow: "auto", marginTop: "24px" }}
        >
          <Form
            form={form}
            layout="vertical"
            style={{ width: "60%" }}
            initialValues={{
              cc: [""],
            }}
            onFinish={handleFinish}
          >
            <Form.Item
              label="Select client admin"
              name="admin"
              rules={[
                { required: true, message: "please select client admin" },
              ]}
            >
              <Select
                showSearch
                options={
                  contactList?.length > 0
                    ? contactList?.map((item) => ({
                        label: `${maskEmail(
                          item?.emails
                        )} || ${maskMobileNumber(item?.contactNo)} `,
                        value: item?.id,
                        email: item?.emails,
                        contact: item?.contactNo,
                      }))
                    : []
                }
                filterOption={(input, option) =>
                  option?.email
                    ?.toLowerCase()
                    ?.includes(input?.toLowerCase()) ||
                  option?.contact?.toLowerCase()?.includes(input?.toLowerCase())
                }
              />
            </Form.Item>

            <Form.List name="cc">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? { label: "Email", required: true }
                        : {})}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please input email",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="example@xyz.com"
                          style={{
                            width: "90%",
                          }}
                        />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <Button
                          type="text"
                          size="small"
                          style={{ margin: "0px 4px" }}
                          onClick={() => remove(field.name)}
                          danger
                        >
                          <Icon icon="fluent:delete-24-regular" />
                        </Button>
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{
                        width: "80%",
                      }}
                    >
                      Add Cc
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>

            {Object.keys(companyDetails)?.length > 0 ? (
              <Form.Item
                label="Company name"
                name="companyId"
                rules={[
                  { required: true, message: "please enter the company name" },
                ]}
              >
                <Input disabled />
              </Form.Item>
            ) : (
              <Form.Item
                label="Company name"
                name="companyName"
                rules={[
                  { required: true, message: "please enter the company name" },
                ]}
              >
                <Input />
              </Form.Item>
            )}

            {Object.keys(companyDetails)?.length > 0 && (
              <>
                <Form.Item
                  label="New units"
                  name="isUnit"
                  rules={[{ required: true }]}
                >
                  <Switch size="small" />
                </Form.Item>

                <Form.Item
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.isUnit !== currentValues.isUnit
                  }
                  noStyle
                >
                  {({ getFieldValue }) => (
                    <>
                      {getFieldValue("isUnit") ? (
                        <Form.Item
                          label="Select company unit"
                          name="unitId"
                          rules={[
                            {
                              required: true,
                              message: "please select company unit",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            allowClear
                            // onChange={(e) => dispatch(getCompanyByUnitId(e))}
                            options={
                              companyUnits?.length > 0
                                ? companyUnits?.map((item) => ({
                                    label: item?.companyName,
                                    value: item?.id,
                                  }))
                                : []
                            }
                            filterOption={(input, option) =>
                              option.label
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        </Form.Item>
                      ) : (
                        <Form.Item
                          label="Enter new company unit"
                          name="unitName"
                          rules={[
                            {
                              required: true,
                              message: "please enter the company unit",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      )}
                    </>
                  )}
                </Form.Item>
              </>
            )}
            <Form.Item label="Pan number" name="panNo">
              <Input maxLength={10} />
            </Form.Item>

            <Row>
              <Col span={11}>
                <Form.Item label="GST type" name="gstType">
                  <Select
                    showSearch
                    allowClear
                    options={[
                      { label: "Registered", value: "Registered" },
                      { label: "Unregisterded", value: "Unregistered" },
                      { label: "SE2", value: "SE2" },
                      { label: "International", value: "International" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Form.Item label="Company age" name="companyAge">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Form.Item label="GST number" name="gstNo">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Form.Item
                  label="GST documents"
                  name="gstDocuments"
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
              </Col>
            </Row>

            <Flex vertical style={{ width: "100%" }}>
              <Flex justify="space-between">
                <Text className="heading-text">Contacts</Text>
                <Button onClick={() => setOpenModal(true)}>
                  Add new contact
                </Button>
              </Flex>
              <Form.Item
                label="Primary contacts"
                name="primaryContact"
                rules={[
                  { required: true, message: "please select primary contacts" },
                ]}
              >
                <Select
                  showSearch
                  options={
                    contactList?.length > 0
                      ? contactList?.map((item) => ({
                          label: `${maskEmail(
                            item?.emails
                          )} || ${maskMobileNumber(item?.contactNo)} `,
                          value: item?.id,
                          email: item?.emails,
                          contact: item?.contactNo,
                        }))
                      : []
                  }
                  filterOption={(input, option) =>
                    option?.email
                      ?.toLowerCase()
                      ?.includes(input?.toLowerCase()) ||
                    option?.contact
                      ?.toLowerCase()
                      ?.includes(input?.toLowerCase())
                  }
                />
              </Form.Item>
              <Form.Item
                label="Secondary contacts"
                name="secondaryContact"
                rules={[
                  {
                    required: true,
                    message: "please select secondary contacts",
                  },
                ]}
              >
                <Select
                  showSearch
                  options={
                    contactList?.length > 0
                      ? contactList?.map((item) => ({
                          label: `${maskEmail(
                            item?.emails
                          )} || ${maskMobileNumber(item?.contactNo)} `,
                          value: item?.id,
                          email: item?.emails,
                          contact: item?.contactNo,
                        }))
                      : []
                  }
                  filterOption={(input, option) =>
                    option?.email
                      ?.toLowerCase()
                      ?.includes(input?.toLowerCase()) ||
                    option?.contact
                      ?.toLowerCase()
                      ?.includes(input?.toLowerCase())
                  }
                />
              </Form.Item>
            </Flex>

            <Form.Item
              label="Sales type"
              name="salesType"
              rules={[{ required: true, message: "please select sales type" }]}
            >
              <Radio.Group>
                <Radio value={"Non-Consulting Sale"}>Non-Consulting Sale</Radio>
                <Radio value={"Consulting Sale"}>Consulting Sale</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Product name"
              name="productId"
              rules={[{ required: true, message: "please select product" }]}
            >
              <Select
                showSearch
                options={
                  productList?.length > 0
                    ? productList?.map((item) => ({
                        label: item?.productName,
                        value: item?.id,
                      }))
                    : []
                }
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                onChange={handleGetProduct}
              />
            </Form.Item>

            <Row>
              <Flex gap={30} align="center">
                <Form.Item layout="horizontal" label="Select jurisdiction">
                  <Input />
                </Form.Item>
                <Form.Item layout="horizontal">
                  <Radio.Group>
                    <Radio value="One time">One time</Radio>
                    <Radio value="Renewal">Renewal</Radio>
                  </Radio.Group>
                </Form.Item>
              </Flex>

              {productData?.map((ele) => {
                return ele?.name === "Professional fees" ? (
                  <Row>
                    <Flex gap={30} align="center">
                      <Form.Item
                        layout="horizontal"
                        label="Professional fees"
                        name="professionalFees"
                        rules={[
                          {
                            required: true,
                            message: "Please give professional fees",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="professionalCode"
                        rules={[
                          {
                            required: true,
                            message: "please provide HSN number",
                          },
                        ]}
                      >
                        <Input placeholder="Hsn number" />
                      </Form.Item>
                      <Form.Item
                        name="profesionalGst"
                        rules={[
                          { required: true, message: "please provide GST %" },
                        ]}
                      >
                        <Input placeholder="Gst %" />
                      </Form.Item>
                    </Flex>
                  </Row>
                ) : ele?.name === "Service charges" ? (
                  <Row>
                    <Flex gap={30} align="center">
                      <Form.Item
                        layout="horizontal"
                        label="Service charges"
                        name="serviceCharge"
                        rules={[
                          {
                            required: true,
                            message: "please give service charges",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="serviceCode"
                        rules={[
                          { required: true, message: "please give HSN number" },
                        ]}
                      >
                        <Input placeholder="HSN number" />
                      </Form.Item>
                      <Form.Item
                        name="serviceGst"
                        rules={[
                          { required: true, message: "please give GST %" },
                        ]}
                      >
                        <Input placeholder="Gst %" />
                      </Form.Item>
                    </Flex>
                  </Row>
                ) : ele?.name === "Government" ? (
                  <Row>
                    <Flex gap={30} align="center">
                      <Form.Item
                        layout="horizontal"
                        label="Government fees"
                        name="govermentfees"
                        rules={[
                          { required: true, message: "please give govt. fees" },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="govermentCode"
                        rules={[
                          { required: true, message: "please give HSN number" },
                        ]}
                      >
                        <Input placeholder="HSN number" />
                      </Form.Item>
                      <Form.Item
                        name="govermentGst"
                        rules={[
                          { required: true, message: "please give gst %" },
                        ]}
                      >
                        <Input placeholder="Gst %" />
                      </Form.Item>
                    </Flex>
                  </Row>
                ) : ele?.name === "Other fees" ? (
                  <Row>
                    <Flex gap={30} align="center">
                      <Form.Item
                        layout="horizontal"
                        label="Other fees"
                        name="otherFees"
                        rules={[
                          {
                            required: true,
                            message: "please give other fees charges",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        name="otherCode"
                        rules={[
                          { required: true, message: "please give HSN number" },
                        ]}
                      >
                        <Input placeholder="HSN number" />
                      </Form.Item>
                      <Form.Item
                        name="otherGst"
                        rules={[
                          { required: true, message: "please give GST % " },
                        ]}
                      >
                        <Input placeholder="Gst %" />
                      </Form.Item>
                    </Flex>
                  </Row>
                ) : null;
              })}
            </Row>

            <Form.Item
              label="Select sales person name"
              name="assigneeId"
              rules={[
                { required: true, message: "please select sales person" },
              ]}
            >
              <Select
                options={
                  leadUserNew?.length > 0
                    ? leadUserNew?.map((ele) => ({
                        label: ele?.fullName,
                        value: ele?.id,
                      }))
                    : []
                }
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Row>
              <Col span={11}>
                <Form.Item
                  label="Order number"
                  name="orderNumber"
                  rules={[
                    { required: true, message: "please give order number" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={2} />

              <Col span={11}>
                <Form.Item
                  label="Purchase date"
                  name="purchaseDate"
                  rules={[{ required: true, message: "please select date" }]}
                >
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Invoice notes"
              name="invoiceNote"
              rules={[
                { required: true, message: "please write invoice notes" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Remarks For Operation"
              name="remarksForOption"
              rules={[{ required: true, message: "please write remarks" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "please write remarks" }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                {" "}
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Modal
            title="Add new contact"
            open={openModal}
            onCancel={() => setOpenModal(false)}
            onClose={() => setOpenModal(false)}
            onOk={() => contactForm.submit()}
            okText="Submit"
          >
            <Form
              layout="vertical"
              form={contactForm}
              onFinish={handleFinishContact}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "please enter name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="emails"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "please enter email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Contact number"
                name="contactNo"
                rules={[
                  { required: true, message: "please enter contact number" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Whatsapp number"
                name="whatsappNo"
                rules={[
                  { required: true, message: "please enter whatsapp number" },
                ]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </Flex>
      ) : (
        <Flex style={{ maxHeight: "84vh", overflow: "auto",marginTop:'12px',padding:'24px' }}>
          <Flex style={{ width: "60%" }} gap={24} vertical>
            {details?.productName && (
              <Flex gap={4}>
                <Text className="heading-text">Product name</Text>
                <Text className="heading-text">:</Text>
                <Text>{details?.productName}</Text>
              </Flex>
            )}
            <Flex gap={60}>
              {details?.primaryContact && (
                <Card style={{ width: "40%" }}>
                  <Flex vertical gap={12}>
                    <Text className="heading-text">Primary contact detail</Text>
                    <Flex vertical>
                      <Space>
                        <Text type="secondary">Name</Text>
                        <Text type="secondary">:</Text>
                        <Text>{details?.primaryContact?.name}</Text>
                      </Space>
                      <Space>
                        <Text type="secondary">Email</Text>
                        <Text type="secondary">:</Text>
                        <Text>{details?.primaryContact?.emails}</Text>
                      </Space>
                      <Space>
                        <Text type="secondary">Contact number</Text>
                        <Text type="secondary">:</Text>
                        <Text>{details?.primaryContact?.contactNo}</Text>
                      </Space>
                      <Space>
                        <Text type="secondary">Whatsapp number</Text>
                        <Text type="secondary">:</Text>
                        <Text>{details?.primaryContact?.whatsappNo}</Text>
                      </Space>
                    </Flex>
                  </Flex>
                </Card>
              )}

              {details?.secondaryContact && (
                <Card style={{ width: "40%" }}>
                  <Flex vertical gap={12}>
                    <Text className="heading-text">
                      Secondary contact detail
                    </Text>
                    <Flex vertical>
                      <Space>
                        <Text type="secondary">Name</Text>
                        <Text type="secondary">:</Text>
                        <Text>{details?.secondaryContact?.name}</Text>
                      </Space>
                      <Space>
                        <Text type="secondary">Email</Text>
                        <Text type="secondary">:</Text>
                        <Text>{details?.secondaryContact?.emails}</Text>
                      </Space>
                      <Space>
                        <Text type="secondary">Contact number</Text>
                        <Text type="secondary">:</Text>
                        <Text>{details?.secondaryContact?.contactNo}</Text>
                      </Space>
                      <Space>
                        <Text type="secondary">Whatsapp number</Text>
                        <Text type="secondary">:</Text>
                        <Text>{details?.secondaryContact?.whatsappNo}</Text>
                      </Space>
                    </Flex>
                  </Flex>
                </Card>
              )}
            </Flex>
            <Flex ref={pdfRef}>
              <Badge.Ribbon text="Estimate" placement="start" color="green">
                <Flex
                  vertical
                  style={{
                    padding: "60px",
                    boxShadow:
                      "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                    borderRadius: "4px",
                  }}
                  gap={24}
                >
                  <Flex justify="space-between">
                    <Flex vertical>
                      <Flex>
                        <img src={logo} alt="corpseed" />
                      </Flex>
                      <Flex vertical>
                        {" "}
                        <Text type="secondary">
                          Corpseed Ites Private Limited
                        </Text>
                        <Text>CN U74999UP2018PTC101873</Text>
                        <Text>2nd floor, A-154A, A Block, sector 63</Text>
                        <Text>Noida, Uttar Pradesh - 2013</Text>
                      </Flex>
                    </Flex>
                    <Flex vertical gap={24}>
                      <Flex vertical>
                        <Title style={{ color: "#41d744" }} level={4}>
                          Estimate
                        </Title>
                        <Text strong>{`#ESTD0${details?.id}`}</Text>
                      </Flex>
                      <Flex vertical>
                        <Title style={{ color: "#41d744" }} level={4}>
                          Order No.
                        </Title>
                        <Text strong>{details?.orderNumber}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex vertical gap={8}>
                    <Text type="secondary">Bill To : </Text>
                    {details?.companyName && (
                      <Text style={{ fontWeight: "bold" }}>
                        {details?.companyName}
                      </Text>
                    )}
                  </Flex>
                  <Flex justify="space-between">
                    <Flex vertical gap={8}>
                      <Text type="secondary">Ship To : </Text>
                      <Flex vertical>
                        {details?.companyName && (
                          <Text>{details?.companyName}</Text>
                        )}
                        {details?.address && <Text>{details?.address}</Text>}
                        <Flex gap={3}>
                          {details?.city && <Text>{details?.city},</Text>}
                          {details?.state && <Text>{details?.state},</Text>}
                          {details?.country && <Text>{details?.country}</Text>}
                        </Flex>
                        {details?.pinCode && <Text>{details?.pinCode}</Text>}
                      </Flex>
                    </Flex>
                    <Flex vertical gap={8}>
                      <Flex gap={8}>
                        <Text type="secondary">Estimate Date</Text>
                        <Text type="secondary">:</Text>
                        <Text>
                          {dayjs(details?.estimateDate).format("DD-MM-YYYY")}
                        </Text>
                      </Flex>
                      <Flex gap={8}>
                        <Text type="secondary">Order Date</Text>
                        <Text type="secondary">:</Text>
                        <Text>
                          {dayjs(details?.createDate).format("DD-MM-YYYY")}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>

                  <Flex vertical gap={16}>
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Item and description</th>
                          <th>HSN</th>
                          <th>Rate</th>
                          <th>GST %</th>
                          <th>GST amount</th>
                          <th>Amount</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            <Text style={{ fontWeight: "bold" }}>
                              {details?.productName}
                            </Text>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        {details?.govermentCode && (
                          <tr>
                            <td></td>
                            <td>Government fee</td>
                            <td>{details?.govermentCode}</td>
                            <td>{""}</td>
                            <td>{details?.govermentGst}</td>
                            <td>{""}</td>
                            <td>{details?.govermentfees}</td>
                          </tr>
                        )}
                        {details?.professionalCode && (
                          <tr>
                            <td></td>
                            <td>Professional fee</td>
                            <td>{details?.professionalCode}</td>
                            <td>{""}</td>
                            <td>{details?.profesionalGst}</td>
                            <td>{""}</td>
                            <td>{details?.professionalFees}</td>
                          </tr>
                        )}
                        {details?.serviceCode && (
                          <tr>
                            <td></td>
                            <td>Service fee</td>
                            <td>{details?.serviceCode}</td>
                            <td>{""}</td>
                            <td>{details?.serviceGst}</td>
                            <td>{""}</td>
                            <td>{details?.serviceCharge}</td>
                          </tr>
                        )}
                        {details?.otherCode && (
                          <tr>
                            <td></td>
                            <td>Other fee</td>
                            <td>{details?.otherCode}</td>
                            <td>{""}</td>
                            <td>{details?.otherGst}</td>
                            <td>{""}</td>
                            <td>{details?.otherFees}</td>
                          </tr>
                        )}
                        <tr
                          style={{
                            borderTop: "1px solid black",
                            borderBottom: "1px solid black",
                          }}
                        >
                          <td></td>
                          <td>
                            <Text strong>Total Qty. : 1</Text>
                          </td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>{""}</td>
                          <td>
                            <Text strong>{details?.totalAmount}</Text>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {details?.totalAmount > 0 && (
                      <Flex justify="flex-end">
                        <Text>Total in words</Text>
                        <Text>:</Text>
                        <Text>{numWords(details?.totalAmount)}</Text>
                      </Flex>
                    )}
                    <Flex vertical>
                      <Text>Text details</Text>
                      <table className="gst-table">
                        <thead>
                          <tr>
                            <th>HSN</th>
                            <th>SGST %</th>
                            <th>CGST %</th>
                            <th>IGST %</th>
                          </tr>
                        </thead>
                        <tbody>
                          {details?.professionalCode && (
                            <tr>
                              <td>{details?.professionalCode}</td>
                              <td>0.0 %</td>
                              <td>0.0 %</td>
                              <td>{details?.profesionalGst}</td>
                            </tr>
                          )}
                          {details?.serviceCode && (
                            <tr>
                              <td>{details?.serviceCode}</td>
                              <td>0.0 %</td>
                              <td>0.0 %</td>
                              <td>{details?.serviceGst}</td>
                            </tr>
                          )}
                          {details?.govermentCode && (
                            <tr>
                              <td>{details?.govermentCode}</td>
                              <td>0.0 %</td>
                              <td>0.0 %</td>
                              <td>{details?.govermentGst}</td>
                            </tr>
                          )}
                          {details?.otherCode && (
                            <tr>
                              <td>{details?.otherCode}</td>
                              <td>0.0 %</td>
                              <td>0.0 %</td>
                              <td>{details?.otherGst}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </Flex>
                  </Flex>
                  <Flex vertical gap={8}>
                    <Flex vertical gap={6}>
                      <Text strong>Notes :</Text>
                      <Text type="secondary">
                        This Estimate & price quotation is valid for 7 calendar
                        days from the date of issue .
                      </Text>
                      <Text type="secondary">{details?.invoiceNote} </Text>
                    </Flex>
                    <Divider style={{ margin: "0px 0px" }} />
                    <Flex>
                      <Text type="secondary">
                        Note : Government fee and corpseed professional fee may
                        differ depending on any additional changes advised the
                        client in the application or any changesin government
                        policies.
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Badge.Ribbon>
            </Flex>

            <Flex align="center">
              {details?.companyName && (
                <Space>
                  <Text type="secondary">companyName</Text>
                  <Text type="secondary">:</Text>
                  <Text>{details?.companyName}</Text>
                </Space>
              )}
            </Flex>
            <Flex>
              {details?.createdDate && (
                <Space>
                  <Text type="secondary">Created date</Text>
                  <Text type="secondary">:</Text>
                  <Text>{dayjs(details?.createDate).format("YYYY-MM-DD")}</Text>
                </Space>
              )}
            </Flex>
            <Flex>
              {details?.unitName && (
                <Space>
                  <Text type="secondary">Unit name</Text>
                  <Text type="secondary">:</Text>
                  <Text>{details?.unitName}</Text>
                </Space>
              )}
            </Flex>
            <Flex>
              {details?.panNo && (
                <Space>
                  <Text type="secondary">Pan no.</Text>
                  <Text type="secondary">:</Text>
                  <Text>{details?.panNo}</Text>
                </Space>
              )}
            </Flex>
            <Flex>
              {details?.gstNo && (
                <Space>
                  <Text type="secondary">Gst no.</Text>
                  <Text type="secondary">:</Text>
                  <Text>{details?.panNo}</Text>
                </Space>
              )}
            </Flex>
            <Flex>
              {details?.companyAge && (
                <Space>
                  <Text type="secondary">Company age</Text>
                  <Text type="secondary">:</Text>
                  <Text>{details?.companyAge}</Text>
                </Space>
              )}
            </Flex>
            <Flex>
              {details?.invoiceNote && (
                <Space>
                  <Text type="secondary">Invoice note</Text>
                  <Text type="secondary">:</Text>
                  <Text>{details?.invoiceNote}</Text>
                </Space>
              )}
            </Flex>
            <Flex>
              {details?.address && (
                <Space>
                  <Text type="secondary">Address</Text>
                  <Text type="secondary">:</Text>
                  <Text>{details?.address}</Text>
                </Space>
              )}
            </Flex>
            <Flex>
              {details?.city && (
                <Space>
                  <Text type="secondary">City</Text>
                  <Text type="secondary">:</Text>
                  <Text>{details?.city}</Text>
                </Space>
              )}
            </Flex>
            <Flex>
              {details?.state && (
                <Space>
                  <Text type="secondary">State</Text>
                  <Text type="secondary">:</Text>
                  <Text>{details?.State}</Text>
                </Space>
              )}
            </Flex>
            <Flex>
              {details?.country && (
                <Space>
                  <Text type="secondary">Country</Text>
                  <Text type="secondary">:</Text>
                  <Text>{details?.country}</Text>
                </Space>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </Spin>
  );
};

export default Proposal;
