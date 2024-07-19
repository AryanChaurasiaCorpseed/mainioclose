import React, { useCallback, useEffect, useState } from "react"
import "./LeadDetailsPage.scss"
import FilterButton from "../../../components/FilterButton"
import { Link, useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { getQuery } from "../../../API/GetQuery"
import { postQuery } from "../../../API/PostQuery"
import { useRef } from "react"
import Skeleton from "@mui/material/Skeleton"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import DataShowScalaton from "../../../components/Scalaton/DataShowScalaton"
import EstimateDesignPage from "../Leads/EstimateDesignPage"
import { useCustomRoute } from "../../../Routes/GetCustomRoutes"
import { useDispatch, useSelector } from "react-redux"
import { putQuery } from "../../../API/PutQuery"
import { deleteQuery } from "../../../API/DeleteQuery"
import InputErrorComponent from "../../../components/InputErrorComponent"
import AllTasksPage from "./AllTasksPage"
import {
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
  getAllTaskStatus,
  updateAutoAssignnee,
  updateLeadProducts,
  updateLeadsContact,
  updateLeadTask,
} from "../../../Toolkit/Slices/LeadSlice"
import { getAllUrlAction } from "../../../Toolkit/Slices/LeadUrlSlice"
import BulkFileUploader from "../Leads/BulkFileUploader"
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  List,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tag,
  Typography,
} from "antd"
import { getAllSlugList } from "../../../Toolkit/Slices/LeadSlugSlice"
import { Icon } from "@iconify/react"
import dayjs from "dayjs"
const { Text, Title } = Typography

toast.configure()

