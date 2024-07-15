import React, { useEffect, useId } from "react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import InputErrorComponent from "../components/InputErrorComponent"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { putQuery } from "../API/PutQuery"
import { useDispatch, useSelector } from "react-redux"
import { changePasswordAuthentication } from "../Toolkit/Slices/AuthSlice"
import { Button, Result } from "antd"
toast.configure()

const SetNewPasswordPage = () => {
  const { userid } = useParams()
  const dispatch = useDispatch()
  const approved = useSelector((state) => state.auth.isManagerApproved)
  console.log("approved", approved)

  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setnewPassword] = useState({
    id: userid,
    password: "",
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [samePasswordError, setSamePasswordError] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    dispatch(changePasswordAuthentication(userid))
  }, [userid, dispatch])

  const setNewPassword = (e) => {
    e.preventDefault()

    if (newPassword.password !== confirmPassword) {
      setSamePasswordError(true)
      return
    }

    const setPasswordFun = async () => {
      setBtnLoading(true)
      try {
        const passwordData = await putQuery(
          `/securityService/api/auth/setNewPassword`,
          newPassword
        )
        setBtnLoading(false)
        navigate(`/erp/setpassword/${userid}/thankyou`)
      } catch (err) {
        if (err.response.status === 401) {
          toast.error(
            "You have already set Your password Please login or Forget Password Option"
          )
          setBtnLoading(false)
        }
        setBtnLoading(false)
      }
    }

    setPasswordFun()
  }

  return approved ? (
    <>
      <form>
        <div className="cm-box container">
          <h2 className="cm-heading">Set Password</h2>

          <div>
            <div className="cm-input-box">
              {showPassword ? (
                <i
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="fa-solid cm-icon fa-eye"
                ></i>
              ) : (
                <i
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="fa-regular cm-icon fa-eye-slash"
                ></i>
              )}
              <input
                className="cm-input"
                type="password"
                name="email"
                placeholder="Enter Your password"
                onChange={(e) =>
                  setnewPassword((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div>
            <div className="cm-input-box">
              {showPassword ? (
                <i
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="fa-solid cm-icon fa-eye"
                ></i>
              ) : (
                <i
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="fa-regular cm-icon fa-eye-slash"
                ></i>
              )}
              <input
                className="cm-input"
                type="password"
                placeholder="Enter Your Confirm Password"
                name="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          {samePasswordError ? (
            <InputErrorComponent value={"Password Must be Same"} />
          ) : (
            ""
          )}
          <button
            onClick={(e) => setNewPassword(e)}
            className="login-button my-3"
          >
            {btnLoading ? "Loading" : "Submit Password"}
          </button>
        </div>
      </form>
    </>
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to change password without manager approval"
      extra={
        <Link to="/erp/login">
          <Button type="primary" key="console">
            Go Login Page
          </Button>
        </Link>
      }
    />
  )
}

export default SetNewPasswordPage
