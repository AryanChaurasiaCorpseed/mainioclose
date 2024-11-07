import { Button, DatePicker, Flex, Form, Input, Radio, Select } from "antd"
import React from "react"

const LeadEstimate = () => {
  return (
    <Flex>
      <Form layout="vertical" style={{ width: "60%" }}>
        <Form.Item
          label="Select client admin"
          name="admin"
          rules={[{ required: true, message: "please select client admin" }]}
        >
          <Select />
        </Form.Item>
        <Form.Item
          label="Contacts"
          name="contact"
          rules={[{ required: true, message: "please select contact" }]}
        >
          <Select />
        </Form.Item>
        <Form.Item
          label="Sales type"
          name="salesType"
          rules={[{ required: true, message: "please select sales type" }]}
        >
          <Radio.Group>
            <Radio value={"Non-Consulting Sale"}>Non-Consulting Sale</Radio>
            <Radio value={"Consulting Sale"}>Consulting Sale</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Product name"
          name="product"
          rules={[{ required: true, message: "please select product" }]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label="Select sales person name"
          name="salesPerson"
          rules={[{ required: true, message: "please select sales person" }]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label="Order number"
          name="orderNumber"
          rules={[{ required: true, message: "please give order number" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Purchase date"
          name="purchaseDate"
          rules={[{ required: true, message: "please select date" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Invoice notes"
          name="invoiceNote"
          rules={[{ required: true, message: "please write invoice notes" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Remarks For Operation"
          name="remarks"
          rules={[{ required: true, message: "please write remarks" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            {" "}
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  )
}

export default LeadEstimate
