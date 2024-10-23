import { Button, Flex, Row, Typography } from "antd"
import React from "react"
import CommonTable from "../../../components/CommonTable"
import DocumentModal from "./ProductModals/DocumentModal"
import MilestoneModal from "./ProductModals/MilestoneModal"
import { useSelector } from "react-redux"
const { Text } = Typography

const ProductFormDetail = ({ data }) => {
  const productDetail = useSelector(
    (state) => state.product.singleProductDetail
  )

  const priceColumns = [
    {
      title: "Fees types",
    },
    {
      title: "Amount fee",
    },
    {
      title: "HSN for tax",
    },
    {
      title: "Tax",
    },
    {
      title: "Amount",
    },
  ]

  const milestoneColumns = [
    {
      title: "Milestone name",
      dataIndex:'name'
    },
    {
      title: "Time",
      dataIndex:'noOfDays'
    },
    {
      title: "Steps",
      dataIndex:'stageNo'
    },
    {
      title: "Assign %",
      dataIndex:'transferPercent'
    },
    {
      title: "Price %",
      dataIndex:'pricePercent'
    },
    {
      title: "Action",
      render: (_, record) => (
        <Flex>
          <Button size="small" type="text">
            view
          </Button>
          <Button size="small" type="text">
            delete
          </Button>
        </Flex>
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
      title: "Action",
      render: (_, record) => (
        <Flex>
          <Button size="small" type="text">
            view
          </Button>
          <Button size="small" type="text">
            delete
          </Button>
        </Flex>
      ),
    },
  ]

  return (
    <Flex vertical gap={24}>
      <Flex vertical>
        <Flex justify="space-between">
          <Text className="heading-text">Price</Text>
          <Button size="small" type="text">
            +
          </Button>
        </Flex>
        <CommonTable columns={priceColumns} />
      </Flex>

      <Flex vertical>
        <Flex justify="space-between">
          <Text className="heading-text">Milestone</Text>
          <MilestoneModal data={data} />
        </Flex>
        <CommonTable data={productDetail?.productStage} columns={milestoneColumns} />
      </Flex>

      <Flex vertical>
        <Flex justify="space-between">
          <Text className="heading-text">Document</Text>
          <DocumentModal data={data} />
        </Flex>
        <CommonTable
          data={productDetail?.productDoc}
          columns={documentColumns}
        />
      </Flex>
    </Flex>
  )
}

export default ProductFormDetail
