import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Switch,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLedgerType,
  createStatutory,
  getAllLedgerType,
  updateLedgerType,
  updateStatutory,
} from "../../../Toolkit/Slices/AccountSlice";
import CommonTable from "../../../components/CommonTable";
const { Text } = Typography;

const Statutory = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const ledgerTypeList = useSelector((state) => state.account.ledgerTypeList);
  const ledgerGroupList = useSelector((state) => state.account.ledgerTypeList);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getAllLedgerType());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(ledgerTypeList);
  }, [ledgerTypeList]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = ledgerTypeList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleEdit = (value) => {
    form.setFieldsValue({
      id: value?.id,
      hsnSac: value?.hsnSac,
      hsnSacDetails: value?.hsnSacDetails,
      hsnSacData: value?.hsnSacData,
      hsnDescription: value?.hsnDescription,
      gstRate: value?.gstRate,
      gstRateDetails: value?.gstRateDetails,
      taxabilityType: value?.taxabilityType,
      gstRatesData: value?.gstRatesData,
      bankAccount: value?.bankAccount,
      bankName: value?.bankName,
      accountNo: value?.accountNo,
      ifscCode: value?.ifscCode,
      accountHolderName: value?.accountHolderName,
      swiftCode: value?.swiftCode,
      classification: value?.classification,
    });
    setOpenModal(true);
    setEditData(value);
  };

  const handleFinish = (values) => {
    if (editData) {
      dispatch(updateStatutory({ ...values, id: editData?.id }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Statutory updated successfully !.",
            });
            setOpenModal(false);
            dispatch(getAllLedgerType());
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
      dispatch(createStatutory(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Statutory created successfully",
            });
            setOpenModal(false);
            dispatch(getAllLedgerType());
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
      dataIndex: "debitCredit",
      title: "Debit credit",
      render: (_, data) =>
        data?.debitCredit ? <Text>True</Text> : <Text>False</Text>,
    },
    {
      dataIndex: "usedForCalculation",
      title: "Used for calculation",
      render: (_, data) =>
        data?.usedForCalculation ? <Text>True</Text> : <Text>False</Text>,
    },
    {
      dataIndex: "subLeadger",
      title: "Sub ledger",
      render: (_, data) =>
        data?.subLeadger ? <Text>True</Text> : <Text>False</Text>,
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
          <Text className="heading-text">Statutory</Text>
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
            style={{ width: "30%" }}
          />
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Create statutory
          </Button>
        </Flex>
        <CommonTable
          data={filteredData}
          columns={columns}
          scroll={{ y: "70vh" }}
        />
      </Flex>
      <Modal
        title={editData ? "Edit statutory" : "Create statutory"}
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
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
              options={
                ledgerTypeList?.length > 0
                  ? [{ name: "Primary", id: 0 }, ...ledgerTypeList]?.map(
                      (item) => ({
                        label: item?.name,
                        value: item?.id,
                      })
                    )
                  : []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>

          <Form.Item label="Hsn sac" name="hsnSac">
            <Switch />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.hsnSac !== currentValues.hsnSac
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("hsnSac") && (
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

          <Form.Item label="GST rate" name="gstRate">
            <Switch />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gstRate !== currentValues.gstRate
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("gstRate") && (
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
                      label="GST rate data"
                      name="gstRatesData"
                      rules={[
                        {
                          required: true,
                          message: "please enter gst rate data",
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
          <Form.Item label="Bank account" name="bankAccount">
            <Switch />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.bankAccount !== currentValues.bankAccount
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("bankAccount") && (
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

export default Statutory;
