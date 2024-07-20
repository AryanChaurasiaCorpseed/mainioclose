import { Button, Form, Input, Modal } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import CommonTable from "../../../components/CommonTable"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  createDesigination,
  getAllDesiginations,
} from "../../../Toolkit/Slices/SettingSlice"

const Desigination = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const desiginationList = useSelector(
    (state) => state.setting.desiginationList
  )
  const [openModal, setOpenModal] = useState()

  const handleFinish = useCallback(
    (values) => {
      dispatch(createDesigination(values))
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(getAllDesiginations())
  }, [dispatch])
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Desigination",
      dataIndex: "name",
    },
  ]
  return (
    <div>
      <MainHeading data={`Desigination`} />
      <div className="lead-box">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add desigination
        </Button>
      </div>
      <div className="mt-4 setting-table">
        <div className="table-responsive">
          <CommonTable
            data={desiginationList}
            columns={columns}
            scroll={{ y: 550 }}
          />
        </div>
      </div>
      <Modal
        title={"Create desigination"}
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

export default Desigination
