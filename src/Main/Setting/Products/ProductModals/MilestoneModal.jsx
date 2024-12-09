import React, { useCallback, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
  Upload,
} from "antd";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import {
  addMilestoneForProduct,
  getSingleProductByProductId,
} from "../../../../Toolkit/Slices/ProductSlice";

const MilestoneModal = ({ data }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);

  const handleFinish = useCallback(
    (values) => {
      values.productId = data?.id;
      dispatch(addMilestoneForProduct(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Milestone is added successfully .",
            });
            dispatch(getSingleProductByProductId(data?.id));
            setOpenModal(false);
            form.resetFields();
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    },
    [data, dispatch, form]
  );
  return (
    <>
      <Button size="small" type="text" onClick={() => setOpenModal(true)}>
        <Icon icon="fluent:add-24-filled" />
      </Button>
      <Modal
        title="Milestone details"
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Milestone name"
            name="name"
            rules={[
              { required: true, message: "please enter the milestone name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Duration"
            name="noOfDays"
            rules={[{ required: true, message: "please enter the duration" }]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Steps"
            name="stageNo"
            rules={[{ required: true, message: "please enter the steps" }]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Assign %"
            name="transferPercent"
            rules={[{ required: true, message: "please enter the assign %" }]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Price %"
            name="pricePercent"
            rules={[{ required: true, message: "please enter the price %" }]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MilestoneModal;
