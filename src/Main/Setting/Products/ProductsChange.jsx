import React, { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useCustomRoute } from "../../../Routes/GetCustomRoutes"
import { postQuery } from "../../../API/PostQuery"
import InputErrorComponent from "../../../components/InputErrorComponent"
import SmallTableScalaton from "../../../components/Scalaton/SmallTableScalaton"
import { deleteQuery } from "../../../API/DeleteQuery"
import LongInput from "../../../components/Inputs/LongInput"
import UserLeadComponent from "../../../Tables/UserLeadComponent"
import MainHeading from "../../../components/design/MainHeading"
import { Button, Form, Input, Modal, Select } from "antd"
import { useDispatch } from "react-redux"
import CommonTable from "../../../components/CommonTable"
import { Icon } from "@iconify/react"

const ProductsChange = () => {
  const { userid } = useParams()

  const [addNewProduct, setAddNewProduct] = useState({
    name: "",
    categoryId: null,
    userId: userid,
    govermentfees: 0,
    govermentCode: "",
    govermentGst: 0,
    professionalFees: 0,
    professionalCode: "",
    profesionalGst: 0,
    serviceCharge: 0,
    serviceCode: "",
    serviceGst: 0,
    otherFees: 0,
    otherCode: "",
    otherGst: 0,
  })

  const [nameError, setNameError] = useState(false)
  const [catError, setcatError] = useState(false)
  const [addProductDep, setAddProductDep] = useState(false)
  const [deleteCategoryDep, setDeleteCategoryDep] = useState(false)

  const nameRef = useRef()
  const catRef = useRef()
  const govermentfeesRef = useRef()
  const govermentGstRef = useRef()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)

  const getProductData = (e) => {
    setAddNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const createNewProduct = async (e) => {
    e.preventDefault()

    if (nameRef.current.value === "") {
      setNameError(true)
      return
    }

    if (addNewProduct.categoryId === null) {
      setcatError(true)
      return
    }

    try {
      const productData = await postQuery(
        `/leadService/api/v1/product/createProduct`,
        addNewProduct
      )
      setAddProductDep((prev) => !prev)
      setAddNewProduct({
        name: "",
        categoryId: null,
        userId: userid,
        govermentfees: 0,
        govermentCode: "",
        govermentGst: 0,
        professionalFees: 0,
        professionalCode: "",
        profesionalGst: 0,
        serviceCharge: 0,
        serviceCode: "",
        serviceGst: 0,
        otherFees: 0,
        otherCode: "",
        otherGst: 0,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const categoryUrl = `/leadService/api/v1/category/getAllCategories`
  const categoryDep = []

  const { productData: categoryData, loading: categoryLoading } =
    useCustomRoute(categoryUrl, categoryDep)

  const productUrl = `/leadService/api/v1/product/getAllProducts`
  const productDep = [addProductDep, deleteCategoryDep]

  const { productData: productData, loading: productLoading } = useCustomRoute(
    productUrl,
    productDep
  )

  const ProductCol = [
    { dataIndex: "id", title: "ID", fixed: "left", width: 80 },
    {
      dataIndex: "productName",
      title: "Product name",
      fixed: "left",
      width: 150,
    },
    { dataIndex: "govermentfees", title: "Govt. fees", width: 150 },
    { dataIndex: "govermentCode", title: "Govt. Code", width: 150 },
    { dataIndex: "govermentGst", title: "Govt. GST (%)", width: 150 },
    { dataIndex: "professionalFees", title: "Prof. Fees", width: 150 },
    { dataIndex: "professionalCode", title: "Prof. Code", width: 150 },
    { dataIndex: "profesionalGst", title: "Prof. GST (%)", width: 150 },
    { dataIndex: "serviceCharge", title: "Service Charge", width: 150 },
    { dataIndex: "serviceCode", title: "Service Code", width: 150 },
    { dataIndex: "serviceGst", title: "Service GST (%)", width: 150 },
    { dataIndex: "otherFees", title: "Other Fees", width: 150 },
    { dataIndex: "otherCode", title: "Other Code", width: 150 },
    { dataIndex: "otherGst", title: "Other GST (%)", width: 150 },
    {
      dataIndex: "Action",
      title: "Delete",
      width: 150,
      render: (_, props) => (
        <Button size="small" onClick={() => deleteProductFun(props.id)}>
          <Icon icon="fluent:delete-20-filled" />
        </Button>
      ),
    },
  ]

  const deleteProductFun = async (statusId) => {
    if (window.confirm("Are you sure to delete this record?") == true) {
      try {
        const leadProductDel = await deleteQuery(
          `/leadService/api/v1/product/delete?id=${statusId}`
        )
        setDeleteCategoryDep((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleFinish = async (values) => {
    try {
      const productData = await postQuery(
        `/leadService/api/v1/product/createProduct`,
        values
      )
      if (productData && productData.status === 200) {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <MainHeading data={`Lead Product`} />
      <div className="lead-box">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add product
        </Button>
      </div>
      <div className="mt-4 setting-table">
        {productLoading ? (
          <SmallTableScalaton />
        ) : (
          // <UserLeadComponent columns={ProductCol} row={productData} />
          <CommonTable
            data={productData}
            columns={ProductCol}
            scroll={{ y: 500, x: 1500 }}
          />
        )}
      </div>
      <Modal
        title="Add product"
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form
          layout="vertical"
          style={{ maxHeight: "70vh", overflow: "auto" }}
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Enter product name"
            name="name"
            rules={[
              { required: true, message: "please enter the product name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select category"
            name="categoryId"
            rules={[{ required: true, message: "please select category" }]}
          >
            <Select
              allowClear
              showSearch
              options={
                categoryData?.map((item) => ({
                  label: item?.categoryName,
                  value: item?.id,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item label="Government fees" name="govermentfees">
            <Input />
          </Form.Item>
          <Form.Item label="Government codes" name="govermentCode">
            <Input />
          </Form.Item>
          <Form.Item label="Goverment GST (%)" name="govermentGst">
            <Input />
          </Form.Item>
          <Form.Item label="Professional Fees" name="professionalFees">
            <Input />
          </Form.Item>
          <Form.Item label="Professional Code" name="professionalCode">
            <Input />
          </Form.Item>
          <Form.Item label="Profesional GST (%)" name="profesionalGst">
            <Input />
          </Form.Item>
          <Form.Item label="Service Charge" name="serviceCharge">
            <Input />
          </Form.Item>
          <Form.Item label="Service Code" name="serviceCode">
            <Input />
          </Form.Item>
          <Form.Item label="Service GST (%)" name="serviceGst">
            <Input />
          </Form.Item>
          <Form.Item label="Other Fees" name="otherFees">
            <Input />
          </Form.Item>
          <Form.Item label="Other Code" name="otherCode">
            <Input />
          </Form.Item>
          <Form.Item label="Other GST (%)" name="otherGst">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ProductsChange
