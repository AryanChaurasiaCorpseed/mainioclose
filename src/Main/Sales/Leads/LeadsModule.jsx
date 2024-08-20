import React, { Suspense, useCallback, useEffect, useState } from "react"
import "./LeadsModule.scss"
import { Link, useParams } from "react-router-dom"
import LeadCreateModel from "../../../Model/LeadCreateModel"
import { useDispatch, useSelector } from "react-redux"
import TableScalaton from "../../../components/TableScalaton"
import { useCustomRoute } from "../../../Routes/GetCustomRoutes"
import { CSVLink } from "react-csv"
import {
  deleteMultipleLeads,
  getAllContactDetails,
  getAllLeads,
  getAllLeadUser,
  getAllStatusData,
  handleDeleteSingleLead,
  handleLeadassignedToSamePerson,
  handleViewHistory,
  multiAssignedLeads,
  updateAssigneeInLeadModule,
  updateHelper,
} from "../../../Toolkit/Slices/LeadSlice"
import MainHeading from "../../../components/design/MainHeading"
import {
  Button,
  Checkbox,
  Divider,
  Dropdown,
  notification,
  Popconfirm,
  Select,
  Space,
  Typography,
} from "antd"
import { Icon } from "@iconify/react"
import { getAllUsers } from "../../../Toolkit/Slices/UsersSlice"
import CompanyFormModal from "../../Accounts/CompanyFormModal"
import OverFlowText from "../../../components/OverFlowText"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../../components/Constants"
import { playErrorSound, playSuccessSound } from "../../Common/Commons"
const { Text } = Typography

const CommonTable = React.lazy(() => import(`../../../components/CommonTable`))

