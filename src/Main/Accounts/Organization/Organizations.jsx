import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrganization,
  getAllLedgerType,
  getAllOrganizations,
  getOrganizationByName,
} from "../../../Toolkit/Slices/AccountSlice";
import { Icon } from "@iconify/react";
const { Title, Text } = Typography;

const Organizations = () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const dispatch = useDispatch();
  const organizationDetail = useSelector(
    (state) => state.account.organizationDetail
  );
  const ledgerTypeList = useSelector((state) => state.account.ledgerTypeList);
  const [editData, setEditData] = useState(null);
  const [editStatutoryData, setEditStatutoryData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);

  useEffect(() => {
    dispatch(getOrganizationByName("corpseed"));
    dispatch(getAllLedgerType());
  }, [dispatch]);

  console.log('sdlkjvhsiadghvoisg',organizationDetail)

  const handleEdit = (value) => {
    setEditStatutoryData(value);
    setOpenModal(true);
  };

  const handleEditStatutory = (value) => {
    form.setFieldsValue({
      id: value?.id,
      hsnSacPresent: value?.hsnSacPresent,
      hsnSacDetails: value?.hsnSacDetails,
      hsnSacData: value?.hsnSacData,
      hsnDescription: value?.hsnDescription,
      gstRateDetailPresent: value?.gstRateDetailPresent,
      gstRateDetails: value?.gstRateDetails,
      taxabilityType: value?.taxabilityType,
      gstRatesData: value?.gstRatesData,
      bankAccountPresent: value?.bankAccountPresent,
      bankName: value?.bankName,
      accountNo: value?.accountNo,
      ifscCode: value?.ifscCode,
      accountHolderName: value?.accountHolderName,
      swiftCode: value?.swiftCode,
      classification: value?.classification,
    });
    setOpenModal1(true);
    setEditStatutoryData(value);
  };

  const handleFinish = (values) => {
    dispatch(createOrganization(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Organization created successfully !.",
          });
          dispatch(getAllOrganizations());
          form.resetFields();
          setOpenModal(false);
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  const handleFinishStatutory = () => {};

  return (
    <>
      <Flex vertical gap={18} style={{ padding: "12px 0px" }}>
        <Flex justify="space-between" align="center">
          <Text className="heading-text">Organization list</Text>
          <Flex gap={8}>
            <Button type="primary" onClick={() => setOpenModal1(true)}>
              Add statutory
            </Button>
            <Button type="primary" onClick={() => setOpenModal(true)}>
              Create organization
            </Button>
          </Flex>
        </Flex>
        <Flex vertical>
          <Card
            title={
              <Flex align="center" justify="space-between">
                <Flex align="center" gap={12}>
                  <Avatar size="small">
                    {organizationDetail?.name?.charAt(0)}
                  </Avatar>
                  <Title level={5} style={{ margin: 0 }}>
                    {organizationDetail?.name}
                  </Title>
                </Flex>
                <Flex gap={8} align="center">
                  <Button
                    size="small"
                    onClick={() => handleEdit(organizationDetail)}
                  >
                    <Icon icon="fluent:edit-24-regular" /> Edit organization
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleEditStatutory(organizationDetail)}
                  >
                    <Icon icon="fluent:edit-24-regular" /> Edit statutory
                  </Button>
                </Flex>
              </Flex>
            }
          >
            <Flex vertical gap={12}>
              <Row>
                <Col span={8}>
                  <Flex align="center" gap={12}>
                    <Text type="secondary">State</Text>
                    <Text>:</Text>
                    <Text>{organizationDetail?.state}</Text>
                  </Flex>
                </Col>
                <Col span={8}>
                  <Flex align="center" gap={12}>
                    <Text type="secondary">Country</Text>
                    <Text>:</Text>
                    <Text>{organizationDetail?.country}</Text>
                  </Flex>
                </Col>
                <Col span={8}>
                  <Flex align="center" gap={12}>
                    <Text type="secondary">Pin / Zip code</Text>
                    <Text>:</Text>
                    <Text>{organizationDetail?.pin}</Text>
                  </Flex>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Flex align="center" gap={12}>
                    <Text type="secondary">Address</Text>
                    <Text>:</Text>
                    <Text>{organizationDetail?.address}</Text>
                  </Flex>
                </Col>
              </Row>
            </Flex>
          </Card>
        </Flex>
      </Flex>
      <Modal
        title={editData ? "Edit organization" : "Create organization"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Organization name"
            name="name"
            rules={[
              { required: true, message: "please enter organization name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="State"
            name="state"
            rules={[
              { required: true, message: "please enter organization state" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "please enter country name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Pin / Zip code"
            name="pin"
            rules={[{ required: true, message: "please enter pin / zip code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "please your address" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={editStatutoryData ? "Edit statutory" : "Create statutory"}
        open={openModal1}
        centered
        onCancel={() => setOpenModal1(false)}
        onClose={() => setOpenModal1(false)}
        onOk={() => form1.submit()}
        okText="Submit"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinishStatutory}
          size="small"
          style={{ maxHeight: "75vh", overflow: "auto" }}
          initialValues={{ hsnSac: false, gstRate: false, bankAccount: false }}
        >
          <Form.Item
            label="Ledger type"
            name="id"
            rules={[{ required: true, message: "please select ledger type" }]}
          >
            <Select
              showSearch
              options={[
                { label: "Primary", value: 0 },
                ...(ledgerTypeList?.length > 0
                  ? ledgerTypeList?.map((item) => ({
                      label: item?.name,
                      value: item?.id,
                    }))
                  : []),
              ]}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item label="Hsn sac" name="hsnSacPresent">
            <Switch />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.hsnSacPresent !== currentValues.hsnSacPresent
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("hsnSacPresent") && (
                  <>
                    <Form.Item
                      label="Hsn sac details"
                      name="hsnSacDetails"
                      rules={[
                        {
                          required: true,
                          message: "please enter hsn sac details",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Hsn sac data"
                      name="hsnSacData"
                      rules={[
                        {
                          required: true,
                          message: "please enter hsn sac data",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Hsn sac description"
                      name="hsnDescription"
                      rules={[
                        {
                          required: true,
                          message: "please enter hsn sac description",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                )}
              </>
            )}
          </Form.Item>

          <Form.Item label="GST rate" name="gstRateDetailPresent">
            <Switch />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gstRateDetailPresent !==
              currentValues.gstRateDetailPresent
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("gstRateDetailPresent") && (
                  <>
                    <Form.Item
                      label="GST rate details"
                      name="gstRateDetails"
                      rules={[
                        {
                          required: true,
                          message: "please enter gst rate details",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Taxability type"
                      name="taxabilityType"
                      rules={[
                        {
                          required: true,
                          message: "please enter taxability type",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="GST rate data (in %)"
                      name="gstRatesData"
                      rules={[
                        {
                          required: true,
                          message: "please enter gst rate data",
                        },
                      ]}
                    >
                      <InputNumber controls={false} style={{ width: "100%" }} />
                    </Form.Item>
                  </>
                )}
              </>
            )}
          </Form.Item>
          <Form.Item label="Bank account" name="bankAccountPresent">
            <Switch />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.bankAccountPresent !== currentValues.bankAccountPresent
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("bankAccountPresent") && (
                  <>
                    <Form.Item
                      label="Bank name"
                      name="bankName"
                      rules={[
                        {
                          required: true,
                          message: "please enter bank name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Account number"
                      name="accountNo"
                      rules={[
                        {
                          required: true,
                          message: "please enter taccount number",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="IFSC code"
                      name="ifscCode"
                      rules={[
                        {
                          required: true,
                          message: "please enter IFSC code",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Account holder name"
                      name="accountHolderName"
                      rules={[
                        {
                          required: true,
                          message: "please enter account holder name",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Swift code"
                      name="swiftCode"
                      rules={[
                        {
                          required: true,
                          message: "please enter swift code",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </>
                )}
              </>
            )}
          </Form.Item>
          <Form.Item
            label="Classification"
            name="classification"
            rules={[{ required: true, message: "please enter classification" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Organizations;
