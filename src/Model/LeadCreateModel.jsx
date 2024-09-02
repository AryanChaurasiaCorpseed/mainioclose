import React, { useCallback, useEffect, useState } from "react"
import "./Model.css"
import { leadSource } from "../data/FakeData"
import { useParams } from "react-router"
import { Button, Form, Input, Modal, notification, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  createLeads,
  getAllLeadUsers,
  handleLoadingState,
} from "../Toolkit/Slices/LeadSlice"

const LeadCreateModel = ({ leadByCompany, companyId }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { userid } = useParams()
  const allLeadUser = useSelector((state) => state.leads.allLeadUsers)
  const [openModal, setOpenModal] = useState(false)


  useEffect(() => {
    dispatch(getAllLeadUsers())
    dispatch(handleLoadingState(""))
  }, [dispatch])



  const handleFinish = useCallback(
    (values) => {
      values.categoryId = "1"
      values.createdById = userid
      values.serviceId = "1"
      values.industryId = "1"
      if (leadByCompany) {
        values.companyId = companyId
      }
      dispatch(createLeads(values)).then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          setOpenModal(false)
          window.location.reload()
        } else {
          notification.error({ message: "Something went wrong" })
        }
      })
    },

    [userid, dispatch, companyId, leadByCompany]
  )

  return (
    <>
      <div className="team-model">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Create lead
        </Button>
      </div>
      <Modal
        title="Create lead"
        centered
        width={650}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          scrollToFirstError
          style={{ maxHeight: "80vh", overflow: "auto" }}
        >
          <Form.Item
            label="Lead name"
            name="leadName"
            rules={[{ required: true, message: "please enter the lead name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Client name"
            name="name"
            rules={[
              { required: true, message: "please enter the client name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Client email"
            name="email"
            // rules={[
            //   {
            //     required: true,
            //     message: "please enter the client email",
            //     type: "email",
            //   },
            // ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile number"
            name="mobileNo"
            rules={[
              {
                required: true,
                message: "please enter the mobile number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company"
            name="urls"
            rules={[
              {
                required: true,
                message: "please enter the company",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
          <Form.Item label="State" name="state">
            <Input />
          </Form.Item>
          <Form.Item label="Ip Address" name="ipAddress">
            <Input />
          </Form.Item>
          <Form.Item label="Assignee user" name="assigneeId">
            <Select
              showSearch
              allowClear
              options={
                allLeadUser?.map((item) => ({
                  label: item?.fullName,
                  value: item?.id,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            label="Source"
            name="source"
            rules={[{ required: true, message: "please select source" }]}
          >
            <Select
              placeholder="Select source"
              showSearch
              allowClear
              options={
                leadSource?.map((item) => ({
                  label: item,
                  value: item,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            label="Primary address"
            name="primaryAddress"
            rules={[
              { required: true, message: "please enter primary address" },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} />
          </Form.Item>
          <Form.Item
            label="Lead description"
            name="leadDescription"
            rules={[
              { required: true, message: "please enter lead description" },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default LeadCreateModel
