import { Button, Flex, Typography } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "../../../../components/CommonTable";
import { getLedgerByGroupId } from "../../../../Toolkit/Slices/AccountSlice";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
const { Text, Title } = Typography;

const GroupLedger = () => {
  const dispatch = useDispatch();
  const { groupId } = useParams();
  const groupLedgerList = useSelector((state) => state.account.groupLedgerList);

  useEffect(() => {
    dispatch(getLedgerByGroupId(groupId));
  }, [groupId, dispatch]);

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 100,
    },
    {
      dataIndex: "name",
      title: "Name",
      render: (name, record) => (
        <Link className="link-heading" to={`${record.id}/groupVoucher`}>
          {name}
        </Link>
      ),
    },
    {
      dataIndex: "ledgerType",
      title: "Ledger type",
      render: (info) => <Text>{info?.name}</Text>,
    },
    {
      dataIndex: "edit",
      title: "Edit",
      render: (_, data) => (
        <Button size="small">
          <Icon icon="fluent:edit-16-regular" />
          Edit
        </Button>
      ),
    },
  ];
  return (
    <Flex vertical gap={18} style={{ padding: "12px 0px" }}>
      <Flex justify="space-between" align="center">
        <Text className="heading-text">Ledger list</Text>
        <Flex gap={8}></Flex>
      </Flex>
      <Flex vertical>
        <CommonTable
          data={groupLedgerList}
          columns={columns}
          scroll={{ y: "80vh" }} 
        />
      </Flex>
    </Flex>
  );
};

export default GroupLedger;
