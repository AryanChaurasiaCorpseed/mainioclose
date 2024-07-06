import { Button, Form, Input, Modal, Table, Typography } from "antd"
import React, { useState } from "react"
import CommonTable from "../../components/CommonTable"
import "./Accounts.scss"
import { Icon } from "@iconify/react"
const { Text } = Typography

export const AccountsList = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "1",
      fixed: "left",
    },
    {
      title: "Pan",
      dataIndex: "panNo",
      key: "2",
    },
    {
      title: "Gst no.",
      dataIndex: "gstNo",
      key: "3",
    },
    {
      title: "Company age",
      dataIndex: "companyAge",
      key: "4",
    },
    {
      title: "Industry",
      dataIndex: "industry",
      key: "5",
    },
    {
      title: "Comapny Lead",
      dataIndex: "companyLead",
      key: "6",
      render: (_, data) => <Text>{data?.companyLead?.name}</Text>,
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "7",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "8",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "9",
      render: (_, data) => <Text>{data?.assignee?.name}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "10",
      render: (_, data) => <Text>{data?.assignee?.status}</Text>,
    },
  ]

  const [openModal, setModalOpen] = useState(false)
  const [form] = Form.useForm()

  return (
    <>
      <div className="account-table-header">
        <Button type="primary" onClick={() => setModalOpen(true)}>
          <Icon icon="fluent:add-20-filled" /> Create
        </Button>
      </div>
      <CommonTable columns={columns} />
      <Modal
        title="Create company"
        centered
        open={openModal}
        onCancel={() => setModalOpen(false)}
        onClose={() => setModalOpen(false)}
        onOk={() => form.submit()}
        okText='Submit'
      >
        <Form
          form={form}
          layout="vertical"
          style={{ height: "80vh", overflow: "auto",padding:'0px 12px' }}
        >
          <Form.Item
            label="Company name"
            name="name"
            rules={[
              { required: true, message: "please enter the company name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Pan no."
            name="panNo"
            rules={[{ required: true, message: "please enter the pan number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gst no."
            name="gstNo"
            rules={[{ required: true, message: "please enter the GST number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company age"
            name="companyAge"
            rules={[
              { required: true, message: "please enter the comapny age" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Assignee"
            name="assigneeId"
            rules={[{ required: true, message: "please enter the assignee" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Lead"
            name="leadId"
            rules={[{ required: true, message: "please enter the lead" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project"
            name="projectId"
            rules={[{ required: true, message: "please enter the projects" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "please enter the address" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "please enter the city" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="State"
            name="state"
            rules={[{ required: true, message: "please enter the state" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "please enter the country" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
