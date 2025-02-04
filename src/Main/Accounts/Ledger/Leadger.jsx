import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLedger,
  getAllLedger,
  getAllLedgerType,
  getLedgerTypeById,
  updateLedger,
} from "../../../Toolkit/Slices/AccountSlice";
import CommonTable from "../../../components/CommonTable";
const { Text } = Typography;

const Ledger = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const ledgerList = useSelector((state) => state.account.ledgerList);
  const ledgerTypeList = useSelector((state) => state.account.ledgerTypeList);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [ledgerForm, setLedgerForm] = useState({
    hsnSacPresent: false,
    gstRateDetailPresent: false,
    bankAccountPresent: false,
  });

  useEffect(() => {
    dispatch(getAllLedger());
    dispatch(getAllLedgerType());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(ledgerList);
  }, [ledgerList]);

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    setSearchText(value);
    const filtered = ledgerList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const getLedgerType = (e) => {
    dispatch(getLedgerTypeById(e)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        let data = resp.payload;
        if (data?.hsnSacPresent) {
          setLedgerForm((prev) => ({ ...prev, hsnSacPresent: true }));
          form.setFieldsValue({
            hsnSacDetails: data?.hsnSacDetails,
            HsnSac: data?.HsnSac,
            hsnDescription: data?.hsnDescription,
          });
        }
        if (data?.gstRateDetailPresent) {
          setLedgerForm((prev) => ({ ...prev, gstRateDetailPresent: true }));
          form.setFieldsValue({
            gstRateDetails: data?.gstRateDetails,
            taxabilityType: data?.taxabilityType,
            gstRates: data?.gstRates,
          });
        }
        if (data?.bankAccountPresent) {
          setLedgerForm((prev) => ({ ...prev, bankAccountPresent: true }));
          form.setFieldsValue({
            accountHolderName: data?.accountHolderName,
            accountNo: data?.accountNo,
            ifscCode: data?.ifscCode,
            swiftCode: data?.swiftCode,
            bankName: data?.bankName,
            branch: data?.branch,
          });
        }
      }
    });
  };

  const handleEdit = (value) => {
    getLedgerType(value?.ledgerType?.id);
    form.setFieldsValue({
      name: value?.name,
      ledgerTypeId: value?.ledgerType?.id,
      email: value?.email,
      pin: value?.pin,
      state: value?.state,
      country: value?.country,
      address: value?.address,
    });
    setOpenModal(true);
    setEditData(value);
  };

  const handleFinish = (values) => { 
    if (editData) {
      dispatch(updateLedger({ ...values, id: editData?.id, ...ledgerForm }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Ledger updated successfully !." });
            setOpenModal(false);
            dispatch(getAllLedger());
            form.resetFields();
            setEditData(null);
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    } else {
      dispatch(createLedger({ ...values, ...ledgerForm }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Ledger created successfully" });
            setOpenModal(false);
            dispatch(getAllLedger());
            form.resetFields();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    }
  };

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 100,
    },
    {
      dataIndex: "name",
      title: "Name",
    },
    {
      dataIndex: "ledgerType",
      title: "Ledger type",
      render:(info)=><Text>{info?.name}</Text>
    },
    {
      dataIndex: "edit",
      title: "Edit",
      render: (_, data) => (
        <Button type="text" size="small" onClick={() => handleEdit(data)}>
          <Icon icon="fluent:edit-16-regular" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Flex vertical>
        <Flex className="vouchers-header">
          <Text className="heading-text">Ledger list</Text>
        </Flex>
        <Flex
          justify="space-between"
          align="center"
          className="vouchers-header"
        >
          <Input
            prefix={<Icon icon="fluent:search-24-regular" />}
            value={searchText}
            size="small"
            onChange={handleSearch}
            placeholder="search"
            style={{ width: "25%" }}
          />
          <Button
            type="primary"
            onClick={() => {
              setOpenModal(true);
              form.resetFields();
            }}
          >
            Create ledger
          </Button>
        </Flex>
        <CommonTable
          data={filteredData}
          columns={columns}
          scroll={{ y: "70vh" }}
        />
      </Flex>
      <Modal
        title={editData ? "Edit ledger" : "Create ledger"}
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "please enter ledger name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Select ledger type"
                name="ledgerTypeId"
                rules={[
                  { required: true, message: "please select ledger type" },
                ]}
              >
                <Select
                  options={
                    ledgerTypeList?.length > 0
                      ? ledgerTypeList?.map((item) => ({
                          label: item?.name,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                  onChange={getLedgerType}
                />
              </Form.Item>
            </Col>
          </Row>
          {ledgerForm?.hsnSacPresent && (
            <Flex vertical>
              <Row>
                <Col span={11}>
                  <Form.Item
                    label="HSN sac details"
                    name="hsnSacDetails"
                    rules={[
                      {
                        required: true,
                        message: "please enter the HSN sac details",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={2} />
                <Col span={11}>
                  <Form.Item
                    label="HSN sac"
                    name="HsnSac"
                    rules={[
                      { required: true, message: "please enter the HSN sac" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item label="HSN Description" name="hsnDescription">
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>
            </Flex>
          )}

          {ledgerForm?.gstRateDetailPresent && (
            <Flex vertical>
              <Row>
                <Col span={11}>
                  <Form.Item
                    label="GST rate detail"
                    name="gstRateDetails"
                    rules={[
                      {
                        required: true,
                        message: "please enter GST rate detail",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={2} />
                <Col>
                  <Form.Item
                    label="Tax ability type"
                    name="taxabilityType"
                    rules={[
                      {
                        required: true,
                        message: "please enter tax ability type",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    label="GST rates"
                    name="gstRates"
                    rules={[
                      { required: true, message: "please enter GST rates" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Flex>
          )}

          {ledgerForm?.bankAccountPresent && (
            <Flex vertical>
              <Row>
                <Col span={11}>
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
                </Col>
                <Col span={2} />
                <Col span={11}>
                  <Form.Item
                    label="Account number"
                    name="accountNo"
                    rules={[
                      {
                        required: true,
                        message: "please enter account account number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={11}>
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
                </Col>
                <Col span={2} />
                <Col span={11}>
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
                </Col>
              </Row>
              <Row>
                <Col span={11}>
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
                </Col>
                <Col span={2} />
                <Col span={11}>
                  <Form.Item
                    label="Branch"
                    name="branch"
                    rules={[
                      {
                        required: true,
                        message: "please enter branch",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Flex>
          )}

          <Row>
            <Col span={11}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "please enter email id",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  {
                    required: true,
                    message: "please enter country name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="State"
                name="state"
                rules={[
                  {
                    required: true,
                    message: "please enter state name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Pin code / Zip code"
                name="pin"
                rules={[
                  {
                    required: true,
                    message: "please enter pin code",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "please enter address",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Ledger;
