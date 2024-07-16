import React, { useRef, useState } from "react"
import "./LeadStatusPage.scss"
import { useCustomRoute } from "../../../Routes/GetCustomRoutes"
import SmallTableScalaton from "../../../components/Scalaton/SmallTableScalaton"
import InputErrorComponent from "../../../components/InputErrorComponent"
import { postQuery } from "../../../API/PostQuery"
import { deleteQuery } from "../../../API/DeleteQuery"
import MainHeading from "../../../components/design/MainHeading"
import EditStatus from "./EditStatus"
import { Button, Form, Input, Modal } from "antd"
import { useDispatch } from "react-redux"
import { createLead } from "../../../Toolkit/Slices/LeadSlice"
import CommonTable from "../../../components/CommonTable"
import { Icon } from "@iconify/react"

const LeadStatusPage = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [leadCreateDep, setLeadCreateDep] = useState(false)
  const [deleteStatusDep, setDeleteStatusDep] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const statusUrl = `/leadService/api/v1/status/getAllStatus`
  const statusDep = [leadCreateDep, deleteStatusDep]

  const { productData: statusData, loading: statusLoading } = useCustomRoute(
    statusUrl,
    statusDep
  )

  const deleteStatusFun = async (statusId) => {
    if (window.confirm("Are you sure to delete this record?") == true) {
      try {
        const leadStatusDel = await deleteQuery(
          `/leadService/api/v1/status/deleteStaus?id=${statusId}`
        )
        setDeleteStatusDep((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleFinish = (values) => {
    dispatch(createLead(values)).then(() => window.location.reload())
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
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (_, info) => <EditStatus data={info} />,
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, info) => (
        <Button size="small" onClick={() => deleteStatusFun(info.id)}>
          <Icon icon="fluent:delete-20-filled" />
        </Button>
      ),
    },
  ]

  return (
    <div>
      <MainHeading data={`Lead Status`} />
      <div className="lead-box">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add lead
        </Button>
      </div>

      <div className="mt-4 setting-table">
        <div className="table-responsive">
          {statusLoading ? (
            <SmallTableScalaton />
          ) : (
            <CommonTable
              data={statusData}
              columns={columns}
              scroll={{ y: 480 }}
            />
          )}
        </div>
      </div>

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Enter lead name"
            name="name"
            rules={[{ required: true, message: "please enter the lead name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Enter lead description"
            name="description"
            rules={[{ required: true, message: "please enter the desciption" }]}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default LeadStatusPage
