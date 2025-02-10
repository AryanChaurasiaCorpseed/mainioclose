import {
  Button,
  Flex,
  Modal,
  notification,
  Popconfirm,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import CommonTable from "../../../components/CommonTable";
import DocumentModal from "./ProductModals/DocumentModal";
import MilestoneModal from "./ProductModals/MilestoneModal";
import { useDispatch, useSelector } from "react-redux";
import PriceModal from "./ProductModals/PriceModal";
import TatModal from "./ProductModals/TatModal";
import "./Product.scss";
import {
  deleteDocumentForProduct,
  deleteMileStoneForProduct,
  deletePriceForProduct,
  getSingleProductByProductId,
} from "../../../Toolkit/Slices/ProductSlice";
import { Icon } from "@iconify/react";
import OverFlowText from "../../../components/OverFlowText";
import DocsModal from "./ProductModals/DocsModal";
const { Text } = Typography;

const DocumentViewModal = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpenModal(true)}>
        Doc {data?.id}
      </Button>
      <Modal
        title="View document"
        open={openModal}
        centered
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        width={800}
        height={600}
      >
        <iframe src={data?.name} width={750} height={500} />
      </Modal>
    </>
  );
};

const ProductFormDetail = ({ data }) => {
  const dispatch = useDispatch();
  const productDetail = useSelector(
    (state) => state.product.singleProductDetail
  );

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
      title: "Edit",
      dataIndex: "edit",
      render: (_, priceData) => (
        <PriceModal data={data} edit={true} editData={priceData} />
      ),
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
                  notification.success({
                    message: "Task deleted successfully",
                  });
                  dispatch(getSingleProductByProductId(data?.id));
                } else {
                  notification.error({ message: "Something went wrong !." });
                }
              })
              .catch(() =>
                notification.error({ message: "Something went wrong !." })
              )
          }
        >
          <Button size="small"  danger>
            <Icon icon="fluent:delete-24-regular" /> Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

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
                  notification.success({
                    message: "Task deleted successfully",
                  });
                  dispatch(getSingleProductByProductId(data?.id));
                } else {
                  notification.error({ message: "Something went wrong !." });
                }
              })
              .catch(() =>
                notification.error({ message: "Something went wrong !." })
              )
          }
        >
          <Button size="small" danger>
            <Icon icon="fluent:delete-24-regular" /> Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const documentColumns = [
    {
      title: "Document name",
      dataIndex: "name",
      render: (_, data) => <OverFlowText>{data?.name}</OverFlowText>,
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
                  notification.success({
                    message: "Task deleted successfully",
                  });
                  dispatch(getSingleProductByProductId(data?.id));
                } else {
                  notification.error({ message: "Something went wrong !." });
                }
              })
              .catch(() =>
                notification.error({ message: "Something went wrong !." })
              )
          }
        >
          <Button size="small" danger>
            <Icon icon="fluent:delete-24-regular" /> Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

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
          <Text className="heading-text">Attached documents</Text>
          <DocsModal data={data} />
        </Flex>
        <Flex style={{ width: "100%", padding: 4 }} gap={3}>
          {productDetail?.doc?.map((item) => (
            <DocumentViewModal data={item} />
          ))}
        </Flex>
      </Flex>

      <Flex vertical className="product-container">
        <Flex vertical className="product-container-header" gap={24}>
          <Text className="heading-text">Turn around time</Text>

          <TatModal data={data} productData={productDetail} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductFormDetail;
