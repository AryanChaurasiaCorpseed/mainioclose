import { Button, Flex, notification, Popconfirm, Typography } from "antd"
import React from "react"
import CommonTable from "../../../components/CommonTable"
import DocumentModal from "./ProductModals/DocumentModal"
import MilestoneModal from "./ProductModals/MilestoneModal"
import { useDispatch, useSelector } from "react-redux"
import PriceModal from "./ProductModals/PriceModal"
import TatModal from "./ProductModals/TatModal"
import "./Product.scss"
import {
  deleteDocumentForProduct,
  deleteMileStoneForProduct,
  deletePriceForProduct,
  getSingleProductByProductId,
} from "../../../Toolkit/Slices/ProductSlice"
import { Icon } from "@iconify/react"
const { Text } = Typography

const ProductFormDetail = ({ data }) => {
  const dispatch = useDispatch()
  const productDetail = useSelector(
    (state) => state.product.singleProductDetail
  )

  const priceColumns = [
    {
      title: "Fees types",
      dataIndex: "name",
    },
    {
      title: "Amount fee",
      dataIndex: "fees",
    },
    {
      title: "HSN for tax",
      dataIndex: "hsnNo",
    },
    {
      title: "Tax amount %",
      dataIndex: "taxAmount",
    },
    {
      title: "Delete",
      render: (_, record) => (
        <Popconfirm
          title="Delete the task"
          description="Are sure to delete it"
          okText="Yes"
          onConfirm={() =>
            dispatch(deletePriceForProduct(record?.id))
              .then((resp) => {
                if (resp.meta.requestStatus === "fulfilled") {
                  notification.success({ message: "Task deleted successfully" })
                  dispatch(getSingleProductByProductId(data?.id))
                } else {
                  notification.error({ message: "Something went wrong !." })
                }
              })
              .catch(() =>
                notification.error({ message: "Something went wrong !." })
              )
          }
        >
          <Button size="small" type="text" danger>
            <Icon icon="fluent:delete-24-regular" />
          </Button>
        </Popconfirm>
      ),
    },
  ]

  const milestoneColumns = [
    {
      title: "Milestone name",
      dataIndex: "name",
    },
    {
      title: "Time",
      dataIndex: "noOfDays",
    },
    {
      title: "Steps",
      dataIndex: "stageNo",
    },
    {
      title: "Assign %",
      dataIndex: "transferPercent",
    },
    {
      title: "Price %",
      dataIndex: "pricePercent",
    },
    {
      title: "Delete",
      render: (_, record) => (
        <Popconfirm
          title="Delete the task"
          description="Are sure to delete it"
          okText="Yes"
          onConfirm={() =>
            dispatch(deleteMileStoneForProduct(record?.id))
              .then((resp) => {
                if (resp.meta.requestStatus === "fulfilled") {
                  notification.success({ message: "Task deleted successfully" })
                  dispatch(getSingleProductByProductId(data?.id))
                } else {
                  notification.error({ message: "Something went wrong !." })
                }
              })
              .catch(() =>
                notification.error({ message: "Something went wrong !." })
              )
          }
        >
          <Button size="small" type="text" danger>
            <Icon icon="fluent:delete-24-regular" />
          </Button>
        </Popconfirm>
      ),
    },
  ]

  const documentColumns = [
    {
      title: "Document name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Delete",
      render: (_, record) => (
        <Popconfirm
          title="Delete the task"
          description="Are sure to delete it"
          okText="Yes"
          onConfirm={() =>
            dispatch(deleteDocumentForProduct(record?.id))
              .then((resp) => {
                if (resp.meta.requestStatus === "fulfilled") {
                  notification.success({ message: "Task deleted successfully" })
                  dispatch(getSingleProductByProductId(data?.id))
                } else {
                  notification.error({ message: "Something went wrong !." })
                }
              })
              .catch(() =>
                notification.error({ message: "Something went wrong !." })
              )
          }
        >
          <Button size="small" type="text" danger>
            <Icon icon="fluent:delete-24-regular" />
          </Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <Flex vertical gap={16}>
      <Flex className="product-header">
        <Text className="heading-text">{productDetail?.productName}</Text>
      </Flex>
      <Flex vertical className="product-container">
        <Flex
          justify="space-between"
          align="center"
          className="product-container-header"
        >
          <Text className="heading-text">Price</Text>
          <PriceModal data={data} />
        </Flex>
        <CommonTable
          data={productDetail?.productAmount}
          columns={priceColumns}
          scroll={{ y: 120, x: 800 }}
        />
      </Flex>

      <Flex vertical className="product-container">
        <Flex
          justify="space-between"
          align="center"
          className="product-container-header"
        >
          <Text className="heading-text">Milestone</Text>
          <MilestoneModal data={data} />
        </Flex>
        <CommonTable
          data={productDetail?.productStage}
          columns={milestoneColumns}
          scroll={{ y: 120 }}
        />
      </Flex>

      <Flex vertical className="product-container">
        <Flex
          justify="space-between"
          align="center"
          className="product-container-header"
        >
          <Text className="heading-text">Document</Text>
          <DocumentModal data={data} />
        </Flex>
        <CommonTable
          data={productDetail?.productDoc}
          columns={documentColumns}
          scroll={{ y: 120 }}
        />
      </Flex>

      <Flex vertical className="product-container">
        <Flex
          justify="space-between"
          align="center"
          className="product-container-header"
        >
          <Text className="heading-text">Turn around time</Text>
          <TatModal data={data} />
        </Flex>
        
        <Flex>
          <Flex vertical gap={8} className="product-container-description">
            <Flex gap={12}>
              <Text type="secondary">TAT duration :</Text>
              <Text>{productDetail?.tatValue}</Text>
            </Flex>

            <Flex gap={12}>
              <Text type="secondary">TAT type : </Text>
              <Text>{productDetail?.tatType}</Text>
            </Flex>

            <Flex gap={12}>
              <Text type="secondary">Description :</Text>{" "}
              <Text>{productDetail?.description}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProductFormDetail
