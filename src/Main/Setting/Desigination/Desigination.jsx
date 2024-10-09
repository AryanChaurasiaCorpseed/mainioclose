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
import OverFlowText from "../../../components/OverFlowText"
import { Icon } from "@iconify/react"

const Desigination = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const desiginationList = useSelector(
    (state) => state.setting.desiginationList
  )
  const [openModal, setOpenModal] = useState()
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    setFilteredData(desiginationList)
  }, [desiginationList])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filtered = desiginationList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

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
                dispatch(getAllDesiginations())
                playSuccessSound()
                setOpenModal(false)
                form.resetFields()
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
    [dispatch, form]
  )

  useEffect(() => {
    dispatch(getAllDesiginations())
  }, [dispatch])
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Desigination",
      dataIndex: "name",
      render: (info) => <OverFlowText>{info}</OverFlowText>,
    },
    {
      title: "Weight value",
      dataIndex: "weightValue",
    },
  ]
  return (
    <div>
      <div className="create-user-box">
        <MainHeading data={`Desigination`} />
        <Button type="primary" size="small" onClick={() => setOpenModal(true)}>
          Add desigination
        </Button>
      </div>
      <div className="setting-table">
        <div className="flex-verti-center-hori-start mt-2">
          <Input
            value={searchText}
            size="small"
            onChange={handleSearch}
            style={{ width: "220px" }}
            placeholder="search"
            prefix={<Icon icon="fluent:search-24-regular" />}
          />
        </div>
        <div className="table-responsive">
          <CommonTable
            data={filteredData}
            columns={columns}
            scroll={{ y: 520 }}
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
