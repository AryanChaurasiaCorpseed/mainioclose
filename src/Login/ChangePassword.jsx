import React, { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { postQuery } from "../API/PostQuery"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import InputErrorComponent from "../components/InputErrorComponent"
toast.configure()

const ChangePassword = () => {
  const [passwordErr, setPasswordErr] = useState(false)
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [loading, setLoading] = useState(false);
  // const [passwordErr, setPasswordErr] = useState(false);

  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const navigate = useNavigate();

  // const forgetPasswordResponse = useSelector(
  //   (auth) => auth.AuthReducer.forgetPassword
  // )

  const forgetPasswordResponse = useSelector(
    (auth) =>  auth.password.forgetData
  )

  
  
  const updateUserPassword = (e) => {
    e.preventDefault()

   
    const { email, otp } = { ...forgetPasswordResponse }

    const updateUserData = {
      email: email,
      password: newPassword,
      otp: otp,
    }

   
    if (newPassword !== repeatPassword) {
      setPasswordErr(true)
      return
    }
    setLoading(true)
    const updateExistUserPassword = async () => {
      try {
        const checkUser = await axios.put(
          `/securityService/api/auth/updateUser`,
          {
            ...updateUserData,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        setLoading(false)
        toast.success("Password Update Succesfully")
        navigate("/erp/login")
      } catch (err) {
        if (err.response.status === 500) {
          toast.error("Something Went wrong")
          setLoading(false)
        }
        if (err.response.status === 401) {
          toast.error("Something Went wrong")
          setLoading(false)
        }
        setLoading(false)
      }
    }

    updateExistUserPassword();
  }

  return (
    <div className="cm-box container">
      <h2 className="cm-heading">Change Password</h2>
      <div className="cm-input-box">
        <i className="fa-regular cm-icon fa-eye-slash"></i>
        <input
          className="cm-input"
          type="password"
          placeholder="New password"
          ref={passwordRef}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="cm-input-box">
        <i className="fa-regular cm-icon fa-eye-slash"></i>
        <input
          className="cm-input"
          type="password"
          placeholder="Confirm New password"
          ref={confirmPasswordRef}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      {/* {passwordErr ? <p>Error</p>: ""} */}
      {passwordErr ? <InputErrorComponent value="Password Should be Same" /> : ""}
      <button onClick={(e) => updateUserPassword(e)} className="login-button">
        {loading ? "Loading..." : "Set Password"}
      </button>
    </div>
  )
}

export default ChangePassword
