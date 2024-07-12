import React, { useRef, useState } from "react"
import "./CommonData.scss"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {
  forgetPasswordAction
} from "../Redux/Action/AuthAction"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import InputErrorComponent from "../components/InputErrorComponent"
import LongButton from "../components/button/LongButton"
import { forgetPasswordApi } from "../Toolkit/Slices/ForgetPasswordSlice"
import LoginSidebarArea from "../components/LoginSidebarArea"
toast.configure()

const ForgetPassword = () => {
  const [emailData, setEmailData] = useState("")
  const [emailErr, setEmailErr] = useState(false)
  const [emailFormat, setEmailFormat] = useState(false)
  const [emailNotExist, setEmailNotExist] = useState(false)
  const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isUserData = useSelector((user) => user.AuthReducer)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailRef.current.value === "") {
      setEmailErr(true)
      setEmailFormat(false)
      return
    }
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}")
    if (regex.test(emailRef.current.value) !== true) {
      setEmailFormat(true)
      setEmailErr(false)
    }
    setLoading(true)

    const forgetData = async () => {
      try {
        const data = await dispatch(forgetPasswordApi(emailData))
        navigate("/erp/forgetotp")
      } catch (err) {
        console.log(err)
      }
    }

    forgetData()

    const forgetPass = async () => {
      try {
        const passwordOtp = await axios.post(
          `/securityService/api/auth/forgetOtp?email=${emailData}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        dispatch(forgetPasswordAction(passwordOtp.data))
        setLoading(false)
        navigate("/erp/forgetotp")
      } catch (err) {
        if (err.response.status === 500) {
          toast.error("Something Went wrong")
          setLoading(false)
        }
        if (err.response.status === 401) {
          setEmailNotExist(true)
          setLoading(false)
        }
        setLoading(false)
      }
    }

    // forgetPass()
  }

  return (
    <div className="grid-two">
      <form>
        <div className="cm-box container">
          <div>
            <img src="https://www.corpseed.com/assets/img/brands/CORPSEED.webp" />
          </div>
          <div className="sm-box">
            <div className="w-100">
              <h2 className="cm-heading text-center">Forget Password</h2>
              <div className="cm-input-box my-3">
                <i className="fa-regular cm-icon fa-envelope"></i>
                <input
                  className="input2-design  w-100"
                  ref={emailRef}
                  type="text"
                  onChange={(e) => setEmailData(e.target.value)}
                  placeholder="Enter Your Email"
                />
              </div>

              {emailErr ? (
                <p className="errors-new">Email can't be blank</p>
              ) : (
                ""
              )}
              {emailFormat ? (
                <InputErrorComponent value="Email Not in Proper Format" />
              ) : (
                ""
              )}
              {emailNotExist ? (
                <InputErrorComponent value="Email Not Found in System" />
              ) : (
                ""
              )}
              <LongButton onClick={(e) => handleSubmit(e)} data="Continue" />
            </div>
          </div>
        </div>
      </form>
      <div>
        <LoginSidebarArea />
      </div>
    </div>
  )
}

export default ForgetPassword
