import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  createAllUrlAction,
  getAllUrlAction,
  handleNextPagination,
  handlePrevPagination,
} from "../../../Toolkit/Slices/LeadUrlSlice"
import MainHeading from "../../../components/design/MainHeading"
import { getAllSlugAction } from "../../../Toolkit/Slices/LeadSlugSlice"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button, Form, Input, Modal, notification, Select, Tooltip, Typography } from "antd"
import EditUrls from "./EditUrls"
import CommonTable from "../../../components/CommonTable"
const { Text } = Typography
toast.configure()

const UrlsPage = () => {
  const [form] = Form.useForm()
  const { allLeadSlug, page } = useSelector((prev) => prev?.leadslug)
  const urlPage = useSelector((state) => state.leadurls.page)
  const [urlDep, setUrlDep] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllSlugAction(page))
  }, [dispatch, page])

  useEffect(() => {
    dispatch(getAllUrlAction(urlPage))
  }, [dispatch, urlDep, urlPage])

  const { allLeadUrl, allLeadUrlLoading, allLeadUrlError } = useSelector(
    (prev) => prev?.leadurls
  )

  const { createLeadUrl, createLeadUrlLoading, createLeadUrlError } =
    useSelector((prev) => prev?.leadurls)

  const handleSubmit = async (values) => {
    const createNewUrl = await dispatch(createAllUrlAction(values))
    if (createNewUrl.type === "createLeadUrlData/fulfilled") {
      notification.success({message:'Url created successfully'})
      setUrlDep((prev) => !prev)
      setOpenModal(false)
      form.resetFields()
    }
    if (createNewUrl.type === "createLeadUrlData/rejected") {
      notification.error("Something Went Wrong")
    }
  }

  const slugsInTooltip = (data) => {
    return data?.map((items) => {
      return <p className="slug-items-tooltip">{items?.name}</p>
    })
  }

  const columns = [
    { title: "id", dataIndex: "id" },
    {
      title: "Url Name",
      dataIndex: "",
      render: (_, data) => <Text>{data?.urlsName?.slice(0, 70)}</Text>,
    },
    {
      title: "Slugs",
      dataIndex: "slugs",
      render: (_, data) =>
        data?.urlSlug?.length > 0 ? (
          <Tooltip title={slugsInTooltip(data?.urlSlug)}>
            {data?.urlSlug?.[0]?.name}
          </Tooltip>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Quality",
      dataIndex: "quality",
      render: (_, data) => <Text>{data?.quality ? "True" : "False"}</Text>,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (_, data) => <EditUrls data={data} />,
    },
  ]

  return (
    <div>
      <MainHeading data={`Urls create`} />
      <div className="lead-box">
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Create url
        </Button>
      </div>
      <CommonTable
        columns={columns}
        data={allLeadUrl}
        nextPage={handleNextPagination}
        prevPage={handlePrevPagination}
        pagination={true}
        scroll={{ y: 550 }}
        prevDisable={urlPage === 0 ? true : false}
        nextDisable={allLeadUrl?.length < 50 ? true : false}
      />

      <Modal
        title="Create url"
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        okText="Submit"
      >
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item
            label="Enter Url Name"
            name="name"
            rules={[{ required: true, message: "please enter url" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select Slug"
            name="urlSlug"
            rules={[{ required: true, message: "please select slug" }]}
          >
            <Select
              allowClear
              mode="multiple"
              showSearch
              options={
                allLeadSlug?.length
                  ? allLeadSlug?.map((item) => ({
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
          <Form.Item
            label="Select Quality"
            name="quality"
            rules={[{ required: true, message: "please select quality" }]}
          >
            <Select
              allowClear
              showSearch
              options={[
                { label: "True", value: true },
                { label: "False", value: false },
              ]}
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

export default UrlsPage
