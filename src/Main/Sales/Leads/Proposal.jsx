import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  notification,
  Radio,
  Row,
  Select,
  Upload,
} from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { getSingleProductByProductId } from "../../../Toolkit/Slices/ProductSlice";
import { leadProposalSentRequest } from "../../../Toolkit/Slices/LeadSlice";

const Proposal = ({ leadid }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productData);
  const contactList = useSelector((state) => state?.leads?.allContactList);
  const leadUserNew = useSelector((state) => state.leads.getAllLeadUserData);
  const [productData, setProductData] = useState([]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleGetProduct = (e) => {
    dispatch(getSingleProductByProductId(e)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        setProductData(resp?.payload?.productAmount);
        const data = resp?.payload?.productAmount;
        data?.map((item) => {
          if (item?.name === "Government") {
            form.setFieldsValue({
              govermentfees: item?.fees,
              govermentCode: item?.hsnNo,
              govermentGst: item?.taxAmount,
            });
          }
          if (item?.name === "Professional fees") {
            form.setFieldsValue({
              professionalFees: item?.fees,
              professionalCode: item?.hsnNo,
              profesionalGst: item?.taxAmount,
            });
          }
          if (item?.name === "Service charges") {
            form.setFieldsValue({
              serviceCharge: item?.fees,
              serviceCode: item?.hsnNo,
              serviceGst: item?.taxAmount,
            });
          }

          if (item?.name === "Other fees") {
            form.setFieldsValue({
              otherFees: item?.fees,
              otherCode: item?.hsnNo,
              otherGst: item?.taxAmount,
            });
          }
        });
      }
    });
  };

  const handleFinish = useCallback(
    (values) => {
      values.leadId = leadid;
      values.gstDocuments = values?.gstDocuments?.[0]?.response;
      dispatch(leadProposalSentRequest(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Estimate created successfully !.",
            });
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    },
    [leadid, dispatch]
  );
  return (
    <Flex>
      <Form
        form={form}
        layout="vertical"
        style={{ width: "60%" }}
        initialValues={{
          cc: [""],
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          label="Select client admin"
          name="admin"
          rules={[{ required: true, message: "please select client admin" }]}
        >
          <Select
            showSearch
            options={
              contactList?.length > 0
                ? contactList?.map((item) => ({
                    label: `${item?.emails} || ${item?.contactNo} `,
                    value: item?.id,
                  }))
                : []
            }
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.List name="cc">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? { label: "Email", required: true } : {})}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input email",
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="example@xyz.com"
                      style={{
                        width: "90%",
                      }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <Button
                      type="text"
                      size="small"
                      style={{ margin: "0px 4px" }}
                      onClick={() => remove(field.name)}
                      danger
                    >
                      <Icon icon="fluent:delete-24-regular" />
                    </Button>
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{
                    width: "80%",
                  }}
                >
                  Add Cc
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item label="Pan number" name="panNo">
          <Input maxLength={10} />
        </Form.Item>

        <Row>
          <Form.Item
            label="Primary contact"
            name="primaryContact"
            layout="horizontal"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Secondary contact"
            name="secondaryContact"
            layout="horizontal"
          >
            <Input />
          </Form.Item>
        </Row>

        <Row>
          <Form.Item
            label="Company name"
            name="companyName"
            layout="horizontal"
          >
            <Input />
          </Form.Item>

          <Form.Item label="GST number" name="gstNo" layout="horizontal">
            <Input />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label="GST type" name="gstType" layout="horizontal">
            <Input />
          </Form.Item>
          <Form.Item label="Company age" name="companyAge" layout="horizontal">
            <Input />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label="Unit name" name="unitName" layout="horizontal">
            <Input />
          </Form.Item>
          <Form.Item
            label="GST documents"
            name="gstDocuments"
            layout="horizontal"
            getValueFromEvent={normFile}
            valuePropName="fileList"
          >
            <Upload
              action="/leadService/api/v1/upload/uploadimageToFileSystem"
              listType="text"
              multiple={true}
            >
              <Button size="small">
                <Icon icon="fluent:arrow-upload-20-filled" />
                Upload
              </Button>
            </Upload>
          </Form.Item>
        </Row>

        <Form.Item
          label="Sales type"
          name="salesType"
          rules={[{ required: true, message: "please select sales type" }]}
        >
          <Radio.Group>
            <Radio value={"Non-Consulting Sale"}>Non-Consulting Sale</Radio>
            <Radio value={"Consulting Sale"}>Consulting Sale</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Product name"
          name="productId"
          rules={[{ required: true, message: "please select product" }]}
        >
          <Select
            showSearch
            options={
              productList?.length > 0
                ? productList?.map((item) => ({
                    label: item?.productName,
                    value: item?.id,
                  }))
                : []
            }
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            onChange={handleGetProduct}
          />
        </Form.Item>

        <Row>
          <Flex gap={30} align="center">
            <Form.Item layout="horizontal" label="Select jurisdiction">
              <Input />
            </Form.Item>
            <Form.Item layout="horizontal">
              <Radio.Group>
                <Radio value="One time">One time</Radio>
                <Radio value="Renewal">Renewal</Radio>
              </Radio.Group>
            </Form.Item>
          </Flex>

          {productData?.map((ele) => {
            return ele?.name === "Professional fees" ? (
              <Row>
                <Flex gap={30} align="center">
                  <Form.Item
                    layout="horizontal"
                    label="Professional fees"
                    name="professionalFees"
                    rules={[
                      {
                        required: true,
                        message: "Please give professional fees",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="professionalCode"
                    rules={[
                      { required: true, message: "please provide HSN number" },
                    ]}
                  >
                    <Input placeholder="Hsn number" />
                  </Form.Item>
                  <Form.Item
                    name="profesionalGst"
                    rules={[
                      { required: true, message: "please provide GST %" },
                    ]}
                  >
                    <Input placeholder="Gst %" />
                  </Form.Item>
                </Flex>
              </Row>
            ) : ele?.name === "Service charges" ? (
              <Row>
                <Flex gap={30} align="center">
                  <Form.Item
                    layout="horizontal"
                    label="Service charges"
                    name="serviceCharge"
                    rules={[
                      {
                        required: true,
                        message: "please give service charges",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="serviceCode"
                    rules={[
                      { required: true, message: "please give HSN number" },
                    ]}
                  >
                    <Input placeholder="HSN number" />
                  </Form.Item>
                  <Form.Item
                    name="serviceGst"
                    rules={[{ required: true, message: "please give GST %" }]}
                  >
                    <Input placeholder="Gst %" />
                  </Form.Item>
                </Flex>
              </Row>
            ) : ele?.name === "Government" ? (
              <Row>
                <Flex gap={30} align="center">
                  <Form.Item
                    layout="horizontal"
                    label="Government fees"
                    name="govermentfees"
                    rules={[
                      { required: true, message: "please give govt. fees" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="govermentCode"
                    rules={[
                      { required: true, message: "please give HSN number" },
                    ]}
                  >
                    <Input placeholder="HSN number" />
                  </Form.Item>
                  <Form.Item
                    name="govermentGst"
                    rules={[{ required: true, message: "please give gst %" }]}
                  >
                    <Input placeholder="Gst %" />
                  </Form.Item>
                </Flex>
              </Row>
            ) : ele?.name === "Other fees" ? (
              <Row>
                <Flex gap={30} align="center">
                  <Form.Item
                    layout="horizontal"
                    label="Other fees"
                    name="otherFees"
                    rules={[
                      {
                        required: true,
                        message: "please give other fees charges",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="otherCode"
                    rules={[
                      { required: true, message: "please give HSN number" },
                    ]}
                  >
                    <Input placeholder="HSN number" />
                  </Form.Item>
                  <Form.Item
                    name="otherGst"
                    rules={[{ required: true, message: "please give GST % " }]}
                  >
                    <Input placeholder="Gst %" />
                  </Form.Item>
                </Flex>
              </Row>
            ) : null;
          })}
        </Row>

        <Form.Item
          label="Select sales person name"
          name="assigneeId"
          rules={[{ required: true, message: "please select sales person" }]}
        >
          <Select
            options={
              leadUserNew?.length > 0
                ? leadUserNew?.map((ele) => ({
                    label: ele?.fullName,
                    value: ele?.id,
                  }))
                : []
            }
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Row>
          <Flex gap={30} align="center">
            <Form.Item
              label="Order number"
              name="orderNumber"
              rules={[{ required: true, message: "please give order number" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Purchase date"
              name="purchaseDate"
              rules={[{ required: true, message: "please select date" }]}
            >
              <DatePicker />
            </Form.Item>
          </Flex>
        </Row>

        <Form.Item
          label="Invoice notes"
          name="invoiceNote"
          rules={[{ required: true, message: "please write invoice notes" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Remarks For Operation"
          name="remarksForOption"
          rules={[{ required: true, message: "please write remarks" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            {" "}
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default Proposal;
