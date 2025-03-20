import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanyUnitsByStateAndCompanyId,
  getGstDetailsByCompanyId,
} from "../../../Toolkit/Slices/LeadSlice";
import { Link, useParams } from "react-router-dom";
import { Flex, Input, Typography } from "antd";
import { Icon } from "@iconify/react";
import CommonTable from "../../../components/CommonTable";
import ColComp from "../../../components/small/ColComp";
const { Text } = Typography;

const CompanyDetailPage = () => {
  const dispatch = useDispatch();
  const { userid, companyId } = useParams();
  const companyGstDetailList = useSelector(
    (state) => state.leads.companyGstDetailList
  );
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getGstDetailsByCompanyId(companyId));
  }, [dispatch, companyId]);

  useEffect(() => {
    setFilteredData(companyGstDetailList);
  }, [companyGstDetailList]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = companyGstDetailList?.result?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  console.log("jsdghkjghjgfjfg", companyGstDetailList);

  const columns = [
    {
      dataIndex: "parentCompanyId",
      title: "Id",
      fixed: "left",
      width: 80,
    },
    {
      dataIndex: "gstNo",
      title: "GST number",
      render: (_, props) => (
        <Link
          className="link-heading"
          to={`/erp/${userid}/sales/newcompanies/${companyId}/details/${props?.state}/companyUnit`}
        >
          {props?.gstNo}
        </Link>
      ),
    },

    {
      dataIndex: "state",
      title: "State",
    },
  ];

  return (
    <>
      <Flex vertical gap={12}>
        <Flex className="vouchers-header">
          <Text className="heading-text">Gst list</Text>
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
          scroll={{ y: "69vh" }}
          rowKey={(record) => record?.parentCompanyId}
        />
      </Flex>
    </>
  );
};

export default CompanyDetailPage;
