import React from "react";
import CommonTable from "../../../components/CommonTable";
import { useSelector } from "react-redux";
import { Flex, Typography } from "antd";
const { Text } = Typography;

const SlugsInUrls = ({data}) => {
  const childSlugList = useSelector((state) => state.leadurls.childSlugList);

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "name",
      title: "Name",
    },
  ];
  return (
    <>
      <Flex>
        <Text>Url name : {data?.urlsName}</Text>
      </Flex>
      <CommonTable columns={columns} data={childSlugList} scroll={{ y: 480 }} />
    </>
  );
};

export default SlugsInUrls;
