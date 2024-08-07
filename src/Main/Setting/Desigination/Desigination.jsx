import { Button, Form, Input, Modal, notification, Select } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import CommonTable from "../../../components/CommonTable"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  createDesigination,
  getAllDesiginations,
} from "../../../Toolkit/Slices/SettingSlice"
import { createAuthDesigination } from "../../../Toolkit/Slices/AuthSlice"
import { playErrorSound, playSuccessSound } from "../../Common/Commons"

const Desigination = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const desiginationList = useSelector(
    (state) => state.setting.desiginationList
  )
  const [openModal, setOpenModal] = useState()

  const handleFinish = useCallback(
    (values) => {
      dispatch(createAuthDesigination(values)).then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          dispatch(createDesigination(values))
            .then((info) => {
              if (info.meta.requestStatus === "fulfilled") {
                notification.success({
                  message: "Desigination created successfully",
                })
                playSuccessSound()
                setOpenModal(false)
                dispatch(getAllDesiginations())
              } else if (info.meta.requestStatus === "rejected") {
                notification.success({
                  message: "Something went wrong",
                })
                playErrorSound()
                setOpenModal(false)
              }
            })
            .catch(() => {
              notification.success({
                message: "Something went wrong",
              })
              playErrorSound()
              setOpenModal(false)
            })
        }
      })
    },
    [dispatch]
  )

  useEffect(() => {
    dispatch(getAllDesiginations())
  }, [dispatch])
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Desigination",
      dataIndex: "name",
    },
    {
      title: "Weight value",
      dataIndex: "weightValue",
    },
  ]
  return (
    <div>
      <MainHeading data={`Desigination`} />
      <div className="lead-box">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add desigination
        </Button>
      </div>
      <div className="mt-4 setting-table">
        <div className="table-responsive">
          <CommonTable
            data={desiginationList?.length > 0 ? desiginationList : []}
            columns={columns}
            scroll={{ y: 550 }}
          />
        </div>
      </div>
      <Modal
        title={"Create desigination"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Name "
            name="name"
            rules={[
              {
                required: true,
                message: "please write the something to comment ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Weight "
            name="weight"
            rules={[
              {
                required: true,
                message: "please select the weight for the desigination ",
              },
            ]}
          >
            <Select
              options={[
                {
                  label: "1",
                  value: 1,
                },
                {
                  label: "2",
                  value: 2,
                },
                {
                  label: "3",
                  value: 3,
                },
                {
                  label: "4",
                  value: 4,
                },
                {
                  label: "5",
                  value: 5,
                },
                {
                  label: "6",
                  value: 6,
                },
                {
                  label: "7",
                  value: 7,
                },
                {
                  label: "8",
                  value: 8,
                },
                {
                  label: "9",
                  value: 9,
                },
                {
                  label: "10",
                  value: 10,
                },
              ]}
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              allowClear
              showSearch
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Desigination
