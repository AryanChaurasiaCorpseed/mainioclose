import React, { useRef } from "react"
import "./OtpPage.scss"
import OtpTimer from "otp-timer"
import { useState } from "react"
import {  useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { postQuery } from "../API/PostQuery"
import LongButton from "../components/button/LongButton"
toast.configure()

const OtpPage = () => {
  const [otpData, setOtpData] = useState({})

  const signUpRedux = useSelector((prev) => prev.signup.userSignup);
  const [leadUserInfo, setLeadUserInfo] = useState({})
  const navigate = useNavigate()

  const firstRef = useRef()
  const secondRef = useRef()
  const thirdRef = useRef()
  const forthRef = useRef()
  const fiveRef = useRef()
  const sixRef = useRef()

  let one = Object.values(otpData)
  const finalOtp = one.join("")
  const finalApiData = { ...signUpRedux, otp: finalOtp }
  
  const userRegistration = (e) => {
    e.preventDefault()

    const createUserApi = async () => {
      try {
        const signupResponse = await postQuery(
          "/securityService/api/auth/createNewUser",
          finalApiData
        )
        const { id } = signupResponse.data.data
        const leadUserData = {
          ...finalApiData,
          id: id,
          designation: "NA",
          department: "NA",
          role: ["ADMIN"],
        }
        delete leadUserData.otp
        delete leadUserData.companyName
        delete leadUserData.password
        delete leadUserData.mobile
  
        const createLeadResponse = await postQuery(
          `/leadService/api/v1/users/createUsser`,
          leadUserData
        )

        navigate("/erp/login")
        toast.success("User SignUp Sucessfully")
      } catch (err) {
      }
    }

    createUserApi()
  }

  
  
  const sendTimer = () => {
    return (
      <>
        <button className="resend-text">Resend Code</button>
      </>
    )
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 8 && e.target.id === "six") {
      fiveRef.current.focus()
      return
    }
    if (e.keyCode === 8 && e.target.id === "five") {
      forthRef.current.focus()
      return
    }
    if (e.keyCode === 8 && e.target.id === "forth") {
      thirdRef.current.focus()
      return
    }
    if (e.keyCode === 8 && e.target.id === "three") {
      secondRef.current.focus()
      return
    }
    if (e.keyCode === 8 && e.target.id === "two") {
      firstRef.current.focus()
      return
    }

    if (e.target.id === "one") {
      secondRef.current.focus()
    }
    if (e.target.id === "two") {
      thirdRef.current.focus()
    }
    if (e.target.id === "three") {
      forthRef.current.focus()
    }
    if (e.target.id === "forth") {
      fiveRef.current.focus()
    }
    if (e.target.id === "five") {
      sixRef.current.focus()
    }
  }

  return (
    <div className="container otp-page">
      <h2 className="otp-heading">Enter confirmation code</h2>
      <p className="otp-number">A 6-digit code was sent to your <b>Mail ID</b></p>
      <p className="otp-number">*****@corpseed.com</p>
      <div className="input-boxes">
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, one: e.target.value }))
          }
          type="text"
          ref={firstRef}
          id="one"
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, two: e.target.value }))
          }
          type="text"
          id="two"
          ref={secondRef}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, three: e.target.value }))
          }
          type="text"
          id="three"
          ref={thirdRef}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, four: e.target.value }))
          }
          type="text"
          id="forth"
          ref={forthRef}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, five: e.target.value }))
          }
          type="text"
          id="five"
          ref={fiveRef}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, six: e.target.value }))
          }
          type="text"
          id="six"
          ref={sixRef}
          onKeyUp={(e) => handleKeyUp(e)}
        />
      </div>
      <div className="resend-timer">
        <OtpTimer seconds={30} minutes={1} resend={sendTimer} />
      </div>
      <LongButton onClick={(e) => userRegistration(e)} data="Continue" />
      {/* <button onClick={(e) => userRegistration(e)} className="login-button">
        Continue
      </button> */}
    </div>
  )
}

export default OtpPage
