import React, { useCallback, useEffect, useMemo, useState } from "react"
import CommonTable from "../../components/CommonTable"
import MainHeading from "../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  getAllCompanyFormForMultipleServices,
  updateMultiCompanyFormStatus,
} from "../../Toolkit/Slices/CompanySlice"
import {
  Button,
  Collapse,
  Flex,
  Form,
  Modal,
  notification,
  Pagination,
  Radio,
  Select,
  Typography,
} from "antd"
import OverFlowText from "../../components/OverFlowText"
import ColComp from "../../components/small/ColComp"
import { Icon } from "@iconify/react"
import { modifyObject, updateKeysAtIndex } from "../Common/Commons"
const { Text } = Typography

const Companies = () => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const [form] = Form.useForm()
  const companiesData = useSelector(
    (state) => state.company.companyListWithServices
  )
  const totalCompanyServiceCount = useSelector(
    (state) => state.company.totalCompanyServiceCount
  )
  const [selectedFilter, setSelectedFilter] = useState("initiated")
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 50,
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    dispatch(
      getAllCompanyFormForMultipleServices({
        userId: userid,
        status: selectedFilter,
        page: paginationData?.page,
        size: paginationData?.size,
      })
    )
  }, [dispatch, userid, selectedFilter])

  useEffect(() => {
    let tempData = { ...companiesData }
    setData(modifyObject(tempData))
  }, [companiesData])

  const onSelectChange = useCallback(
    (newSelectedRowKeys, idx) => {
      setSelectedRowKeys(newSelectedRowKeys)
      setData(updateKeysAtIndex(data, idx, newSelectedRowKeys))
    },
    [data]
  )

  const handleUpdateCompaniesStatus = useCallback(
    (values) => {
      dispatch(
        updateMultiCompanyFormStatus({
          currentUserId: userid,
          id: selectedRowKeys,
          ...values,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Company status updated successfully.",
            })
            setOpenModal(false)
            form.resetFields()
          } else {
            notification.error({
              message: "Something went wrong !.",
            })
          }
        })
        .catch(() =>
          notification.error({
            message: "Something went wrong !.",
          })
        )
    },
    [selectedRowKeys, userid, dispatch, form]
  )

  const items = useMemo(() => {
    const columns = [
      {
        title: "Id",
        dataIndex: "id",
        fixed: "left",
        width: 100,
      },
      {
        title: "Company name",
        dataIndex: "companyName",
        fixed: "left",
        render: (_, value) => <OverFlowText>{value?.companyName}</OverFlowText>,
      },
      {
        title: "Lead name",
        dataIndex: "leads",
        render: (_, data) => (
          <OverFlowText>{data?.lead?.leadName}</OverFlowText>
        ),
      },
      {
        title: "Pan number",
        dataIndex: "panNo",
        render: (_, data) => <ColComp data={data?.panNo} />,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        render: (_, data) => <ColComp data={data?.amount} />,
      },
      {
        title: "Gst type",
        dataIndex: "gstType",
        render: (_, data) => <ColComp data={data?.gstType} />,
      },
      {
        title: "Gst no.",
        dataIndex: "gstNo",
        render: (_, data) => <ColComp data={data?.gstNo} />,
      },
      {
        title: "Company age",
        dataIndex: "companyAge",
        render: (_, data) => <ColComp data={data?.companyAge} />,
      },
      {
        title: "Contact name",
        dataIndex: "contactName",
        render: (_, data) => <OverFlowText>{data?.contactName}</OverFlowText>,
      },
      {
        title: "Desigination",
        dataIndex: "desigination",
        render: (_, data) => (
          <OverFlowText>{data?.primaryDesignation}</OverFlowText>
        ),
      },
      {
        title: "Contact number",
        dataIndex: "contactNo",
        render: (_, data) => <ColComp data={data?.contactNo} />,
      },
      {
        title: "Contact whatsapp",
        dataIndex: "contactWhatsappNo",
        render: (_, data) => <ColComp data={data?.contactWhatsappNo} />,
      },
      {
        title: "Contact email",
        dataIndex: "contactEmails",
        render: (_, data) => <OverFlowText>{data?.contactEmails}</OverFlowText>,
      },
      {
        title: "Address",
        dataIndex: "address",
        render: (_, value) => <OverFlowText>{value?.address}</OverFlowText>,
      },
      {
        title: "City",
        dataIndex: "city",
        render: (_, data) => <ColComp data={data?.city} />,
      },
      {
        title: "State",
        dataIndex: "state",
        render: (_, data) => <ColComp data={data?.state} />,
      },
      {
        title: "Country",
        dataIndex: "country",
        render: (_, data) => <ColComp data={data?.country} />,
      },
      {
        title: "Pin code",
        dataIndex: "primaryPinCode",
        render: (_, data) => <ColComp data={data?.primaryPinCode} />,
      },
      {
        title: "SContact name",
        dataIndex: "secondaryContactName",
        render: (_, data) => <ColComp data={data?.secondaryContactName} />,
      },
      {
        title: "SDesigination",
        dataIndex: "secondarydesigination",
        render: (_, data) => <ColComp data={data?.secondaryDesignation} />,
      },
      {
        title: "SContact number",
        dataIndex: "secondaryContactNo",
        render: (_, data) => <ColComp data={data?.secondaryContactNo} />,
      },
      {
        title: "SContact whatsapp",
        dataIndex: "secondaryContactWhatsappNo",
        render: (_, data) => (
          <ColComp data={data?.secondaryContactWhatsappNo} />
        ),
      },
      {
        title: "SContact email",
        dataIndex: "secondaryContactEmails",
        render: (_, data) => <ColComp data={data?.secondaryContactEmails} />,
      },
      {
        title: "Secondary address",
        dataIndex: "sAddress",
        render: (_, value) => <OverFlowText>{value?.sAddress}</OverFlowText>,
      },
      {
        title: "Secondary city",
        dataIndex: "sCity",
        render: (_, data) => <ColComp data={data?.sCity} />,
      },
      {
        title: "Secondary state",
        dataIndex: "sState",
        render: (_, data) => <ColComp data={data?.sState} />,
      },
      {
        title: "Secondary sountry",
        dataIndex: "sCountry",
        render: (_, data) => <ColComp data={data?.sCountry} />,
      },
      {
        title: "Secondary pincode",
        dataIndex: "secondaryPinCode",
        render: (_, data) => <ColComp data={data?.secondaryPinCode} />,
      },
      {
        title: "Updated by",
        dataIndex: "updatedBy",
        render: (_, data) => <ColComp data={data?.updatedBy?.fullName} />,
      },
      {
        title: "Comment",
        dataIndex: "comment",
        render: (_, data) => <OverFlowText>{data?.comment}</OverFlowText>,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (_, data) =>
          data.status === "approved" ? (
            <Text>Approved</Text>
          ) : data.status === "disapproved" ? (
            <Text>Disapproved</Text>
          ) : (
            "Initiated"
          ),
      },
      {
        title: "Approved/Disapproved",
        dataIndex: "approvedDisapproved",
        render: (_, data) => (
          <Button
            size="small"
            onClick={() => {
              setOpenModal(true)
              setSelectedRowKeys([data?.id])
              form.setFieldsValue({ status: data?.status })
            }}
          >
            <Icon icon="fluent:keyboard-shift-24-regular" />
          </Button>
        ),
      },
    ]

    return Object?.entries(data).map(([key, value], idx) => ({
      key: idx,
      label: key,
      extra: (
        <Button
          size="small"
          type="primary"
          disabled={value?.selectedKeys?.length === 0 ? true : false}
          onClick={(e) => {
            e.stopPropagation()
            setOpenModal(true)
          }}
        >
          Update status
        </Button>
      ),
      children: (
        <CommonTable
          data={value?.value}
          columns={columns}
          scroll={{ x: 5000, y: 200 }}
          rowSelection={true}
          onRowSelection={(e) => onSelectChange(e, key)}
          selectedRowKeys={value?.selectedKeys}
          rowKey={(record) => record?.id}
        />
      ),
    }))
  }, [data, form, onSelectChange])

  const handlePagination = useCallback(
    (page, size) => {
      dispatch(
        getAllCompanyFormForMultipleServices({
          userId: userid,
          status: selectedFilter,
          page,
          size,
        })
      )
      setPaginationData((prev) => ({ ...prev, page, size }))
    },
    [userid, selectedFilter, dispatch]
  )

  return (
    <Flex vertical>
      <div className="create-user-box">
        <MainHeading data={"Company list"} />
      </div>
      <div className="mt-3">
        <div className="flex-verti-center-hori-start">
          {/* <Search
            size="small"
            onSearch={onSearchLead}
            style={{ width: "220px" }}
            placeholder="search"
            onChange={(e) =>
              !e.target.value
                ? dispatch(
                    searchCompanyForm({
                      inputText: "",
                      userId: userid,
                      page: paginationData?.page,
                      size: paginationData?.size,
                      status: selectedFilter,
                    })
                  )
                : ""
            }
            enterButton="search"
            prefix={<Icon icon="fluent:search-24-regular" />}
          /> */}
          <Select
            style={{ width: "220px" }}
            showSearch
            size="small"
            value={selectedFilter}
            options={[
              { label: "Initiated", value: "initiated" },
              { label: "Approved", value: "approved" },
              { label: "Disapproved", value: "disapproved" },
            ]}
            onChange={(e) => {
              setSelectedFilter(e)
              setPaginationData({
                page: 1,
                size: 50,
              })
            }}
          />
        </div>
        <Flex vertical>
          <Collapse
            accordion
            size="small"
            bordered={false}
            items={items}
            style={{ maxHeight: "70vh", overflow: "auto", marginTop: 8 }}
          />
          <Flex justify="flex-end">
            <Pagination
              size="small"
              responsive={true}
              showLessItems={true}
              defaultPageSize={50}
              total={totalCompanyServiceCount}
              pageSizeOptions={[50, 100, 150]}
              onChange={(e, x) => handlePagination(e, x)}
            />
          </Flex>
        </Flex>
      </div>
      <Modal
        title="Company form Status"
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        open={openModal}
        okText="Submit"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleUpdateCompaniesStatus}
        >
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "please select the status" }]}
          >
            <Radio.Group>
              <Radio value="approved">Approved</Radio>
              <Radio value="disapproved">Disapproved</Radio>
            </Radio.Group>
          </Form.Item>
          {/* <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "please give the comment" }]}
          >
            <Input.TextArea />
          </Form.Item> */}
        </Form>
      </Modal>
    </Flex>
  )
}

export default Companies
