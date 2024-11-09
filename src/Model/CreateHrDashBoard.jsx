import React, { useCallback, useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  DatePicker,
  notification,
} from "antd"
import { Icon } from "@iconify/react"
import {
  addNewUser,
  createdLeadByHr,
  getAllUsers,
  updateLeadByHr,
  updateUserData,
} from "../Toolkit/Slices/UsersSlice"
import dayjs from "dayjs"
import {
  emailChecker,
  getDesiginationById,
  getManagerById,
} from "../Toolkit/Slices/CommonSlice"
toast.configure()

const CreateHrDashBoard = ({ data, edit, modalTitle }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState("")
  const departmentList = useSelector((state) => state?.setting?.allDepartment)
  const allRoles = useSelector((state) => state.user.allRoles)
  const allDesiginationListById = useSelector(
    (state) => state.common.desiginationListById
  )
  const managerListById = useSelector((state) => state.common.managerListById)

  const validateUsername = (_, value) => {
    const usernamePattern = /^[a-zA-Z\s]+$/
    if (!value) {
      return Promise.reject(new Error("Please enter the username"))
    } else if (!usernamePattern.test(value)) {
      return Promise.reject(
        new Error("Username should contain only alphabets and spaces")
      )
    }
    return Promise.resolve()
  }

  const validateAadharNumber = (_, value) => {
    const aadharPattern = /^[0-9]+$/
    if (!value) {
      return Promise.reject(new Error("Please enter aadhar number"))
    } else if (!aadharPattern.test(value)) {
      return Promise.reject(
        new Error("Aadhar number should contain only numbers")
      )
    }
    return Promise.resolve()
  }

  const validateEmail = (dispatch) => async (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Please enter the email"))
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(value)) {
      return Promise.reject(new Error("Please enter a valid email"))
    }

    try {
      const resp = await dispatch(emailChecker(value))
      if (resp.meta.requestStatus === "fulfilled") {
        const temp = resp?.payload?.data
        if (temp) {
          return Promise.reject(new Error("Email already exists"))
        } else {
          return Promise.resolve()
        }
      } else {
        return Promise.reject(new Error("Error validating email"))
      }
    } catch (error) {
      return Promise.reject(new Error("Error validating email"))
    }
  }

  const handleEdit = useCallback(() => {
    setOpenModal(true)
    dispatch(getDesiginationById(data?.userDepartment?.id))
    dispatch(getManagerById(data?.userDepartment?.id))
    form.setFieldsValue({
      userName: data?.fullName,
      email: data.email,
      designationId: data?.userDesignation?.id,
      departmentId: data?.userDepartment?.id,
      role: data?.role,
      epfNo: data?.epfNo,
      aadharCard: data?.aadharCard,
      managerId: data?.managerId,
      expInMonth: data?.expInMonth,
      expInYear: data?.expInYear,
      dateOfJoining:
        data?.dateOfJoining === null ? dayjs() : dayjs(data?.dateOfJoining),
      type: data?.type,
      fatherName: data?.fatherName,
      fatherOccupation: data?.a?.fatherOccupation,
      fatherContactNo: data?.fatherContactNo,
      motherName: data?.motherName,
      motherOccupation: data?.motherOccupation,
      motherContactNo: data?.motherContactNo,
      spouseName: data?.spouseName,
      spouseContactNo: data?.spouseContactNo,
      nationality: data?.nationality,
      language: data?.language,
      emergencyNumber: data?.emergencyNumber,
      panNumber: data?.panNumber,
      permanentAddress: data?.permanentAddress,
      residentialAddress: data?.residentialAddress,
      manager: true,
      backupTeam: data?.backupTeam,
      master: data?.master,
      maritalStatus: data?.maritalStatus,
      personalEmail: data?.personalEmail,
      companyMobile: data?.companyMobile,
      lockerSize: data?.lockerSize,
      contactNo: data?.contactNo,
    })
  }, [data, form, dispatch])

  const handleSubmitUser = useCallback(
    (values) => {
      values.dateOfJoining = dayjs(values?.dateOfJoining).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      )
      if (edit) {
        setLoading("pending")
        values.id = data?.id
        let tempObj = {
          id: data?.id,
          userName: values?.userName,
          email: values?.email,
          designationId: values?.designationId,
          departmentId: values?.departmentId,
          role: values?.role,
        }
        dispatch(updateUserData(tempObj))
          .then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
              dispatch(updateLeadByHr(values))
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
                    notification.error({ message: "Something went wrong !." })
                    setOpenModal(false)
                    form.resetFields()
                  }
                })
                .catch(() => {
                  setLoading("rejected")
                  notification.error({ message: "Something went wrong !." })
                  setOpenModal(false)
                  form.resetFields()
                })
            } else if (response.meta.requestStatus === "rejected") {
              setLoading("rejected")
              notification.error({ message: "Something went wrong !." })
              setOpenModal(false)
              form.resetFields()
            }
          })
          .catch(() => {
            setLoading("rejected")
            notification.error({ message: "Something went wrong !." })
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
                ...values,
              }
              dispatch(createdLeadByHr(obj))
                .then((info) => {
                  if (info.meta.requestStatus === "fulfilled") {
                    notification.success({
                      message: "User created successfully .",
                    })
                    setLoading("success")
                    setOpenModal(false)
                    dispatch(getAllUsers())
                  } else if (info.meta.requestStatus === "rejected") {
                    notification.error({ message: "Something went wrong !." })
                    setLoading("rejected")
                    setOpenModal(false)
                    form.resetFields()
                  }
                })
                .catch(() => {
                  notification.error({ message: "Something went wrong !." })
                  setLoading("rejected")
                  setOpenModal(false)
                  form.resetFields()
                })
            } else if (resp.meta.requestStatus === "rejected") {
              notification.error({ message: "Something went wrong !." })
              setLoading("rejected")
              setOpenModal(false)
              form.resetFields()
            }
          })
          .catch(() => {
            notification.error({ message: "Something went wrong !." })
            setLoading("rejected")
            setOpenModal(false)
            form.resetFields()
          })
      }
    },
    [dispatch, data, edit, form]
  )

  return (
    <>
      {modalTitle === "Create user" ? (
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Create user
        </Button>
      ) : (
        <Button type="text" size="small" onClick={handleEdit}>
          <Icon icon="fluent:edit-20-regular" />
        </Button>
      )}

      <Modal
        title={modalTitle}
        open={openModal}
        width={1000}
        centered
        onCancel={() => {
          form.resetFields()
          setOpenModal(false)
        }}
        onClose={() => {
          form.resetFields()
          setOpenModal(false)
        }}
        okText="Submit"
        onOk={() => form.submit()}
        okButtonProps={{ loading: loading === "pending" ? true : false }}
      >
        <Form
          layout="vertical"
          form={form}
          scrollToFirstError
          onFinish={handleSubmitUser}
          style={{ maxHeight: "80vh", overflow: "auto" }}
        >
          <Row>
            <Col span={11}>
              <Form.Item
                label="Username"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                  {
                    validator: validateUsername,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "",
                  },
                  {
                    validator: !edit && validateEmail(dispatch),
                  },
                ]}
              >
                <Input disabled={edit} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item label="Personal email" name="personalEmail">
                <Input />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item
                label="Contact number"
                name="contactNo"
                rules={[
                  { required: true, message: "please enter your number" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item label="Company mobile number" name="companyMobile">
                <Input />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                    message: "please select the role",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  maxTagCount="responsive"
                  showSearch
                  allowClear
                  options={
                    allRoles?.length > 0
                      ? allRoles?.map((ele) => ({
                          label: ele?.name,
                          value: ele?.name,
                        }))
                      : []
                  }
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Department"
                name="departmentId"
                rules={[
                  {
                    required: true,
                    message: "please select the designation",
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
                    dispatch(getDesiginationById(e))
                    dispatch(getManagerById(e))
                  }}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item
                label="Desigination"
                name="designationId"
                rules={[
                  {
                    required: true,
                    message: "please select the designation",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  options={
                    allDesiginationListById?.length > 0
                      ? allDesiginationListById?.map((ele) => ({
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
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item label="EPFO number" name="epfNo">
                <Input />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item
                label="Aadhar card no."
                name="aadharCard"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                  {
                    validator: validateAadharNumber,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item label="Manager name" name="managerId">
                <Select
                  showSearch
                  allowClear
                  options={
                    managerListById?.length > 0
                      ? managerListById?.map((item) => ({
                          label: item?.fullName,
                          value: item?.id,
                        }))
                      : []
                  }
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item label="Locker size" name="lockerSize">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label={`Experience (in year)`}
                name="expInYear"
                rules={[
                  {
                    required: true,
                    message: "please enter experience in year",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item
                label={`Experience (in months)`}
                name="expInMonth"
                rules={[
                  {
                    required: true,
                    message: "please enter experience in months",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Date of joining"
                name="dateOfJoining"
                rules={[{ required: true, message: "please select the date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item
                label="Gender"
                name="type"
                rules={[{ required: true, message: "please select gender" }]}
              >
                <Select
                  showSearch
                  allowClear
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Others", value: "others" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.maritalStatus !== currentValues.maritalStatus
            }
            noStyle
          >
            {({ getFieldValue }) => (
              <>
                {getFieldValue("maritalStatus") === "Married" ? (
                  <Row>
                    <Col span={11}>
                      <Form.Item label="Spouse name" name="spouseName">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={1} />
                    <Col span={11}>
                      <Form.Item
                        label="Spouse contact number"
                        name="spouseContactNo"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
              </>
            )}
          </Form.Item>

          <Row>
            <Col span={11}>
              <Form.Item
                label="Marital status"
                name="maritalStatus"
                rules={[
                  { required: true, message: "please select marital status" },
                ]}
              >
                <Select
                  allowClear
                  showSearch
                  options={[
                    { label: "Married", value: "Married" },
                    { label: "Unmarried", value: "Unmarried" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item
                label="Father's name"
                name="fatherName"
                rules={[
                  { required: true, message: "please enter father's name " },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item label="Father's occupation" name="fatherOccupation">
                <Input />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item label="Father's contact no." name="fatherContactNo">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item
                label="Mother's name"
                name="motherName"
                rules={[
                  { required: true, message: "please enter mother's name" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item label="Mother's contact no." name="motherContactNo">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={11}>
              <Form.Item label="Nationality" name="nationality">
                <Input />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item label="Language" name="language">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {edit && (
            <Row>
              <Col span={11}>
                <Form.Item
                  label="Master"
                  name="master"
                  rules={[{ required: true, message: "please select master" }]}
                >
                  <Select
                    options={[
                      { label: "True", value: true },
                      { label: "False", value: false },
                    ]}
                    showSearch
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={1} />
              <Col span={11}>
                <Form.Item
                  label="Backup team"
                  name="backupTeam"
                  rules={[
                    { required: true, message: "please select backup team" },
                  ]}
                >
                  <Select
                    options={[
                      { label: "True", value: true },
                      { label: "False", value: false },
                    ]}
                    showSearch
                    allowClear
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
          <Row>
            <Col span={11}>
              <Form.Item label="Emergency contact no." name="emergencyNumber">
                <Input />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}>
              <Form.Item
                label="Permanent address"
                name="permanentAddress"
                rules={[
                  {
                    required: true,
                    message: "please enter your permanent address",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item label="Residential address" name="residentialAddress">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={1} />
            <Col span={11}></Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default CreateHrDashBoard
