import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrganization,
  getAllOrganizations,
} from "../../../Toolkit/Slices/AccountSlice";
import { Icon } from "@iconify/react";
const { Title, Text } = Typography;

const Organizations = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const organizationsList = useSelector(
    (state) => state.account.organiztionList
  );
  const [editData, setEditData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getAllOrganizations());
  }, [dispatch]);

  const handleEdit = (value) => {
    setEditData(value);
    setOpenModal(true);
  };

  const handleFinish = (values) => {
    dispatch(createOrganization(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Organization created successfully !.",
          });
          dispatch(getAllOrganizations());
          form.resetFields();
          setOpenModal(false);
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  return (
    <>
      <Flex vertical gap={18} style={{ padding: "12px 0px" }}>
        <Flex justify="space-between" align="center">
          <Text className="heading-text">Organization list</Text>
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Create organization
          </Button>
        </Flex>
        <Input
          placeholder="Search"
          prefix={
            <Icon icon="fluent:search-16-regular" width="16" height="16" />
          }
        />
        <Flex vertical>
          {organizationsList?.map((item, idx) => (
            <Card key={`${idx}organization`}>
              <Flex vertical gap={12}>
                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={12}>
                    <Avatar size="small">{item?.name?.charAt(0)}</Avatar>
                    <Title level={5} style={{ margin: 0 }}>
                      {item?.name}
                    </Title>
                  </Flex>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => handleEdit(item)}
                  >
                    <Icon icon="fluent:edit-24-regular" />
                  </Button>
                </Flex>
                <Divider style={{ margin: 0 }} />
                <Row>
                  <Col span={8}>
                    <Flex align="center" gap={12}>
                      <Text type="secondary">State</Text>
                      <Text>:</Text>
                      <Text>{item?.state}</Text>
                    </Flex>
                  </Col>
                  <Col span={8}>
                    <Flex align="center" gap={12}>
                      <Text type="secondary">Country</Text>
                      <Text>:</Text>
                      <Text>{item?.country}</Text>
                    </Flex>
                  </Col>
                  <Col span={8}>
                    <Flex align="center" gap={12}>
                      <Text type="secondary">Pin / Zip code</Text>
                      <Text>:</Text>
                      <Text>{item?.pin}</Text>
                    </Flex>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Flex align="center" gap={12}>
                      <Text type="secondary">Address</Text>
                      <Text>:</Text>
                      <Text>{item?.address}</Text>
                    </Flex>
                  </Col>
                </Row>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Flex>
      <Modal
        title={editData ? "Edit organization" : "Create organization"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Organization name"
            name="name"
            rules={[
              { required: true, message: "please enter organization name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="State"
            name="state"
            rules={[
              { required: true, message: "please enter organization state" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "please enter country name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Pin / Zip code"
            name="pin"
            rules={[{ required: true, message: "please enter pin / zip code" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "please your address" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Organizations;
