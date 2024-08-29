import React, { useCallback, useEffect, useRef, useState } from "react"
import "./Login.scss"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getCurrentUser, handleLoadingState } from "../Toolkit/Slices/AuthSlice"
import LoginSidebarArea from "../components/LoginSidebarArea"
import { Button, Checkbox, Form, Input, notification, Typography } from "antd"
import { Icon } from "@iconify/react"
const { Text } = Typography
toast.configure()

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState("")

  useEffect(() => {
    dispatch(handleLoadingState(""))
  }, [])

  const handleLoginUsers = useCallback(
    (values) => {
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
    },
    [dispatch]
  )

  return (
    // <div className="grid-two">
    //   <div>
    //     <LoginSidebarArea />
    //   </div>
    //   <div className="cm-box bg-g-light container">
    //     <div>
    //       <img src="https://www.corpseed.com/assets/img/brands/CORPSEED.webp" />
    //     </div>
    //     <div className="sm-box">
    //       <Form
    //         layout="vertical"
    //         size="large"
    //         style={{ width: "90%" }}
    //         onFinish={handleLoginUsers}
    //       >
    //         <Form.Item
    //           label="Email"
    //           name="email"
    //           rules={[{ required: true, message: "please enter your email" }]}
    //         >
    //           <Input
    //             prefix={
    //               <Icon icon="fluent:mail-24-regular" height={24} width={24} />
    //             }
    //             onChange={() => setLoading("")}
    //             size="large"
    //           />
    //         </Form.Item>
    //         <Form.Item
    //           label="Password"
    //           name="password"
    //           rules={[
    //             { required: true, message: "please enter your password" },
    //           ]}
    //         >
    //           <Input.Password
    //             prefix={
    //               <Icon
    //                 icon="fluent:lock-closed-24-regular"
    //                 height={24}
    //                 width={24}
    //               />
    //             }
    //             onChange={() => setLoading("")}
    //             size="large"
    //           />
    //         </Form.Item>
    //         {loading === "rejected" && (
    //           <Text type="danger"> Invalid email and password </Text>
    //         )}
    //         <Form.Item valuePropName="checked">
    //           <Checkbox>Remember me.</Checkbox>{" "}
    //           <Link className="bl-clr" to="/erp/forgetpassword">
    //             Forget Password ?
    //           </Link>
    //         </Form.Item>
    //         <Form.Item>
    //           <Button
    //             type="primary"
    //             htmlType="submit"
    //             style={{ width: "100%" }}
    //             loading={loading === "pending" ? true : false}
    //           >
    //             {loading === "pending" ? "Loading..." : "Submit"}
    //           </Button>
    //         </Form.Item>
    //       </Form>
    //     </div>
    //   </div>
    // </div>
    <div className="cm-box bg-g-light container">
      <div className="sm-box">
        <div>
          <img src="https://www.corpseed.com/assets/img/brands/CORPSEED.webp" />
          <h3 style={{margin:'4px 0px 4px 14px',fontWeight:'bold',fontSize:'24px'}}>Sign in</h3>
        </div>
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
            rules={[{ required: true, message: "please enter your password" }]}
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
          <Form.Item valuePropName="checked">
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
  )
}

export default Login
