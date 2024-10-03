import React, { useCallback, useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllSlugAction,
  getAllSlugCount,
  leadSlugAction,
} from "../../../Toolkit/Slices/LeadSlugSlice"
import EditSlugModal from "../../../Model/EditSlugModal"
import { Button, Form, Input, Modal, notification } from "antd"
import CommonTable from "../../../components/CommonTable"
import { Icon } from "@iconify/react"

const SlugCreate = () => {
  const [slugDep, setSlugDep] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const totalCount = useSelector((state) => state.leadslug.totalSlugCount)
  const { allLeadSlug } = useSelector((prev) => prev?.leadslug)

  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 50,
  })

  useEffect(() => {
    dispatch(
      getAllSlugAction({
        page: paginationData?.page,
        size: paginationData?.size,
      })
    )
    dispatch(getAllSlugCount())
  }, [dispatch, slugDep])

  const handlePagination = useCallback(
    (dataPage, size) => {
      dispatch(
        getAllSlugAction({
          page: dataPage,
          size: size,
        })
      )
      setPaginationData({ size: size, page: dataPage })
    },
    [dispatch]
  )

  const handleSubmit = async (values) => {
    const slugCreation = await dispatch(leadSlugAction(values?.slugName))
    if ((slugCreation.type = "createLeadSlugData/fulfilled")) {
      form.resetFields()
      setSlugDep((prev) => !prev)
      notification.success({message:'Slug created succesfully'})
    }
  }

  const columns = [
    { title: "Id", dataIndex: "id",width:100 },
    { title: "Name", dataIndex: "name" },
    {
      title: "Edit",
      name: "edit",
      width:100,
      render: (_, data) => <EditSlugModal data={data} />,
    },
  ]

  useEffect(() => {
    const allLeadSlugs = [...allLeadSlug]
    setFilteredData(allLeadSlugs)
  }, [allLeadSlug])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filtered = allLeadSlug?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

  return (
    <div>
      <div className="create-user-box">
        <MainHeading data={`Slug create`} />
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Create slug
        </Button>
      </div>
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
        columns={columns}
        data={filteredData?.reverse()}
        pagination={true}
        scroll={{ y: 500 }}
        totalCount={totalCount}
        pageSize={paginationData?.size}
        page={paginationData?.page}
        handlePagination={handlePagination}
      />
      <Modal
        title="Create slug"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Enter slug name"
            name="slugName"
            rules={[{ required: true, message: "please enter slug name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SlugCreate
