import React, { useCallback, useRef, useState } from "react"
import { postQuery } from "../API/PostQuery"
import { useCustomRoute } from "../Routes/GetCustomRoutes"
import { useEffect } from "react"
import { getQuery } from "../API/GetQuery"
import InputErrorComponent from "../components/InputErrorComponent"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { userDepartment } from "../data/FakeData"
import { Link } from "react-router-dom"
import { putQuery } from "../API/PutQuery"
import { Button, Form, Input, message, Modal, notification, Select } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  addNewUser,
  createLeadUserbyEmail,
  getAllUsers,
  updateLeadUserData,
  updateUserData,
} from "../Toolkit/Slices/UsersSlice"
import { Icon } from "@iconify/react"
import {
  getAllDepartment,
  getAllDesiginations,
} from "../Toolkit/Slices/SettingSlice"
toast.configure()

const CreateuserDashboard = ({ data, type, modalText, edit }) => {
  // /securityService/api/auth/createNewUserByEmail
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const leadUsers = useSelector((state) => state.user.leadUserList)
  const [roleGetRole, setRoleGetRole] = useState([])
  const [userRowData, setUserRowData] = useState({
    userName: "",
    email: "",
    role: [],
    designation: "",
    department: "",
  })

  useEffect(() => {
    userRowDataFetch()
  }, [])

  const [btnLoading, setBtnLoading] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [roleError, setRoleError] = useState(false)
  const [editUserLoading, setEditUserLoading] = useState(false)

  const nameRef = useRef()
  const emailRef = useRef()
  const roleRef = useRef()
  const designationRef = useRef()

  const GetRoleFun = (e) => {
    setUserRowData((prev) => ({ ...prev, role: [e.target.value] }))
  }

  //   useEffect(()=>{
  //       setUserRowData(()=> ({
  //         userName: data.fullName,
  //         email: "",
  //         role: [],
  //         designation: "",
  //         department: "",
  //       }))
  //  },[type])

  useEffect(() => {
    userRowDataFetch()
  }, [type])

  const userRowDataFetch = (e) => {
    if (type) {
      setUserRowData((prev) => ({ ...prev, ...data }))
      setUserRowData((prev) => ({ ...prev, [e?.target.name]: e?.target.value }))
    } else {
      setUserRowData((prev) => ({ ...prev, [e?.target.name]: e?.target.value }))
    }
  }

  // const editUserData = () =>{
  //   setUserRowData((prev) => ({...prev, ...data}))
  // }

  // useEffect(() => {
  //   getAllRole()
  // }, [])

  // const getAllRole = async () => {
  //   try {
  //     const allRoleResponse = await getQuery(
  //       `/securityService/api/v1/roles/getRole`
  //     )
  //     setAllRoles(allRoleResponse.data)
  //   } catch (err) {
  //     console.log("err", err)
  //   }
  // }

  const createuserData = (e) => {
    e.preventDefault()
    if (nameRef.current.value === "") {
      setNameError(true)
    }
    if (emailRef.current.value === "") {
      setEmailError(true)
    }
    if (roleRef.current.value.length === 0) {
      setRoleError(true)
    }
    if (
      roleRef.current.value === "" ||
      emailRef.current.value === "" ||
      nameRef.current.value === ""
    ) {
      return
    }

    setBtnLoading(true)
    const userCreateFun = async () => {
      try {
        const createNewUserData = await postQuery(
          `/securityService/api/auth/createNewUserByEmail`,
          userRowData
        )

        let roleData = createNewUserData.data.data.role.map((role) => role.name)

        const newLeadObject = {
          id: createNewUserData.data.data.userId,
          email: createNewUserData.data.data.email,
          role: roleData,
          designation: createNewUserData.data.data.designation,
          department: createNewUserData.data.data.department,
          userName: createNewUserData.data.data.name,
        }

        const createLeadUserByEmail = await postQuery(
          `/leadService/api/v1/users/createUserByEmail`,
          newLeadObject
        )
        setBtnLoading(false)
        roleRef.current.value = ""
        emailRef.current.value = ""
        nameRef.current.value = ""
        designationRef.current.value = ""

        toast.success("user craeted Sucessfully")
        window.location.reload()
      } catch (err) {
        console.log(err)
        setBtnLoading(false)
      }
    }
    userCreateFun()
  }

  const editUserData = async (e) => {
    e.preventDefault()
    setEditUserLoading(true)
    // const updateUser = putQuery()
    const upadtedData = {
      id: userRowData.id,
      name: userRowData.fullName,
      email: userRowData.email,
      designation: userRowData.designation,
      roles: userRowData.role,
    }

    const updateLeadData = {
      id: userRowData.id,
      firstName: "",
      lastName: "",
      fullName: userRowData.fullName,
      email: userRowData.email,
      designation: userRowData.designation,
      department: userRowData.department,
      role: userRowData.role,
    }

    try {
      const updateUserData = await putQuery(
        `/securityService/api/auth/updateUserData`,
        upadtedData
      )
      const updateLeadUserData = await putQuery(
        `/leadService/api/v1/users/updateUserData`,
        updateLeadData
      )
      window.location.reload()
      toast.success("User Edit Succesfully")
    } catch (err) {
      console.log(err)
      setEditUserLoading(false)
    }
  }
  const departmentList = useSelector((state) => state.setting.allDepartment)
  const desiginationList = useSelector(
    (state) => state.setting.desiginationList
  )
  const allRoles = useSelector((state) => state.user.allRoles)

  const success = (value) => {
    messageApi.open({
      type: "success",
      content: `user ${value} successfully`,
    })
  }

  const error = () => {
    messageApi.open({
      type: "error",
      content: "something went wrong",
    })
  }

  const editUserDetails = useCallback(() => {
    setOpenModal(true)
    form.setFieldsValue({
      userName: data?.fullName,
      email: data?.email,
      designationId: data?.userDesignation?.id,
      departmentId: data?.userDepartment?.id,
      role: data?.role,
    })
  }, [data])

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
    [leadUsers, dispatch, data]
  )

  console.log(leadUsers, "dskghfsadgfjds")

  return (
    <>
      {/* <nav className="all-center">
        <div className="team-model">
          <button
            type="button"
            className="team-edit-button create-user-btn"
            data-toggle="modal"
            data-target="#createuserdashboard"
          >
            <i className="fa-solid mr-1 fa-circle-plus"></i>
          </button>
          <div
            className="modal fade"
            id="createuserdashboard"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog mod-center modal-dialog-centered"
              role="document"
            >
              <div className="modal-content all-center">
                <div className="add-team-body">
                  <div className="personal-info container">
                    <h4 className="info-text model-heading">
                      {type ? "Edit New user" : "Create New User"}
                    </h4>
                    <div className="cross-icon">
                      <i
                        data-dismiss="modal"
                        className="fa-sharp fa-solid fa-circle-xmark"
                      ></i>
                    </div>
                    <form>
                      <div className="first-form form-row">
                        <div className="form-group col-md-6">
                          <div className="pr-ten">
                            <label
                              className="label-heading mb-1"
                              htmlFor="teamName"
                            >
                              Username*
                            </label>
                            <input
                              type="text"
                              className="form-control input-focus"
                              id="teamName"
                              value={
                                type
                                  ? userRowData.fullName
                                  : userRowData.fullName
                              }
                              ref={nameRef}
                              placeholder="Enter Username"
                              name={type ? "fullName" : "userName"}
                              onChange={userRowDataFetch}
                            />
                          </div>
                          {nameError ? (
                            <InputErrorComponent
                              value={"Name can't be Blank!"}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group col-md-6">
                          <div className="pl-ten">
                            <label
                              className="label-heading mb-1"
                              htmlFor="teamLeadName"
                            >
                              Email*
                            </label>
                            <input
                              type="email"
                              className="form-control input-focus"
                              id="teamLeadName"
                              placeholder="Enter Email"
                              name="email"
                              value={
                                type ? userRowData.email : userRowData.email
                              }
                              ref={emailRef}
                              onChange={(e) => userRowDataFetch(e)}
                            />
                          </div>
                          {emailError ? (
                            <InputErrorComponent
                              value={"Email can't be Blank!"}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group col-md-6">
                          <div className="pr-ten">
                            <label
                              className="label-heading mb-1"
                              htmlFor="mobileNo"
                            >
                              Role*
                            </label>

                            <select
                              className="form-control input-focus"
                              name="role"
                              id="select-product"
                              value={type ? userRowData.role : userRowData.role}
                              ref={roleRef}
                              onChange={(e) => GetRoleFun(e)}
                            >
                              <option>Select Role</option>
                              {allRoles.map((role, index) => (
                                <option key={index} value={role?.name}>
                                  {role?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {roleError ? (
                            <InputErrorComponent
                              value={"Role can't be Blank!"}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group col-md-6">
                          <div className="pr-ten">
                            <label
                              className="label-heading mb-1"
                              htmlFor="mobileNo"
                            >
                              Designation
                            </label>
                            <input
                              type="text"
                              className="form-control input-focus"
                              id="mobileNo"
                              value={
                                type
                                  ? userRowData.designation
                                  : userRowData.designation
                              }
                              ref={designationRef}
                              placeholder="Enter Designation"
                              name="designation"
                              onChange={(e) => userRowDataFetch(e)}
                            />
                          </div>
                        </div>

                        <div className="form-group col-md-6">
                          <div className="pr-ten">
                            <label
                              className="label-heading mb-1"
                              htmlFor="mobileNo"
                            >
                              Department*
                            </label>

                            <select
                              className="form-control input-focus"
                              name="department"
                              id="select-product"
                              value={
                                type
                                  ? userRowData.department
                                  : userRowData.department
                              }
                              ref={roleRef}
                              onChange={(e) => userRowDataFetch(e)}
                            >
                              <option>Select Department</option>
                              {userDepartment.map((dep, index) => (
                                <option key={index} value={dep}>
                                  {dep}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="all-between-items">
                          <div className="all-center"></div>
                          <div>
                            {type ? (
                              <button
                                onClick={(e) => editUserData(e)}
                                className="first-button form-prev-btn"
                              >
                                {editUserLoading
                                  ? "Please wait..."
                                  : "Edit User"}
                              </button>
                            ) : (
                              <button
                                onClick={(e) => createuserData(e)}
                                className="first-button form-prev-btn"
                              >
                                {btnLoading ? "Loading" : "Submit"}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav> */}
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
                departmentList?.map((ele) => ({
                  label: ele?.name,
                  value: ele?.id,
                })) || []
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
