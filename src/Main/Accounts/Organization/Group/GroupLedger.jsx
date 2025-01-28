import { Flex, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import CommonTable from "../../../../components/CommonTable";
const { Text, Title } = Typography;

const GroupLedger = () => {
  const groupLedgerList = useSelector((state) => state.account.groupLedgerList);
  const columns = [];
  return (
    <Flex vertical gap={18} style={{ padding: "12px 0px" }}>
      <Flex justify="space-between" align="center">
        <Text className="heading-text">Ledger list</Text>
        <Flex gap={8}>
          {/* <Button type="primary" onClick={() => setOpenModal1(true)}>
          Add statutory
        </Button>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Create organization
        </Button> */}
        </Flex>
      </Flex>
      <Flex vertical>
        <CommonTable data={[]} columns={columns} scroll={{ y: "80vh" }} />
      </Flex>
    </Flex>
  );
};

export default GroupLedger;