const LeadDetailsPage = () => {
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const [form3] = Form.useForm()
  const allTaskStatusData = useSelector(
    (state) => state.leads.allTaskStatusData
  )
  const allOportunities = useSelector((state) => state.leads.allOportunities)
  const allProductData = useSelector((state) => state.leads.allProductData)
  const userDataResponse = useSelector(
    (state) => state.leads.getAllLeadUserData
  )
  const categoryData = useSelector((state) => state.leads.categoryData)
  const getAllStatus = useSelector((state) => state.leads.getAllStatus)
  const [openModal, setOpenModal] = useState(false)
  const [contactData, setContactData] = useState(false)
  const [openTaskModal, setOpenTaskModal] = useState(false)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [taskData, setTaskData] = useState("")
  const slugList = useSelector((state) => state.leadslug.slugList)
  const [notes, setNotes] = useState(false)
  const [email, setEmail] = useState(true)
  const [sms, setSms] = useState(true)
  const [notesApiData, setNotesApiData] = useState([])
  const [messageData, setMessageData] = useState("")
  const [singleLeadResponseData, setSingleLeadResponseData] = useState({})
  const [allFilterProducts, setAllFilterProducts] = useState([])
  const [notesUpdateToggle, setNotesUpdateToggle] = useState(false)
  const [changeStatusToggle, setChangeStatusToggle] = useState(false)
  const [updateLeadNameToggle, setUpdateLeadNameToggle] = useState(true)
  const [taskUpdateToggle, setTaskUpdateToggle] = useState(false)
  const [updateLeadName, setUpdateLeadName] = useState("")
  const [notesLoading, setNotesLoading] = useState(false)
  const [contactDelDep, setContactDelDep] = useState(false)
  const [openAllTask, setOpenAllTask] = useState(false)
  const [productDataScaleaton, setProductDataScaleaton] = useState(true)
  const [leadNameReload, setLeadNameReload] = useState(false)
  const [productDisplayToggle, setProductDisplayToggle] = useState(false)
  const [clientsContact, setClientsContact] = useState([])
  const [clientContactToggle, setClientContactToggle] = useState(false)
  const [allProductsList, setAllProductsList] = useState([])
  const [getSingleLeadTask, setGetSingleLeadTask] = useState([])
  const [estimateOpenBtn, setEstimateOpenBtn] = useState(false)
  const [taskReferesh, setTaskReferesh] = useState(false)
  const [productDepandence, setProductDepandence] = useState(false)
  const [editTaskDep, setEditTaskDep] = useState(false)
  const [editContactDep, setEditContactDep] = useState(false)
  const [updateAssignee, setUpdateAssignee] = useState(false)
  const [fileValue, setFileValue] = useState(null)
  const [imageResponse, setImageResponse] = useState("")
  const [uploadSucess, setUploadSucess] = useState(false)
  const [updateOriginalName, setUpdateOriginalName] = useState(false)

  const [origNameData, setOrigNameData] = useState("")

  const dispatch = useDispatch()

  const fileRef = useRef()

  useEffect(() => {
    dispatch(getAllSlugList())
  }, [dispatch])

  const openTasksFun = () => {
    setOpenAllTask((prev) => !prev)
  }

  useEffect(() => {
    dispatch(getAllUrlAction(0))
  }, [dispatch])

  const { allLeadUrl } = useSelector((prev) => prev?.leadurls)
  console.log("all lead url", allLeadUrl)
  const { userid, leadid } = useParams()

  const [originalData, setOriginalData] = useState({
    leadId: leadid,
    originalName: origNameData,
    currentUserId: userid,
  })
  console.warn(originalData)

  const updateOriginalNameFun = async (e) => {
    try {
      const originalNameRes = await putQuery(
        "/leadService/api/v1/lead/updateLeadOriginalName",
        originalData
      )
      setUpdateOriginalName((prev) => !prev)
      toast.success("original name update succesfully")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getSingleLeadData()
  }, [
    changeStatusToggle,
    leadNameReload,
    productDisplayToggle,
    clientContactToggle,
    productDepandence,
    editContactDep,
    contactDelDep,
    updateAssignee,
    updateOriginalName,
  ])

  useEffect(() => {
    leadNotesData()
  }, [notesUpdateToggle])

  useEffect(() => {
    dispatch(getAllProductData())
    dispatch(getAllLeadUser(userid))
    dispatch(getAllTaskStatus())
    dispatch(getAllOppurtunities())
    dispatch(getAllProductWithCattegory())
    dispatch(editViewData(leadid))
  }, [dispatch])

  useEffect(() => {
    getAllTaskData()
  }, [taskUpdateToggle, taskReferesh, editTaskDep])
  const currentUserRoles = useSelector((state) => state?.auth?.roles)
  const adminRole = currentUserRoles.includes("ADMIN")
  const NotesRef = useRef()
  const categorySelectRef = useRef()

  const [remarkMessage, setRemarkMessage] = useState({
    leadId: leadid,
    userId: userid,
    message: messageData,
    file: imageResponse,
  })

  const remarkMessageFunction = (e) => {
    setRemarkMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const getAllTaskData = async () => {
    try {
      const allTaskData = await getQuery(
        `/leadService/api/v1/task/getAllTaskByLead?leadId=${leadid}`
      )
      setGetSingleLeadTask(allTaskData.data.reverse())
    } catch (err) {
      console.log("err", err)
    }
  }

  const leadNotesData = async (id) => {
    try {
      const getAllLeadNotes = await getQuery(
        `/leadService/api/v1/getAllRemarks?leadId=${leadid}`
      )
      const newData = getAllLeadNotes.data.reverse()
      setNotesApiData(newData)
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Something Went Wrong")
      }
    }
  }

  const getSingleLeadData = async () => {
    try {
      const singleLeadApiData = await getQuery(
        `/leadService/api/v1/lead/getSingleLeadData?leadId=${leadid}`
      )
      setSingleLeadResponseData(singleLeadApiData.data)
      setAllProductsList(singleLeadApiData.data.serviceDetails)
      setUpdateLeadName(singleLeadApiData.data.leadName)
      setClientsContact(singleLeadApiData.data.clients.reverse())
      setProductDataScaleaton(false)
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Something Went Wrong")
      }
      setProductDataScaleaton(false)
      // productDataScaleaton(false)
    }
  }

  const changeLeadStatusFun = (catId) => {
    const statusChange = async () => {
      try {
        const statusData = await axios.put(
          `/leadService/api/v1/status/updateLeadStatus?leadId=${leadid}&statusId=${catId}&currentUserId=${userid}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        setChangeStatusToggle((prev) => !prev)
      } catch (err) {
        if (err.response.status === 500) {
          toast.error("Something Went Wrong")
        }
      }
    }
    statusChange()
  }

  // Create New Notes or Remarks
  const createRemarkfun = (e) => {
    e.preventDefault()
    if (NotesRef.current.value === "") {
      toast.error("Notes Can't be Blank")
      return
    }
    const createNewRemark = async () => {
      setNotesLoading(true)
      try {
        const remarkData = await postQuery(
          `/leadService/api/v1/createRemarks`,
          remarkMessage
        )
        setNotesUpdateToggle((prev) => !prev)
        NotesRef.current.value = ""
        fileRef.current.value = ""
        setUploadSucess(false)
        setNotesLoading(false)
        window.location.reload()
      } catch (err) {
        console.log(err)
        if (err.response.status === 500) {
          toast.error("Something Went Wrong")
          setNotesLoading(false)
        }
        setNotesLoading(false)
      }
    }
    createNewRemark()
  }

  const updateLeadNameSinglePage = async (e) => {
    try {
      const leadNameUpdate = await axios.put(
        `/leadService/api/v1/lead/updateLeadName?leadName=${updateLeadName}&leadId=${leadid}&userId=${userid}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      setUpdateLeadNameToggle(true)
      setLeadNameReload((prev) => !prev)
    } catch (err) {
      console.log(err)
      if (err.response.status === 500) {
        toast.error("Something Went Wrong")
      }
    }
  }

  const changeLeadAssignee = async (id) => {
    try {
      const updatePerson = await axios.put(
        `/leadService/api/v1/lead/updateAssignee?leadId=${leadid}&userId=${id}&updatedById=${userid}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      setUpdateAssignee((prev) => !prev)
    } catch (err) {
      console.log("err", err)
    }
  }

  const deleteContactFun = useCallback(
    (id) => {
      let data = {
        leadid: leadid,
        id: id,
        userid: userid,
      }
      dispatch(deleteLeadContact(data)).then(() => window.location.reload())
    },
    [leadid, userid, dispatch]
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
    setContactData(true)
    setOpenModal(true)
  }

  const handleSubmitContact = useCallback(
    (values) => {
      values.currentUserId = userid
      values.leadId = leadid
      if (contactData) {
        dispatch(updateLeadsContact(values)).then(() =>
          window.location.reload()
        )
        setContactData(false)
      } else {
        dispatch(createLeadContacts(values)).then(() =>
          window.location.reload()
        )
        setContactData(false)
      }
    },
    [userid, leadid, contactData, dispatch]
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
      } else {
        dispatch(createNewLeadTask(values))
      }
    },
    [userid, leadid, taskData, dispatch]
  )

  const handleProductSubmit = useCallback(
    (values) => {
      values.leadId = leadid
      dispatch(updateLeadProducts(values)).then(() => window.location.reload())
    },
    [leadid, dispatch]
  )

  const items = [
    {
      key: "1",
      label: "Contacts",
      extra: (
        <Button size="small" type="text" onClick={() => setOpenModal(true)}>
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
              <Space>
                <Button
                  size="small"
                  type="text"
                  onClick={() => handleUpdateContact(item)}
                >
                  <Icon icon="fluent:edit-20-regular" />
                </Button>
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => deleteContactFun(item.clientId)}
                >
                  <Button size="small" danger type="text">
                    <Icon icon="fluent:delete-20-regular" />
                  </Button>
                </Popconfirm>
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
        <Button type="text" size="small" onClick={() => setOpenTaskModal(true)}>
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
              <Space>
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
    {
      key: "3",
      label: "Product",
      extra: (
        <Button
          size="small"
          type="text"
          onClick={() => setOpenProductModal(true)}
        >
          <Icon icon="fluent:add-20-regular" />
        </Button>
      ),
      children: (
        <List
          dataSource={allProductsList}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                title={item?.serviceName}
                description={item?.name}
              />
              <Space>
                <Popconfirm
                  title="Delete the product"
                  description="Are you sure to delete this product?"
                  onConfirm={() =>
                    dispatch(
                      deleteProduct({
                        serviceId: item.id,
                        leadid: leadid,
                        userid: userid,
                      })
                    )
                  }
                  okButtonProps={{ disabled: adminRole ? true : false }}
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
    {
      key: "4",
      label: "Estimate",
      children: "",
    },
    {
      key: "5",
      label: "Opportunities",
      children: (
        <List
          dataSource={allOportunities}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                title={"BIS Registration"}
                description={
                  <Space direction="vertical">
                    <Text type="secondary">{item?.description}</Text>
                    <Text>{item?.estimateClose}</Text>
                  </Space>
                }
              />
              <Space>
                <Popconfirm
                  title="Delete the product"
                  description="Are you sure to delete this product?"
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
  ]

  return (
    <div className="lead-details cm-padding-one">
      {estimateOpenBtn ? (
        <EstimateDesignPage setEstimateOpenBtn={setEstimateOpenBtn} />
      ) : (
        ""
      )}

      {openAllTask ? <AllTasksPage setOpenAllTask={setOpenAllTask} /> : ""}
      <Row gutter={8}>
        <Col span={6}>
          <div className="left-lead-section">
            {updateOriginalName ? (
              <div className="comp-container">
                <Select
                  className="comp-component-1"
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
                    onClick={(e) => updateOriginalNameFun(e)}
                  >
                    Save
                  </Button>
                  <Button onClick={() => setUpdateOriginalName(false)}>
                    Cancel
                  </Button>
                </Space>
              </div>
            ) : (
              <div className="comp-container">
                <div className="flex-vert-hori-center">
                  {singleLeadResponseData?.originalName ? (
                    <Icon icon="fluent:circle-20-filled" color="red" />
                  ) : (
                    <Icon icon="fluent:circle-20-filled" color="green" />
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
                  className="comp-component-1"
                  placeholder="select the slug"
                  options={slugList?.map((item) => ({
                    label: item?.name,
                    value: item?.id,
                  }))}
                  onChange={(e) => setUpdateLeadName(e)}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
                <Space className="comp-component-2">
                  <Button
                    type="primary"
                    onClick={(e) => updateLeadNameSinglePage(e)}
                  >
                    Save
                  </Button>
                  <Button onClick={() => setUpdateLeadNameToggle(true)}>
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
              <Button type="primary" onClick={sameAssigneePresonFun}>
                Same
              </Button>
              <Button onClick={notSameAssigneePresonFun}>Not same</Button>
            </Space>
            {/* <div className="lead-product">
              <div className="card mt-2">
                <div className="" id="headingThree">
                  <div
                    className="card-btn collapsed"
                    data-toggle="collapse"
                    data-target="#estimateCollapse"
                    aria-expanded="false"
                    aria-controls="estimateCollapse"
                  >
                    <h3 className="lead-heading lead-bold">Estimate</h3>
                    <p className="lead-heading">
                      <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
                <div
                  id="estimateCollapse"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="my-card-content">
                    <div className="all-center">
                      <Link to={"estimate"} className="create-btn">
                        Create New Estimate
                      </Link>
                     
                    </div>
                    
                  </div>

                  <div className="save-lead-data">
                    <div>
                      <p className="lead-heading">BIS Registration</p>
                      <h6 className="lead-sm-heading">lead Estimate Create</h6>
                    </div>
                    <div className="lead-heading">
                      <button
                        onClick={() => openEstimateFun()}
                        className="create-btn padding-two mr-2"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      {adminRole ? <i className="fa-solid fa-trash"></i> : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <Divider style={{ margin: "4px" }} />
            <Collapse
              accordion
              defaultActiveKey={["1"]}
              items={items}
              bordered={false}
            />
          </div>
        </Col>
        <Col span={18}>
          <div className="lead-filter-above">
            <div className="filter-box">
              <FilterButton
                name={"Notes"}
                icon={<i className="fa-regular  fa-note-sticky"></i>}
                data={notes}
                setData={setNotes}
              />

              <Link to={`history`} className="filter-btn-design">
                <i className="fa-regular mr-1 fa-clipboard"></i>History
              </Link>
              <Link
                to={`/erp/${userid}/sales/leads`}
                className="filter-btn-design"
              >
                <i className="fa-solid mr-1 fa-backward-step"></i>Back
              </Link>
              <button
                className="filter-btn-design"
                onClick={() => openTasksFun()}
              >
                All Tasks
              </button>
            </div>
            <div className="filter-box mt-3">
              <select
                className="user-assign-tab"
                onChange={(e) => changeLeadAssignee(e.target.value)}
                name="user"
                id="user"
              >
                <option>Change Assignee</option>
                {userDataResponse.map((user, index) => (
                  <option key={index} value={user?.id}>
                    {user?.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div></div>

            <div className={`notes-box mt-4 ${notes === true ? "d-none" : ""}`}>
              <div className="comment-icon">
                <div className="icon-box notes-cl">
                  <i className="fa-regular fa-note-sticky"></i>
                </div>
                <div className="line"></div>
              </div>

              <div className="side-notes">
                <BulkFileUploader />
              </div>
            </div>
            <div className={`notes-box mt-4 ${email === true ? "d-none" : ""}`}>
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
                  placeholder="write a notes ......"
                  name="message"
                  rows="4"
                  cols="50"
                  onChange={(e) => remarkMessageFunction(e)}
                ></textarea>
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
            <div className={`notes-box mt-4 ${sms === true ? "d-none" : ""}`}>
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
                ></textarea>
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
              console.log("renderChatImages", note)
              return (
                <div className="lead-filter-above" key={index}>
                  <div className={`notes-box mt-2`}>
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
                        <pre>{note.message}</pre>
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
        title="Edit contact details"
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
            rules={[{ required: true, message: "please give email" }]}
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
        title="Edit task"
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
  )
}

export default LeadDetailsPage
