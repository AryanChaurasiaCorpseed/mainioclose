import React, { useEffect, useRef, useState } from "react"
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
import OverFlowText from "../../../components/OverFlowText"

const ProductsChange = () => {
  const { userid } = useParams()
  const [addProductDep, setAddProductDep] = useState(false)
  const [deleteCategoryDep, setDeleteCategoryDep] = useState(false)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)

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

  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])


  useEffect(() => {
    setFilteredData(productData)
  }, [productData])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filtered = productData?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

  const ProductCol = [
    { dataIndex: "id", title: "Id", fixed: "left", width: 50 },
    {
      dataIndex: "productName",
      title: "Product name",
      fixed: "left",
      render: (_, records) => (
        <OverFlowText>{records?.productName}</OverFlowText>
      ),
    },
    {
      dataIndex: "govermentfees",
      title: "Govt. fees",
      render: (_, records) => (
        <OverFlowText>{records?.govermentfees}</OverFlowText>
      ),
    },
    {
      dataIndex: "govermentCode",
      title: "Govt. code",
      render: (_, records) => (
        <OverFlowText>{records?.govermentCode}</OverFlowText>
      ),
    },
    {
      dataIndex: "govermentGst",
      title: "Govt. GST (%)",
      render: (_, records) => (
        <OverFlowText>{records?.govermentGst}</OverFlowText>
      ),
    },
    {
      dataIndex: "professionalFees",
      title: "Prof. fees",
      render: (_, records) => (
        <OverFlowText>{records?.professionalFees}</OverFlowText>
      ),
    },
    {
      dataIndex: "professionalCode",
      title: "Prof. code",
      render: (_, records) => (
        <OverFlowText>{records?.professionalCode}</OverFlowText>
      ),
    },
    {
      dataIndex: "profesionalGst",
      title: "Prof. GST (%)",
      render: (_, records) => (
        <OverFlowText>{records?.profesionalGst}</OverFlowText>
      ),
    },
    {
      dataIndex: "serviceCharge",
      title: "Service charge",
      render: (_, records) => (
        <OverFlowText>{records?.serviceCharge}</OverFlowText>
      ),
    },
    {
      dataIndex: "serviceCode",
      title: "Service code",
      render: (_, records) => (
        <OverFlowText>{records?.serviceCode}</OverFlowText>
      ),
    },
    {
      dataIndex: "serviceGst",
      title: "Service GST (%)",
      render: (_, records) => (
        <OverFlowText>{records?.serviceGst}</OverFlowText>
      ),
    },
    {
      dataIndex: "otherFees",
      title: "Other fees",
      render: (_, records) => <OverFlowText>{records?.otherFees}</OverFlowText>,
    },
    {
      dataIndex: "otherCode",
      title: "Other code",
      render: (_, records) => <OverFlowText>{records?.otherCode}</OverFlowText>,
    },
    {
      dataIndex: "otherGst",
      title: "Other GST (%)",
      render: (_, records) => <OverFlowText>{records?.otherGst}</OverFlowText>,
    },
    {
      dataIndex: "Action",
      title: "Delete",
      render: (_, props) => (
        <Button
          size="small"
          type="text"
          danger
          onClick={() => deleteProductFun(props.id)}
        >
          <Icon icon="fluent:delete-20-regular" />
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
      <div className="create-user-box">
        <MainHeading data={`Lead product`} />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add product
        </Button>
      </div>
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
      {productLoading ? (
        <SmallTableScalaton />
      ) : (
        <CommonTable
          data={filteredData}
          columns={ProductCol}
          scroll={{ y: 500, x: 2500 }}
        />
      )}

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
