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

const LeadStatusPage = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const [nameError, setNameError] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [leadCreateDep, setLeadCreateDep] = useState(false)
  const [deleteStatusDep, setDeleteStatusDep] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const nameRef = useRef()
  const descriptionRef = useRef()

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
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {statusLoading ? (
                <SmallTableScalaton />
              ) : (
                statusData.map((status, index) => (
                  <tr key={index}>
                    <th>{status.id}</th>
                    <td>{status.name}</td>
                    <td>{status.description}</td>
                    <td>
                      <EditStatus data={status} />
                    </td>
                    <td>
                      <i
                        onClick={() => deleteStatusFun(status.id)}
                        className="fa-solid gray-cl fa-trash"
                      ></i>{" "}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
