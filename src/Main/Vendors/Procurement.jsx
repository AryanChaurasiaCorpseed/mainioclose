import { Drawer, Flex, Typography } from "antd"
import React, { useEffect, useMemo, useState } from "react"
import CommonTable from "../../components/CommonTable"
import MainHeading from "../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  allVendorsCategory,
  getSingleCategoryDataById,
} from "../../Toolkit/Slices/LeadSlice"

const { Text } = Typography

const Procurement = () => {
  const dispatch = useDispatch()
  const vendorsCategoryList = useSelector(
    (state) => state.leads.vendorsCategoryList
  )

  const singleCategoryDetail = useSelector(
    (state) => state.leads.singleCategoryDetail
  )
  const [openDrawer, setOpenDrawer] = useState(false)

  useEffect(() => {
    dispatch(allVendorsCategory())
  }, [dispatch])

  const handleOpenDrawer = (data) => {
    if (data?.id) {
      setOpenDrawer(true)
      dispatch(getSingleCategoryDataById(data?.id))
    }
  }

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
        dataIndex: "addedByUserName",
        title: "Added by",
      },
      {
        dataIndex: "date",
        title: "Date",
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
      dataIndex: "assigneeUser",
      title: "Assignee",
    },
    {
      dataIndex: "assignedBy",
      title: "Assigned by",
    },
    {
      dataIndex: "date",
      title: "Date",
    },
    {
      dataIndex: "createdBy",
      title: "Created by",
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
    </>
  )
}

export default Procurement
