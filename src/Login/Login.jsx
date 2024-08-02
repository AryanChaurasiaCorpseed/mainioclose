import React, { useCallback, useEffect, useRef, useState } from "react"
import "./Login.scss"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import LongButton from "../components/button/LongButton"
import InputErrorComponent from "../components/InputErrorComponent"
import { getCurrentUser, handleLoadingState } from "../Toolkit/Slices/AuthSlice"
import LoginSidebarArea from "../components/LoginSidebarArea"
import { Button, Checkbox, Form, Input, notification, Typography } from "antd"
import { Icon } from "@iconify/react"
const { Text } = Typography
toast.configure()

const Login = () => {
  // let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}")
  // if (regex.test(emailRef.current.value) !== true) {
  //   emailRef.current.style.border = "1px solid red"
  //   setEmailProperErr(true)
  //   setEmailErr(false)
  // }

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  })

  const [emailErr, setEmailErr] = useState(false)
  const [emailProperErr, setEmailProperErr] = useState(false)
  const [passwordErr, setPasswordErr] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [loginDataError, setLoginDataError] = useState(false)
  const [loading, setLoading] = useState("")

  const emailRef = useRef()
  const passwordRef = useRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = (e) => {
    setUserLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const currentUserID = useSelector((state) => state?.auth?.currentUser?.id)
  const CurrentuserData = useSelector((prev) => prev.AuthReducer)
  const userLoading = useSelector((prev) => prev.auth.userLoading)

  useEffect(() => {
    dispatch(handleLoadingState(""))
  }, [])

  const userSignIn = (e) => {
    e.preventDefault()

    if (loadingBtn === true) {
      return
    }

    setUserLoginData((data) => ({ ...data, password: data.password.trim() }))

    if (emailRef.current.value === "") {
      emailRef.current.style.border = "1px solid red"
      setEmailErr(true)
      return
    }
    if (passwordRef.current.value === "") {
      passwordRef.current.style.border = "1px solid red"
      setPasswordErr(true)
      return
    }
    setLoadingBtn(true)

    const loginMyUser = async () => {
      try {
        setLoading("pending")
        const loginUser = await dispatch(getCurrentUser(userLoginData)).then(
          (resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              setLoading("fulfilled")
              navigate(`/erp/${loginUser?.payload?.id}/sales/leads`)
            } else {
              navigate(`/erp/login`)
              setLoading("rejected")
            }
          }
        )
      } catch (err) {
        console.log(err)
        setLoading("rejected")
        setLoginDataError(true)
      } finally {
        setLoading("rejected")
        setEmailErr(false)
        setPasswordErr(false)
      }
    }

    loginMyUser()
  }

  const handleLoginUsers = useCallback((values) => {
    setLoading("pending")
    dispatch(getCurrentUser(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          setLoading("fulfilled")
          notification.success({ message: "User logged in successfully" })
          navigate(`/erp/${resp?.payload?.id}/sales/leads`)
        } else {
          navigate(`/erp/login`)
          setLoading("rejected")
          notification.error({ message: "Something went wrong" })
        }
      })
      .catch(() => {
        setLoading("rejected")
        notification.error({ message: "Something went wrong" })
      })
  }, [dispatch])

  return (
    <div className="grid-two">
      <div>
        <LoginSidebarArea />
      </div>
      <div className="cm-box bg-g-light container">
        <div>
          <img src="https://www.corpseed.com/assets/img/brands/CORPSEED.webp" />
        </div>
        {/* <h2 className="cm-heading">Login</h2> */}
        <div className="sm-box">
          {/* <div className="w-100">
            <div className="cm-input-box">
              <i className="cm-icon fa-solid fa-user"></i>
              <input
                className="input2-design w-100"
                type="text"
                ref={emailRef}
                name="email"
                onChange={(e) => userInfo(e)}
                placeholder="Enter Your Email"
              />
            </div>
            {emailErr ? (
              <p className="errors-new">Email ID can't be Blank</p>
            ) : (
              ""
            )}
            {emailProperErr ? (
              <InputErrorComponent value="Email not in Proper Format" />
            ) : (
              ""
            )}
          </div>
          <div className="w-100">
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
                className="input2-design w-100"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your password"
                ref={passwordRef}
                name="password"
                onChange={(e) => userInfo(e)}
              />
            </div>
            {passwordErr ? (
              <InputErrorComponent value="Password can't be Blank" />
            ) : (
              ""
            )}
            <div className="mt-2">
              {loginDataError ? (
                <InputErrorComponent value="Enter correct Username or Password" />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="remember">
            <div className="agree-text">
              <input className="box-input" type="checkbox" id="terms" />
              <label className="box-label m-0" htmlFor="terms">
                Remember me
              </label>
            </div>
            <div>
              <Link className="bl-clr" to="/erp/forgetpassword">
                Forget Password ?
              </Link>
            </div>
          </div>
          {userLoading === "rejected" && (
            <Text type="danger">password does not match</Text>
          )}
          <LongButton
            data={userLoading === "pending" ? "Loading..." : "Login"}
            onClick={(e) => userSignIn(e)}
            className={`mt-3 w-100`}
          /> */}

          <Form
            layout="vertical"
            size="large"
            style={{ width: "90%" }}
            onFinish={handleLoginUsers}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "please enter your email" }]}
            >
              <Input
                prefix={
                  <Icon icon="fluent:mail-24-regular" height={24} width={24} />
                }
                onChange={() => setLoading("")}
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "please enter your password" },
              ]}
            >
              <Input.Password
                prefix={
                  <Icon
                    icon="fluent:lock-closed-24-regular"
                    height={24}
                    width={24}
                  />
                }
                onChange={() => setLoading("")}
                size="large"
              />
            </Form.Item>
            {loading === "rejected" && (
              <Text type="danger"> Invalid email and password </Text>
            )}
            <Form.Item
              valuePropName="checked"
              // wrapperCol={{
              //   offset: 8,
              //   span: 16,
              // }}
            >
              <Checkbox>Remember me.</Checkbox>{" "}
              <Link className="bl-clr" to="/erp/forgetpassword">
                Forget Password ?
              </Link>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={loading === "pending" ? true : false}
              >
                {loading === "pending" ? "Loading..." : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
