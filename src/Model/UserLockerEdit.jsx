import { Button, Form, InputNumber, Modal, message } from "antd"
import React, { useCallback, useState } from "react"
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux";
import { editUserLockerCount, getAllUsers } from "../Toolkit/Slices/UsersSlice";

const UserLockerEdit = ({data}) => {
  const [form] = Form.useForm()
  const dispatch =useDispatch()
  const currentUserId=useSelector((state)=>state.auth?.currentUser?.id)

  const [openModal, setOpenModal] = useState(false)
  const editFormValues = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({
     count:data?.lockerSize
    })
  }, [data])

  const handleSubmit = useCallback(
    async (values) => {
        values.id=currentUserId 
        values.userId=data?.id
        try {
            const response = await dispatch(editUserLockerCount(values)).unwrap() 
            message.success("Count edited successfully!")
            setOpenModal(false)
            dispatch(getAllUsers())
          } catch (error) {
            message.error("Failed to edit the Count. Please try again.")
            setOpenModal(false)
          }
    },
    [data,currentUserId]
  )

  console.log("kdsjhjfghsj", data)

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
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Locker count" name='count' >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default UserLockerEdit
