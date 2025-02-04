import { Button, Flex, Input, Modal, notification, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import "../Accounts.scss";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import CommonTable from "../../../components/CommonTable";
import {
  createVoucher,
  getAllLedger,
  getAllVoucher,
  getAllVoucherType,
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
  const [renderedGSTData, setRenderedGstData] = useState([]);
  const [count, setCount] = useState(1);
  const [voucherData, setVoucherData] = useState({
    companyName: "",
    ledgerId: 0,
    ledgerTypeId: 0,
    voucherTypeId: 0,
    productId: 0,
    creditAmount: "",
    debitAmount: "",
    createDate: "",
    paymentType: null,
    igst: "",
    cgst: "",
    sgst: "",
    cgstsgst: false,
    creditDebit: true,
  });

  useEffect(() => {
    dispatch(getAllVoucherType());
    dispatch(getAllLedger());
    dispatch(getAllVoucher());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(voucherList);
  }, [voucherList]);

  const handleEditVoucher = (value) => {
    setEditData(value);
    setOpenModal(true);
    setVoucherData((prev) => ({ ...prev, ...value }));
  };

  const handleSearch = (e) => {
    const value = e.target.value.trim();
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
          dispatch(getAllVoucher());
          setOpenModal(false);
          setCount(0);
          setRenderedGstData([]);
          setVoucherData({
            companyName: "",
            ledgerId: 0,
            ledgerTypeId: 0,
            voucherTypeId: 0,
            productId: 0,
            creditAmount: "",
            debitAmount: "",
            createDate: "",
            paymentType: null,
            igst: "",
            cgst: "",
            sgst: "",
            cgstsgst: false,
            creditDebit: true,
          });
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
      width:80
    },
    {
      dataIndex: "ledgerName",
      title: "Ledger",
    },
    {
      dataIndex: "voucherType",
      title: "Voucher type",
      render:(info)=><Text>{info?.name}</Text>
    },
    {
      dataIndex: "creditAmount",
      title: "Credit amount",
    },
    {
      dataIndex: "debitAmount",
      title: "Debit amount",
    },
    {
      dataIndex: "paymentType",
      title: "Payment type",
    },
    {
      dataIndex: "product",
      title: "Product",
    },
    {
      dataIndex: "edit",
      title: "Edit",
      render: (_, data) => (
        <Button
          size="small"
          onClick={() => handleEditVoucher(data)}
        >
         Edit
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
          setRenderedGstData={setRenderedGstData}
          renderedGSTData={renderedGSTData}
          count={count}
          setCount={setCount}
        />
      </Modal>
    </>
  );
};

export default Voucher;
