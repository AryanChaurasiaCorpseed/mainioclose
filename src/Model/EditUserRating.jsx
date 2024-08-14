import { Button, Form, Modal, Select, notification } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import { useDispatch, useSelector } from "react-redux"
import {
  editUserRatingAssignee,
  getAllUsers,
} from "../Toolkit/Slices/UsersSlice"
import { useParams } from "react-router-dom"
import { allRatingUsers } from "../Toolkit/Slices/RatingSlice"

export const EditUserRating = ({ data }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { serviceid } = useParams()
  const allUsers = useSelector((state) => state.user.allUsers)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const handleEdit = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({
      ratingsUser: data?.user?.map((itm) => itm?.id),
      rating: data?.rating,
    })
  }, [data, form])

  const handleFinish = useCallback(
    (values) => {
      values.ratingId = data.id
      values.urlsManagmentId = serviceid
      dispatch(editUserRatingAssignee(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Assignee is updated successfully",
            })
            dispatch(allRatingUsers({ id: serviceid }))
            setOpenModal(false)
          } else {
            notification.error({ message: "Something went wrong !" })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !" })
        })
    },
    [data, serviceid, dispatch]
  )

  return (
    <>
      <Button size="small" type="text" onClick={handleEdit}>
        <Icon icon="fluent:edit-20-regular" />
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
              { required: true, message: "please select the assignee name" },
            ]}
          >
            <Select
              showSearch
              allowClear
              mode="multiple"
              options={
                allUsers?.map((item) => ({
                  value: item.id,
                  label: item?.fullName,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "please select rating" }]}
          >
            <Select
              showSearch
              allowClear
              options={[
                {
                  label: "1",
                  value: 1,
                },
                {
                  label: "2",
                  value: 2,
                },
                {
                  label: "3",
                  value: 3,
                },
                {
                  label: "4",
                  value: 4,
                },
                {
                  label: "5",
                  value: 5,
                },
              ]}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
