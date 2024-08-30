import React, { useEffect, useState } from "react"
import CommonTable from "../../../components/CommonTable"
import { Button, Form, Input, Modal, notification, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  createMainIndustry,
  getAllMainIndustry,
} from "../../../Toolkit/Slices/IndustrySlice"
import MainHeading from "../../../components/design/MainHeading"

const Industries = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const allSubIndustry = useSelector((state) => state.industry.allSubIndustry)
  const allMainIndustry = useSelector((state) => state.industry.allMainIndustry)

  useEffect(() => {
    dispatch(getAllMainIndustry())
  }, [dispatch])

  const handleFinish = (values) => {
    dispatch(createMainIndustry(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Industry created successfully" })
          dispatch(getAllMainIndustry())
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
        <MainHeading data={`Industry`} />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add industry
        </Button>
      </div>

      <div className="table-responsive">
        <CommonTable data={allMainIndustry} columns={columns} scroll={{ y: 600 }} />
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
            label="Industry type "
            name="name"
            rules={[
              {
                required: true,
                message: "please give industry name ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select industry"
            name="subIndustryId"
            rules={[
              {
                required: true,
                message: "please select sub industry",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              maxTagCount='responsive'
              mode="multiple"
              options={
                allSubIndustry?.length > 0
                  ? allSubIndustry?.map((item) => ({
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

export default Industries

