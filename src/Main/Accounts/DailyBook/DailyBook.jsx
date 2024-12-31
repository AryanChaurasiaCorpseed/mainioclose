import { DatePicker, Flex, Input, Typography } from "antd";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import CommonTable from "../../../components/CommonTable";
const { Text } = Typography;

const DailyBook = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const voucherList = [];

  const handleSearch = (e) => {
    const value = e.target.value?.trim();
    setSearchText(value);
    const filtered = voucherList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "date",
      title: "Date",
    },
    {
      dataIndex: "",
      title: "Perticulars",
    },
    {
      dataIndex: "voucherType",
      title: "Voucher type",
    },
    {
      dataIndex: "voucherNumber",
      title: "Voucher no.",
    },
    {
      dataIndex: "debitAmount",
      title: "Debit amount (Inwards Qty)",
    },
    {
      dataIndex: "creditAmount",
      title: "Credit amount (Outwards Qty)",
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
          <DatePicker />
        </Flex>
        <CommonTable
          data={filteredData}
          columns={columns}
          scroll={{ y: "70vh" }}
        />
      </Flex>
    </>
  );
};

export default DailyBook;
