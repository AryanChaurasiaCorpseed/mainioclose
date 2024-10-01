import React, { useCallback, useEffect, useState } from "react"
import "./LeadDetailsPage.scss"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useDispatch, useSelector } from "react-redux"
import {
  changeLeadAssigneeLeads,
  changeLeadStatus,
  createLeadContacts,
  deleteLeadContact,
  editViewData,
  getAllRemarkAndCommnts,
  getSingleLeadDataByLeadID,
  handleLeadassignedToSamePerson,
  updateAutoAssignnee,
  updateLeadDescription,
  updateLeadsContact,
  updateOriginalNameInLeads,
  updateSingleLeadName,
} from "../../../Toolkit/Slices/LeadSlice"
import BulkFileUploader from "../Leads/BulkFileUploader"
import {
  Button,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  List,
  Modal,
  notification,
  Popconfirm,
  Result,
  Row,
  Select,
  Space,
  Typography,
} from "antd"
import { Icon } from "@iconify/react"
import { playErrorSound, playSuccessSound } from "../../Common/Commons"
import CompanyFormModal from "../../Accounts/CompanyFormModal"
import LeadComments from "./LeadComments"
const { Text } = Typography

toast.configure()

const LeadDetailsPage = ({ leadid }) => {
  const [form1] = Form.useForm()
  const { userid } = useParams()
  const dispatch = useDispatch()
  const [descriptionText, setDescriptionText] = useState("")
  const currentUserRoles = useSelector((state) => state?.auth?.roles)
  const { allLeadUrl } = useSelector((prev) => prev?.leadurls)
  const userDataResponse = useSelector(
    (state) => state.leads.getAllLeadUserData
  )
  const getAllStatus = useSelector((state) => state.leads.getAllStatus)
  const singleLeadResponseData = useSelector(
    (state) => state.leads.singleLeadResponseData
  )
  const notesApiData = useSelector((state) => state.leads.remarkData)
  const currentUserDetail = useSelector(
    (state) => state.auth.getDepartmentDetail
  )
  const clientsContact = useSelector((state) => state.leads.clientsContact)
  const slugList = useSelector((state) => state.leadslug.slugList)
  const [openModal, setOpenModal] = useState(false)
  const [contactData, setContactData] = useState(null)
  const [updateLeadNameToggle, setUpdateLeadNameToggle] = useState(true)
  const [updateOriginalName, setUpdateOriginalName] = useState(false)
  const [updatedLeadName, setUpdatedLeadName] = useState("")
  const [showDescriptionField, setShowDescriptionField] = useState(false)
  const [assigneValue, setAssigneValue] = useState(null)

  const [originalData, setOriginalData] = useState({
    leadId: leadid,
    originalName: "",
    currentUserId: userid,
  })

  useEffect(() => {
    setDescriptionText(singleLeadResponseData?.description)
  }, [singleLeadResponseData])

  const getSingleLeadData = useCallback(() => {
    if (leadid) {
      dispatch(getSingleLeadDataByLeadID({ leadid, userid }))
    }
  }, [leadid,userid, dispatch])

  const updateOriginalNameFun = useCallback(() => {
    dispatch(updateOriginalNameInLeads(originalData))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Name updated successfully",
          })
          getSingleLeadData()
          setUpdateOriginalName((prev) => !prev)
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
  }, [originalData, dispatch, getSingleLeadData])

  useEffect(() => {
    if (leadid) {
      dispatch(editViewData(leadid))
      dispatch(getAllRemarkAndCommnts(leadid))
    }
  }, [dispatch, leadid])

  const adminRole = currentUserRoles.includes("ADMIN")

  const changeLeadStatusFun = (statusId) => {
    dispatch(changeLeadStatus({ leadid, userid, statusId }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Status updated successfully",
          })
          getSingleLeadData()
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
  }

  useEffect(() => {
    getSingleLeadData()
  }, [getSingleLeadData])

  const updateLeadNameSinglePage = useCallback(
    (e) => {
      dispatch(updateSingleLeadName({ updatedLeadName, leadid, userid }))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Assignee updated successfully",
            })
            getSingleLeadData()
            setUpdateLeadNameToggle(true)
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
    },
    [updatedLeadName, leadid, userid, dispatch, getSingleLeadData]
  )

  const changeLeadAssignee = async (id) => {
    setAssigneValue(id)
    dispatch(changeLeadAssigneeLeads({ leadid, id, userid }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Assignee updated successfully",
          })
          getSingleLeadData()
          setAssigneValue(null)
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
  }

  const deleteContactFun = useCallback(
    (id) => {
      let data = {
        leadid: leadid,
        id: id,
        userid: userid,
      }
      dispatch(deleteLeadContact(data))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Contact deleted successfully",
            })
            getSingleLeadData()
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
    },
    [leadid, userid, dispatch, getSingleLeadData]
  )


  const sameAssigneePresonFun = async () => {
    if (window.confirm("Aree you Want to Sure")) {
      const autoUpdateSame = await dispatch(
        updateAutoAssignnee({
          leadId: leadid,
          updatedById: userid,
          status: "Badfit",
          autoSame: true,
        })
      )
      if (autoUpdateSame.type === "auto-lead-assignee/rejected")
        return toast.error("Something went Wrong")
      if (autoUpdateSame.type === "auto-lead-assignee/fulfilled") {
        toast.success("Lead Assignee Same Person Succesfully")
      }
    }
  }

  const notSameAssigneePresonFun = async () => {
    if (window.confirm("Aree you Want to Sure")) {
      const autoUpdateNotSame = await dispatch(
        updateAutoAssignnee({
          leadId: leadid,
          updatedById: userid,
          status: "Badfit",
          autoSame: false,
        })
      )
      if (autoUpdateNotSame.type === "auto-lead-assignee/rejected")
        return toast.error("Something went Wrong")
      if (autoUpdateNotSame.type === "auto-lead-assignee/fulfilled") {
        toast.success("Lead Assignee Different Person Succesfully")
      }
    }
  }

  const handleUpdateContact = (value) => {
    form1.setFieldsValue({
      name: value?.clientName,
      email: value?.email,
      contactNo: value?.contactNo,
    })
    setContactData(value)
    setOpenModal(true)
  }

  const handleSubmitContact = useCallback(
    (values) => {
      values.leadId = leadid
      if (contactData) {
        values.id = contactData?.clientId
        values.userId = userid
        dispatch(updateLeadsContact(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Contact details updated successfully.",
              })
              getSingleLeadData()
              setOpenModal(false)
              form1.resetFields()
              dispatch(getSingleLeadDataByLeadID({ leadid, userid }))
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
        setContactData(null)
      } else {
        values.currentUserId = userid
        dispatch(createLeadContacts(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Contact details created successfully.",
              })
              getSingleLeadData()
              setOpenModal(false)
              form1.resetFields()
              dispatch(getSingleLeadDataByLeadID({ leadid, userid }))
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
        setContactData(null)
      }
    },
    [userid, leadid, contactData, dispatch, getSingleLeadData, form1]
  )

  const leadAssignedToSame = (id) => {
    dispatch(handleLeadassignedToSamePerson(id))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Lead assigned to same person successfully.",
          })
          // playSuccessSound()
          getSingleLeadData()
          window.location.reload()
        } else {
          notification.error({ message: "Something went wrong !." })
          playErrorSound()
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong !." })
        playErrorSound()
      })
  }

  const handleUpdateLeadDescription = useCallback(() => {
    let obj = { id: leadid, description: descriptionText }
    dispatch(updateLeadDescription(obj))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Lead description successfully.",
          })
          // playSuccessSound()
          getSingleLeadData()
          setShowDescriptionField(false)
        } else {
          notification.error({ message: "Something went wrong !." })
          playErrorSound()
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong !." })
        playErrorSound()
      })
  }, [leadid, dispatch, descriptionText])

  const items = [
    {
      key: "1",
      label: "Contacts",
      extra: (
        <Button
          size="small"
          type="text"
          onClick={(e) => {
            e.stopPropagation()
            setOpenModal(true)
          }}
        >
          <Icon icon="fluent:add-20-regular" />
        </Button>
      ),
      children: (
        <List
          dataSource={clientsContact}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                title={item?.clientName}
                description={
                  <Space size={2} direction="vertical">
                    <div className="flex-vert-hori-center">
                      <Icon icon="fluent:mail-20-regular" />
                      <Text type="secondary">{item.email}</Text>
                    </div>
                    <div className="flex-vert-hori-center">
                      <Icon icon="fluent:call-20-regular" />
                      <Text type="secondary">{item.contactNo}</Text>
                    </div>
                  </Space>
                }
              />
              <Space size={1}>
                <Button
                  size="small"
                  type="text"
                  onClick={() => handleUpdateContact(item)}
                >
                  <Icon icon="fluent:edit-20-regular" />
                </Button>
                {adminRole && (
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => deleteContactFun(item.clientId)}
                  >
                    <Button size="small" danger type="text">
                      <Icon icon="fluent:delete-20-regular" />
                    </Button>
                  </Popconfirm>
                )}
              </Space>
            </List.Item>
          )}
        />
      ),
    },
  ]

  return Object.keys(singleLeadResponseData)?.length > 0 ? (
    <div className="lead-details cm-padding-one">
      <Row gutter={16}>
        <Col span={9}>
          <div className="left-lead-section">
            {updateOriginalName ? (
              <div className="comp-container">
                <Select
                  size="small"
                  className="comp-component-1"
                  style={{ width: "100%" }}
                  placeholder="select urls"
                  options={allLeadUrl?.map((item) => ({
                    label: item?.urlsName,
                    value: item?.urlsName,
                  }))}
                  onChange={(e) =>
                    setOriginalData((prev) => ({
                      ...prev,
                      originalName: e,
                    }))
                  }
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
                <Space className="comp-component-2">
                  <Button
                    type="primary"
                    size="small"
                    onClick={(e) => updateOriginalNameFun(e)}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setUpdateOriginalName(false)}
                  >
                    Cancel
                  </Button>
                </Space>
              </div>
            ) : (
              <div className="comp-container">
                <div className="flex-vert-hori-center">
                  {singleLeadResponseData?.originalName ? (
                    <Icon
                      icon="fluent:circle-20-filled"
                      height={12}
                      width={12}
                      color="red"
                    />
                  ) : (
                    <Icon
                      icon="fluent:circle-20-filled"
                      height={12}
                      width={12}
                      color="green"
                    />
                  )}
                  {singleLeadResponseData?.count !== undefined && (
                    <Text className="heading-text">
                      {`(${singleLeadResponseData?.count})`}
                    </Text>
                  )}
                  <Text className="heading-text">
                    {singleLeadResponseData?.originalName
                      ? singleLeadResponseData?.originalName
                      : "NA"}
                  </Text>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => setUpdateOriginalName(true)}
                  >
                    <Icon icon="fluent:edit-20-regular" />
                  </Button>
                </div>
              </div>
            )}

            {updateLeadNameToggle ? (
              <div className="comp-container">
                <div className="flex-vert-hori-center">
                  <Text className="heading-text">
                    {singleLeadResponseData?.leadName}
                  </Text>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => setUpdateLeadNameToggle(false)}
                  >
                    <Icon icon="fluent:edit-20-regular" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="comp-container">
                <Select
                  showSearch
                  allowClear
                  size="small"
                  style={{ width: "100%" }}
                  className="comp-component-1"
                  placeholder="select the slug"
                  options={slugList?.map((item) => ({
                    label: item?.name,
                    value: item?.name,
                  }))}
                  onChange={(e) => setUpdatedLeadName(e)}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
                <Space className="comp-component-2">
                  <Button
                    type="primary"
                    size="small"
                    onClick={(e) => updateLeadNameSinglePage(e)}
                  >
                    Save
                  </Button>
                  <Button
                    size="small"
                    onClick={() => setUpdateLeadNameToggle(true)}
                  >
                    Cancel
                  </Button>
                </Space>
              </div>
            )}
            <div className="flex-vert-hori-center">
              <Icon icon="fluent:location-24-regular" />
              <Text type="secondary">
                {singleLeadResponseData?.city
                  ? singleLeadResponseData?.city
                  : "Address"}
              </Text>
            </div>
            <Divider style={{ margin: "6px" }} />
            <div className="lead-assignee-container">
              <Text className="heading-text">Update assignee</Text>
              <Select
                placeholder="Change assignee"
                size="small"
                style={{ width: "100%", margin: "6px 0px" }}
                value={assigneValue}
                options={
                  userDataResponse?.map((ele) => ({
                    label: ele?.fullName,
                    value: ele?.id,
                  })) || []
                }
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                onChange={(e) => changeLeadAssignee(e)}
              />
            </div>
            <div className="flex-vert-hori-center">
              <Icon icon="fluent:person-24-regular" />
              <Text>
                Assignee Person - {singleLeadResponseData?.assigne?.fullName}
              </Text>
            </div>
            <Divider style={{ margin: "6px" }} />
            <Select
              showSearch
              allowClear
              size="small"
              placeholder="change status"
              value={singleLeadResponseData?.status?.id}
              options={
                getAllStatus?.map((item) => ({
                  label: item?.name,
                  value: item?.id,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(e) => changeLeadStatusFun(e)}
            />
            <div className="flex-vert-hori-center">
              <Icon icon="fluent:bookmark-24-regular" />
              <Text>Status - {singleLeadResponseData?.status?.name}</Text>
            </div>
            <Space>
              <Button
                size="small"
                type="primary"
                onClick={sameAssigneePresonFun}
              >
                Same
              </Button>
              <Button size="small" onClick={notSameAssigneePresonFun}>
                Not same
              </Button>
            </Space>

            {singleLeadResponseData?.source === "IVR" && (
              <>
                <Divider style={{ margin: "6px" }} />
                <Text className="heading-text">Lead description</Text>
                {showDescriptionField ? (
                  <div className="comp-container">
                    <Input.TextArea
                      value={descriptionText}
                      onChange={(e) => setDescriptionText(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="description-container">
                    <Text>{descriptionText}</Text>
                  </div>
                )}

                {(currentUserDetail?.department === "Quality Team" ||
                  currentUserRoles?.includes("ADMIN")) && (
                  <Space>
                    <Button
                      size="small"
                      onClick={() =>
                        setShowDescriptionField(!showDescriptionField)
                      }
                    >
                      {showDescriptionField ? "Cancel" : "Edit"}
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      disabled={!showDescriptionField}
                      onClick={handleUpdateLeadDescription}
                    >
                      Submit
                    </Button>
                  </Space>
                )}
              </>
            )}

            <Divider style={{ margin: "6px" }} />
            <div className="flex-vert-hori-center">
              <Icon icon="fluent:link-24-filled" />
              <Text type="secondary">{singleLeadResponseData?.urls} </Text>
            </div>
            <Divider style={{ margin: "6px" }} />
            <Collapse
              accordion
              defaultActiveKey={["1"]}
              items={items}
              bordered={false}
            />
          </div>
        </Col>
        <Col span={15}>
          <div className="flex-justify-end">
            <div className="btn-view-container">
              <Button size="small" onClick={() => leadAssignedToSame(leadid)}>
                Assign to same person{" "}
              </Button>
              <CompanyFormModal
                detailView={true}
                data={singleLeadResponseData}
              />
            </div>
          </div>

          <div className="lead-filter-above">
            <div className={`notes-box mt-2`}>
              <div className="side-notes">
                <BulkFileUploader leadid={leadid} />
              </div>
            </div>
          </div>
          <LeadComments list={notesApiData} leadid={leadid} />
        </Col>
      </Row>
      <Modal
        title={contactData ? "Edit contact details" : "Create contact"}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
        onOk={() => form1.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form1} onFinish={handleSubmitContact}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "name field can not blank" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            // rules={[{ required: true, message: "please give email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="contactNo"
            rules={[{ required: true, message: "please enter phone number" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  ) : (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the data is not available."
    />
  )
}

export default LeadDetailsPage
