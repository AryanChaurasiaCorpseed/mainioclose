import React, { useCallback, useEffect, useState } from "react"
import "./LeadDetailsPage.scss"
import { Link, useParams } from "react-router-dom"
import { getQuery } from "../../../API/GetQuery"
import { postQuery } from "../../../API/PostQuery"
import { useRef } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import EstimateDesignPage from "../Leads/EstimateDesignPage"
import { useDispatch, useSelector } from "react-redux"
import AllTasksPage from "./AllTasksPage"
import {
  changeLeadAssigneeLeads,
  changeLeadStatus,
  createLeadContacts,
  createNewLeadTask,
  deleteLeadContact,
  deleteProduct,
  deleteTask,
  editViewData,
  getAllLeadUser,
  getAllOppurtunities,
  getAllProductData,
  getAllProductWithCattegory,
  getAllRemarkAndCommnts,
  getAllStatusData,
  getAllTaskData,
  getAllTaskStatus,
  getSingleLeadDataByLeadID,
  handleLeadassignedToSamePerson,
  updateAutoAssignnee,
  updateLeadDescription,
  updateLeadProducts,
  updateLeadsContact,
  updateLeadTask,
  updateOriginalNameInLeads,
  updateSingleLeadName,
} from "../../../Toolkit/Slices/LeadSlice"
import { getAllUrlAction } from "../../../Toolkit/Slices/LeadUrlSlice"
import BulkFileUploader from "../Leads/BulkFileUploader"
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  List,
  Modal,
  notification,
  Popconfirm,
  Result,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd"
import { getAllSlugList } from "../../../Toolkit/Slices/LeadSlugSlice"
import { Icon } from "@iconify/react"
import dayjs from "dayjs"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../../components/Constants"
import { playErrorSound, playSuccessSound } from "../../Common/Commons"
import CompanyFormModal from "../../Accounts/CompanyFormModal"
const { Text } = Typography

toast.configure()

