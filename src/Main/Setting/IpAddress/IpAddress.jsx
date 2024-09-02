import React, { useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import { Button, Form, Input, Modal, notification } from "antd"
import CommonTable from "../../../components/CommonTable"
import { useDispatch, useSelector } from "react-redux"
import {
  addIpAddress,
  getAllIpAddress,
} from "../../../Toolkit/Slices/SettingSlice"

const IpAddress = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const allIpAddress = useSelector((state) => state.setting.allIpAddress)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    dispatch(getAllIpAddress())
  }, [dispatch])

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "ipAddress",
      title: "Ip address",
    },
  ]

  const handleSubmit = (values) => {
    dispatch(addIpAddress(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Ip address added successfully." })
          dispatch(getAllIpAddress())
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

  return (
    <div>
      <div className="create-user-box">
        <MainHeading data={`Ip address`} />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add ip address
        </Button>
      </div>
      <CommonTable columns={columns} data={allIpAddress} scroll={{ y: 580 }} />
      <Modal
        title="Add ip address"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Ip address"
            name="ipaddress"
            rules={[{ required: true, message: "please enter slug name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default IpAddress
