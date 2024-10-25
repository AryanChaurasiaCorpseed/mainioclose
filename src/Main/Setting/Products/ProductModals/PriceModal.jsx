import { Button, Form, Input, Modal, notification } from 'antd'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addAmountForProduct, getSingleProductByProductId } from '../../../../Toolkit/Slices/ProductSlice'
import { useParams } from 'react-router-dom'
import {Icon} from '@iconify/react'

const PriceModal = ({data}) => {
    const { userid } = useParams()
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [openModal, setOpenModal] = useState(false)
  
    const handleFinish = useCallback(
      (values) => {
        values.productId = data?.id
        values.userId=userid
        dispatch(addAmountForProduct(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Price details added successfully .",
              })
              dispatch(getSingleProductByProductId(data?.id))
              setOpenModal(false)
              form.resetFields()
            } else {
              notification.error({ message: "Something went wrong !." })
            }
          })
          .catch(() => notification.error({ message: "Something went wrong !." }))
      },
      [data, dispatch,form,userid]
    )
    return (
      <>
        <Button size="small" type="text" onClick={() => setOpenModal(true)}>
          <Icon icon="fluent:add-24-filled" />
        </Button>
        <Modal
          title="Amount details"
          open={openModal}
          centered
          onCancel={() => setOpenModal(false)}
          onClose={() => setOpenModal(false)}
          onOk={() => form.submit()}
          okText="Submit"
          okButtonProps={{htmlType:'submit'}}
        >
          <Form
            layout="vertical"
            size="small"
            form={form}
            onFinish={handleFinish}
          >
            <Form.Item
              label="Name of fee"
              name="name"
              rules={[
                { required: true, message: "please enter the fee name" },
              ]}
            >
              <Input />
            </Form.Item>
  
            <Form.Item
              label="Fees"
              name="fees"
              rules={[{ required: true, message: "please enter the fees" }]}
            >
              <Input />
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
              <Input />
            </Form.Item>
            
          </Form>
        </Modal>
      </>
    )
}

export default PriceModal