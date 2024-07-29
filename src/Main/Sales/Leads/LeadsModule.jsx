import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import "./LeadsModule.scss"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import LeadCreateModel from "../../../Model/LeadCreateModel"
import { useDispatch, useSelector } from "react-redux"
import TableScalaton from "../../../components/TableScalaton"
import { getQuery } from "../../../API/GetQuery"
import { putQuery } from "../../../API/PutQuery"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import InputErrorComponent from "../../../components/InputErrorComponent"
import { MultiSelect } from "primereact/multiselect"
import { useCustomRoute } from "../../../Routes/GetCustomRoutes"
import { CSVLink } from "react-csv"
import {
  craeteProjectByLeadId,
  getAllLeads,
  getCompanyDetailsByLeadId,
  updateHelper,
} from "../../../Toolkit/Slices/LeadSlice"
import MainHeading from "../../../components/design/MainHeading"
import { Button, Select, Typography } from "antd"
import { Icon } from "@iconify/react"
import { getAllUsers } from "../../../Toolkit/Slices/UsersSlice"
import CommonTable from "../../../components/CommonTable"
import CompanyFormModal from "../../Accounts/CompanyFormModal"
const { Text } = Typography

const UserLeadComponent = React.lazy(() =>
  import(`../../../Tables/UserLeadComponent`)
)

