import React from "react"
import "./OtpPage.scss"
import OtpTimer from "otp-timer"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ForgetOtpPage = () => {
  const [otpData, setOtpData] = useState({})
  const [validOtpErr, setValidOtpErr] = useState(false);

  const forgetOtpResponse = useSelector(
    (auth) => auth.AuthReducer.forgetPassword
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // console.log("redux data", signUpRedux)

  const userOtpValidate = (e) => {
    e.preventDefault()
    let one = Object.values(otpData)
    const finalOtp = one.join("")

    if(forgetOtpResponse.otp !== finalOtp ){
      setValidOtpErr(true)
      return
    }

    const validateuserData = async () => {
      try {
        const validateUser = await axios(`/auth/validateOtp?mobile=${forgetOtpResponse.mobile}&otpNo=${forgetOtpResponse.otp}`)
        console.log("validate user response", validateUser.data);
        console.log("validate user response", validateUser.data.status);
        console.log("validate user response", validateUser.data);
        console.log("validate user response", validateUser.data.isSuccess);
        if(validateUser.data.status === 200 && validateUser.data.isSuccess === true){
          navigate("/erp/change");
        }
        
      } catch (err) {
        console.log(err)
        setValidOtpErr(true);

      }
    }

    validateuserData()
  }

  const sendTimer = () => {
    return (
      <>
        <button className="resend-text">Resend Code</button>
      </>
    )
  }

  return (
    <div className="container otp-page">
      <h2 className="otp-heading">Enter confirmation code</h2>
      <p className="otp-number">A 4-digit code was sent to</p>
      <p className="otp-number">+91 99* * * * * * 18</p>
      <div className="input-boxes">
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, one: e.target.value }))
          }
          type="text"
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, two: e.target.value }))
          }
          type="text"
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, three: e.target.value }))
          }
          type="text"
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, four: e.target.value }))
          }
          type="text"
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, five: e.target.value }))
          }
          type="text"
        />
        <input
          className="single-input"
          name="otp"
          maxLength="1"
          onChange={(e) =>
            setOtpData((prev) => ({ ...prev, six: e.target.value }))
          }
          type="text"
        />
      </div>
      {validOtpErr ? <p className="errors-new">Otp not match please Enter a valid Otp</p> : ""}
       
      <div className="resend-timer">
        <OtpTimer seconds={30} minutes={1} resend={sendTimer} />
      </div>
      <button onClick={(e) => userOtpValidate(e)} className="login-button">
        Continue
      </button>
    </div>
  )
}

export default ForgetOtpPage