const LeadsModule = () => {
  const leadUserNew = useSelector((state) => state.leads.getAllLeadUserData)
  const getAllStatus = useSelector((state) => state.leads.getAllStatus)
  const [toDate, setToDate] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [multibtn, setMultibtn] = useState("")
  const [leadDelLoading, setLeadDelLoading] = useState("")
  const [hideMUltiFilter, setHideMUltiFilter] = useState(false)
  const [allStatusMulti, setAllStatusMulti] = useState([])
  const [allUserMulti, setAllUserMulti] = useState([])
  const [filterBtnNew, setFilterBtnNew] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [dropdownData, setDropdownData] = useState([])
  const [headerData, setHeaderData] = useState([])
  const onSelectChange = (newSelectedRowKeys, rowsData) => {
    setSelectedRowKeys(newSelectedRowKeys)
    setSelectedRow(rowsData)
  }

  const { userid } = useParams()
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
  }, [allUserMulti, allStatusMulti, toDate, fromDate, userid])

  const [assignedLeadInfo, setAssignedLeadInfo] = useState({
    statusId: null,
    assigneId: null,
  })

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllContactDetails())
    dispatch(getAllStatusData())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllLeadUser(userid))
  }, [userid, dispatch])

  useEffect(() => {
    dispatch(getAllLeads(allMultiFilterData))
  }, [filterBtnNew, allMultiFilterData, dispatch])

  const allLeadData = useSelector((state) => state.leads.allLeads)
  const allLeadsData = [...allLeadData]
  const leadCount = allLeadsData.length

  const handleDeleteMutipleLeads = useCallback(() => {
    let obj = {
      leadId: selectedRowKeys,
      updatedById: userid,
    }
    setLeadDelLoading("pending")
    dispatch(deleteMultipleLeads(obj))
      .then((response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          notification.success({ message: "Leads deleted successfully" })
          playSuccessSound()
          dispatch(getAllLeads(allMultiFilterData))
          setLeadDelLoading("success")
          setSelectedRowKeys([])
        } else {
          setLeadDelLoading("rejected")
          notification.error({ message: "Something went wrong" })
          playErrorSound()
        }
      })
      .catch(() => {
        setLeadDelLoading("rejected")
        notification.error({ message: "Something went wrong" })
        playErrorSound()
      })
  }, [selectedRowKeys, userid, dispatch, allMultiFilterData])

  const currentUserRoles = useSelector((state) => state?.auth?.roles)
  const adminRole = currentUserRoles.includes("ADMIN")
  const allUsers = useSelector((state) => state.user.allUsers)

  const exportData = selectedRow.map((row) => ({
    Id: row?.id,
    "Lead name": row?.leadName,
    "Missed task": row?.missedTaskName,
    Status: row?.status?.name,
    "Client name": row?.clients[0]?.name,
    Email: row?.email,
    "Mobile no.": row?.mobileNo,
    "Assignee person": row?.assignee?.fullName,
    "Created by": row?.createdBy?.fullName,
    Date: row?.createDate,
    Source: row?.source,
  }))

  const handleHelperChange = useCallback(
    (id, leadId) => {
      let temp = {
        leadId: leadId,
        userId: id,
      }
      dispatch(updateHelper(temp))
        .then((response) => {
          if (response?.meta?.requestStatus === "fulfilled") {
            notification.success({ message: "Helper updated successfully" })
            playSuccessSound()
            dispatch(getAllLeads(allMultiFilterData))
          } else {
            notification.error({ message: "Something went wrong" })
            playErrorSound()
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong" })
          playErrorSound()
        })
    },
    [dispatch, allMultiFilterData]
  )

  const handleUpdateAssignee = useCallback(
    (id, leadId) => {
      let data = {
        leadId: leadId,
        id: id,
        userid: userid,
      }
      dispatch(updateAssigneeInLeadModule(data))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Assignee is updated successfully",
            })
            playSuccessSound()
            dispatch(getAllLeads(allMultiFilterData))
          } else {
            notification.error({ message: "Something went wrong" })
            playErrorSound()
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong" })
          playErrorSound()
        })
    },
    [userid, allMultiFilterData, dispatch]
  )

  const leadDeleteResponse = useCallback(
    (id) => {
      let obj = {
        id,
        userid,
      }
      dispatch(handleDeleteSingleLead(obj))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Lead deleted successfully" })
            playSuccessSound()
            dispatch(getAllLeads(allMultiFilterData))
          } else {
            notification.error({ message: "Something went wrong" })
            playErrorSound()
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong" })
          playErrorSound()
        })
    },
    [userid, dispatch, allMultiFilterData]
  )

  const leadAssignedToSame = (id) => {
    dispatch(handleLeadassignedToSamePerson(id))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Lead assigned to same person successfully",
          })
          playSuccessSound()
          dispatch(getAllLeads(allMultiFilterData))
        } else {
          notification.error({ message: "Something went wrong" })
          playErrorSound()
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong" })
        playErrorSound()
      })
  }

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      fixed: "left",
      width: 80,
      checked: true,
    },
    {
      dataIndex: "leadName",
      title: "Lead name",
      fixed: "left",
      checked: true,
      render: (_, data) => (
        <OverFlowText
          linkText={true}
          to={`/erp/${userid}/sales/leads/${data?.id}`}
          onClick={() =>
            dispatch(
              handleViewHistory({ leadId: data?.id, userid: userid })
            ).then((resp) => {
              if (resp.meta.requestStatus === "fulfilled") {
                dispatch(getAllLeads(allMultiFilterData))
              }
            })
          }
        >
          {data?.leadName}
        </OverFlowText>
      ),
    },
    {
      title: "Missed task",
      dataIndex: "missedTaskDate",
      checked: true,
      render: (_, data) => {
        const taskStatus = data?.missedTaskStatus
        const taskName = data?.missedTaskName
        const taskDate = new Date(data?.missedTaskDate).toLocaleDateString()
        const hours = new Date(data?.missedTaskDate).getHours()
        const minutes = new Date(data?.missedTaskDate).getMinutes()
        const taskCreated = data?.missedTaskCretedBy
        return taskName !== null ? (
          <OverFlowText type={taskName !== null ? "danger" : ""}>
            {taskStatus} - {taskCreated} - {taskName}
            <br />
            {taskDate} {hours}:{minutes}
          </OverFlowText>
        ) : (
          <Text>NA</Text>
        )
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      checked: true,
      render: (_, data) => (
        <Text type={data?.status?.name ? "success" : ""}>
          {data?.status?.name ? data?.status?.name : "NA"}
        </Text>
      ),
    },
    {
      title: "Client name",
      dataIndex: "name",
      checked: true,
      render: (_, data) => (
        <OverFlowText>
          {data?.clients[0]?.name ? data?.clients[0]?.name : "NA"}
        </OverFlowText>
      ),
    },
    {
      title: "Mobile no.",
      dataIndex: "mobileNo",
      checked: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 300,
      checked: true,
      render: (_, record) => <OverFlowText>{record?.email}</OverFlowText>,
    },
    {
      title: "Assignee person",
      dataIndex: "assigneeName",
      checked: true,
      render: (_, data) => (
        <OverFlowText>{data?.assignee?.fullName}</OverFlowText>
      ),
    },

    {
      title: "Date",
      dataIndex: "createDate",
      checked: true,
      render: (_, data) => (
        <Text>{new Date(data?.createDate).toLocaleDateString()}</Text>
      ),
    },
    {
      title: "Change assignee",
      dataIndex: "assignee",
      checked: true,
      render: (_, data) => (
        <Select
          showSearch
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
          onChange={(e) => handleUpdateAssignee(e, data?.id)}
        />
      ),
    },
    ...(adminRole
      ? [
          {
            title: "Helper",
            dataIndex: "helper",
            checked: true,
            render: (_, data) => (
              <Select
                showSearch
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
            checked: true,
            render: (_, data) => (
              <OverFlowText>
                {data?.createdBy?.fullName ? data?.createdBy?.fullName : "NA"}
              </OverFlowText>
            ),
          },
          {
            title: "Source",
            dataIndex: "source",
            checked: true,
            render: (_, data) => (
              <OverFlowText>{data?.source ? data?.source : "NA"}</OverFlowText>
            ),
          },
          {
            title: "Create project",
            dataIndex: "project",
            checked: true,
            render: (_, data) => {
              return <CompanyFormModal data={data} />
            },
          },
          {
            title: "Lead Assigned",
            dataIndex: "assignedSame",
            render: (_, data) => (
              <Button onClick={() => leadAssignedToSame(data?.id)}>
                To same{" "}
              </Button>
            ),
          },
          {
            dataIndex: "action",
            title: "Action",
            checked: true,
            render: (_, data) => (
              <Popconfirm
                title="Delete the lead"
                description="Are you sure to delete this lead?"
                onConfirm={() => leadDeleteResponse(data?.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" size="small" danger>
                  <Icon
                    icon="fluent:delete-20-regular"
                    height={18}
                    width={18}
                  />
                </Button>
              </Popconfirm>
            ),
          },
        ]
      : []),
  ]

  const handleMultipleAssignedLeads = useCallback(() => {
    let obj = {
      leadIds: selectedRowKeys,
      updatedById: userid,
      ...assignedLeadInfo,
    }
    setMultibtn("pending")
    dispatch(multiAssignedLeads(obj))
      .then((response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          notification.success({ message: "Leads assigned successfully" })
          playSuccessSound()
          dispatch(getAllLeads(allMultiFilterData))
          setMultibtn("success")
          setSelectedRowKeys([])
        } else {
          notification.error({ message: "Something went wrong" })
          playErrorSound()
          setMultibtn("rejected")
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong" })
        playErrorSound()
        setMultibtn("rejected")
      })
  }, [dispatch, selectedRowKeys, userid, assignedLeadInfo, allMultiFilterData])

  const bellCountUrl = `/leadService/api/v1/notification/getUnseenCount?userId=${userid}`
  const bellCountDep = []

  const { productData: bellData } = useCustomRoute(bellCountUrl, bellCountDep)

  const menuStyle = {
    boxShadow: "none",
  }

  const handleOpenDropdown = useCallback(() => {
    const res = [...columns]
    setDropdownData(res)
    setOpenDropdown(true)
  }, [columns])

  const handleSelectColumns = useCallback((e, key) => {
    setDropdownData((prev) => {
      let temp = [...prev]
      let res = temp.map((ele) =>
        ele.title === key ? { ...ele, checked: e } : ele
      )
      let result = res?.filter((col) => col.checked === true)
      setHeaderData(result)
      return res
    })
  }, [])

  const columnDropDown = useCallback(
    (handleSelectColumns) => {
      const result = dropdownData?.map((item) => ({
        label: (
          <Checkbox
            checked={item?.checked}
            onChange={(e) => handleSelectColumns(!item?.checked, item?.title)}
          >
            {item?.title}
          </Checkbox>
        ),
      }))
      return result
    },
    [dropdownData]
  )

  return (
    <div className="lead-module small-box-padding">
      <div className="create-user-box">
        <MainHeading data={`Leads (${leadCount})`} />
        <div className="all-center">
          <Link to={`allTask`}>
            <Button className="mr-2" type="primary">
              All tasks
            </Button>
          </Link>
          {adminRole && (
            <div className="d-end mr-2">
              <Dropdown
                // destroyPopupOnHide={true}
                disabled={selectedRow?.length === 0 ? true : false}
                open={openDropdown}
                // onOpenChange={(e) => setOpenDropdown(e)}
                trigger={["click"]}
                overlayClassName="global-drop-down"
                menu={{ items: columnDropDown(handleSelectColumns) }}
                dropdownRender={(menu) => (
                  <div className="dropdown-content">
                    <div style={{ height: "100%", overflowY: "auto" }}>
                      {React.cloneElement(menu, {
                        style: menuStyle,
                      })}
                    </div>
                    <Divider
                      style={{
                        margin: 6,
                        color: "lightgray",
                      }}
                    />
                    <div className="flex-justify-end">
                      <Space>
                        <Button
                          size="small"
                          onClick={() => setOpenDropdown(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="primary" size="small">
                          <CSVLink
                            className="text-white"
                            data={exportData}
                            headers={
                              headerData?.length > 0
                                ? headerData?.map((column) => column.title)
                                : []
                            }
                            filename={"exported_data.csv"}
                          >
                            Export
                          </CSVLink>
                        </Button>
                      </Space>
                    </div>
                  </div>
                )}
              >
                <Button onClick={handleOpenDropdown}>
                  <Icon
                    icon="fluent:arrow-upload-16-filled"
                    height={BTN_ICON_HEIGHT}
                    width={BTN_ICON_WIDTH}
                  />
                </Button>
              </Dropdown>
            </div>
          )}
          <Button
            onClick={() => setHideMUltiFilter((prev) => !prev)}
            className="mr-2"
          >
            Filter data
          </Button>
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
        <div className="filter-container">
          <Select
            mode="multiple"
            allowClear
            showSearch
            style={{ width: "45%" }}
            value={allUserMulti}
            placeholder="Select users"
            onChange={(e) => setAllUserMulti(e)}
            options={
              leadUserNew?.length > 0
                ? leadUserNew?.map((item) => ({
                    label: item?.fullName,
                    value: item?.id,
                  }))
                : []
            }
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
          <Select
            mode="multiple"
            style={{ width: "45%" }}
            allowClear
            showSearch
            placeholder="Select Status"
            options={
              getAllStatus?.length > 0
                ? getAllStatus?.map((item) => ({
                    label: item?.name,
                    value: item?.id,
                  }))
                : []
            }
            onChange={(e) => setAllStatusMulti(e)}
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>
        {/* <MultiSelect
            style={{ dropdown: { backgroundColor: "#000" } }}
            value={allUserMulti}
            onChange={(e) => setAllUserMulti(e.value)}
            options={leadUserNew}
            optionLabel="fullName"
            placeholder="Select users"
            optionValue="id"
            maxSelectedLabels={3}
            className="multi-select-boxx"
          /> */}

        {/* <MultiSelect
            style={{ dropdown: { backgroundColor: "#000" } }}
            value={allStatusMulti}
            onChange={(e) => setAllStatusMulti(e.value)}
            options={getAllStatus}
            optionLabel="name"
            optionValue="id"
            placeholder="Select Status"
            maxSelectedLabels={3}
            className="multi-select-boxx"
          /> */}

        <div className="filter-right-container">
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
            data={allLeadsData?.reverse()}
            columns={columns}
            scroll={{ y: 505, x: 2500 }}
            rowSelection={true}
            onRowSelection={onSelectChange}
            selectedRowKeys={selectedRowKeys}
            rowClassName={(record) => (!record.view ? "light-gray-row" : "")}
          />
        </Suspense>

        {adminRole ? (
          <div className={`bottom-line`}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <Popconfirm
                title="Delete the leads"
                description="Are you sure to delete these leads?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleDeleteMutipleLeads}
              >
                <Button
                  danger
                  disabled={selectedRowKeys?.length === 0 ? true : false}
                >
                  {leadDelLoading === "pending" ? "Please wait..." : "Delete"}
                </Button>
              </Popconfirm>

              <Select
                allowClear
                showSearch
                style={{ width: 200 }}
                placeholder="Select status"
                options={
                  getAllStatus?.length > 0
                    ? getAllStatus?.map((item) => ({
                        label: item?.name,
                        value: item?.id,
                      }))
                    : []
                }
                onChange={(e) =>
                  setAssignedLeadInfo((prev) => ({
                    ...prev,
                    statusId: e,
                  }))
                }
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              />
            </div>
            <div>
              <Select
                showSearch
                allowClear
                style={{ width: 200 }}
                placeholder="select user"
                options={
                  leadUserNew?.length > 0
                    ? leadUserNew?.map((ele) => ({
                        label: ele?.fullName,
                        value: ele?.id,
                      }))
                    : []
                }
                onChange={(e) =>
                  setAssignedLeadInfo((prev) => ({
                    ...prev,
                    assigneId: e,
                  }))
                }
                filterOption={(input, option) =>
                  option.label.toLowerCase().includes(input.toLowerCase())
                }
              />
            </div>
            <div>
              <Button
                type="primary"
                disabled={selectedRowKeys?.length === 0 ? true : false}
                onClick={handleMultipleAssignedLeads}
              >
                {multibtn === "pending" ? "Loading..." : "Send"}
              </Button>
            </div>
            <Text>Selected rows: {selectedRowKeys?.length}</Text>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default LeadsModule
