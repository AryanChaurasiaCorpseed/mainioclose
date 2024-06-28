import { Form, Input, Modal, TimePicker } from "antd"
import React, { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { createIvr } from "../Toolkit/Slices/IvrSlice"
import dayjs from "dayjs"

const CreateNEditIVR = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)

  const validatePhoneNumber = (_, value) => {
    if (!value || /^\d{10}$/.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(
      new Error("Phone number must be exactly 10 digits and should be number")
    )
  }

  const handleFinish = useCallback((values) => {
    values.startTime = dayjs(values.startTime).format("hh:mm a")
    values.endTime = dayjs(values.endTime).format("hh:mm a")
    console.log("lskabufgsoufg", values)
    dispatch(createIvr(values))
    setOpenModal(false)
  }, [dispatch])
  return (
    <>
      <button
        className="team-edit-button create-user-btn"
        onClick={() => setOpenModal(true)}
      >
        <i className="fa-solid mr-1 fa-circle-plus"></i>
      </button>
      <Modal
        title="Add Ivr"
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Agent Name"
            name="agentName"
            rules={[{ required: true, message: "please enter agent name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Agent Phone Number"
            name="aggentNumber"
            rules={[
              { required: true, message: "please enter agent phone number" },
              { validator: validatePhoneNumber },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Caller Number"
            name="callerNumber"
            rules={[
              {
                required: true,
                message: "please enter the caller phone number",
              },
              { validator: validatePhoneNumber },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: "please enter start time" }]}
          >
            <TimePicker use12Hours format="h:mm a" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "please enter start time" }]}
          >
            <TimePicker use12Hours format="h:mm a" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Duration (in minutes)"
            name="duration"
            rules={[{ required: true, message: "please enter the duration" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Call Recording  Url"
            name="callRecordingUrl"
            rules={[
              {
                required: true,
                message: "please enter the recodeing url",
                type: "url",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CreateNEditIVR
