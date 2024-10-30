import { Button, Form, Input, Modal, notification } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {
  addTATforProduct,
  getSingleProductByProductId,
} from "../../../../Toolkit/Slices/ProductSlice"

const TatModal = ({ data, productData }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      tatValue: productData?.tatValue,
      tatType: productData?.tatType,
      remarks: productData?.description,
    })
  }, [form, productData])

  const handleFinish = useCallback(
    (values) => {
      values.productId = data?.id
      dispatch(addTATforProduct(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "TAT added successfully .",
            })
            dispatch(getSingleProductByProductId(data?.id))
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !." }))
    },
    [data, dispatch, form]
  )
  
  return (
    <>
      <Form layout="inline" size="small" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Tat duration"
          name="tatValue"
          rules={[{ required: true, message: "please enter the Tat" }]}
        >
          <Input variant="borderless" />
        </Form.Item>

        <Form.Item
          label="Type of TAT"
          name="tatType"
          rules={[{ required: true, message: "please enter the type of TAT" }]}
        >
          <Input variant="borderless" />
        </Form.Item>

        <Form.Item
          label="Remarks"
          name="remarks"
          rules={[{ required: true, message: "please give remarks" }]}
        >
          <Input.TextArea
            variant="borderless"
            autoSize={{ maxRows: 3, minRows: 2 }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default TatModal
