import React, { useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import { Button, Form, Input, Modal, notification } from "antd"
import CommonTable from "../../../components/CommonTable"
import { useDispatch, useSelector } from "react-redux"
import {
  createDepartment,
  getAllDepartment,
} from "../../../Toolkit/Slices/SettingSlice"
import { createAuthDepartment } from "../../../Toolkit/Slices/AuthSlice"

const Department = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const departmentList = useSelector((state) => state.setting.allDepartment)
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    dispatch(getAllDepartment())
  }, [])
  const handleFinish = (values) => {
    dispatch(createAuthDepartment(values)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        const temp = resp?.payload?.data
        dispatch(createDepartment({ name: temp?.name })).then((info) => {
          if (info.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Department created successfully",
            })
            setOpenModal(false)
            dispatch(getAllDepartment())
          } else if (info.meta.requestStatus === "rejected") {
            notification.error({
              message: "Something went wrong",
            })
            setOpenModal(false)
          }
        })
      }
    })
  }
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Department",
      dataIndex: "name",
    },
  ]
  return (
    <div>
      <MainHeading data={`Department`} />
      <div className="lead-box">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add department
        </Button>
      </div>
      <div className="mt-4 setting-table">
        <div className="table-responsive">
          <CommonTable
            data={departmentList?.length > 0 ? departmentList : []}
            columns={columns}
            scroll={{ y: 550 }}
          />
        </div>
      </div>
      <Modal
        title={"Create department"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Name "
            name="name"
            rules={[
              {
                required: true,
                message: "please write the something to comment ",
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

export default Department
