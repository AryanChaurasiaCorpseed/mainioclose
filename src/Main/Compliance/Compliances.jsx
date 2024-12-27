import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompliances } from "../../Toolkit/Slices/ComplianceSlice";
import TableOutlet from "../../components/design/TableOutlet";
import TableScalaton from "../../components/TableScalaton";
import SomethingWrong from "../../components/usefulThings/SomethingWrong";
import MainHeading from "../../components/design/MainHeading";
import "./Compliance.scss";
import { ViewComplianceDoc } from "./ViewComplianceDoc";
import CommonTable from "../../components/CommonTable";
import { Icon } from "@iconify/react";
import { Input } from "antd";

const Compliances = () => {
  const { allCompliance, complianceLoading, complianceError } = useSelector(
    (prev) => prev?.compliance
  );

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getAllCompliances());
  }, [dispatch]);

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "name",
      title: "Catagory name",
    },
    {
      dataIndex: "documents",
      title: "Documents",
      render: (_, props) => <ViewComplianceDoc data={props} />,
    },
  ];

  useEffect(() => {
    setFilteredData(allCompliance);
  }, [allCompliance]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = allCompliance?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All compliances"} />
      </div>
      <div className="flex-verti-center-hori-start mt-2">
        <Input
          value={searchText}
          size="small"
          onChange={handleSearch}
          style={{ width: "220px" }}
          placeholder="search"
          prefix={<Icon icon="fluent:search-24-regular" />}
        />
      </div>
      <div>
        {complianceLoading && <TableScalaton />}
        {complianceError && <SomethingWrong />}
        {allCompliance && !complianceLoading && !complianceError && (
          <CommonTable
            data={filteredData}
            columns={columns}
            scroll={{ y: "75vh" }}
          />
        )}
      </div>
    </TableOutlet>
  );
};

export default Compliances;
