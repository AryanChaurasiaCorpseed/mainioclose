import React, { useEffect, useState } from "react";
import "./LeadStatusPage.scss";
import { deleteQuery } from "../../../API/DeleteQuery";
import MainHeading from "../../../components/design/MainHeading";
import EditStatus from "./EditStatus";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createLead,
  getAllStatusData,
} from "../../../Toolkit/Slices/LeadSlice";
import CommonTable from "../../../components/CommonTable";
import { Icon } from "@iconify/react";
import OverFlowText from "../../../components/OverFlowText";

const LeadStatusPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const statusData = useSelector((state) => state.leads.getAllStatus);

  useEffect(() => {
    dispatch(getAllStatusData());
  }, []);

  const deleteStatusFun = async (statusId) => {
    if (window.confirm("Are you sure to delete this record?") == true) {
      try {
        const leadStatusDel = await deleteQuery(
          `/leadService/api/v1/status/deleteStaus?id=${statusId}`
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setFilteredData(statusData);
  }, [statusData]);

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    setSearchText(value);
    const filtered = statusData?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleFinish = (values) => {
    dispatch(createLead(values)).then(() => window.location.reload());
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, records) => <OverFlowText>{records?.name}</OverFlowText>,
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (_, records) => (
        <OverFlowText>{records?.description}</OverFlowText>
      ),
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (_, info) => <EditStatus data={info} />,
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, info) => (
        <Button
          size="small"
          type="text"
          danger
          onClick={() => deleteStatusFun(info.id)}
        >
          <Icon icon="fluent:delete-20-regular" />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="create-user-box">
        <MainHeading data={`Lead status`} />
        <Button type="primary" size="small" onClick={() => setOpenModal(true)}>
          Add lead status
        </Button>
      </div>

      <div className="setting-table">
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
        <div className="table-responsive">
          <CommonTable
            data={filteredData}
            columns={columns}
            scroll={{ y: "72vh" }}
          />
        </div>
      </div>

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Enter lead status name"
            name="name"
            rules={[{ required: true, message: "please enter the lead name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Enter lead status description"
            name="description"
            rules={[{ required: true, message: "please enter the desciption" }]}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LeadStatusPage;
