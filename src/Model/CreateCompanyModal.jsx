import { Button, Form, Input, Modal, Select, Switch } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { createCompany } from "../Toolkit/Slices/CompanySlice"
import { Icon } from "@iconify/react"
import { getAllUsers } from "../Toolkit/Slices/UsersSlice"

const CreateCompanyModal = () => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const [openModal, setModalOpen] = useState(false)
  const [form] = Form.useForm()
  const allLeadList = useSelector((state) => state.leads.allLeadsWithLabel)
  const allProjectList = useSelector((state) => state.project.allProjectList)
  const allUsers = useSelector((state) => state.user.allUsers)
  const allParentCompany = useSelector(
    (state) => state.company.allParentCompany
  )

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const handleSubmit = (values) => {
    dispatch(createCompany(values))
    setModalOpen(false)
  }
  console.log("sdvashkvj", allUsers)

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        <Icon icon="fluent:add-20-regular" /> Create
      </Button>
      <Modal
        title="Create company"
        centered
        open={openModal}
        onCancel={() => setModalOpen(false)}
        onClose={() => setModalOpen(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form
          form={form}
          layout="vertical"
          style={{ height: "80vh", overflow: "auto", padding: "0px 12px" }}
          onFinish={handleSubmit}
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
            label="Parent comapny"
            name="parent"
            rules={[{ required: true }]}
          >
            <Switch size="small" />
          </Form.Item>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.parent !== currentValues.parent
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("parent") ? (
                  <Form.Item
                    label="Select parent company"
                    name="parentId"
                    rules={[
                      {
                        required: true,
                        message: "please enter the company name",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      options={allParentCompany}
                      showSearch
                      filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                      }
                    />
                  </Form.Item>
                ) : (
                  <Form.Item
                    label="Assignee"
                    name="assigneeId"
                    rules={[
                      { required: true, message: "please enter the assignee" },
                    ]}
                  >
                    <Select
                      showSearch
                      allowClear
                      options={
                        allUsers?.map((item) => ({
                          label: item?.fullName,
                          value: item?.id,
                        })) || []
                      }
                      filterOption={(input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase())
                      }
                    />
                  </Form.Item>
                )}
              </>
            )}
          </Form.Item>

          <Form.Item
            label="Lead"
            name="leadId"
            rules={[{ required: true, message: "please enter the lead" }]}
          >
            <Select
              mode="multiple"
              allowClear
              showSearch
              options={allLeadList}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            label="Project"
            name="projectId"
            rules={[{ required: true, message: "please enter the projects" }]}
          >
            <Select
              options={allProjectList}
              mode="multiple"
              showSearch
              allowClear
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
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

export default CreateCompanyModal
