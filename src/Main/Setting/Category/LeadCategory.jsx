import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MainHeading from "../../../components/design/MainHeading"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button, Form, Input, Modal, notification, Popconfirm } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  createLeadCateogry,
  deleteLeadCategory,
  getAllProductWithCattegory,
} from "../../../Toolkit/Slices/LeadSlice"
import CommonTable from "../../../components/CommonTable"
import { Icon } from "@iconify/react"
import OverFlowText from "../../../components/OverFlowText"
toast.configure()

const LeadCategory = () => {
  const { userid } = useParams()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const categoryData = useSelector((state) => state.leads.categoryData)
  const [openModal, setOpenModal] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    dispatch(getAllProductWithCattegory())
  }, [dispatch])

  const handleFinish = (values) => {
    dispatch(createLeadCateogry({ userId: userid, ...values }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Category created successfully !." })
          setOpenModal(false)
          form.resetFields()
          dispatch(getAllProductWithCattegory())
        } else {
          notification.error({ message: "Something went wrong !." })
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }))
  }

  useEffect(() => {
    setFilteredData(categoryData)
  }, [categoryData])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filtered = categoryData?.filter((item) =>
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
    },
    {
      title: "Name",
      dataIndex: "categoryName",
      render: (_, records) => (
        <OverFlowText>{records?.categoryName}</OverFlowText>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      render: (_, status) => new Date(status.createdDate).toLocaleDateString(),
    },
    // {
    //   title: "Document",
    //   dataIndex: "documents",
    //   render: (_, status) => <DocumentModal document={status?.documents} />,
    // },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (_, status) => (
        <Popconfirm
          onConfirm={() =>
            dispatch(deleteLeadCategory(status.id))
              .then((resp) => {
                if (resp.meta.requestStatus === "fulfilled") {
                  notification.success({
                    message: "Category deleted successfully !.",
                  })
                  dispatch(getAllProductWithCattegory())
                } else {
                  notification.error({ message: "Something went wrong !." })
                }
              })
              .catch(() =>
                notification.error({ message: "Something went wrong !." })
              )
          }
        >
          <Button type="text" danger size="small">
            <Icon icon="fluent:delete-20-regular" />
          </Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <div>
      <div className="create-user-box">
        <MainHeading data={`Lead category`} />
        <Button type="primary" size="small" onClick={() => setOpenModal(true)}>
          Create lead category
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
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Enter lead category name"
            name="name"
            rules={[
              { required: true, message: "please enter the lead category" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default LeadCategory
