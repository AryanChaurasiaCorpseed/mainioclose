import React, { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { postQuery } from "../../../API/PostQuery"
import InputErrorComponent from "../../../components/InputErrorComponent"
import { useCustomRoute } from "../../../Routes/GetCustomRoutes"
import SmallTableScalaton from "../../../components/Scalaton/SmallTableScalaton"
import { deleteQuery } from "../../../API/DeleteQuery"
import MainHeading from "../../../components/design/MainHeading"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button, Form, Input, Modal } from "antd"
import { useDispatch } from "react-redux"
import { createLeadCateogry } from "../../../Toolkit/Slices/LeadSlice"
import CommonTable from "../../../components/CommonTable"
import { Icon } from "@iconify/react"
import OverFlowText from "../../../components/OverFlowText"
toast.configure()

const LeadCategory = () => {
  const { userid } = useParams()
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)

  const [leadCategory, setLeadCategory] = useState({
    name: "",
    userId: userid,
  })

  const [deleteCategoryDep, setDeleteCategoryDep] = useState(false)
  const [createCategoryDep, setCreateCategoryDep] = useState(false)

  const [btnLoading, setBtnLoading] = useState(false)
  const [nameError, setNameError] = useState(false)
  const nameRef = useRef()

  const createCatFun = async (e) => {
    e.preventDefault()

    if (nameRef.current.value === "") {
      setNameError(true)
      return
    }
    setNameError(false)

    setBtnLoading(true)
    try {
      const catDataRes = await postQuery(
        `/leadService/api/v1/category/createCategory`,
        leadCategory
      )
      setCreateCategoryDep((prev) => !prev)
      toast.success("Category Created Succesfully")
      setBtnLoading(false)
      nameRef.current.value = ""
    } catch (err) {
      console.log(err)
      toast.error("Something went Wrong")
      setBtnLoading(false)
    }
  }

  const categoryUrl = `/leadService/api/v1/category/getAllCategories`
  const categoryDep = [createCategoryDep, deleteCategoryDep]

  const { productData: categoryData, loading: categoryLoading } =
    useCustomRoute(categoryUrl, categoryDep)

  const deleteCategoryFun = async (statusId) => {
    if (window.confirm("Are you sure to delete this record?") === true) {
      try {
        const leadCategoryDel = await deleteQuery(
          `/leadService/api/v1/category/deleteCategory?categoryId=${statusId}`
        )
        setDeleteCategoryDep((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleFinish = (values) => {
    dispatch(createLeadCateogry(values)).then(() => window.location.reload())
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
        <Button
          type="text"
          danger
          onClick={() => deleteCategoryFun(status.id)}
          size="small"
        >
          <Icon icon="fluent:delete-20-regular" />
        </Button>
      ),
    },
  ]

  return (
    <div>
      <div className="create-user-box">
        <MainHeading data={`Lead category`} />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Create lead category
        </Button>
      </div>
      <div className="setting-table">
        <div className="table-responsive">
          <CommonTable
            data={categoryData}
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
