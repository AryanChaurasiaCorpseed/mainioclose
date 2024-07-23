import React, { useCallback, useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button, Form, Input, Modal, notification, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  addNewUser,
  createLeadUserbyEmail,
  getAllUsers,
  updateLeadUserData,
  updateUserData,
} from "../Toolkit/Slices/UsersSlice"
import { Icon } from "@iconify/react"
toast.configure()

const CreateuserDashboard = ({ data, type, modalText, edit }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const leadUsers = useSelector((state) => state.user.leadUserList)
  const departmentList = useSelector((state) => state?.setting?.allDepartment)
  const desiginationList = useSelector(
    (state) => state.setting.desiginationList
  )
  const allRoles = useSelector((state) => state.user.allRoles)

  const editUserDetails = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({
      userName: data?.fullName,
      email: data?.email,
      designationId: data?.userDesignation?.id,
      departmentId: data?.userDepartment?.id,
      role: data?.role,
    })
  }, [data, form])

  const handleSubmitUser = useCallback(
    (values) => {
      if (edit) {
        values.id = data?.id
        dispatch(updateUserData(values)).then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            dispatch(updateLeadUserData(values)).then((res) => {
              if (res.meta.requestStatus === "fulfilled") {
                notification.success({ message: "User updated successfully" })
                setOpenModal(false)
                dispatch(getAllUsers())
              } else if (res.meta.requestStatus === "rejected") {
                notification.error({ message: "Something went wrong" })
                setOpenModal(false)
              }
            })
          }
        })
      } else {
        dispatch(addNewUser(values)).then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            const temp = resp?.payload?.data?.data
            const obj = {
              id: temp.userId,
              email: temp.email,
              designationId: temp.designation?.id,
              role: temp.role?.map((ele) => ele?.name),
              departmentId: temp.department?.id,
              userName: temp.name,
            }
            dispatch(createLeadUserbyEmail(obj)).then((info) => {
              if (info.meta.requestStatus === "fulfilled") {
                notification.success({ message: "User created successfully" })
                setOpenModal(false)
                dispatch(getAllUsers())
              } else if (info.meta.requestStatus === "rejected") {
                notification.error({ message: "Something went wrong" })
                setOpenModal(false)
              }
            })
          }
        })
      }
    },
    [dispatch, data, edit]
  )

  console.log(leadUsers, "dskghfsadgfjds")

  return (
    <>
      {modalText === "Create user" ? (
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Create user
        </Button>
      ) : (
        <Button type="text" size="small" onClick={() => editUserDetails()}>
          <Icon icon="fluent:edit-20-regular" />
        </Button>
      )}

      <Modal
        title={modalText}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmitUser}>
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: "please enter username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "please enter valid email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: "please select role",
              },
            ]}
          >
            <Select
              mode="multiple"
              showSearch
              allowClear
              options={
                allRoles?.map((ele) => ({
                  label: ele?.name,
                  value: ele?.name,
                })) || []
              }
            />
          </Form.Item>
          <Form.Item
            label="Desigination"
            name="designationId"
            rules={[
              {
                required: true,
                message: "please select desigination",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              options={
                desiginationList?.map((ele) => ({
                  label: ele?.name,
                  value: ele?.id,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            label="Department"
            name="departmentId"
            rules={[
              {
                required: true,
                message: "please select department",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              options={
                departmentList?.length > 0
                  ? departmentList?.map((ele) => ({
                      label: ele?.name,
                      value: ele?.id,
                    }))
                  : []
              }
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

export default CreateuserDashboard
