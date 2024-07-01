import { Button, Form, Modal, Select, notification } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { useDispatch, useSelector } from "react-redux"
import {
  editUserRatingAssignee,
  getAllUsers,
} from "../Toolkit/Slices/UsersSlice"
import { useParams } from "react-router-dom"

export const EditUserRating = ({ data }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { serviceid } = useParams()
  const allUsers = useSelector((state) => state.user.allUsers)
  const assigneeLoading = useSelector((state) => state.user.assigneeLoading)
  const [openModal, setOpenModal] = useState(false)
  console.log("sdldshfdsj", allUsers)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])
  const handleEdit = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({ ratingsUser: data?.user?.map((itm) => itm?.id) })
  }, [data, form])
  const handleFinish = useCallback(
    (values) => {
      values.ratingId = data.id
      values.urlsManagmentId = serviceid
      values.rating = data?.rating
      console.log("sdjkcsdjkhg8", values)
      dispatch(editUserRatingAssignee(values))
    },
    [data, serviceid, dispatch]
  )

  useEffect(() => {
    if (assigneeLoading === "success") {
      notification.success({ message: "Assignee is updated successfully" })
    } else if (assigneeLoading === "rejected") {
      notification.error({ message: "Something went wrong !" })
    }
  }, [assigneeLoading])

  return (
    <>
      <Button size="small" onClick={handleEdit}>
        <Icon icon="fluent:edit-20-filled" />
      </Button>
      <Modal
        title="Edit user"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Assignee Name"
            name="ratingsUser"
            rules={[
              { required: true, message: "please enter the assignee name" },
            ]}
          >
            <Select
              showSearch
              mode="multiple"
              options={
                allUsers?.map((item) => ({
                  value: item.id,
                  label: item?.fullName,
                })) || []
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
