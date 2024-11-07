import React, { useCallback, useEffect, useState } from "react"
import CommonTable from "../../../components/CommonTable"
import { Button, Form, Input, Modal, notification } from "antd"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  createIndustry,
  getAllIndustry,
  getAllIndustryDataWithPagination,
} from "../../../Toolkit/Slices/IndustrySlice"

const IndustryData = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [openModal, setOpenModal] = useState(false)
  const allIndustry = useSelector((state) => state.industry.allIndustryDataWithPage)
  const totalCount = useSelector((state) => state.industry.allIndustryDataCount)
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 50,
  })

  useEffect(() => {
    dispatch(getAllIndustryDataWithPagination(paginationData))
  }, [dispatch])

  const handleFinish = (values) => {
    dispatch(createIndustry(values))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Industry created successfully" })
          dispatch(getAllIndustry())
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
        getAllIndustryDataWithPagination({
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
        <MainHeading data={`Industry`} />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Add industry data
        </Button>
      </div>

      <div className="table-responsive">
        <CommonTable
          data={allIndustry}
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
        title={"Add industry data"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        okText="Submit"
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Industry type "
            name="name"
            rules={[
              {
                required: true,
                message: "please give industry name ",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default IndustryData
