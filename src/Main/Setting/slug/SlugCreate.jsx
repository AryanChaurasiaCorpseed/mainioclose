import React, { useCallback, useEffect, useState } from "react"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllSlugAction,
  getAllSlugCount,
  leadSlugAction,
} from "../../../Toolkit/Slices/LeadSlugSlice"
import EditSlugModal from "../../../Model/EditSlugModal"
import { Button, Form, Input, Modal, notification, Tag, Tooltip } from "antd"
import CommonTable from "../../../components/CommonTable"
import { Icon } from "@iconify/react"
import OverFlowText from "../../../components/OverFlowText"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../../components/Constants"
import CreatePlantSetupModal from "../../../Model/CreatePlantSetupModal"


const SlugCreate = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const totalCount = useSelector((state) => state.leadslug.totalSlugCount)
  const allLeadSlug = useSelector((prev) => prev?.leadslug.allLeadSlug)
  const [slugDep, setSlugDep] = useState(false)
  const [openModal, setOpenModal] = useState(false)
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

  const slugsInTooltip = (data) => {
    return data?.map((items) => {
      return <Tag className="slug-items-tooltip">{items?.name}</Tag>
    })
  }

  const handleSubmit = async (values) => {
    const slugCreation = await dispatch(leadSlugAction(values?.slugName))
    if ((slugCreation.type = "createLeadSlugData/fulfilled")) {
      form.resetFields()
      setSlugDep((prev) => !prev)
      notification.success({ message: "Slug created succesfully" })
    }
  }

  const columns = [
    { title: "Id", dataIndex: "id", fixed: "left", width: 80 },
    { title: "Name", dataIndex: "name", fixed: "left" },
    {
      title: "Slug list",
      dataIndex: "slugList",
      render: (_, data) =>
        data?.slugList?.length > 0 && data?.slugList?.length === 1 ? (
          <OverFlowText>{data?.slugList?.[0]?.name}</OverFlowText>
        ) : data?.slugList?.length >= 2 ? (
          <div className="flex-vert-hori-center">
            <OverFlowText>{data?.slugList?.[0]?.name} </OverFlowText>
            <Tooltip
              title={slugsInTooltip(data?.slugList)}
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
      title: "Plant setup",
      dataIndex: "isPlantSetup",
      render: (_, data) => (data?.isPlantSetup ? "True" : "False"),
    },
    {
      title: "Create/Edit plant setup",
      dataIndex: "plantSetUp",
      render: (_, data) => (
        <CreatePlantSetupModal data={data} paginationData={paginationData} />
      ),
    },
    {
      title: "Edit slug",
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
        <Button type="primary" size="small" onClick={() => setOpenModal(true)}>
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
        scroll={{ y: 500, x: 1200 }}
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
