import React, { useRef, useState } from "react"
import { postQuery } from "../API/PostQuery"
import { useCustomRoute } from "../Routes/GetCustomRoutes"
import { useEffect } from "react"
import { getQuery } from "../API/GetQuery"
import InputErrorComponent from "../components/InputErrorComponent"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { userDepartment } from "../data/FakeData"
import { putQuery } from "../API/PutQuery"
import ModelInput from "../components/Inputs/ModelInput"
import TextFieldInput from "../components/Inputs/TextFieldInput"
import { useSelector } from "react-redux"
toast.configure()

const CreateHrDashBoard = ({ data, type }) => {
  const [roleGetRole, setRoleGetRole] = useState([])
  const [userSecurityData, setUserSecurityData] = useState({
    userName: "",
    email: "",
    role: [],
    designation: "",
    department: "",
  })
  const [userRowData, setUserRowData] = useState({
    userName: "",
    email: "",
    role: [],
    designation: "",
    department: "",
    // "id": 0,
    epfNo: "",
    aadharCard: "",
    employeeId: "",
    managerId: 0,
    expInMonth: 0,
    expInYear: 0,
    dateOfJoining: "",
    type: "",
    fatherName: "",
    fatherOccupation: "",
    fatherContactNo: "",
    motherName: "",
    motherOccupation: "",
    motherContactNo: "",
    spouseName: "",
    spouseContactNo: "",
    nationality: "",
    language: "",
    emergencyNumber: "",
    panNumber: "",
    permanentAddress: "",
    residentialAddress: "",
    manager: true,
    lockerSize: 0,
    master: true,
    backupTeam: true,
  })


  const [aadharCardError, setAadharCardError] = useState(false)

  const aadharCardRef = useRef()
  const employeeIdRef = useRef()
  const managerIdRef = useRef()
  const expInMonthRef = useRef()
  const expInYearRef = useRef()
  const dateOfJoiningRef = useRef()
  const fatherNameRef = useRef()
  const fatherOccupationRef = useRef()
  const motherNameRef = useRef()
  const motherOccupationRef = useRef()
  const nationalityRef = useRef()
  const languageRef = useRef()
  const emergencyNumberRef = useRef()
  const panNumberRef = useRef()
  const permanentAddressRef = useRef()
  const residentialAddressRef = useRef()


  const [btnLoading, setBtnLoading] = useState(false)
  const [allRoles, setAllRoles] = useState([])

  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [roleError, setRoleError] = useState(false)
  const [editUserLoading, setEditUserLoading] = useState(false)

  const allUserList = useSelector((prev) => prev.user.allUsers)

  const nameRef = useRef()
  const emailRef = useRef()
  const roleRef = useRef()
  const designationRef = useRef()

  let myBool = [
    { id: 1, name: "true" },
    { id: 2, name: "false" },
  ]

  const GetRoleFun = (e) => {
    setUserRowData((prev) => ({ ...prev, role: [e.target.value] }))
  }


  const userRowDataFetch = (e) => {
    if (type) {
      setUserRowData((prev) => ({ ...prev, ...data }))
      setUserRowData((prev) => ({ ...prev, [e?.target.name]: e?.target.value }))
    } else {
      setUserRowData((prev) => ({ ...prev, [e?.target.name]: e?.target.value }))
    }
  }


  useEffect(() => {
    getAllRole()
  }, [])

  const roleUrl = `/securityService/api/v1/roles/getRole`
  const roleData = []
  const { productData: allDataRole } = useCustomRoute(roleUrl, roleData)

  const getAllRole = async () => {
    try {
      const allRoleResponse = await getQuery(
        `/securityService/api/v1/roles/getRole`
      )
      setAllRoles(allRoleResponse.data)
    } catch (err) {
      console.log("err", err)
    }
  }

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

    const userData = {
      userName: userRowData.userName,
      email: userRowData.email,
      role: userRowData.role,
      designation: userRowData.designation,
      department: userRowData.department,
    }

    const userCreateFun = async () => {
      try {
        const createNewUserData = await postQuery(
          `/securityService/api/auth/createNewUserByEmail`,
          userData
        )

        let roleData = createNewUserData.data.data.role.map((role) => role.name)

        const newLeadObject = {
          id: createNewUserData?.data?.data?.userId,
          email: createNewUserData?.data?.data?.email,
          role: roleData,
          designation: createNewUserData?.data?.data?.designation,
          department: createNewUserData?.data?.data?.department,
          userName: createNewUserData?.data?.data?.name,
          epfNo: userRowData?.epfNo,
          aadharCard: userRowData?.aadharCard,
          employeeId: userRowData?.employeeId,
          managerId: userRowData?.managerId,
          expInMonth: userRowData?.expInMonth,
          expInYear: userRowData?.expInYear,
          dateOfJoining: userRowData?.dateOfJoining,
          type: userRowData?.type,
          fatherName: userRowData?.fatherName,
          fatherOccupation: userRowData?.a?.fatherOccupation,
          fatherContactNo: userRowData?.fatherContactNo,
          motherName: userRowData?.motherName,
          motherOccupation: userRowData?.motherOccupation,
          motherContactNo: userRowData?.motherContactNo,
          spouseName: userRowData?.spouseName,
          spouseContactNo: userRowData?.spouseContactNo,
          nationality: userRowData?.nationality,
          language: userRowData?.language,
          emergencyNumber: userRowData?.emergencyNumber,
          panNumber: userRowData?.panNumber,
          permanentAddress: userRowData?.permanentAddress,
          residentialAddress: userRowData?.residentialAddress,
          manager: true,
        }

        const createLeadUserByEmail = await postQuery(
          `/leadService/api/v1/users/createUserByHr`,
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
      epfNo: userRowData?.epfNo,
      aadharCard: userRowData?.aadharCard,
      employeeId: userRowData?.employeeId,
      managerId: userRowData?.managerId,
      expInMonth: userRowData?.expInMonth,
      expInYear: userRowData?.expInYear,
      dateOfJoining: userRowData?.dateOfJoining,
      type: userRowData?.type,
      fatherName: userRowData?.fatherName,
      fatherOccupation: userRowData?.a?.fatherOccupation,
      fatherContactNo: userRowData?.fatherContactNo,
      motherName: userRowData?.motherName,
      motherOccupation: userRowData?.motherOccupation,
      motherContactNo: userRowData?.motherContactNo,
      spouseName: userRowData?.spouseName,
      spouseContactNo: userRowData?.spouseContactNo,
      nationality: userRowData?.nationality,
      language: userRowData?.language,
      emergencyNumber: userRowData?.emergencyNumber,
      panNumber: userRowData?.panNumber,
      permanentAddress: userRowData?.permanentAddress,
      residentialAddress: userRowData?.residentialAddress,
      manager: true,
    }

    try {
      const updateUserData = await putQuery(
        `/securityService/api/auth/updateUserData`,
        upadtedData
      )
      const updateLeadUserData = await putQuery(
        `/leadService/api/v1/users/editUserByHr`,
        updateLeadData
      )
      window.location.reload()
      toast.success("User Edit Succesfully")
    } catch (err) {
      console.log(err)
      setEditUserLoading(false)
    }
  }

  return (
    <nav className="all-center">
      <div className="team-model">
        <button
          type="button"
          className="team-edit-button create-user-btn"
          data-toggle="modal"
          data-target="#createhrdashboard"
        >
          <i className="fa-solid mr-1 fa-circle-plus"></i>
        </button>

        {/* MODAL */}
        <div
          className="modal fade"
          id="createhrdashboard"
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
                {/* START */}
                <div className="personal-info container">
                  <h4 className="info-text model-heading">
                    {type ? "Edit New user" : "Create New User"}
                    {type ? (
                      <span className="pencil-ui" onClick={userRowDataFetch}>
                        <i className="fa-solid fa-pencil"></i>
                      </span>
                    ) : (
                      ""
                    )}
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
                              type ? userRowData.fullName : userRowData.fullName
                            }
                            ref={nameRef}
                            placeholder="Enter Username"
                            name={type ? "fullName" : "userName"}
                            onChange={(e) => userRowDataFetch(e)}
                          />
                        </div>
                        {nameError ? (
                          <InputErrorComponent value={"Name can't be Blank!"} />
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
                            value={type ? userRowData.email : userRowData.email}
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
                          <InputErrorComponent value={"Role can't be Blank!"} />
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
                      <ModelInput
                        label="EPFO Number"
                        type="text"
                        placeholder="Enter EPFO Number"
                        name="epfNo"
                        value={type ? userRowData.epfNo : userRowData.epfNo}
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Aadhar Card"
                        type="text"
                        placeholder="Enter Aadhar Card"
                        ref={aadharCardRef}
                        name="aadharCard"
                        error={aadharCardError}
                        errorData={"Aadhar Card Number Can't be Blank"}
                        value={
                          type ? userRowData.aadharCard : userRowData.aadharCard
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Employee ID"
                        type="text"
                        placeholder="Enter Employee ID"
                        name="employeeId"
                        value={
                          type ? userRowData.employeeId : userRowData.employeeId
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <div className="form-group col-md-6">
                        <div className="pr-ten">
                          <label
                            className="label-heading mb-1"
                            htmlFor="mobileNo"
                          >
                            Manager Name*
                          </label>

                          <select
                            className="form-control input-focus"
                            name="managerId"
                            id="select-product"
                            value={
                              type
                                ? userRowData.managerId
                                : userRowData.managerId
                            }
                            // ref={roleRef}
                            onChange={(e) => userRowDataFetch(e)}
                          >
                            <option>Select Manager</option>
                            {allUserList.map((dep, index) => (
                              <option key={index} value={dep?.id}>
                                {dep?.fullName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <ModelInput
                        label="Experience In Months"
                        type="text"
                        placeholder="Enter Experience In Months"
                        name="expInMonth"
                        value={
                          type ? userRowData.expInMonth : userRowData.expInMonth
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Experience in Years"
                        type="text"
                        placeholder="Enter Experience in Years"
                        name="expInYear"
                        value={
                          type ? userRowData.expInYear : userRowData.expInYear
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Date of Joining"
                        type="date"
                        placeholder="Enter Date of Joinning"
                        name="dateOfJoining"
                        value={
                          type
                            ? userRowData.dateOfJoining
                            : userRowData.dateOfJoining
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Type"
                        type="text"
                        placeholder="Enter Type"
                        name="type"
                        value={type ? userRowData.type : userRowData.type}
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Father Name"
                        type="text"
                        placeholder="Enter Father Name"
                        name="fatherName"
                        value={
                          type ? userRowData.fatherName : userRowData.fatherName
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Father Occupation"
                        type="text"
                        placeholder="Enter Father Occupation"
                        name="fatherOccupation"
                        value={
                          type
                            ? userRowData.fatherOccupation
                            : userRowData.fatherOccupation
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Father Contact No"
                        type="text"
                        placeholder="Enter Father Contact No"
                        name="fatherContactNo"
                        value={
                          type
                            ? userRowData.fatherContactNo
                            : userRowData.fatherContactNo
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Mother Name"
                        type="text"
                        placeholder="Enter Mother Name"
                        name="motherName"
                        value={
                          type ? userRowData.motherName : userRowData.motherName
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Mother Occupation"
                        type="text"
                        placeholder="Enter Mother Occupation"
                        name="motherOccupation"
                        value={
                          type
                            ? userRowData.motherOccupation
                            : userRowData.motherOccupation
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Mother Contact No."
                        type="text"
                        placeholder="Enter Mother Contact No."
                        name="motherContactNo"
                        value={
                          type
                            ? userRowData.motherContactNo
                            : userRowData.motherContactNo
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Spouse Name"
                        type="text"
                        placeholder="Enter Spouse Name"
                        name="spouseName"
                        value={
                          type ? userRowData.spouseName : userRowData.spouseName
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Spouse Contact Number"
                        type="text"
                        placeholder="Enter Spouse Contact Number"
                        name="spouseContactNo"
                        value={
                          type
                            ? userRowData.spouseContactNo
                            : userRowData.spouseContactNo
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Nationality"
                        type="text"
                        placeholder="Enter Nationality"
                        name="nationality"
                        value={
                          type
                            ? userRowData.nationality
                            : userRowData.nationality
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Language"
                        type="text"
                        placeholder="Enter Language"
                        name="language"
                        value={
                          type ? userRowData.language : userRowData.language
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <ModelInput
                        label="Emergency Contact"
                        type="text"
                        placeholder="Enter Emergency Contact"
                        name="emergencyNumber"
                        value={
                          type
                            ? userRowData.emergencyNumber
                            : userRowData.emergencyNumber
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      {/* lockerSize */}
                      <TextFieldInput
                        label="Permanenet Address"
                        type="text"
                        placeholder="Enter Permanenet Address"
                        name="permanentAddress"
                        value={
                          type
                            ? userRowData.permanentAddress
                            : userRowData.permanentAddress
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />
                      <TextFieldInput
                        label="Residential Address"
                        type="text"
                        placeholder="Enter Residential Address"
                        name="residentialAddress"
                        value={
                          type
                            ? userRowData.residentialAddress
                            : userRowData.residentialAddress
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />

                      <ModelInput
                        label="Locker Size"
                        type="text"
                        placeholder="Enter Locker Size (Enter Digit Only)"
                        name="lockerSize"
                        value={
                          type ? userRowData.lockerSize : userRowData.lockerSize
                        }
                        onChange={(e) => userRowDataFetch(e)}
                      />

                      {/* {type && 
                       } */}

                      {type && (
                        <div className="form-group col-md-6">
                          <div className="pr-ten">
                            <label
                              className="label-heading mb-1"
                              htmlFor="mobileNo"
                            >
                              Master*
                            </label>

                            <select
                              className="form-control input-focus"
                              name="master"
                              id="select-product"
                              value={
                                type ? userRowData.master : userRowData.master
                              }
                              // ref={roleRef}
                              onChange={(e) => userRowDataFetch(e)}
                            >
                              <option>Select Master</option>
                              {myBool.map((dep, index) => (
                                <option key={index} value={dep?.name}>
                                  {dep?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {type && (
                        <div className="form-group col-md-6">
                          <div className="pr-ten">
                            <label
                              className="label-heading mb-1"
                              htmlFor="mobileNo"
                            >
                              Backup Team*
                            </label>

                            <select
                              className="form-control input-focus"
                              name="backupTeam"
                              id="select-product"
                              value={
                                type
                                  ? userRowData.backupTeam
                                  : userRowData.backupTeam
                              }
                              // ref={roleRef}
                              onChange={(e) => userRowDataFetch(e)}
                            >
                              <option>Select Backup Team</option>
                              {myBool.map((dep, index) => (
                                <option key={index} value={dep?.name}>
                                  {dep?.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}

                      {/* <ModelInput
                        label="Manager Name"
                        type="text"
                        placeholder="Enter Manager Name"
                        name="manager"
                        onChange={(e) => userRowDataFetch(e)}
                      /> */}
                      <div className="all-between-items">
                        <div className="all-center"></div>
                        <div>
                          {type ? (
                            <button
                              onClick={(e) => editUserData(e)}
                              className="first-button form-prev-btn"
                            >
                              {editUserLoading ? "Please wait..." : "Edit User"}
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
    </nav>
  )
}

export default CreateHrDashBoard
