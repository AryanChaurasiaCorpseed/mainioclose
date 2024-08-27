import React, { useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import { Button, Form, Input, Modal, notification, Popconfirm } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  createComments,
  deleteComments,
  getAllComments,
  updateComments,
} from "../../../Toolkit/Slices/UserRatingSlice"
import CommonTable from "../../../components/CommonTable"
import { Icon } from "@iconify/react"
import OverFlowText from "../../../components/OverFlowText"

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
      dispatch(updateComments(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Comment updated successfully",
            })
            dispatch(getAllComments())
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch((err) => {
          notification.error({ message: "Something went wrong !." })
        })
    } else {
      dispatch(createComments(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Comment added successfully",
            })
            dispatch(getAllComments())
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch((err) => {
          notification.error({ message: "Something went wrong !." })
        })
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
      width: 60,
    },
    {
      title: "Comment",
      dataIndex: "name",
      render: (_, info) => <OverFlowText>{info?.name}</OverFlowText>,
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
            dispatch(deleteComments(data?.id))
              .then((resp) => {
                if (resp.meta.requestStatus === "fulfilled") {
                  notification.success({
                    message: "Comment deleted successfully",
                  })
                  dispatch(getAllComments())
                } else {
                  notification.error({ message: "Something went wrong !." })
                }
              })
              .catch((err) => {
                notification.error({ message: "Something went wrong !." })
              })
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
      <div className="create-user-box">
        <MainHeading data={`Comments`} />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add comment
        </Button>
      </div>
      <div className="setting-table">
        <div className="table-responsive">
          <CommonTable
            data={allComments}
            columns={columns}
            scroll={{ y: 500 }}
          />
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
