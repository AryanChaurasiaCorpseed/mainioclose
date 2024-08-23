import React, { useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import { Button, Form, Input, Modal, notification, Select } from "antd"
import CommonTable from "../../../components/CommonTable"
import {
  createSubIndustry,
  getAllIndustry,
  getAllSubIndustry,
} from "../../../Toolkit/Slices/IndustrySlice"
import { useDispatch, useSelector } from "react-redux"

export const SubsubIndustry = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const allIndustry = useSelector((state) => state.industry.allIndustry)
  const allSubIndustry = useSelector((state) => state.industry.allSubIndustry)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    dispatch(getAllIndustry())
    dispatch(getAllSubIndustry())
  }, [dispatch])

  const handleFinish = (values) => {
    dispatch(createSubIndustry(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Industry created successfully" })
          dispatch(getAllSubIndustry())
          setOpenModal(false)
          form.resetFields()
        } else {
          notification.error({ message: "Something went wrong !." })
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong !." })
      })
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ]

  return (
    <div>
      <div className="create-user-box">
        <MainHeading data={`Sub industry`} />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add sub industry
        </Button>
      </div>

      <div className="table-responsive">
        <CommonTable
          data={allSubIndustry}
          columns={columns}
          scroll={{ y: 600 }}
        />
      </div>
      <Modal
        title={"Add industry"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Sub industry name"
            name="name"
            rules={[
              {
                required: true,
                message: "please give sub industry name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select industry"
            name="industryDataId"
            rules={[
              {
                required: true,
                message: "please select industry to create sub industry",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              mode="multiple"
              options={
                allIndustry?.length > 0
                  ? allIndustry?.map((item) => ({
                      label: item?.name,
                      value: item?.id,
                    }))
                  : []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
