import React, { useRef, useState } from "react"
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
toast.configure()

const CreateuserDashboard = ({ data, type }) => {
  // /securityService/api/auth/createNewUserByEmail

  const [roleGetRole, setRoleGetRole] = useState([])
  const [userRowData, setUserRowData] = useState({
    userName: "",
    email: "",
    role: [],
    designation: "",
    department: "",
  })

  useEffect(()=> {
    userRowDataFetch();
    
  },[])
  
  const [btnLoading, setBtnLoading] = useState(false)
  const [allRoles, setAllRoles] = useState([])

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
      role: userRowData.role
    }


   




    try{
    const updateUserData = await putQuery(`/securityService/api/auth/updateUserData`, upadtedData);
    const updateLeadUserData = await putQuery(`/leadService/api/v1/users/updateUserData`,updateLeadData )
    window.location.reload();
    toast.success("User Edit Succesfully")
  }catch(err){
      console.log(err);
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
          data-target="#createuserdashboard"
        >
          <i className="fa-solid mr-1 fa-circle-plus"></i>
        </button>

        {/* MODAL */}
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
                {/* START */}
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
                              type ? userRowData.fullName : userRowData.fullName
                            }
                            ref={nameRef}
                            placeholder="Enter Username"
                            name={type ? "fullName" : "userName"}
                            onChange={userRowDataFetch}
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

                      {/* <div className="form-group col-md-6">
                        <div className="pr-ten">
                          <label
                            className="label-heading mb-1"
                            htmlFor="mobileNo"
                          >
                            Department
                          </label>
                          <input
                            type="text"
                            className="form-control input-focus"
                            id="mobileNo"
                            // ref={designationRef}
                            placeholder="Enter Department"
                            name="department"
                            onChange={(e) => userRowDataFetch(e)}
                          />
                        </div>
                      </div> */}

                      <div className="all-between-items">
                        <div className="all-center"></div>
                        <div>
                          {type ? (
                             <button onClick={(e) => editUserData(e)} className="first-button form-prev-btn">
                             {editUserLoading ? "Please wait...": "Edit User"}
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

export default CreateuserDashboard
