import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Row,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import CommonTable from "../../../components/CommonTable";
import { useDispatch, useSelector } from "react-redux";
import {
  createTDS,
  getAllTdsList,
  getTdsAmounts,
} from "../../../Toolkit/Slices/AccountSlice";
const { Text } = Typography;

const TDS = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const tdsList = useSelector((state) => state.account.tdsList);
  const tdsAmount = useSelector((state) => state.account.tdsAmount);
  const [editData, setEditData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(tdsList);
  }, [tdsList]);

  useEffect(() => {
    dispatch(getAllTdsList());
    dispatch(getTdsAmounts());
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value?.trim();
    setSearchText(value);
    const filtered = tdsList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const columns = [
    { dataIndex: "id", title: "Id", width: 80 },
    { dataIndex: "organization", title: "Organization" },
    { dataIndex: "tdsType", title: "TDS type" },
    { dataIndex: "totalPaymentAmount", title: "TDS payment amount" },
    { dataIndex: "tdsPrecent", title: "TDS %" },
    { dataIndex: "tdsAmount", title: "TDS amount" },
  ];

  const handleSubmit = useCallback(
    (values) => {
      dispatch(createTDS(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "TDS created successfully !.",
            });
            dispatch(getAllTdsList());
            setOpenModal(false);
            form.resetFields();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    },
    [dispatch, form]
  );

  return (
    <>
      <Flex vertical gap={12}>
        <Flex className="vouchers-header" justify="space-between">
          <Text className="heading-text">TDS list</Text>
          <Flex align="center" gap={12}>
            <Flex align="center" gap={4}>
              <Text className="heading-text" type="secondary">
                Payable TDS
              </Text>{" "}
              <Text className="heading-text" type="secondary">
                :
              </Text>
              <Text className="heading-text">{tdsAmount?.payableTds}</Text>
            </Flex>
            <Flex align="center" gap={4}>
              <Text className="heading-text" type="secondary">
                Received TDS
              </Text>{" "}
              <Text className="heading-text" type="secondary">
                :
              </Text>
              <Text className="heading-text">{tdsAmount?.receivableTds}</Text>
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
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Create TDS
          </Button>
        </Flex>
        <CommonTable
          data={filteredData}
          columns={columns}
          scroll={{ y: "70vh" }}
        />
      </Flex>
      <Modal
        title={editData ? "Edit TDS details" : "Add TDS details"}
        open={openModal}
        width={"60%"}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          form={form}
          style={{ maxHeight: "75vh", overflow: "auto" }}
        >
          <Row>
            <Col span={11}>
              {" "}
              <Form.Item
                label="Organization"
                name="organization"
                rules={[
                  { required: true, message: "please enter organization" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="TDS type"
                name="tdsType"
                rules={[{ required: true, message: "please enter tds type" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Payment register id"
                name="paymentRegisterId"
                rules={[
                  {
                    required: true,
                    message: "please enter payment register id",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="Total payment amount"
                name="totalPaymentAmount"
                rules={[
                  {
                    required: true,
                    message: "please enter total payment amount",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="TDS %"
                name="tdsPrecent"
                rules={[{ required: true, message: "please enter tds %" }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}>
              <Form.Item
                label="TDS amount"
                name="tdsAmount"
                rules={[{ required: true, message: "please enter tds amount" }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Project id"
                name="projectId"
                rules={[
                  { required: true, message: "please select project id" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={2} />
            <Col span={11}></Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default TDS;
