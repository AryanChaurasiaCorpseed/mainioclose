import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Select,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addAmountForProduct,
  editAmountForProduct,
  getSingleProductByProductId,
} from "../../../../Toolkit/Slices/ProductSlice";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";

const PriceModal = ({ data, edit, editData }) => {
  const { userid } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [priceData, setPriceData] = useState(null);

  const handleEdit = () => {
    if (editData) {
      form.setFieldsValue({
        name: editData?.name,
        fees: editData?.fees,
        hsnNo: editData?.hsnNo,
        taxAmount: editData?.taxAmount,
      });

      setPriceData(editData);
    }
    setOpenModal(true);
  };

  console.log("dlfkjddsjhfksdhg", editData);

  const handleFinish = useCallback(
    (values) => {
      values.productId = data?.id;
      values.userId = userid;
      if (edit) {
        dispatch(
          editAmountForProduct({ ...values, productAmountId: priceData?.id })
        )
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Price details updated successfully .",
              });
              dispatch(getSingleProductByProductId(data?.id));
              setOpenModal(false);
              setPriceData(null);
              form.resetFields();
            } else {
              notification.error({ message: "Something went wrong !." });
            }
          })
          .catch(() =>
            notification.error({ message: "Something went wrong !." })
          );
      } else {
        dispatch(addAmountForProduct(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Price details added successfully .",
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
      }
    },
    [data, dispatch, form, userid,priceData]
  );
  return (
    <>
      {edit ? (
        <Button size="small" type="text" onClick={handleEdit}>
          <Icon icon="fluent:edit-16-regular" width="16" height="16" />
        </Button>
      ) : (
        <Button size="small" type="text" onClick={() => setOpenModal(true)}>
          <Icon icon="fluent:add-24-filled" />
        </Button>
      )}
      <Modal
        title={edit ? "Update amount details" : "Amount details"}
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
        okButtonProps={{ htmlType: "submit" }}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Name of fee"
            name="name"
            rules={[{ required: true, message: "please enter the fee name" }]}
          >
            <Select
              options={[
                { label: "Professional fees", value: "Professional fees" },
                { label: "Service charges", value: "Service charges" },
                { label: "Government", value: "Government" },
                { label: "Other fees", value: "Other fees" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Fees"
            name="fees"
            rules={[{ required: true, message: "please enter the fees" }]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="HSN no."
            name="hsnNo"
            rules={[{ required: true, message: "please enter the HSN number" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tax amount %"
            name="taxAmount"
            rules={[{ required: true, message: "please enter the tax amount" }]}
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

export default PriceModal;
