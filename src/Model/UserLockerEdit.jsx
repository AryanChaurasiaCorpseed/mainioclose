import { Button, Form, InputNumber, Modal, notification } from "antd"
import React, { useCallback, useState } from "react"
import { Icon } from "@iconify/react"
import { useDispatch, useSelector } from "react-redux"
import { editUserLockerCount, getAllUsers } from "../Toolkit/Slices/UsersSlice"

const UserLockerEdit = ({ data }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state.auth?.currentUser?.id)

  const [openModal, setOpenModal] = useState(false)
  const editFormValues = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({
      count: data?.lockerSize,
    })
  }, [data, form])

  const handleSubmit = useCallback(
    async (values) => {
      values.id = currentUserId
      values.userId = data?.id
      try {
        await dispatch(editUserLockerCount(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Locker count updated successfully",
              })
              setOpenModal(false)
              dispatch(getAllUsers())
            } else {
              notification.error({ message: "Something went wrong !." })
            }
          })
          .catch(() => {
            notification.error({ message: "Something went wrong !." })
          })
      } catch (error) {
        notification.error({message:"Something went wrong !."})
      }
    },
    [data, currentUserId, dispatch]
  )

  return (
    <>
      <Button size="small" type="text" onClick={editFormValues}>
        <Icon icon="fluent:edit-20-regular" className="edit-iconify" />
      </Button>
      <Modal
        title="Edit Locker Count"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Locker count" name="count">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserLockerEdit
