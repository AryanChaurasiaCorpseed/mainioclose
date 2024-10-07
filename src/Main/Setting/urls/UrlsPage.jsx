import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  convertUrlsToProduct,
  createAllUrlAction,
  getAllUrlAction,
  getAllUrlCount,
} from "../../../Toolkit/Slices/LeadUrlSlice"
import MainHeading from "../../../components/design/MainHeading"
import { getAllSlugAction } from "../../../Toolkit/Slices/LeadSlugSlice"
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

const UrlsPage = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const slugList = useSelector((state) => state.leadslug.slugList)
  const totalCount = useSelector((state) => state.leadurls.totalUrlCount)
  const allLeadUrl = useSelector((prev) => prev?.leadurls.allLeadUrl)
  const [urlDep, setUrlDep] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchText, setSearchText] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 50,
  })

  useEffect(() => {
    dispatch(
      getAllUrlAction({
        page: paginationData?.page,
        size: paginationData?.size,
      })
    )
    dispatch(getAllUrlCount())
  }, [dispatch, urlDep])

  const handlePagination = useCallback(
    (dataPage, size) => {
      dispatch(
        getAllUrlAction({
          page: dataPage,
          size: size,
        })
      )
      setPaginationData({ size: size, page: dataPage })
    },
    [dispatch]
  )

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
    { title: "Id", dataIndex: "id", fixed: "left", width: 80 },
    {
      title: "Url name",
      dataIndex: "urlsName",
      fixed: "left",
      render: (_, data) => <OverFlowText>{data?.urlsName}</OverFlowText>,
    },
    {
      title: "Slugs",
      dataIndex: "slugs",
      render: (_, data) =>
        data?.urlSlug?.length > 0 && data?.urlSlug?.length === 1 ? (
          <OverFlowText>{data?.urlSlug?.[0]?.name}</OverFlowText>
        ) : data?.urlSlug?.length >= 2 ? (
          <div className="flex-vert-hori-center">
            <OverFlowText>{data?.urlSlug?.[0]?.name} </OverFlowText>
            <Tooltip
              title={slugsInTooltip(data?.urlSlug)}
              arrow={false}
              style={{ display: "flex", alignItems: "center", gap: "4px" }}
              overlayStyle={{ maxWidth: 800 }}
            >
              <Icon
                icon="fluent:more-circle-24-regular"
                height={BTN_ICON_HEIGHT + 8}
                width={BTN_ICON_WIDTH + 8}
              />
            </Tooltip>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Quality",
      dataIndex: "quality",
      width: 100,
      render: (_, data) => <Text>{data?.quality ? "True" : "False"}</Text>,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      width: 80,
      render: (_, data) => <EditUrls data={data} />,
    },
  ]

  useEffect(() => {
    setFilteredData(allLeadUrl)
  }, [allLeadUrl])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchText(value)
    const filtered = allLeadUrl?.filter((item) =>
      Object.values(item)?.some((val) =>
        String(val)?.toLowerCase()?.includes(value?.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }

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
        data={filteredData}
        rowSelection={true}
        onRowSelection={onSelectChange}
        selectedRowKeys={selectedRowKeys}
        pagination={true}
        scroll={{ y: 500, x: 1000 }}
        rowKey={(row) => row?.id}
        totalCount={totalCount}
        page={paginationData?.page}
        size={paginationData?.size}
        handlePagination={handlePagination}
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
              maxTagCount="responsive"
              showSearch
              options={
                slugList?.length
                  ? slugList?.map((item) => ({
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
