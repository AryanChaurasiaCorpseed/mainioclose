import React, { useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import { Button, Form, Input, Modal, Popconfirm } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  createComments,
  deleteComments,
  getAllComments,
  updateComments,
} from "../../../Toolkit/Slices/UserRatingSlice"
import CommonTable from "../../../components/CommonTable"
import { Icon } from "@iconify/react"

const Comments = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const allComments = useSelector((state) => state.rating.allComments)
  const [openModal, setOpenModal] = useState(false)
  const [commentData, setCommentData] = useState("")
  useEffect(() => {
    dispatch(getAllComments())
  }, [dispatch])
  const handleFinish = (values) => {
    if (commentData !== "") {
      values.id = commentData?.id
      dispatch(updateComments(values)).then(() => window.location.reload())
    } else {
      dispatch(createComments(values)).then(() => window.location.reload())
    }
  }
  const editComments = (value) => {
    setCommentData(value)
    form.setFieldsValue({ comment: value.name })
    setOpenModal(true)
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
    {
      title: "Edit",
      dataIndex: "delete",
      render: (_, data) => (
        <Button size="small" type="text" onClick={() => editComments(data)}>
          <Icon icon="fluent:edit-20-regular" />
        </Button>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, data) => (
        <Popconfirm
          title="Delete the comment"
          description="Are you sure to delete this comment?"
          okText="Yes"
          cancelText="No"
          onConfirm={() =>
            dispatch(deleteComments(data?.id)).then(() =>
              window.location.reload()
            )
          }
        >
          <Button size="small" type="text" danger>
            <Icon icon="fluent:delete-20-regular" />
          </Button>
        </Popconfirm>
      ),
    },
  ]
  return (
    <div>
      <MainHeading data={`Comments`} />
      <div className="lead-box">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add comment
        </Button>
      </div>
      <div className="mt-4 setting-table">
        <div className="table-responsive">
          <CommonTable data={allComments} columns={columns} scroll={{y:500}} />
        </div>
      </div>
      <Modal
        title={commentData ? "Edit comment" : "Write comment"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Comment "
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
