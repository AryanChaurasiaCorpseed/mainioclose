import React, { useEffect, useState } from "react";
import MainHeading from "../../../components/design/MainHeading";
import { Button, Form, Input, Modal, notification, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CommonTable from "../../../components/CommonTable";
import { Icon } from "@iconify/react";
import ProductDetails from "./ProductDetails";
import "./Product.scss";
import { useParams } from "react-router-dom";
import {
  createProduct,
  getAllProductData,
} from "../../../Toolkit/Slices/ProductSlice";
import { deleteProduct } from "../../../Toolkit/Slices/LeadSlice";

const ProductsChange = () => {
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [form] = Form.useForm();
  const productData = useSelector((state) => state.product.productData);
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getAllProductData());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(productData);
  }, [productData]);

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    setSearchText(value);
    const filtered = productData?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const ProductCol = [
    { dataIndex: "id", title: "Id", fixed: "left", width: 50 },
    {
      dataIndex: "productName",
      title: "Product name",
      fixed: "left",
      render: (_, records) => (
        <ProductDetails data={records}>{records?.productName}</ProductDetails>
      ),
    },
    {
      dataIndex: "Action",
      title: "Delete",
      render: (_, props) => (
        <Popconfirm
          title="Delete the product"
          description="Are you sure to delete the product"
          onConfirm={() =>
            dispatch(deleteProduct(props.id))
              .then((resp) => {
                if (resp.meta.requestStatus === "fulfilled") {
                  notification.success({
                    message: "Peoduct deleted successfully!.",
                  });
                  dispatch(getAllProductData());
                } else {
                  notification.error({ message: "Something went wrong !." });
                }
              })
              .catch(() =>
                notification.error({ message: "Something went wrong !." })
              )
          }
        >
          <Button size="small" type="text" danger>
            <Icon icon="fluent:delete-20-regular" />
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const handleFinish = (values) => {
    values.userId = userid;
    dispatch(createProduct(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Product created successfully" });
          setOpenModal(false);
        } else {
          notification.error({ message: "Something went wrong!." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong!." }));
  };

  return (
    <div>
      <div className="create-user-box">
        <MainHeading data={`Lead product`} />
        <Button type="primary" size="small" onClick={() => setOpenModal(true)}>
          Add product
        </Button>
      </div>
      <div  className="setting-table">
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

        <CommonTable
          data={filteredData}
          columns={ProductCol}
          scroll={{ y: "72vh" }}
        />
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
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Enter product name"
            name="name"
            rules={[
              { required: true, message: "please enter the product name" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsChange;
