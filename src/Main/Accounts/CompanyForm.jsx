import React, { useCallback, useEffect, useState } from "react"
import MainHeading from "../../components/design/MainHeading"
import CommonTable from "../../components/CommonTable"
import TableOutlet from "../../components/design/TableOutlet"
import { useDispatch, useSelector } from "react-redux"
import {
  addCommentCompanyForm,
  getAllCompanyByStatus,
  getFormComment,
  handleNextPagination,
  handlePrevPagination,
  searchCompanyForm,
} from "../../Toolkit/Slices/CompanySlice"
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Select,
  Tooltip,
  Typography,
} from "antd"
import {
  getAllContactDetails,
  updateStatusById,
} from "../../Toolkit/Slices/LeadSlice"
import { Icon } from "@iconify/react"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../components/Constants"
import { useParams } from "react-router-dom"
import OverFlowText from "../../components/OverFlowText"
import ColComp from "../../components/small/ColComp"
import CompanyFormModal from "./CompanyFormModal"
import { getAllUsers } from "../../Toolkit/Slices/UsersSlice"
import { getHighestPriorityRole } from "../Common/Commons"
const { Text } = Typography
const { Search } = Input

const CompanyForm = ({ role }) => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const [form] = Form.useForm()
  const leadCompanyList = useSelector(
    (state) => state.company.allLeadCompanyList
  )
  const page = useSelector((state) => state.company.page)
  const currentRoles = useSelector((state) => state?.auth?.roles)
  const currentUserDetail = useSelector(
    (state) => state.auth.getDepartmentDetail
  )
  const [selectedFilter, setSelectedFilter] = useState("initiated")
  const [openModal, setOpenModal] = useState(false)
  const [formId, setFormId] = useState(null)

  useEffect(() => {
    dispatch(
      getAllCompanyByStatus({ id: userid, status: selectedFilter, page: page })
    )
  }, [dispatch, selectedFilter, userid, page])

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllContactDetails())
  }, [dispatch])

  const onSearchLead = (e, b, c) => {
    dispatch(
      searchCompanyForm({
        inputText: e,
        userId: userid,
        page,
        status: selectedFilter,
      })
    )
    if (!b) {
      dispatch(
        searchCompanyForm({
          inputText: "",
          userId: userid,
          page,
          status: selectedFilter,
        })
      )
    }
  }

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
      title: "S Desigination",
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
      render: (_, data) => <ColComp data={data?.secondaryContactWhatsappNo} />,
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
    ...(getHighestPriorityRole(currentRoles) !== "ADMIN" &&
    (selectedFilter === "initiated" || selectedFilter === "disapproved")
      ? [
          {
            title: "Edit company",
            dataIndex: "editCompanyDetails",
            render: (_, records) => (
              <CompanyFormModal
                editInfo={records}
                edit={true}
                selectedFilter={selectedFilter}
              />
            ),
          },
        ]
      : getHighestPriorityRole(currentRoles) === "ADMIN"
      ? [
          {
            title: "Edit company",
            dataIndex: "editCompanyDetails",
            render: (_, records) => (
              <CompanyFormModal
                editInfo={records}
                edit={true}
                selectedFilter={selectedFilter}
              />
            ),
          },
        ]
      : []),
    ...(currentUserDetail?.department === "Accounts" ||
    getHighestPriorityRole(currentRoles) === "ADMIN"
      ? [
          {
            title: "Approved / Disapproved",
            dataIndex: "status",
            render: (_, value) => {
              return (
                <>
                  <Button
                    size="small"
                    shape="round"
                    onClick={() => {
                      setFormId(value?.id)
                      setOpenModal(true)
                      dispatch(getFormComment(value?.id)).then((resp) => {
                        if (resp.meta.requestStatus === "fulfilled") {
                          form.setFieldsValue({
                            comment: resp?.payload,
                            status: value?.status,
                          })
                        }
                      })
                    }}
                  >
                    <Icon icon="fluent:keyboard-shift-24-regular" />
                  </Button>
                  {/* <Tooltip title="Approved" arrow={false}>
                    <Button
                      size="small"
                      type="text"
                      disabled={value?.status === "approved"}
                      onClick={() => {
                        dispatch(
                          updateStatusById({
                            status: "approved",
                            id: value?.id,
                            userid: userid,
                          })
                        )
                          .then((resp) => {
                            if (resp.meta.requestStatus === "fulfilled") {
                              notification.success({
                                message: "Status update successfully",
                              })
                            } else {
                              notification.error({
                                message: "Something went wrong !.",
                              })
                            }
                          })
                          .catch(() => {
                            notification.error({
                              message: "Something went wrong !.",
                            })
                          })
                      }}
                    >
                      <Icon
                        icon="fluent:thumb-like-20-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                        color={value?.status === "approved" ? "green" : ""}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Disapproved" arrow={false}>
                    <Button
                      size="small"
                      type="text"
                      disabled={value?.status === "disapproved"}
                      onClick={() => {
                        dispatch(
                          updateStatusById({
                            status: "disapproved",
                            id: value?.id,
                            userid: userid,
                          })
                        )
                          .then((resp) => {
                            if (resp.meta.requestStatus === "fulfilled") {
                              notification.success({
                                message: "Status update successfully",
                              })
                            } else {
                              notification.error({
                                message: "Something went wrong !.",
                              })
                            }
                          })
                          .catch(() => {
                            notification.error({
                              message: "Something went wrong !.",
                            })
                          })
                      }}
                    >
                      <Icon
                        icon="fluent:thumb-dislike-20-regular"
                        height={BTN_ICON_HEIGHT}
                        width={BTN_ICON_WIDTH}
                        color={value?.status === "disapproved" ? "red" : ""}
                      />
                    </Button>
                  </Tooltip> */}
                </>
              )
            },
          },
        ]
      : []),
  ]

  const handleSubmit = useCallback(
    (values) => {
      dispatch(
        updateStatusById({
          status: values?.status,
          id: formId,
          userid: userid,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Status update successfully",
            })
            setOpenModal(false)
            getAllCompanyByStatus({
              id: userid,
              status: selectedFilter,
              page: page,
            })
          } else {
            notification.error({
              message: "Something went wrong in status !.",
            })
          }
        })
        .catch(() => {
          notification.error({
            message: "Something went wrong in status !.",
          })
        })
      dispatch(addCommentCompanyForm({ id: formId, comment: values?.comment }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Comment update successfully",
            })
            setOpenModal(false)
          } else {
            notification.error({
              message: "Something went wrong in comment !.",
            })
          }
        })
        .catch(() => {
          notification.error({
            message: "Something went wrong in comment !.",
          })
        })
    },
    [formId, userid, dispatch]
  )

  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"Company list"} />
      </div>
      <div className="mt-3">
        <div className="flex-verti-center-hori-start">
          <Search
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
                      page,
                      status: selectedFilter,
                    })
                  )
                : ""
            }
            enterButton="search"
            prefix={<Icon icon="fluent:search-24-regular" />}
          />
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
            onChange={(e) => setSelectedFilter(e)}
          />
        </div>
        <CommonTable
          data={leadCompanyList}
          columns={columns}
          scroll={{ x: 5000, y: 540 }}
          rowSelection={true}
          pagination={true}
          nextPage={handleNextPagination}
          prevPage={handlePrevPagination}
          prevDisable={page === 0 && true}
          nextDisable={leadCompanyList?.length < 50 && true}
        />
      </div>
      <Modal
        title="Company form Status"
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form.submit()}
        open={openModal}
        okText="Submit"
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
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
          <Form.Item
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "please give the comment" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </TableOutlet>
  )
}

export default CompanyForm
