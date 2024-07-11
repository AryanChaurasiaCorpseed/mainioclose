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
import { getAllLeads, updateHelper } from "../../../Toolkit/Slices/LeadSlice"
import MainHeading from "../../../components/design/MainHeading"
import { Button, Select } from "antd"
import { Icon } from "@iconify/react"
import { getAllUsers } from "../../../Toolkit/Slices/UsersSlice"

const UserLeadComponent = React.lazy(() =>
  import(`../../../Tables/UserLeadComponent`)
)

const LeadsModule = () => {
  const [allLeadData, setAllLeadData] = useState([])
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

  const allLeadsData = useSelector((state) => state.leads.allLeads)

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

  const column2 = [
    {
      field: "id",
      headerName: "S.No",
      width: 60,
      filterable: false,
      renderCell: (props) => {
        return (
          <p className="mb-0">
            {props.api.getRowIndexRelativeToVisibleRows(props?.row?.id) + 1}
          </p>
        )
      },
    },
    {
      field: "leadName",
      headerName: "Lead Name",
      width: 250,
      renderCell: (props) => (
        <Link
          to={`/erp/${userid}/sales/leads/${props.row.id}`}
          onClick={() => viewHistory(props.row.id)}
          className={`${props.row.view ? "" : "fw-600"}`}
        >
          {props?.row?.leadName}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Client Name",
      width: 130,
      renderCell: (props) => (
        <p className="mb-0">
          {props.row.clients[0]?.name ? props.row.clients[0]?.name : "NA"}
        </p>
      ),
    },
    { field: "mobileNo", headerName: "Mobile No", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    {
      field: "missedTaskDate",
      headerName: "Missed Task",
      width: 200,
      renderCell: (props) => {
        const taskmissed = props?.row
        const taskStatus = props?.row?.missedTaskStatus
        const taskName = props?.row?.missedTaskName
        const taskDate = new Date(
          props?.row?.missedTaskDate
        ).toLocaleDateString()
        const hours = new Date(props?.row?.missedTaskDate).getHours()
        const minutes = new Date(props?.row?.missedTaskDate).getMinutes()
        const taskCreated = props?.row?.missedTaskCretedBy
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
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (props) => (
        <p
          className={`mb-0 ${
            props.row.status?.name === "New" ? "lead-new" : ""
          }`}
        >
          {props.row.status?.name ? props.row.status?.name : "NA"}
        </p>
      ),
    },
    {
      field: "assigneeName",
      headerName: "Assignee Person",
      width: 150,
      renderCell: (props) => (
        <p className="mb-0">{props?.row?.assignee?.fullName}</p>
      ),
    },

    {
      field: "createDate",
      headerName: "Date",
      width: 150,
      renderCell: (props) => (
        <p className="mb-0">
          {new Date(props.row.createDate).toLocaleDateString()}
        </p>
      ),
    },
    {
      field: "assignee",
      headerName: "Change Assignee",
      width: 170,
      renderCell: (props) => {
        return (
          <select
            className="assignee-button"
            onChange={(e) => changeLeadAssignee(e.target.value, props.row.id)}
            // onSelect={(e)=> }
            name="lead"
            id="lead"
          >
            <option>Select Assignee</option>
            {leadUserNew.map((user, index) => (
              <option key={index} value={user.id}>
                {user?.fullName}
              </option>
            ))}
          </select>
        )
      },
    },
  ]

  const columns = [
    {
      field: "select",
      headerName: "Select",
      width: 60,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedRows.includes(params.row.id)}
              onChange={(event) => handleCheckboxClick(event, params.row.id)}
            />
          }
        />
      ),
    },
    {
      field: "id",
      headerName: "S.No",
      width: 60,
      filterable: false,
      renderCell: (props) => {
        return (
          <p className="mb-0">
            {props.api.getRowIndexRelativeToVisibleRows(props.row.id) + 1}
          </p>
        )
      },
    },
    {
      field: "leadName",
      headerName: "Lead Name",
      width: 300,
      sortable: true,
      renderCell: (props) => (
        <Link
          to={`/erp/${userid}/sales/leads/${props.row.id}`}
          onClick={() => viewHistory(props.row.id)}
          className={`${props.row.view ? "" : "fw-600"}`}
        >
          {props?.row?.leadName}
        </Link>
      ),
    },
    {
      field: "missedTaskDate",
      headerName: "Missed Task",
      width: 220,
      renderCell: (props) => {
        const taskmissed = props?.row
        const taskStatus = props?.row?.missedTaskStatus
        const taskName = props?.row?.missedTaskName
        const taskDate = new Date(
          props?.row?.missedTaskDate
        ).toLocaleDateString()
        const hours = new Date(props?.row?.missedTaskDate).getHours()
        const minutes = new Date(props?.row?.missedTaskDate).getMinutes()
        const taskCreated = props?.row?.missedTaskCretedBy
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
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (props) => (
        <p
          className={`mb-0 ${
            props.row.status?.name === "New" ? "lead-new" : ""
          }`}
        >
          {props.row.status?.name ? props.row.status?.name : "NA"}
        </p>
      ),
    },
    {
      field: "name",
      headerName: "Client Name",
      width: 150,
      renderCell: (props) => (
        <p className="mb-0">
          {props.row.clients[0]?.name ? props.row.clients[0]?.name : "NA"}
        </p>
      ),
    },

    { field: "mobileNo", headerName: "Mobile No", width: 150 },
    { field: "email", headerName: "Email", width: 150 },

    {
      field: "assigneeName",
      headerName: "Assignee Person",
      width: 150,
      renderCell: (props) => (
        <p className="mb-0">{props?.row?.assignee?.fullName}</p>
      ),
    },
    {
      field: "helper",
      headerName: "Helper",
      width: 150,
      renderCell: (props) => (
        <Select
          value={props?.row?.helper ? props?.row?.helpUser?.id : ""}
          style={{ width: "100%" }}
          options={[
            { label: "NA", value: "" },
            ...allUsers?.map((item) => ({
              label: item?.fullName,
              value: item?.id,
            })),
          ]}
          onChange={(e) => handleHelperChange(e, props?.row?.id)}
        />
      ),
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 150,
      renderCell: (props) => (
        <p className="mb-0">
          {props?.row?.createdBy?.fullName
            ? props?.row?.createdBy?.fullName
            : "NA"}
        </p>
      ),
    },
    {
      field: "createDate",
      headerName: "Date",
      width: 150,
      renderCell: (props) => (
        <p className="mb-0">
          {new Date(props.row.createDate).toLocaleDateString()}
        </p>
      ),
    },
    {
      field: "assignee",
      headerName: "Change Assignee",
      width: 170,
      renderCell: (props) => {
        return (
          <select
            className="assignee-button"
            onChange={(e) => changeLeadAssignee(e.target.value, props.row.id)}
            name="lead"
            id="lead"
          >
            <option>Select Assignee</option>
            {leadUserNew.map((user, index) => (
              <option key={index} value={user.id}>
                {user?.fullName}
              </option>
            ))}
          </select>
        )
      },
    },
    {
      field: "source",
      headerName: "Source",
      width: 150,
      renderCell: (props) => (
        <p className="mb-0">{props?.row?.source ? props?.row?.source : "NA"}</p>
      ),
    },
    {
      field: "project",
      headerName: "Create Project",
      width: 150,
      renderCell: (props) => (
        <Button
          size="small"
          // onClick={() => dispatch(craeteProjectByLeadId(props?.row?.id))}
        >
          <Icon icon="fluent:add-20-filled" />
        </Button>
      ),
    },
    ...(adminRole
      ? [
          {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (props) => (
              <p
                className="m-0"
                onClick={() => leadDeleteResponse(props.row.id)}
              >
                <i
                  className="fa-solid fa-trash"
                  style={{ cursor: "pointer" }}
                ></i>
              </p>
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
                  headers={columns.map((column) => column.headerName)}
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
            placeholder="Select Users"
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

      {/* <div className="all-between">
        <div className="one-line">
          <p className="my-2">
            <select
              className="p-1 status-select"
              name="status"
              onChange={(e) => setStatusDataId(e.target.value)}
              id="status"
              form="statusChange"
            >
              <option>Filter Status</option>
              {getAllStatus.map((status, index) => (
                <option value={status.id} key={index}>
                  {status.name}
                </option>
              ))}
            </select>
          </p>

          <button
            className="common-btn-one"
            onClick={() => window.location.reload()}
          >
            Remove Filter
          </button>
        </div>
        <div>
          <input
            className="mr-2"
            onChange={(e) => setToDate(e.target.value)}
            type="date"
          />
          <input
            className="mr-2"
            onChange={(e) => setFromDate(e.target.value)}
            type="date"
          />
          <button
            className="common-btn-one"
            onClick={() => setDateFilter((prev) => !prev)}
          >
            Apply
          </button>
        </div>
      </div> */}

      <div className="table-arrow">
        <Suspense fallback={<TableScalaton />}>
          <UserLeadComponent
            tableName={""}
            columns={adminRole ? columns : column2}
            row={allLeadsData}
            getRowId={(row) => row.id}
            onSelectionModelChange={(newSelection) =>
              setSelectedRows(newSelection)
            }
            selectionModel={selectedRows}
            components={{
              Toolbar: () => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        indeterminate={
                          selectedRows.length > 0 &&
                          selectedRows.length < allLeadsData.length
                        }
                        checked={selectedRows.length === allLeadsData.length}
                        onChange={handleSelectAllClick}
                      />
                    }
                    label="Select All"
                  />
                </>
              ),
            }}
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
                // onSelect={(e)=> }
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
                {multibtn ? "Loading" : "Send"}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {multiLeadError ? (
          <InputErrorComponent value="Please Select At Least One Status ya Assignee column" />
        ) : (
          ""
        )}
        {selectLeadError ? (
          <InputErrorComponent value="Please Select At Least 2 Leads" />
        ) : (
          ""
        )}
        {leadDeleteErr ? (
          <InputErrorComponent value="Please Select At Least one Lead " />
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default LeadsModule
