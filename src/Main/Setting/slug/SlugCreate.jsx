import React, { useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllSlugAction,
  handleNextPagination,
  handlePrevPagination,
  leadSlugAction,
} from "../../../Toolkit/Slices/LeadSlugSlice"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import EditSlugModal from "../../../Model/EditSlugModal"
import { Button, Form, Input, Modal } from "antd"
import CommonTable from "../../../components/CommonTable"
import { Icon } from "@iconify/react"
toast.configure()

const SlugCreate = () => {
  const [slugDep, setSlugDep] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const page = useSelector((state) => state.leadslug.page)

  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    dispatch(getAllSlugAction(page))
  }, [dispatch, slugDep, page])

  const { allLeadSlug } = useSelector((prev) => prev?.leadslug)

  

  const handleSubmit = async (values) => {
    const slugCreation = await dispatch(leadSlugAction(values?.slugName))
    if ((slugCreation.type = "createLeadSlugData/fulfilled")) {
      form.resetFields()
      setSlugDep((prev) => !prev)
      toast.success("Slug Created Succesfully")
    }
  }

  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    {
      title: "Edit",
      name: "edit",
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
        nextPage={handleNextPagination}
        prevPage={handlePrevPagination}
        pagination={true}
        scroll={{ y: 580 }}
        prevDisable={page === 0 ? true : false}
        nextDisable={allLeadSlug?.length < 50 ? true : false}
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
