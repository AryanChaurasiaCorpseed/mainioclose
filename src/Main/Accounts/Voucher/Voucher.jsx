import { Button, Flex, Input, Modal, notification, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "../Accounts.scss";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import CommonTable from "../../../components/CommonTable";
import {
  createVoucher,
  getAllVoucher,
} from "../../../Toolkit/Slices/AccountSlice";
import CreateVoucher from "./CreateVoucher";
const { Text } = Typography;

const Voucher = () => {
  const dispatch = useDispatch();
  const voucherList = useSelector((state) => state.account.voucherList);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [voucherData, setVoucherData] = useState({
    companyName: "",
    ledgerId: 0,
    ledgerTypeId: 0,
    voucherTypeId: 0,
    productId: 0,
    creditAmount: "",
    debitAmount: "",
    createDate: "",
    paymentType: "",
    igst: "",
    cgst: "",
    sgst: "",
    cgstsgst: true,
    creditDebit: true,
  });

  useEffect(() => {
    dispatch(getAllVoucher());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(voucherList);
  }, [voucherList]);

  const handleEditVoucher = (value) => {
    setEditData(value);
    setOpenModal(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = voucherList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleSubmit = useCallback(() => {
    dispatch(createVoucher(voucherData))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Voucher created successfully !." });
          setOpenModal(false);
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  }, [dispatch, voucherData]);

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "companyName",
      title: "Company name",
    },
    {
      dataIndex: "product",
      title: "Product",
    },
    {
      dataIndex: "edit",
      title: "Edit",
      render: (_, data) => (
        <Button type="text" size="small" onClick={handleEditVoucher}>
          <Icon icon="fluent:edit-24-regular" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Flex vertical gap={12}>
        <Flex className="vouchers-header">
          <Text className="heading-text">Voucher</Text>
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
            }}
          >
            Create voucher
          </Button>
        </Flex>
        <CommonTable
          data={filteredData}
          columns={columns}
          scroll={{ y: "70vh" }}
        />
      </Flex>
      <Modal
        title={editData ? "Edit voucher" : "Create voucher"}
        open={openModal}
        centered
        width={"80%"}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={handleSubmit}
      >
        <CreateVoucher
          setVoucherData={setVoucherData}
          voucherData={voucherData}
        />
      </Modal>
    </>
  );
};

export default Voucher;
