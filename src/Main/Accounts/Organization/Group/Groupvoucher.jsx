import { Flex, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "../../../../components/CommonTable";
import { Icon } from "@iconify/react";
import { getVoucherByGroupLedgerId } from "../../../../Toolkit/Slices/AccountSlice";
import { useParams } from "react-router-dom";
const { Text, Title } = Typography;

const Groupvoucher = () => {
  const dispatch = useDispatch();
  const { ledgerId } = useParams();
  const groupVoucherList = useSelector(
    (state) => state.account.groupVoucherList?.result
  );
  const groupVoucherDetail = useSelector(
    (state) => state.account.groupVoucherList
  );

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(groupVoucherList);
  }, [groupVoucherList]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = groupVoucherList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    dispatch(getVoucherByGroupLedgerId(ledgerId));
  }, [dispatch, ledgerId]);

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width:80
    },
    {
      dataIndex: "ledgerName",
      title: "Ledger name",
    },
    {
      dataIndex: "paymentType",
      title: "Payment type",
    },
    {
      dataIndex: "voucherType",
      title: "Voucher type",
      render: (info) => <Text>{info?.name}</Text>,
    },
    {
      dataIndex: "creditAmount",
      title: "Credit amount",
    },
    {
      dataIndex: "debitAmount",
      title: "Debit amount",
      render: (info) => <Text>{info ? info : "NA"}</Text>,
    },
    {
      dataIndex: "sgst",
      title: "Sgst %",
    },
    {
      dataIndex: "cgst",
      title: "Cgst %",
    },
  ];

  return (
    <>
      <Flex vertical gap={12}>
        <Flex
          className="vouchers-header"
          justify="space-between"
          align="center"
        >
          <Text className="heading-text">Group voucher list</Text>
          <Flex align="center" gap={12} wrap>
            <Flex gap={2} align='center'>
              <Title level={5} type="secondary" style={{margin:0}} >
                Total amount
              </Title>
              <Title level={5} type="secondary" style={{margin:0}}>
                :
              </Title>
              <Title level={5} style={{margin:0}}>{groupVoucherDetail?.totalAmount}</Title>
            </Flex>
            <Flex gap={2} align='center'>
              <Title level={5} type="secondary" style={{margin:0}}>
                Total credit
              </Title>
              <Title level={5} type="secondary" style={{margin:0}}>
                :
              </Title>
              <Title level={5} style={{margin:0}}>{groupVoucherDetail?.totalCredit}</Title>
            </Flex>
            <Flex gap={2} align='center'>
              <Title level={5} type="secondary" style={{margin:0}}>
                Total debit
              </Title>
              <Title level={5} type="secondary" style={{margin:0}}>
                :
              </Title>
              <Title level={5} style={{margin:0}}>{groupVoucherDetail?.totalDebit}</Title>
            </Flex>
          </Flex>
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
          {/* <Button
          type="primary"
          // onClick={() => {
          //   setOpenModal(true);
          // }}
        >
          Create payment register
        </Button> */}
        </Flex>
        <CommonTable
          data={filteredData}
          columns={columns}
          scroll={{ y: "70vh" }}
          rowKey={(row) => row?.id}
        />
      </Flex>
    </>
  );
};

export default Groupvoucher;
