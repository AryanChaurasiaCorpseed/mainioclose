import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  convertUrlsToProduct,
  createAllUrlAction,
  getAllUrlAction,
  handleNextPagination,
  handlePrevPagination,
} from "../../../Toolkit/Slices/LeadUrlSlice"
import MainHeading from "../../../components/design/MainHeading"
import { getAllSlugAction } from "../../../Toolkit/Slices/LeadSlugSlice"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Tag,
  Tooltip,
  Typography,
} from "antd"
import EditUrls from "./EditUrls"
import CommonTable from "../../../components/CommonTable"
import OverFlowText from "../../../components/OverFlowText"
import { Icon } from "@iconify/react"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../../components/Constants"
const { Text } = Typography
toast.configure()

const UrlsPage = () => {
  const [form] = Form.useForm()
  const { allLeadSlug, page } = useSelector((prev) => prev?.leadslug)
  const urlPage = useSelector((state) => state.leadurls.page)
  const [urlDep, setUrlDep] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
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
      notification.success({ message: "Url created successfully" })
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
      return <Tag className="slug-items-tooltip">{items?.name}</Tag>
    })
  }

  const columns = [
    { title: "Id", dataIndex: "id" },
    {
      title: "Url name",
      dataIndex: "urlsName",
      render: (_, data) => <OverFlowText>{data?.urlsName}</OverFlowText>,
    },
    {
      title: "Slugs",
      dataIndex: "slugs",
      render: (_, data) =>
        data?.urlSlug?.length > 0 && data?.urlSlug?.length === 1 ? (
          <OverFlowText>{data?.urlSlug?.[0]?.name}</OverFlowText>
        ) : data?.urlSlug?.length >= 2 ? (
          <Tooltip
            title={slugsInTooltip(data?.urlSlug)}
            arrow={false}
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <div className="flex-vert-hori-center">
              {data?.urlSlug?.[0]?.name}{" "}
              <Icon
                icon="fluent:more-horizontal-24-regular"
                height={BTN_ICON_HEIGHT}
                width={BTN_ICON_WIDTH}
              />
            </div>
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

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const handleConvertToProduct = useCallback(() => {
    dispatch(
      convertUrlsToProduct({
        urlsId: selectedRowKeys,
      })
    )
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "urls converted to product successfully",
          })
          setSelectedRowKeys([])
        } else {
          notification.error({ message: "Something went wrong !." })
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong !." })
      })
  }, [dispatch, selectedRowKeys])

  return (
    <div>
      <div className="create-user-box">
        <MainHeading data={`Urls list`} />
        <div className="lead-box">
          <Button
            onClick={handleConvertToProduct}
            disabled={selectedRowKeys?.length === 0 ? true : false}
          >
            Convert to product
          </Button>
          <Button type="primary" onClick={() => setOpenModal(true)}>
            Create url
          </Button>
        </div>
      </div>

      <CommonTable
        columns={columns}
        data={allLeadUrl}
        rowSelection={true}
        onRowSelection={onSelectChange}
        selectedRowKeys={selectedRowKeys}
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
            label="Enter url name"
            name="name"
            rules={[{ required: true, message: "please enter url" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select slug"
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
            label="Select quality"
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
