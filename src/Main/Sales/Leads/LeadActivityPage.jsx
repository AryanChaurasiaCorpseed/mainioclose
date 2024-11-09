import {
  Button,
  Collapse,
  DatePicker,
  Form,
  Input,
  List,
  Modal,
  notification,
  Popconfirm,
  Select,
  Space,
  Tag,
  Typography,
} from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createNewLeadTask,
  deleteProduct,
  deleteTask,
  getAllTaskData,
  getAllTaskStatus,
  getSingleLeadDataByLeadID,
  updateLeadProducts,
  updateLeadTask,
} from "../../../Toolkit/Slices/LeadSlice"
import dayjs from "dayjs"
import { useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
const { Text } = Typography

export const LeadActivityPage = ({ leadid }) => {
  const dispatch = useDispatch()
  const [taskForm] = Form.useForm()
  const { userid } = useParams()
  const [productForm] = Form.useForm()
  const currentUserRoles = useSelector((state) => state?.auth?.roles)
  const categoryData = useSelector((state) => state.leads.categoryData)
  const allTaskStatusData = useSelector(
    (state) => state.leads.allTaskStatusData
  )
  const singleLeadTaskList = useSelector((state) => state.leads.getSingleLeadTask)
  const allProductsList = useSelector((state) => state.leads.allProductsList)
  const allOportunities = useSelector((state) => state.leads.allOportunities)
  const allProductData = useSelector((state) => state.product.productData)

  const adminRole = currentUserRoles.includes("ADMIN")

  const [openTaskModal, setOpenTaskModal] = useState(false)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [taskData, setTaskData] = useState("")
  const [allFilterProducts, setAllFilterProducts] = useState([])

  useEffect(() => {
    dispatch(getAllTaskData(leadid))
  }, [dispatch])

  const items = [
    {
      key: "1",
      label: "Tasks",
      extra: (
        <Button
          type="primary"
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            setOpenTaskModal(true)
          }}
        >
          <Icon icon="fluent:add-24-filled" /> Add task
        </Button>
      ),
      children: (
        <List
          dataSource={singleLeadTaskList}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                title={item?.name}
                description={
                  <Space size={2} direction="vertical">
                    <div className="flex-vert-hori-center">
                      <Tag
                        color={
                          item?.taskStatus?.name === "Re-Open"
                            ? "error"
                            : item?.taskStatus?.name === "Done"
                            ? "green"
                            : ""
                        }
                      >
                        {item?.taskStatus?.name}
                      </Tag>
                      <Text strong>{item?.assignedBy?.fullName}</Text>
                    </div>
                    <Space size={2} direction="vertical">
                      <Text type="secondary">
                        {new Date(item.expectedDate).toLocaleDateString()} -{" "}
                        {new Date(item.expectedDate).getHours()}:
                        {new Date(item.expectedDate).getMinutes()}
                      </Text>
                      <Text type="secondary">
                        {new Date(item.lastUpdateDate).toLocaleDateString()} -{" "}
                        {new Date(item.lastUpdateDate).getHours()}:
                        {new Date(item.lastUpdateDate).getMinutes()}
                      </Text>
                    </Space>
                  </Space>
                }
              />
              <Space size={1}>
                <Button
                  size="small"
                  type="text"
                  onClick={() => updateTaskData(item)}
                >
                  <Icon icon="fluent:edit-20-regular" />
                </Button>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => deleteTask({ id: item.id, userid: userid })}
                >
                  <Button size="small" type="text" danger>
                    <Icon icon="fluent:delete-20-regular" />
                  </Button>
                </Popconfirm>
              </Space>
            </List.Item>
          )}
        />
      ),
    },
    // {
    //   key: "2",
    //   label: "Product",
    //   extra: (
    //     <Button
    //       size="small"
    //       type="text"
    //       onClick={(e) => {
    //         e.stopPropagation()
    //         setOpenProductModal(true)
    //       }}
    //     >
    //       <Icon icon="fluent:add-20-regular" />
    //     </Button>
    //   ),
    //   children: (
    //     <List
    //       dataSource={allProductsList}
    //       renderItem={(item) => (
    //         <List.Item key={item.email}>
    //           <List.Item.Meta
    //             title={item?.serviceName}
    //             description={item?.name}
    //           />
    //           <Space>
    //             <Popconfirm
    //               title="Delete the product"
    //               description="Are you sure to delete this product?"
    //               onConfirm={() =>
    //                 dispatch(
    //                   deleteProduct({
    //                     serviceId: item.id,
    //                     leadid: leadid,
    //                     userid: userid,
    //                   })
    //                 )
    //               }
    //               okButtonProps={{ disabled: adminRole ? true : false }}
    //             >
    //               <Button size="small" type="text" danger>
    //                 <Icon icon="fluent:delete-20-regular" />
    //               </Button>
    //             </Popconfirm>
    //           </Space>
    //         </List.Item>
    //       )}
    //     />
    //   ),
    // },
    // {
    //   key: "3",
    //   label: "Estimate",
    //   children: "",
    // },
    // {
    //   key: "5",
    //   label: "Opportunities",
    //   children: (
    //     <List
    //       dataSource={allOportunities}
    //       renderItem={(item) => (
    //         <List.Item key={item.email}>
    //           <List.Item.Meta
    //             title={"BIS Registration"}
    //             description={
    //               <Space direction="vertical">
    //                 <Text type="secondary">{item?.description}</Text>
    //                 <Text>{item?.estimateClose}</Text>
    //               </Space>
    //             }
    //           />
    //           <Space>
    //             <Popconfirm
    //               title="Delete the product"
    //               description="Are you sure to delete this product?"
    //             >
    //               <Button size="small" type="text" danger>
    //                 <Icon icon="fluent:delete-20-regular" />
    //               </Button>
    //             </Popconfirm>
    //           </Space>
    //         </List.Item>
    //       )}
    //     />
    //   ),
    // },
  ]

  const updateTaskData = (task) => {
    taskForm.setFieldsValue({
      name: task?.name,
      description: task?.description,
      statusId: task?.taskStatus?.id,
      expectedDate: dayjs(task?.expectedDate),
    })
    setOpenTaskModal(true)
    setTaskData(task)
  }

  const handleTaskFormSubmit = useCallback(
    (values) => {
      values.expectedDate = dayjs(values?.expectedDate).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      )
      values.leadId = leadid
      values.assignedById = userid
      values.assigneeId = 0
      values.currentUserId = userid
      if (taskData) {
        values.taskId = taskData?.id
        dispatch(updateLeadTask(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Task updated successfully.",
              })
              dispatch(getAllTaskData(leadid))
              dispatch(getSingleLeadDataByLeadID({ leadid, userid }))
              setOpenTaskModal(false)
              taskForm.resetFields()
            } else {
              notification.error({
                message: "Something went wrong !.",
              })
            }
          })
          .catch(() => {
            notification.error({
              message: "Something went wrong !.",
            })
          })
      } else {
        dispatch(createNewLeadTask(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Task created successfully.",
              })
              dispatch(getAllTaskData(leadid))
              dispatch(getSingleLeadDataByLeadID({ leadid, userid }))
              setOpenTaskModal(false)
              taskForm.resetFields()
            } else {
              notification.error({
                message: "Something went wrong !.",
              })
            }
          })
          .catch(() => {
            notification.error({
              message: "Something went wrong !.",
            })
          })
      }
    },
    [userid, leadid, taskData, dispatch, taskForm]
  )

  const handleProductSubmit = useCallback(
    (values) => {
      values.leadId = leadid
      dispatch(updateLeadProducts(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Product updated successfully.",
            })
            setOpenProductModal(false)
            dispatch(getSingleLeadDataByLeadID({ leadid, userid }))
          } else {
            notification.error({
              message: "Something went wrong !.",
            })
          }
        })
        .catch(() => {
          notification.error({
            message: "Something went wrong !.",
          })
        })
    },
    [leadid, dispatch]
  )

  return (
    <>
      <Collapse
        accordion
        size="small"
        defaultActiveKey={["1"]}
        items={items}
        bordered={false}
      />
      <Modal
        title={taskData ? "Edit task" : "Create task"}
        open={openTaskModal}
        onCancel={() => setOpenTaskModal(false)}
        onClose={() => setOpenTaskModal(false)}
        onOk={() => taskForm.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={taskForm} onFinish={handleTaskFormSubmit}>
          <Form.Item
            label="Title"
            name="name"
            rules={[{ required: true, message: "please enter the title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "please enter the description" },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
          <Form.Item
            label="Date"
            name="expectedDate"
            rules={[{ required: true, message: "please select date and time" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Status"
            name="statusId"
            rules={[{ required: true, message: "please select the status" }]}
          >
            <Select
              showSearch
              allowClear
              options={
                allTaskStatusData?.map((item) => ({
                  label: item?.name,
                  value: item?.id,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit product"
        open={openProductModal}
        onCancel={() => setOpenProductModal(false)}
        onClose={() => setOpenProductModal(false)}
        onOk={() => productForm.submit()}
        okText="Submit"
      >
        <Form
          layout="vertical"
          form={productForm}
          onFinish={handleProductSubmit}
        >
          <Form.Item
            label="Select product category"
            name="serviceName"
            rules={[
              { required: true, message: "please select product category" },
            ]}
          >
            <Select
              showSearch
              allowClear
              options={
                categoryData?.map((item) => ({
                  label: item?.categoryName,
                  value: item?.categoryName,
                })) || []
              }
              onChange={(e) => {
                const filtData = categoryData.filter(
                  (cat) => cat.categoryName === e && cat.products
                )
                setAllFilterProducts(filtData[0]?.products)
              }}
            />
          </Form.Item>
          <Form.Item
            label="Select product"
            name="productId"
            rules={[{ required: true, message: "please select product" }]}
          >
            <Select
              showSearch
              allowClear
              options={
                allFilterProducts?.map((item) => ({
                  label: item?.productName,
                  value: item?.id,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal>
        <Form>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "please enter status" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: true, message: "please enter status" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User"
            name="user"
            rules={[{ required: true, message: "please enter status" }]}
          >
            <Select />
          </Form.Item>
          <Form.Item
            label="Notes"
            name="notes"
            rules={[{ required: true, message: "please enter status" }]}
          >
            <Select />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
