import {
  Button,
  Drawer,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Tag,
  Typography,
} from "antd"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import CommonTable from "../../components/CommonTable"
import MainHeading from "../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  allVendorsCategory,
  createVendorsCategory,
  createVendorsSubCategory,
  getSingleCategoryDataById,
  updateProcurementUsers,
  updateVendorsCategory,
} from "../../Toolkit/Slices/LeadSlice"
import { useParams } from "react-router-dom"
import { getProcurementAssigneeList } from "../../Toolkit/Slices/CommonSlice"
import { Icon } from "@iconify/react"

const { Text } = Typography

const Procurement = () => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const vendorsCategoryList = useSelector(
    (state) => state.leads.vendorsCategoryList
  )

  const singleCategoryDetail = useSelector(
    (state) => state.leads.singleCategoryDetail
  )
  const procurementAssigneeList = useSelector(
    (state) => state.common.procurementAssigneeList
  )
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openModal1, setOpenModal1] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const [openModal3, setOpenModal3] = useState(false)
  const [categoryData, setCategoryData] = useState(null)
  const [subCategoryData, setSubCategoryData] = useState(null)
  const [updateCategoryData, setUpDateCategoryData] = useState(null)

  useEffect(() => {
    dispatch(allVendorsCategory())
  }, [dispatch])

  useEffect(() => {
    dispatch(getProcurementAssigneeList(userid))
  }, [userid, dispatch])

  const handleOpenDrawer = (data) => {
    if (data?.id) {
      setOpenDrawer(true)
      dispatch(getSingleCategoryDataById(data?.id))
      setCategoryData(data)
    }
  }

  const handleChangeAssignee = useCallback(
    (values) => {
      dispatch(
        updateProcurementUsers({
          data: values?.usersId,
          subCategoryId: subCategoryData?.subCategoryId,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Assignee updated successfully" })
            setOpenModal(false)
            dispatch(getSingleCategoryDataById(categoryData?.id))
            form.resetFields()
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !." }))
    },
    [subCategoryData, dispatch, categoryData, form]
  )

  const column = useMemo(() => {
    const item = [
      {
        dataIndex: "id",
        title: "Id",
        width: 100,
      },
      {
        dataIndex: "vendorCategoryName",
        title: "Category name",
        render: (_, data) => (
          <Text
            className="link-heading"
            onClick={() => handleOpenDrawer(data)}
            style={{ cursor: "pointer" }}
          >
            {data?.vendorCategoryName}
          </Text>
        ),
      },
      {
        title: "Added by",
        dataIndex: "addedByUserName",
      },
      {
        title: "Date",
        dataIndex: "date",
      },
      {
        title: "Update category",
        dataIndex: "updateCategory",
        render: (_, data) => (
          <Button
            size="small"
            type="text"
            onClick={() => {
              form1.setFieldsValue({ categoryName: data?.vendorCategoryName })
              setOpenModal1(true)
            }}
          >
            <Icon icon="fluent:edit-24-regular" />
          </Button>
        ),
      },
    ]
    return item
  })

  const subCategoryColumn = [
    {
      dataIndex: "subCategoryId",
      title: "Id",
      width: 100,
    },
    {
      dataIndex: "subCategoryName",
      title: "Sub category name",
    },
    {
      dataIndex: "assignedUsers",
      title: "Assigned user",
      render: (_, data) =>
        data?.assignedUsers?.map((item, idx) => (
          <Tag className="tags" key={`${idx}procurement`}>
            {item?.userName}
          </Tag>
        )),
    },
    {
      dataIndex: "updateUsers",
      title: "Update assignee",
      render: (_, data) => {
        return (
          <Button
            size="small"
            type="text"
            onClick={() => {
              setOpenModal(true)
              form.setFieldsValue({
                usersId: data?.assignedUsers?.map((item) => item?.userId),
              })
              setSubCategoryData(data)
            }}
          >
            <Icon icon="fluent:edit-24-regular" />
          </Button>
        )
      },
    },
    {
      title: "Update subcategory",
      dataIndex: "updateSubcategory",
      render: (_, data) => (
        <Button size="small" type="text"    >
          <Icon icon="fluent:edit-24-regular" />
        </Button>
      ),
    },
  ]

  const createCategoryForVendors = useCallback(
    (values) => {
      if (updateCategoryData !== null) {
        dispatch(
          updateVendorsCategory({
            userId: userid,
            categoryId: updateCategoryData?.id,
            newCategoryName: values?.categoryName,
          })
        )
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({ message: "Category updated successfully" })
              setOpenModal1(false)
              dispatch(allVendorsCategory())
              setUpDateCategoryData(null)
              form1.resetFields()
            } else {
              notification.error({ message: "Something went wrong !." })
            }
          })
          .catch(() =>
            notification.error({ message: "Something went wrong !." })
          )
      } else {
        dispatch(createVendorsCategory({ userId: userid, ...values }))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({ message: "Category created successfully" })
              setOpenModal1(false)
              dispatch(allVendorsCategory())
              form1.resetFields()
            } else {
              notification.error({ message: "Something went wrong !." })
            }
          })
          .catch(() =>
            notification.error({ message: "Something went wrong !." })
          )
      }
    },
    [userid, form1, dispatch]
  )

  const createSubCategoryForVendors = useCallback(
    (values) => {
      dispatch(
        createVendorsSubCategory({
          userId: userid,
          data: { vendorCategoryId: categoryData?.id, ...values },
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Subcategory added successfully" })
            setOpenModal2(false)
            dispatch(getSingleCategoryDataById(categoryData?.id))
            form2.resetFields()
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !." }))
    },
    [categoryData, form2, dispatch]
  )

  return (
    <>
      <Flex vertical gap={12}>
        <Flex justify="space-between">
          <MainHeading data={`Procurement catagory list`} />
          <Button
            type="primary"
            size="small"
            onClick={() => setOpenModal1(true)}
          >
            Create category
          </Button>
        </Flex>
        <CommonTable
          data={vendorsCategoryList}
          columns={column}
          scroll={{ y: 480 }}
        />
      </Flex>
      <Drawer
        open={openDrawer}
        width={"70%"}
        closeIcon={null}
        onClose={() => setOpenDrawer(false)}
      >
        <Flex justify="space-between">
          <Text className="heading-text">
            {singleCategoryDetail?.categoryName}
          </Text>
          <Button
            size="small"
            type="primary"
            onClick={() => setOpenModal2(true)}
          >
            Create subcategory
          </Button>
        </Flex>
        <CommonTable
          columns={subCategoryColumn}
          data={singleCategoryDetail?.subCategories}
        />
      </Drawer>
      <Modal
        title="Update procurement assignee"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleChangeAssignee}>
          <Form.Item label="Select users" name="usersId">
            <Select
              placeholder="Select assignee"
              mode="multiple"
              maxTagCount="responsive"
              style={{ width: "95%" }}
              options={
                procurementAssigneeList?.length > 0
                  ? procurementAssigneeList?.map((item) => ({
                      label: item?.fullName,
                      value: item?.id,
                    }))
                  : []
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Create category"
        open={openModal1}
        onCancel={() => setOpenModal1(false)}
        onClose={() => setOpenModal1(false)}
        onOk={() => form1.submit()}
      >
        <Form
          layout="vertical"
          form={form1}
          onFinish={createCategoryForVendors}
        >
          <Form.Item label="Enter category name" name="categoryName">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Create subcategory"
        open={openModal2}
        onCancel={() => setOpenModal2(false)}
        onClose={() => setOpenModal2(false)}
        onOk={() => form2.submit()}
      >
        <Form
          layout="vertical"
          form={form2}
          onFinish={createSubCategoryForVendors}
        >
          <Form.Item label="Enter subcategory name" name="subCategoryName">
            <Input />
          </Form.Item>
          <Form.Item
            label="Category research TAT"
            name="vendorCategoryResearchTat"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Category completion TAT" name="vendorCompletionTat">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Procurement
