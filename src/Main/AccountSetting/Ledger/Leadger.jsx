import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLedger,
  createLedgerType,
  getAllLedger,
  getAllLedgerType,
  getAllVoucher,
  updateLedger,
  updateLedgerType,
  updateVouchers,
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

  useEffect(() => {
    dispatch(getAllLedger());
    dispatch(getAllLedgerType());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(ledgerList);
  }, [ledgerList]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = ledgerList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleEdit = (value) => {
    form.setFieldsValue({
      name: value?.name,
      ledgerTypeId:value?.ledgerType?.id,
      email:value?.email,
      pin:value?.pin,
      state:value?.state,
      country:value?.country,
      address:value?.address
    });
    setOpenModal(true);
    setEditData(value);
  };

  const handleFinish = (values) => {
    if (editData) {
      dispatch(updateLedger({ ...values, id: editData?.id }))
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
      dispatch(createLedger(values))
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
          <Text className="heading-text">Ledger</Text>
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
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "please enter ledger name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select ledger type"
            name="ledgerTypeId"
            rules={[{ required: true, message: "please select ledger type" }]}
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
            />
          </Form.Item>
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
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Ledger;
