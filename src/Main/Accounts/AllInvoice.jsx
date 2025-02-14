import { Button, Flex, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import CommonTable from "../../components/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllInvoice } from "../../Toolkit/Slices/AccountSlice";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
const { Text, Title } = Typography;

const AllInvoice = () => {
  const dispatch = useDispatch();
  const { userid } = useParams();
  const allInvoiceList = useSelector((state) => state.account.allInvoiceList);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (userid) {
      dispatch(getAllInvoice(userid));
    }
  }, [userid]);

  useEffect(() => {
    setFilteredData(allInvoiceList);
  }, [allInvoiceList]);

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "invoiceName",
      title: "Invoice name",
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    setSearchText(value);
    const filtered = allInvoiceList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <Flex vertical>
        <Flex className="vouchers-header">
          <Text className="heading-text">Invoice list</Text>
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

export default AllInvoice;