const LeadDetailsPage = ({ leadid }) => {
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const [form3] = Form.useForm()
  const { userid } = useParams()
  const dispatch = useDispatch()
  const fileRef = useRef()
  const [descriptionText, setDescriptionText] = useState("")
  const currentUserRoles = useSelector((state) => state?.auth?.roles)
  const { allLeadUrl } = useSelector((prev) => prev?.leadurls)
  const allTaskStatusData = useSelector(
    (state) => state.leads.allTaskStatusData
  )
  const allOportunities = useSelector((state) => state.leads.allOportunities)
  const allProductData = useSelector((state) => state.leads.allProductData)
  const getSingleLeadTask = useSelector(
    (state) => state.leads.getSingleLeadTask
  )
  const userDataResponse = useSelector(
    (state) => state.leads.getAllLeadUserData
  )
  const categoryData = useSelector((state) => state.leads.categoryData)
  const getAllStatus = useSelector((state) => state.leads.getAllStatus)
  const singleLeadResponseData = useSelector(
    (state) => state.leads.singleLeadResponseData
  )
  const notesApiData = useSelector((state) => state.leads.remarkData)
  const currentUserDetail = useSelector(
    (state) => state.auth.getDepartmentDetail
  )
  const allProductsList = useSelector((state) => state.leads.allProductsList)
  const clientsContact = useSelector((state) => state.leads.clientsContact)
  const slugList = useSelector((state) => state.leadslug.slugList)
  const [openModal, setOpenModal] = useState(false)
  const [contactData, setContactData] = useState(null)
  const [openTaskModal, setOpenTaskModal] = useState(false)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [taskData, setTaskData] = useState("")
  const [notes, setNotes] = useState(false)
  const [allFilterProducts, setAllFilterProducts] = useState([])
  const [updateLeadNameToggle, setUpdateLeadNameToggle] = useState(true)
  const [openAllTask, setOpenAllTask] = useState(false)
  const [estimateOpenBtn, setEstimateOpenBtn] = useState(false)
  const [updateAssignee, setUpdateAssignee] = useState(false)
  const [updateOriginalName, setUpdateOriginalName] = useState(false)
  const [updatedLeadName, setUpdatedLeadName] = useState("")
  const [showDescriptionField, setShowDescriptionField] = useState(false)

  useEffect(() => {
    dispatch(getAllSlugList())
  }, [dispatch])

  const openTasksFun = () => {
    setOpenAllTask((prev) => !prev)
  }

  useEffect(() => {
    dispatch(getAllUrlAction(0))
  }, [dispatch])

  const [originalData, setOriginalData] = useState({
    leadId: leadid,
    originalName: "",
    currentUserId: userid,
  })

  useEffect(() => {
    setDescriptionText(singleLeadResponseData?.description)
  }, [singleLeadResponseData])

  const getSingleLeadData = useCallback(() => {
    dispatch(getSingleLeadDataByLeadID({ leadid, userid }))
  }, [leadid, dispatch])

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
    dispatch(getAllProductData())
    // dispatch(getAllLeadUser(userid))
    dispatch(getAllTaskStatus())
    dispatch(getAllOppurtunities())
    dispatch(getAllProductWithCattegory())
    dispatch(editViewData(leadid))
    // dispatch(getAllStatusData())
    dispatch(getAllTaskData(leadid))
    dispatch(getAllRemarkAndCommnts(leadid))
  }, [dispatch, leadid, userid])

  const adminRole = currentUserRoles.includes("ADMIN")
  const NotesRef = useRef()

  const [remarkMessage, setRemarkMessage] = useState({
    leadId: leadid,
    userId: userid,
    message: "",
    file: "",
  })

  const remarkMessageFunction = (e) => {
    setRemarkMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

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

  // Create New Notes or Remarks
  const createRemarkfun = (e) => {
    e.preventDefault()
    if (NotesRef.current.value === "") {
      toast.error("Notes Can't be Blank")
      return
    }
    const createNewRemark = async () => {
      try {
        const remarkData = await postQuery(
          `/leadService/api/v1/createRemarks`,
          remarkMessage
        )
        NotesRef.current.value = ""
        fileRef.current.value = ""
        window.location.reload()
      } catch (err) {
        console.log(err)
        if (err.response.status === 500) {
          toast.error("Something Went Wrong !.")
        }
      }
    }
    createNewRemark()
  }

  useEffect(() => {
    getSingleLeadData()
  }, [updateAssignee, updateOriginalName, getSingleLeadData])

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
    dispatch(changeLeadAssigneeLeads({ leadid, id, userid }))
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Assignee updated successfully",
          })
          getSingleLeadData()
          setUpdateAssignee((prev) => !prev)
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

  const openImageInNewTab = (imageUrl) => {
    window.open(imageUrl, "_blank")
  }

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

  const updateTaskData = (task) => {
    form2.setFieldsValue({
      name: task?.name,
      description: task?.description,
      statusId: task?.taskStatus?.id,
      expectedDate: dayjs(task?.expectedDate),
    })
    setOpenTaskModal(true)
    setTaskData(task)
  }

  const handleTaskFormSubmit = useCallback(
    (values) => {
      values.expectedDate = dayjs(values?.expectedDate).format(
        "YYYY-MM-DDTHH:mm:ss.SSSZ"
      )
      values.leadId = leadid
      values.assignedById = userid
      values.assigneeId = 0
      values.currentUserId = userid
      if (taskData) {
        values.taskId = taskData?.id
        dispatch(updateLeadTask(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Task updated successfully.",
              })
              dispatch(getAllTaskData(leadid))
              dispatch(getSingleLeadDataByLeadID({ leadid, userid }))
              setOpenTaskModal(false)
              form2.resetFields()
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
      } else {
        dispatch(createNewLeadTask(values))
          .then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              notification.success({
                message: "Task created successfully.",
              })
              dispatch(getAllTaskData(leadid))
              dispatch(getSingleLeadDataByLeadID({ leadid, userid }))
              setOpenTaskModal(false)
              form2.resetFields()
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
    },
    [userid, leadid, taskData, dispatch, form2]
  )

  const handleProductSubmit = useCallback(
    (values) => {
      values.leadId = leadid
      dispatch(updateLeadProducts(values))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Product updated successfully.",
            })
            getSingleLeadData()
            setOpenProductModal(false)
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
    },
    [leadid, dispatch, getSingleLeadData]
  )

  const leadAssignedToSame = (id) => {
    dispatch(handleLeadassignedToSamePerson(id))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Lead assigned to same person successfully.",
          })
          playSuccessSound()
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
          playSuccessSound()
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
    {
      key: "2",
      label: "Tasks",
      extra: (
        <Button
          type="text"
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            setOpenTaskModal(true)
          }}
        >
          <Icon icon="fluent:add-20-regular" />
        </Button>
      ),
      children: (
        <List
          dataSource={getSingleLeadTask}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                title={item?.name}
                description={
                  <Space size={2} direction="vertical">
                    <div className="flex-vert-hori-center">
                      <Tag
                        color={
                          item?.taskStatus?.name === "Re-Open"
                            ? "error"
                            : item?.taskStatus?.name === "Done"
                            ? "green"
                            : ""
                        }
                      >
                        {item?.taskStatus?.name}
                      </Tag>
                      <Text strong>{item?.assignedBy?.fullName}</Text>
                    </div>
                    <Space size={2} direction="vertical">
                      <Text type="secondary">
                        {new Date(item.expectedDate).toLocaleDateString()} -{" "}
                        {new Date(item.expectedDate).getHours()}:
                        {new Date(item.expectedDate).getMinutes()}
                      </Text>
                      <Text type="secondary">
                        {new Date(item.lastUpdateDate).toLocaleDateString()} -{" "}
                        {new Date(item.lastUpdateDate).getHours()}:
                        {new Date(item.lastUpdateDate).getMinutes()}
                      </Text>
                    </Space>
                  </Space>
                }
              />
              <Space size={1}>
                <Button
                  size="small"
                  type="text"
                  onClick={() => updateTaskData(item)}
                >
                  <Icon icon="fluent:edit-20-regular" />
                </Button>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => deleteTask({ id: item.id, userid: userid })}
                >
                  <Button size="small" type="text" danger>
                    <Icon icon="fluent:delete-20-regular" />
                  </Button>
                </Popconfirm>
              </Space>
            </List.Item>
          )}
        />
      ),
    },
    // {
    //   key: "3",
    //   label: "Product",
    //   extra: (
    //     <Button
    //       size="small"
    //       type="text"
    //       onClick={(e) => {
    //         e.stopPropagation()
    //         setOpenProductModal(true)
    //       }}
    //     >
    //       <Icon icon="fluent:add-20-regular" />
    //     </Button>
    //   ),
    //   children: (
    //     <List
    //       dataSource={allProductsList}
    //       renderItem={(item) => (
    //         <List.Item key={item.email}>
    //           <List.Item.Meta
    //             title={item?.serviceName}
    //             description={item?.name}
    //           />
    //           <Space>
    //             <Popconfirm
    //               title="Delete the product"
    //               description="Are you sure to delete this product?"
    //               onConfirm={() =>
    //                 dispatch(
    //                   deleteProduct({
    //                     serviceId: item.id,
    //                     leadid: leadid,
    //                     userid: userid,
    //                   })
    //                 )
    //               }
    //               okButtonProps={{ disabled: adminRole ? true : false }}
    //             >
    //               <Button size="small" type="text" danger>
    //                 <Icon icon="fluent:delete-20-regular" />
    //               </Button>
    //             </Popconfirm>
    //           </Space>
    //         </List.Item>
    //       )}
    //     />
    //   ),
    // },
    // {
    //   key: "4",
    //   label: "Estimate",
    //   children: "",
    // },
    // {
    //   key: "5",
    //   label: "Opportunities",
    //   children: (
    //     <List
    //       dataSource={allOportunities}
    //       renderItem={(item) => (
    //         <List.Item key={item.email}>
    //           <List.Item.Meta
    //             title={"BIS Registration"}
    //             description={
    //               <Space direction="vertical">
    //                 <Text type="secondary">{item?.description}</Text>
    //                 <Text>{item?.estimateClose}</Text>
    //               </Space>
    //             }
    //           />
    //           <Space>
    //             <Popconfirm
    //               title="Delete the product"
    //               description="Are you sure to delete this product?"
    //             >
    //               <Button size="small" type="text" danger>
    //                 <Icon icon="fluent:delete-20-regular" />
    //               </Button>
    //             </Popconfirm>
    //           </Space>
    //         </List.Item>
    //       )}
    //     />
    //   ),
    // },
  ]

  return Object.keys(singleLeadResponseData)?.length > 0 ? (
    <div className="lead-details cm-padding-one">
      {estimateOpenBtn ? (
        <EstimateDesignPage setEstimateOpenBtn={setEstimateOpenBtn} />
      ) : (
        ""
      )}

      {openAllTask ? <AllTasksPage setOpenAllTask={setOpenAllTask} /> : ""}
      <Row gutter={12}>
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
              <Icon icon="fluent:location-24-regular" height={18} width={18} />
              <Text type="secondary">
                {singleLeadResponseData?.city
                  ? singleLeadResponseData?.city
                  : "Address"}
              </Text>
            </div>

            <Text>
              Assignee Person - {singleLeadResponseData?.assigne?.fullName}
            </Text>
            <Text>Status - {singleLeadResponseData?.status?.name}</Text>

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
                      onClick={handleUpdateLeadDescription}
                    >
                      Submit
                    </Button>
                  </Space>
                )}

                {/* {currentUserDetail?.department === "Quality" ||
              currentUserRoles?.includes("ADMIN") ? (
                <>
                  {
                    showDescriptionField ? ():(
                      <div className="description-container">
                    <Text>{descriptionText}</Text>
                  </div>
                    )
                  }
                  
                </>
              ) : (
                <div className="comp-container">
                  <Input.TextArea
                    value={descriptionText}
                    onChange={(e) => setDescriptionText(e.target.value)}
                  />
                </div>
              )} */}
              </>
            )}
            <Divider style={{ margin: "6px" }} />
            <div className="btn-view-container">
              <CompanyFormModal
                detailView={true}
                data={singleLeadResponseData}
              />
              <Button size="small" onClick={() => leadAssignedToSame(leadid)}>
                Assign to same person{" "}
              </Button>
            </div>
            <Divider style={{ margin: "6px" }} />
            <Text className="heading-text">
              {" "}
              Url : {singleLeadResponseData?.urls}{" "}
            </Text>
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
          <div className="lead-filter-above">
            <div className="filter-box">
              <Button shape="round" onClick={() => setNotes((prev) => !prev)}>
                <Icon
                  icon="fluent:document-text-24-regular"
                  height={BTN_ICON_HEIGHT}
                  width={BTN_ICON_WIDTH}
                />
                Notes
              </Button>

              <Link to={`${leadid}/history`}>
                <Button shape="round">
                  <Icon
                    icon="fluent:history-24-regular"
                    height={BTN_ICON_HEIGHT}
                    width={BTN_ICON_WIDTH}
                  />
                  History
                </Button>
              </Link>
              {/* <Link to={`/erp/${userid}/sales/leads`}>
              <Button>
                <Icon
                  icon="fluent:chevron-left-24-filled"
                  height={BTN_ICON_HEIGHT}
                  width={BTN_ICON_WIDTH}
                />
                Back
              </Button>
            </Link> */}
              <Button onClick={() => openTasksFun()} shape="round">
                All tasks
              </Button>
            </div>
            <div className="lead-assignee-container mt-3">
              <Text className="heading-text">Update assignee</Text>
              <Select
                placeholder="Change assignee"
                style={{ width: "100%", margin: "6px 0px" }}
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
            <div className={`notes-box mt-2 ${notes === true ? "d-none" : ""}`}>
              <div className="comment-icon">
                <div className="icon-box notes-cl">
                  <i className="fa-regular fa-note-sticky"></i>
                </div>
                <div className="line"></div>
              </div>
              <div className="side-notes">
                <BulkFileUploader leadid={leadid} />
              </div>
            </div>
            <div className={`notes-box mt-4 ${"d-none"}`}>
              <div className="comment-icon">
                <div className="icon-box email-cl">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="line"></div>
              </div>

              <div className="side-notes">
                <div className="comment-above">
                  <h2 className="write-heading">Write a Email</h2>
                </div>
                <textarea
                  className="text-area-box"
                  id="notes"
                  placeholder="write a notes ..."
                  name="message"
                  rows="4"
                  cols="50"
                  onChange={(e) => remarkMessageFunction(e)}
                />
                <div className="comment-below">
                  <button
                    className="comment-btn"
                    onClick={(e) => createRemarkfun(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className={`notes-box mt-4 ${"d-none"}`}>
              <div className="comment-icon">
                <div className="icon-box sms-cl">
                  <i className="fa-regular cm-icon fa-comment"></i>
                </div>
                <div className="line"></div>
              </div>

              <div className="side-notes">
                <div className="comment-above">
                  <h2 className="write-heading">Write a SMS</h2>
                </div>
                <textarea
                  className="text-area-box"
                  id="notes"
                  placeholder="write a notes ......"
                  name="message"
                  rows="4"
                  cols="50"
                  onChange={(e) => remarkMessageFunction(e)}
                />
                <div className="comment-below">
                  <button
                    className="comment-btn"
                    onClick={(e) => createRemarkfun(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lead-set-data">
            {notesApiData.map((note, index) => {
              return (
                <div className="lead-filter-above" key={`${index}yug`}>
                  <div className={`notes-box`}>
                    <div className="comment-icon">
                      <div className="icon-box h-70">
                        <i className="fa-regular cm-icon fa-comment"></i>
                      </div>
                      <div className="line"></div>
                    </div>

                    <div className="side-notes">
                      <p className="mb-0 write-heading text-center pb-2">
                        <span className="mr-2 font-13">
                          {new Date(note?.latestUpdated).toDateString()}
                        </span>
                        <span className="mr-2 font-13">
                          {new Date(note?.latestUpdated).toLocaleTimeString(
                            "en-US"
                          )}
                        </span>
                      </p>
                      <div className="comment-above">
                        <div>
                          <h2 className="write-heading">Notes</h2>
                        </div>
                        <div>
                          {note?.images && (
                            <button
                              className="image-btn"
                              onClick={() => openImageInNewTab(note?.images)}
                            >
                              {" "}
                              <i className="fa-solid fa-download"></i>
                            </button>
                          )}
                        </div>
                        <div className="d-flex">
                          <div className="circle-image">
                            {note?.updatedBy?.fullName.slice(0, 1)}
                          </div>
                          <span className="ml-1 write-heading">
                            {note?.updatedBy?.fullName}
                          </span>
                        </div>
                      </div>
                      <div className="text-display-box">
                        <Text>{note.message}</Text>
                      </div>
                      {note?.imageList?.length && (
                        <Image.PreviewGroup
                          preview={{
                            onChange: (current, prev) =>
                              console.log(
                                `current index: ${current}, prev index: ${prev}`
                              ),
                          }}
                        >
                          {note?.imageList?.map((item) => (
                            <Image width={100} src={item?.filePath} />
                          ))}
                        </Image.PreviewGroup>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
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
      <Modal
        title={taskData ? "Edit task" : "Create task"}
        open={openTaskModal}
        onCancel={() => setOpenTaskModal(false)}
        onClose={() => setOpenTaskModal(false)}
        onOk={() => form2.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form2} onFinish={handleTaskFormSubmit}>
          <Form.Item
            label="Title"
            name="name"
            rules={[{ required: true, message: "please enter the title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "please enter the description" },
            ]}
          >
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 4 }} />
          </Form.Item>
          <Form.Item
            label="Date"
            name="expectedDate"
            rules={[{ required: true, message: "please select date and time" }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Status"
            name="statusId"
            rules={[{ required: true, message: "please select the status" }]}
          >
            <Select
              showSearch
              allowClear
              options={
                allTaskStatusData?.map((item) => ({
                  label: item?.name,
                  value: item?.id,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit product"
        open={openProductModal}
        onCancel={() => setOpenProductModal(false)}
        onClose={() => setOpenProductModal(false)}
        onOk={() => form3.submit()}
        okText="Submit"
      >
        <Form layout="vertical" form={form3} onFinish={handleProductSubmit}>
          <Form.Item
            label="Select product category"
            name="serviceName"
            rules={[
              { required: true, message: "please select product category" },
            ]}
          >
            <Select
              showSearch
              allowClear
              options={
                categoryData?.map((item) => ({
                  label: item?.categoryName,
                  value: item?.categoryName,
                })) || []
              }
              onChange={(e) => {
                const filtData = categoryData.filter(
                  (cat) => cat.categoryName === e && cat.products
                )
                setAllFilterProducts(filtData[0]?.products)
              }}
            />
          </Form.Item>
          <Form.Item
            label="Select product"
            name="productId"
            rules={[{ required: true, message: "please select product" }]}
          >
            <Select
              showSearch
              allowClear
              options={
                allFilterProducts?.map((item) => ({
                  label: item?.productName,
                  value: item?.id,
                })) || []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal>
        <Form>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "please enter status" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contact"
            name="contact"
            rules={[{ required: true, message: "please enter status" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="User"
            name="user"
            rules={[{ required: true, message: "please enter status" }]}
          >
            <Select />
          </Form.Item>
          <Form.Item
            label="Notes"
            name="notes"
            rules={[{ required: true, message: "please enter status" }]}
          >
            <Select />
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
