import {
  Button,
  Drawer,
  Flex,
  Form,
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
  getSingleCategoryDataById,
  updateProcurementUsers,
} from "../../Toolkit/Slices/LeadSlice"
import { useParams } from "react-router-dom"
import { getProcurementAssigneeList } from "../../Toolkit/Slices/CommonSlice"
import { Icon } from "@iconify/react"

const { Text } = Typography

const Procurement = () => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const [form] = Form.useForm()
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
  const [categoryData,setCategoryData]=useState(null)
  const [subCategoryData, setSubCategoryData] = useState(null)

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
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !." }))
    },
    [subCategoryData, dispatch,categoryData]
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
        title:'Added by',
        dataIndex:'addedByUserName'
      },
      {
        title:'Date',
        dataIndex:'date'
      }
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
        data?.assignedUsers?.map((item,idx) => (
          <Tag className="tags" key={`${idx}procurement`} >{item?.userName}</Tag>
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
  ]

  return (
    <>
      <Flex vertical gap={12}>
        <MainHeading data={`Procurement catagory list`} />
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
        <Text className="heading-text">
          {singleCategoryDetail?.singleCategoryDetail}
        </Text>
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
    </>
  )
}

export default Procurement
