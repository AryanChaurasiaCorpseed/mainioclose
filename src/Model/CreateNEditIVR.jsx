import { Button, Form, Input, Modal, notification, TimePicker } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { createIvr, getAllIvrWithPage } from "../Toolkit/Slices/IvrSlice";
import dayjs from "dayjs";

const CreateNEditIVR = ({ paginationData }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const validatePhoneNumber = (_, value) => {
    if (!value || /^\d{10}$/.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("Phone number must be exactly 10 digits and should be number")
    );
  };

  const handleFinish = useCallback(
    (values) => {
      values.startTime = dayjs(values?.startTime).format(
        "ddd, MMM DD YYYY HH:mm:ss"
      );
      values.endTime = dayjs(values?.endTime).format(
        "ddd, MMM DD YYYY HH:mm:ss"
      );
      dispatch(createIvr(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Ivr created successfully !." });
            setOpenModal(false);
            form.resetFields();
            dispatch(getAllIvrWithPage(paginationData));
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        )
    },
    [dispatch,form]
  );
  return (
    <>
      <Button type="primary" onClick={() => setOpenModal(true)}>
        Add ivr
      </Button>
      <Modal
        title="Add ivr"
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Agent name"
            name="agentName"
            rules={[{ required: true, message: "please enter agent name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Agent phone number"
            name="aggentNumber"
            rules={[
              { required: true, message: "please enter agent phone number" },
              { validator: validatePhoneNumber },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Caller number"
            name="callerNumber"
            rules={[
              {
                required: true,
                message: "please enter the caller phone number",
              },
              { validator: validatePhoneNumber },
            ]}
          >
            <Input maxLength={10} />
          </Form.Item>

          <Form.Item
            label="Start time"
            name="startTime"
            rules={[{ required: true, message: "please enter start time" }]}
          >
            <TimePicker use12Hours format="h:mm a" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="End time"
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
            label="Call recording  url"
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
  );
};

export default CreateNEditIVR;
