import React, { useCallback, useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import { Button, Form, Input, Modal, notification, Select } from "antd"
import CommonTable from "../../../components/CommonTable"
import {
  createSubsubIndustry,
  getAllIndustry,
  // getAllSubsubIndustry,
  getAllSubSubIndustryWithPagination,
  getTotalSubSubIndustryCount,
} from "../../../Toolkit/Slices/IndustrySlice"
import { useDispatch, useSelector } from "react-redux"

const SubsubIndustry = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const allIndustry = useSelector((state) => state.industry.allIndustry)
  const allSubsubIndustry = useSelector((state) => state.industry.allSubSubIndustryWithPage)
  const totalCount = useSelector((state) => state.industry.totalSubSubIndustryCount)
  const [openModal, setOpenModal] = useState(false)
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 50,
  })

  useEffect(() => {
    dispatch(getAllIndustry())
    dispatch(getAllSubSubIndustryWithPagination(paginationData))
    dispatch(getTotalSubSubIndustryCount())
  }, [dispatch])

  const handleFinish = (values) => {
    dispatch(createSubsubIndustry(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Industry created successfully" })
          dispatch(getAllSubSubIndustryWithPagination(paginationData))
          setOpenModal(false)
          form.resetFields()
        } else {
          notification.error({ message: "Something went wrong !." })
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong !." })
      })
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ]

  const handlePagination = useCallback(
    (dataPage, size) => {
      dispatch(
        getAllSubSubIndustryWithPagination({
          page: dataPage,
          size: size,
        })
      )
      setPaginationData({ size: size, page: dataPage })
    },
    [dispatch]
  )

  return (
    <div>
      <div className="create-user-box">
        <MainHeading data={`Sub industry`} />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add sub sub industry
        </Button>
      </div>

      <div className="table-responsive">
        <CommonTable
          data={allSubsubIndustry}
          columns={columns}
          scroll={{ y: 550 }}
          pagination={true}
          totalCount={totalCount}
          pageSize={paginationData?.size}
          page={paginationData?.page}
          handlePagination={handlePagination}
        />
      </div>
      <Modal
        title={"Add sub sub industry"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Sub industry name"
            name="name"
            rules={[
              {
                required: true,
                message: "please give sub industry name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Select industry data"
            name="industryDataId"
            rules={[
              {
                required: true,
                message: "please select industry to create sub industry",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              mode="multiple"
              maxTagCount='responsive'
              options={
                allIndustry?.length > 0
                  ? allIndustry?.map((item) => ({
                      label: item?.name,
                      value: item?.id,
                    }))
                  : []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SubsubIndustry
