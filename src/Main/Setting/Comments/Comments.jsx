import React, { useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import { Button, Form, Input, Modal } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  createComments,
  getAllComments,
} from "../../../Toolkit/Slices/UserRatingSlice"
import CommonTable from "../../../components/CommonTable"

const Comments = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const allComments = useSelector((state) => state.rating.allComments)
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    dispatch(getAllComments())
  }, [dispatch])
  const handleFinish = (values) => {
    dispatch(createComments(values)).then(() => window.location.reload())
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Comment",
      dataIndex: "name",
    },
  ]
  return (
    <div>
      <MainHeading data={`Comments`} />
      <div className="lead-box">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add comments
        </Button>
      </div>
      <div className="mt-4 setting-table">
        <div className="table-responsive">
          <CommonTable data={allComments} columns={columns} />
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
            label="Write comment "
            name="comment"
            rules={[
              {
                required: true,
                message: "please write the something to comment ",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Comments
