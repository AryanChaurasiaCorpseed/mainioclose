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
import { getDesiginationById } from "../Toolkit/Slices/CommonSlice"
toast.configure()

const CreateuserDashboard = ({ data, modalText, edit }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState("")
  const departmentList = useSelector((state) => state?.setting?.allDepartment)
  const desiginationList = useSelector(
    (state) => state.common.desiginationListById
  )

  const allRoles = useSelector((state) => state.user.allRoles)

  const editUserDetails = useCallback(() => {
    setOpenModal(true)
    if (data?.userDepartment?.id) {
      dispatch(getDesiginationById(data?.userDepartment?.id))
    }
    form.setFieldsValue({
      userName: data?.fullName,
      email: data?.email,
      designationId: data?.userDesignation?.id,
      departmentId: data?.userDepartment?.id,
      role: data?.role,
    })
  }, [data, form,dispatch])

  const handleSubmitUser = useCallback(
    (values) => {
      if (edit) {
        setLoading("pending")
        values.id = data?.id
        dispatch(updateUserData(values))
          .then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
              dispatch(updateLeadUserData(values))
                .then((res) => {
                  if (res.meta.requestStatus === "fulfilled") {
                    notification.success({
                      message: "User updated successfully",
                    })
                    setLoading("success")
                    setOpenModal(false)
                    dispatch(getAllUsers())
                  } else if (res.meta.requestStatus === "rejected") {
                    setLoading("rejected")
                    notification.error({ message: "Something went wrong" })
                    setOpenModal(false)
                    form.resetFields()
                  }
                })
                .catch(() => {
                  setLoading("rejected")
                  notification.error({ message: "Something went wrong" })
                  setOpenModal(false)
                  form.resetFields()
                })
            } else if (response.meta.requestStatus === "rejected") {
              setLoading("rejected")
              notification.error({ message: "Something went wrong" })
              setOpenModal(false)
              form.resetFields()
            }
          })
          .catch(() => {
            setLoading("rejected")
            notification.error({ message: "Something went wrong" })
            setOpenModal(false)
            form.resetFields()
          })
      } else {
        setLoading("pending")
        dispatch(addNewUser(values))
          .then((resp) => {
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
              dispatch(createLeadUserbyEmail(obj))
                .then((info) => {
                  if (info.meta.requestStatus === "fulfilled") {
                    notification.success({
                      message: "User created successfully",
                    })
                    setLoading("success")
                    setOpenModal(false)
                    dispatch(getAllUsers())
                  } else if (info.meta.requestStatus === "rejected") {
                    notification.error({ message: "Something went wrong" })
                    setLoading("rejected")
                    setOpenModal(false)
                    form.resetFields()
                  }
                })
                .catch(() => {
                  notification.error({ message: "Something went wrong" })
                  setLoading("rejected")
                  setOpenModal(false)
                  form.resetFields()
                })
            } else if (resp.meta.requestStatus === "rejected") {
              notification.error({ message: "Something went wrong" })
              setLoading("rejected")
              setOpenModal(false)
              form.resetFields()
            }
          })
          .catch(() => {
            notification.error({ message: "Something went wrong" })
            setLoading("rejected")
            setOpenModal(false)
            form.resetFields()
          })
      }
    },
    [dispatch, data, edit,form]
  )

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
        okButtonProps={{ loading: loading === "pending" ? true : false }}
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
              onChange={(e) => {
                if (e !== undefined) {
                  dispatch(getDesiginationById(e))
                }
              }}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
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
                desiginationList?.length > 0
                  ? desiginationList?.map((ele) => ({
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
