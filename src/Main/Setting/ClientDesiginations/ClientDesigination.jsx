import React, { useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import CommonTable from "../../../components/CommonTable"
import { Button, Form, Input, Modal, notification, Popconfirm } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { Icon } from "@iconify/react"
import {
  createClientDesigination,
  deleteClientDesigination,
  getClientDesiginationList,
  updateClientDesigination,
} from "../../../Toolkit/Slices/SettingSlice"

const ClientDesigination = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const desiginationList = useSelector(
    (state) => state.setting.clientDesiginationList
  )

  const [openModal, setOpenModal] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [editId, setEditId] = useState(null)

  useEffect(() => {
    dispatch(getClientDesiginationList())
  }, [dispatch])

  useEffect(() => {
    setFilteredData(desiginationList)
  }, [desiginationList])

  const handleSearch = (e) => {
    const value = e.target.value?.trim()
    setSearchText(value)
    const filtered = desiginationList?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width:100
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (_, data) => (
        <Button
          size="small"
          onClick={() => {
            form.setFieldsValue({ name: data?.name })
            setOpenModal(true)
            setEditId(data?.id)
          }}
        >
          <Icon icon="fluent:edit-24-regular" />Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, status) => (
        <Popconfirm title='Delete designation' description='Are you sure to delete this designation' onConfirm={()=>{
            dispatch(deleteClientDesigination(status?.id)).then((res)=>{
                if(res.meta.requestStatus==='fulfilled'){
                    notification.success({message:'Designation deleted successfully'})
                    dispatch(getClientDesiginationList())
                }else{
                    notification.error({message:'Something went wrong!.'})
                }
            }).catch(()=>notification.error({message:'Something went wrong!.'}))
        }}>
            <Button  danger size="small" >
          <Icon icon="fluent:delete-20-regular" /> Delete
        </Button>
        </Popconfirm>
      ),
    },
  ]

  const handleFinish = (values) => {
    if (editId) {
      dispatch(updateClientDesigination({ id: editId, ...values }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Designation updated successfully !.",
            })
            dispatch(getClientDesiginationList())
            setOpenModal(false)
            setEditId(null)
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !." }))
    } else {
      dispatch(createClientDesigination(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Designation added successfully !.",
            })
            dispatch(getClientDesiginationList())
            setOpenModal(false)
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !." }))
    }
  }

  return (
    <>
      <div className="create-user-box">
        <MainHeading data={`Client designation`} />
        <Button type="primary" size="small" onClick={() => setOpenModal(true)}>
          Create client designation
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
            scroll={{ y: 550 }}
          />
        </div>
      </div>
      <Modal
        title={editId ? "Edit designation" : "Create designation"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Enter designation"
            name="name"
            rules={[
              { required: true, message: "please enter the designation" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ClientDesigination
