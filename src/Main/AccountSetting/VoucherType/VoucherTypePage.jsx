import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVoucherType,
  getAllVoucherType,
  updateVouchersType,
} from "../../../Toolkit/Slices/AccountSlice";
import CommonTable from "../../../components/CommonTable";
const { Text } = Typography;

const VoucherTypePage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const voucherTypeList = useSelector((state) => state.account.voucherTypeList);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getAllVoucherType());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(voucherTypeList);
  }, [voucherTypeList]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = voucherTypeList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleEdit = (value) => {
    form.setFieldsValue({
      name: value?.name,
    });
    setOpenModal(true);
    setEditData(value);
  };

  const handleFinish = (values) => {
    if (editData) {
      dispatch(updateVouchersType({ ...values, id: editData?.id }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Voucher type updated successfully !." });
            setOpenModal(false);
            dispatch(getAllVoucherType());
            form.resetFields()
            setEditData(null)
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    } else {
      dispatch(createVoucherType(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Voucher type created successfully" });
            setOpenModal(false);
            dispatch(getAllVoucherType());
            form.resetFields()
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
          <Text className="heading-text">Voucher type</Text>
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
            Create vouchers type
          </Button>
        </Flex>
        <CommonTable data={filteredData} columns={columns} scroll={{y:'70vh'}} />
      </Flex>
      <Modal
        title={editData ? "Edit voucher type" : "Create voucher type"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Voucher name"
            name="name"
            rules={[{ required: true, message: "please enter voucher name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default VoucherTypePage;
