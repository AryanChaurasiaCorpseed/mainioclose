import React, { useEffect, useState } from "react"
import CommonTable from "../../../components/CommonTable"
import { Button, Form, Input, Modal, notification } from "antd"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  createIndustry,
  getAllIndustry,
} from "../../../Toolkit/Slices/IndustrySlice"

const IndustryData = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const allIndustry = useSelector((state) => state.industry.allIndustry)

  useEffect(() => {
    dispatch(getAllIndustry())
  }, [dispatch])

  const handleFinish = (values) => {
    dispatch(createIndustry(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Industry created successfully" })
          dispatch(getAllIndustry())
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
          Add industry data
        </Button>
      </div>

      <div className="table-responsive">
        <CommonTable data={allIndustry} columns={columns} scroll={{ y: 600 }} />
      </div>
      <Modal
        title={"Add industry data"}
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
        </Form>
      </Modal>
    </div>
  )
}

export default IndustryData
