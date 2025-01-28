import { Button, Card, Col, Flex, Row, Typography } from "antd";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../../../../Toolkit/Slices/AccountSlice";
import CommonTable from "../../../../components/CommonTable";
import { Link } from "react-router-dom";
const { Title, Text } = Typography;

const Group = () => {
  const dispatch = useDispatch();
  const groupList = useSelector((state) => state.account.groupList);

  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 120,
    },
    {
      dataIndex: "name",
      title: "Name",
      render: (name, record) => (
        <Link to={`${record.id}/ledger`}>{name}</Link>
      ),
    },
  ];

  return (
    <>
      <Flex vertical gap={18} style={{ padding: "12px 0px" }}>
        <Flex justify="space-between" align="center">
          <Text className="heading-text">Groups list</Text>
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
          <CommonTable
            data={groupList}
            columns={columns}
            scroll={{ y: "80vh" }}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Group;
