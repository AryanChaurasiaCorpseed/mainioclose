import React, { useState } from "react"
import "./CommonData.scss"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { forgetPasswordApi } from "../Toolkit/Slices/ForgetPasswordSlice"
import { Icon } from "@iconify/react"
import { Button, Form, Input } from "antd"
toast.configure()

const ForgetPassword = () => {
  const [loading, setLoading] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    setLoading("pending")
    dispatch(forgetPasswordApi(values?.email))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          setLoading("success")
          navigate("/erp/forgetotp")
        }
      })
      .catch((err) => {
        console.log(err)
        setLoading("error")
      })
  }

  return (
    <div>
      <div className="cm-box bg-g-light container">
        <div className="sm-box">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img src="https://www.corpseed.com/assets/img/brands/CORPSEED.webp" alt="" />
            <h3
              style={{
                margin: "4px 0px 4px 14px",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              Forgot password
            </h3>
          </div>
          <Form
            layout="vertical"
            size="large"
            style={{ width: "90%" }}
            onFinish={handleSubmit}
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
                placeholder="Enter your email"
                size="large"
              />
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

export default ForgetPassword