const LeadsModule = () => {
  const [leadUserNew, setLeadUserNew] = useState([])
  const [updateActive, setUpdateActive] = useState(false)
  const [getAllStatus, setGetAllStatus] = useState([])
  const [statusDataId, setStatusDataId] = useState([])
  const [leadStatusD, setLeadStatusD] = useState(false)
  const [toDate, setToDate] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [multibtn, setMultibtn] = useState(false)
  const [leadMultiDep, setLeadMultiDep] = useState(false)
  const [leadDeleteErr, setLeadDeleteErr] = useState(false)
  const [leadDelLoading, setLeadDelLoading] = useState(false)
  const [rerefreshLead, setRerefreshLead] = useState(false)
  const [hideMUltiFilter, setHideMUltiFilter] = useState(false)

  const [allStatusMulti, setAllStatusMulti] = useState([])
  const [allUserMulti, setAllUserMulti] = useState([])

  const [filterBtnNew, setFilterBtnNew] = useState(false)

  const [multiLeadError, setMultiLeadError] = useState(false)
  const [selectLeadError, setSelectLeadError] = useState(false)

  const { userid, leadid } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [allMultiFilterData, setAllMultiFilterData] = useState({
    userId: userid,
    userIdFilter: allUserMulti,
    statusId: allStatusMulti,
    toDate: toDate,
    fromDate: fromDate,
  })

  useEffect(() => {
    setAllMultiFilterData((prev) => ({
      ...prev,
      userId: userid,
      userIdFilter: allUserMulti,
      statusId: allStatusMulti,
      toDate: toDate,
      fromDate: fromDate,
    }))
  }, [allUserMulti, allStatusMulti, toDate, fromDate])

  const multiStatusRef = useRef()
  const multiAssigneeRef = useRef()

  const [selectedRows, setSelectedRows] = useState([])

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedRows(allLeadsData.map((row) => row.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleCheckboxClick = (event, id) => {
    if (event.target.checked) {
      setSelectedRows((prevSelected) => [...prevSelected, id])
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter((rowId) => rowId !== id)
      )
    }
  }

  const [multiLeadData, setMultiLeadData] = useState({
    leadIds: selectedRows,
    statusId: null,
    assigneId: null,
    updatedById: userid,
  })

  const [deleteMultiLead, setDeleteMultiLead] = useState({
    leadId: selectedRows,
    updatedById: userid,
  })

  useEffect(() => {
    setMultiLeadData((prev) => ({ ...prev, leadIds: selectedRows }))
  }, [])

  useEffect(() => {
    setDeleteMultiLead((prev) => ({ ...prev, leadId: selectedRows }))
  }, [])
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  useEffect(() => {
    dispatch(getAllLeads(allMultiFilterData))
  }, [
    updateActive,
    statusDataId,
    rerefreshLead,
    leadStatusD,
    leadMultiDep,
    filterBtnNew,
  ])

  useEffect(() => {
    getAllLeadUser()
  }, [])

  useEffect(() => {
    getAllStatusData()
  }, [])

  const allLeadData = useSelector((state) => state.leads.allLeads)
  const allLeadsData = [...allLeadData]

  const leadCount = allLeadsData.length

  const allLeadsLoading = useSelector((state) => state.leads.leadsLoading)

  const viewHistory = async (leadId) => {
    try {
      const singlePage = await putQuery(
        `/leadService/api/v1/lead/viewHistoryCreate?userId=${userid}&leadId=${leadId}`
      )
    } catch (err) {
      console.log(err)
    }
  }

  const deleteMultiLeadFun = async () => {
    if (deleteMultiLead.leadId.length === 0) {
      setLeadDeleteErr(true)
      return
    }
    setLeadDelLoading(true)
    if (window.confirm("Are you sure to delete this record?") == true) {
      try {
        const delMulLead = await axios.delete(
          `/leadService/api/v1/lead/deleteMultiLead`,
          {
            data: deleteMultiLead,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        setRerefreshLead((prev) => !prev)
        setLeadDelLoading(false)
      } catch (err) {
        console.log(err)
        setLeadDelLoading(false)
      }
    }
  }

  const currentUserRoles = useSelector((state) => state?.auth?.roles)
  const adminRole = currentUserRoles.includes("ADMIN")
  const newRole = currentUserRoles.includes("NEW")
  const allUsers = useSelector((state) => state.user.allUsers)
  console.log("allUseredrsdrstr", allUsers)

  const handleHelperChange = useCallback(
    (id, leadId) => {
      let temp = {
        leadId: leadId,
        userId: id,
      }
      dispatch(updateHelper(temp)).then((response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          window.location.reload()
        }
      })
    },
    [dispatch]
  )

  const exportData = allLeadsData.map((row) => ({
    "S.No": row?.id,
    "Lead Name": row?.leadName,
    "Missed Task": row?.missedTaskName,
    Status: row?.status?.name,
    "Client Name": row?.clients[0]?.name,
    "Assignee Person": row?.assignee?.fullName,
    "Created By": row?.createdBy?.fullName,
    Date: row?.createDate,
    "Mobile No": row?.mobileNo,
    Email: row?.email,
    Source: row?.source,
  }))

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      fixed: "left",
      width: 50,
    },
    {
      dataIndex: "leadName",
      title: "Lead name",
      fixed: "left",
      render: (_, data) => (
        <Link
          to={`/erp/${userid}/sales/leads/${data?.id}`}
          onClick={() => viewHistory(data?.id)}
          className="link-heading"
        >
          {data?.leadName}
        </Link>
      ),
    },
    {
      title: "Missed task",
      dataIndex: "missedTaskDate",
      render: (_, data) => {
        const taskStatus = data?.missedTaskStatus
        const taskName = data?.missedTaskName
        const taskDate = new Date(data?.missedTaskDate).toLocaleDateString()
        const hours = new Date(data?.missedTaskDate).getHours()
        const minutes = new Date(data?.missedTaskDate).getMinutes()
        const taskCreated = data?.missedTaskCretedBy
        return taskName !== null ? (
          <p className={`mb-0 ${taskName !== null ? "text-danger" : ""}`}>
            {taskStatus} - {taskCreated} - {taskName}
            <br />
            {taskDate} {hours}:{minutes}
          </p>
        ) : (
          <p className="mb-0">NA</p>
        )
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, data) => (
        <Text type={data?.status?.name ? "success" : ""}>
          {data?.status?.name ? data?.status?.name : "NA"}
        </Text>
      ),
    },
    {
      title: "Client name",
      dataIndex: "name",
      render: (_, data) => (
        <Text>{data?.clients[0]?.name ? data?.clients[0]?.name : "NA"}</Text>
      ),
    },
    {
      title: "Mobile no.",
      dataIndex: "mobileNo",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
    },
    {
      title: "Assignee person",
      dataIndex: "assigneeName",
      render: (_, data) => <Text>{data?.assignee?.fullName}</Text>,
    },

    {
      title: "Date",
      dataIndex: "createDate",
      render: (_, data) => (
        <Text>{new Date(data?.createDate).toLocaleDateString()}</Text>
      ),
    },
    {
      title: "Change assignee",
      dataIndex: "assignee",
      render: (_, data) => (
        <Select
          showSearch
          allowClear
          style={{ width: "100%" }}
          value={data?.assignee?.id}
          placeholder="select assignee"
          options={
            leadUserNew?.map((ele) => ({
              label: ele?.fullName,
              value: ele?.id,
            })) || []
          }
          filterOption={(input, option) =>
            option.label.toLowerCase().includes(input.toLowerCase())
          }
        />
      ),
    },
    ...(adminRole
      ? [
          {
            title: "Helper",
            dataIndex: "helper",
            render: (_, data) => (
              <Select
                showSearch
                allowClear
                value={data?.helper ? data?.helpUser?.id : ""}
                style={{ width: "100%" }}
                options={
                  [
                    { label: "NA", value: "" },
                    ...allUsers?.map((item) => ({
                      label: item?.fullName,
                      value: item?.id,
                    })),
                  ] || []
                }
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
                onChange={(e) => handleHelperChange(e, data?.id)}
              />
            ),
          },
          {
            title: "Created by",
            dataIndex: "createdBy",
            render: (_, data) => (
              <Text>
                {data?.createdBy?.fullName ? data?.createdBy?.fullName : "NA"}
              </Text>
            ),
          },
          {
            title: "Source",
            dataIndex: "source",
            render: (_, data) => (
              <Text>{data?.source ? data?.source : "NA"}</Text>
            ),
          },
          {
            title: "Create project",
            dataIndex: "project",
            render: (_, data) => {
              return <CompanyFormModal edit={true} data={data} />
            },
          },
          {
            dataIndex: "action",
            title: "Action",
            render: (_, data) => (
              <Button
                type="text"
                size="small"
                danger
                onClick={() => leadDeleteResponse(data?.id)}
              >
                <Icon icon="fluent:delete-20-regular" />
              </Button>
            ),
          },
        ]
      : []),
  ]

  const leadDeleteResponse = async (id) => {
    if (window.confirm("Are you sure to delete this record?") == true) {
      try {
        const leadResponse = await axios.delete(
          `/leadService/api/v1/lead/deleteLead?leadId=${id}&userId=${userid}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        setLeadStatusD((prev) => !prev)
      } catch (err) {
        console.log("err", err)
      }
    } else {
      console.log("You cancel")
    }
  }

  const changeLeadAssignee = async (id, leadId) => {
    try {
      const updatePerson = await axios.put(
        `/leadService/api/v1/lead/updateAssignee?leadId=${leadId}&userId=${id}&updatedById=${userid}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      setUpdateActive((prev) => !prev)
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Something Went Wrong")
      }
      console.log(err)
    }
  }

  const getAllLeadUser = async () => {
    try {
      const allLeadUser = await axios.get(
        `/leadService/api/v1/users/getAllUserByHierarchy?userId=${userid}`
      )
      setLeadUserNew(allLeadUser.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getAllStatusData = async () => {
    try {
      const allStatus = await getQuery(
        `/leadService/api/v1/status/getAllStatus`
      )
      setGetAllStatus(allStatus.data)
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Something Went Wrong")
      }
    }
  }

  const multiAssignee = async () => {
    setMultibtn(true)
    if (multiLeadData.statusId === null && multiLeadData.assigneId === null) {
      console.log("Error Generate")

      setMultiLeadError(true)
      return
    }
    if (multiLeadData.leadIds.length === 0) {
      setSelectLeadError(true)
      return
    }

    try {
      const multiAssigneeCol = await putQuery(
        "/leadService/api/v1/lead/updateMultiLeadAssigne",
        multiLeadData
      )
      setMultibtn(false)
      setLeadMultiDep((prev) => !prev)
      window.location.reload()
    } catch (err) {
      console.log(err)
      setMultibtn(false)
    }
  }

  // bell icon

  const bellCountUrl = `/leadService/api/v1/notification/getUnseenCount?userId=${userid}`
  const bellCountDep = []

  const { productData: bellData } = useCustomRoute(bellCountUrl, bellCountDep)

  return (
    <div className="lead-module small-box-padding">
      <div className="create-user-box">
        <MainHeading data={`Leads (${leadCount})`} />
        <div className="all-center">
          <Link to={`allTask`}>
            <div className="common-btn-one mr-2">All Tasks</div>
          </Link>
          {adminRole && (
            <div className="d-end mr-2">
              <button className="common-btn-one">
                <CSVLink
                  className="text-white"
                  data={exportData}
                  // headers={columns.map((column) => column.headerName)}
                  filename={"exported_data.csv"}
                >
                  Export
                </CSVLink>
              </button>
            </div>
          )}
          <button
            onClick={() => setHideMUltiFilter((prev) => !prev)}
            className="common-btn-one mr-2"
          >
            Filter Data
          </button>
          {adminRole ? <LeadCreateModel /> : ""}
          <Link to={`notification`}>
            <div className="bell-box">
              <span className="bell-count">{bellData}</span>
              <span className="bell-icon">
                <i className="fa-regular fa-bell"></i>
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className={`${hideMUltiFilter ? "" : "d-none"} all-between py-2`}>
        <div className="one">
          <MultiSelect
            style={{ dropdown: { backgroundColor: "#000" } }}
            value={allUserMulti}
            onChange={(e) => setAllUserMulti(e.value)}
            options={leadUserNew}
            optionLabel="fullName"
            placeholder="Select users"
            optionValue="id"
            maxSelectedLabels={3}
            className="multi-select-boxx"
          />
        </div>
        <div className="two">
          <MultiSelect
            style={{ dropdown: { backgroundColor: "#000" } }}
            value={allStatusMulti}
            onChange={(e) => setAllStatusMulti(e.value)}
            options={getAllStatus}
            optionLabel="name"
            optionValue="id"
            placeholder="Select Status"
            maxSelectedLabels={3}
            className="multi-select-boxx"
          />
        </div>
        <div className="three">
          <input
            className="mr-2 date-input"
            onChange={(e) => setToDate(e.target.value)}
            type="date"
          />
          <input
            className="mr-2 date-input"
            onChange={(e) => setFromDate(e.target.value)}
            type="date"
          />
          <button
            className="common-btn-one mr-2"
            onClick={() => setFilterBtnNew((prev) => !prev)}
          >
            Apply
          </button>
          <button
            className="common-btn-one"
            onClick={() => window.location.reload()}
          >
            Remove
          </button>
        </div>
      </div>

      <div className="table-arrow">
        <Suspense fallback={<TableScalaton />}>
          <CommonTable
            data={allLeadsData.reverse()}
            columns={columns}
            scroll={{ y: 500, x: 2300 }}
            rowSelection={true}
          />
        </Suspense>

        {adminRole ? (
          <div
            className={`bottom-line ${
              multiLeadData.leadIds.length > 0 ? "pos-fix" : ""
            }`}
          >
            <div>
              <button
                className="common-btn-one mr-2"
                onClick={() => deleteMultiLeadFun()}
              >
                {leadDelLoading ? "Please Wait..." : "Delete"}
              </button>
              <select
                className="p-1 date-input"
                name="status"
                ref={multiStatusRef}
                onChange={(e) =>
                  setMultiLeadData((prev) => ({
                    ...prev,
                    statusId: e.target.value,
                  }))
                }
                id="status"
                form="statusChange"
              >
                <option>Select Status</option>
                {getAllStatus.map((status, index) => (
                  <option value={status.id} key={index}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="p-1 date-input"
                ref={multiAssigneeRef}
                onChange={(e) =>
                  setMultiLeadData((prev) => ({
                    ...prev,
                    assigneId: e.target.value,
                  }))
                }
                name="lead"
                id="lead"
              >
                <option>Select User</option>
                {leadUserNew.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user?.fullName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={() => multiAssignee()}
                className="common-btn-one"
              >
                {multibtn ? "Loading..." : "Send"}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {multiLeadError ? (
          <InputErrorComponent value="please select at least one status or assignee column" />
        ) : (
          ""
        )}
        {selectLeadError ? (
          <InputErrorComponent value="please select at least 2 leads" />
        ) : (
          ""
        )}
        {leadDeleteErr ? (
          <InputErrorComponent value="please select at least one lead " />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default LeadsModule
