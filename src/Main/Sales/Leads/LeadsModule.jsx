import React, { Suspense, useCallback, useEffect, useState } from "react"
import "./LeadsModule.scss"
import { Link, useParams } from "react-router-dom"
import LeadCreateModel from "../../../Model/LeadCreateModel"
import { useDispatch, useSelector } from "react-redux"
import TableScalaton from "../../../components/TableScalaton"
import { CSVLink } from "react-csv"
import {
  deleteMultipleLeads,
  getAllLeads,
  getLeadNotificationCount,
  handleDeleteSingleLead,
  handleLeadassignedToSamePerson,
  handleNextPagination,
  handlePrevPagination,
  multiAssignedLeads,
  searchLeads,
  updateAssigneeInLeadModule,
  updateHelper,
} from "../../../Toolkit/Slices/LeadSlice"
import MainHeading from "../../../components/design/MainHeading"
import {
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Input,
  notification,
  Popconfirm,
  Select,
  Space,
  Typography,
} from "antd"
import { Icon } from "@iconify/react"
import CompanyFormModal from "../../Accounts/CompanyFormModal"
import OverFlowText from "../../../components/OverFlowText"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../../components/Constants"
import { playErrorSound, playSuccessSound } from "../../Common/Commons"
import LeadsDetailsMainPage from "./LeadsDetailsMainPage"
const { Text } = Typography
const { Search } = Input

const CommonTable = React.lazy(() => import(`../../../components/CommonTable`))

const LeadsModule = () => {
  const allLeadData = useSelector((state) => state.leads.allLeads)
  const leadUserNew = useSelector((state) => state.leads.getAllLeadUserData)
  const getAllStatus = useSelector((state) => state.leads.getAllStatus)
  const leadsLoading = useSelector((state) => state.leads.leadsLoading)
  const notificationCount = useSelector(
    (state) => state.leads.notificationCount
  )
  const page = useSelector((state) => state.leads.page)
  const [toDate, setToDate] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [multibtn, setMultibtn] = useState("")
  const [leadDelLoading, setLeadDelLoading] = useState("")
  const [hideMUltiFilter, setHideMUltiFilter] = useState(false)
  const [allStatusMulti, setAllStatusMulti] = useState([1])
  const [allUserMulti, setAllUserMulti] = useState([])
  const [filterBtnNew, setFilterBtnNew] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [dropdownData, setDropdownData] = useState([])
  const [headerData, setHeaderData] = useState([])
  const [searchText, setSearchText] = useState("")

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
    page,
  })

  useEffect(() => {
    setAllMultiFilterData((prev) => ({
      ...prev,
      userId: userid,
      userIdFilter: allUserMulti,
      statusId: allStatusMulti,
      toDate: toDate,
      fromDate: fromDate,
      page,
    }))
  }, [allUserMulti, allStatusMulti, toDate, fromDate, userid, page])

  const [assignedLeadInfo, setAssignedLeadInfo] = useState({
    statusId: null,
    assigneId: null,
  })

  useEffect(() => {
    dispatch(getAllLeads(allMultiFilterData))
  }, [filterBtnNew, allMultiFilterData, dispatch, page])

  const handleDeleteMutipleLeads = useCallback(() => {
    let obj = {
      leadId: selectedRowKeys,
      updatedById: Number(userid),
    }
    setLeadDelLoading("pending")
    dispatch(deleteMultipleLeads(obj))
      .then((response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          notification.success({ message: "Leads deleted successfully" })
          // playSuccessSound()
          dispatch(getAllLeads(allMultiFilterData))
          setLeadDelLoading("success")
          setSelectedRowKeys([])
        } else {
          setLeadDelLoading("rejected")
          notification.error({ message: "Something went wrong !." })
          // playErrorSound()
        }
      })
      .catch(() => {
        setLeadDelLoading("rejected")
        notification.error({ message: "Something went wrong !." })
        // playErrorSound()
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
    Helper: row?.helpUser?.fullName,
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
            // playSuccessSound()
            dispatch(getAllLeads(allMultiFilterData))
          } else {
            notification.error({ message: "Something went wrong !." })
            // playErrorSound()
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
          // playErrorSound()
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
              message: "Assignee is updated successfully.",
            })
            // playSuccessSound()
            dispatch(getAllLeads(allMultiFilterData))
          } else {
            notification.error({ message: "Something went wrong !." })
            // playErrorSound()
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
          // playErrorSound()
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
            notification.success({ message: "Lead deleted successfully." })
            // playSuccessSound()
            dispatch(getAllLeads(allMultiFilterData))
          } else {
            notification.error({ message: "Something went wrong !." })
            // playErrorSound()
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
          // playErrorSound()
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
          // playSuccessSound()
          dispatch(getAllLeads(allMultiFilterData))
        } else {
          notification.error({ message: "Something went wrong !." })
          // playErrorSound()
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong !." })
        // playErrorSound()
      })
  }

  const columns = [
    {
      dataIndex: "sno",
      title: "S no.",
      fixed: "left",
      width: 80,
      checked: true,
      render: (y, x, idx) => <Text>{idx + 1}</Text>,
    },
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
      width: 250,
      sorter: (a, b) => {
        const nameA = a.leadName.toLowerCase()
        const nameB = b.leadName.toLowerCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      },
      render: (_, data) => (
        <LeadsDetailsMainPage
          allMultiFilterData={allMultiFilterData}
          setSearchText={setSearchText}
          leadId={data?.id}
          data={data}
        >
          {data?.leadName}
        </LeadsDetailsMainPage>
      ),
    },
    {
      title: "Lead freq.",
      dataIndex: "count",
    },
    {
      title: "Mobile no.",
      dataIndex: "mobileNo",
      checked: true,
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
            {taskStatus} - {taskCreated} - {taskName} | {taskDate} {hours}:
            {minutes}
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
      sorter: (a, b) => {
        const nameA = a.clients[0]?.name.toLowerCase()
        const nameB = b.clients[0]?.name.toLowerCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      },
      render: (_, data) => (
        <OverFlowText>
          {data?.clients[0]?.name ? data?.clients[0]?.name : "NA"}
        </OverFlowText>
      ),
    },
    
    {
      title: "Email",
      dataIndex: "email",
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
      checked: false,
      render: (_, data) => (
        <Select
          showSearch
          size="small"
          style={{ width: "100%" }}
          value={adminRole ? data?.assignee?.id : ""}
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
                size="small"
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
              <OverFlowText>{data?.createdBy?.fullName}</OverFlowText>
            ),
          },
          {
            title: "Source",
            dataIndex: "source",
            checked: true,
            render: (_, data) => <OverFlowText>{data?.source}</OverFlowText>,
          },
          {
            title: "Create project",
            dataIndex: "project",
            checked: false,
            render: (_, data) => <CompanyFormModal data={data} />,
          },
          {
            title: "Lead assigned",
            dataIndex: "assignedSame",
            checked: false,
            render: (_, data) => (
              <Button size="small" onClick={() => leadAssignedToSame(data?.id)}>
                To same{" "}
              </Button>
            ),
          },
          {
            dataIndex: "action",
            title: "Action",
            checked: false,
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
          // playSuccessSound()
          dispatch(getAllLeads(allMultiFilterData))
          setMultibtn("success")
          setSelectedRowKeys([])
          setAssignedLeadInfo({
            statusId: null,
            assigneId: null,
          })
        } else {
          notification.error({ message: "Something went wrong !." })
          // playErrorSound()
          setMultibtn("rejected")
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong !." })
        // playErrorSound()
        setMultibtn("rejected")
      })
  }, [dispatch, selectedRowKeys, userid, assignedLeadInfo, allMultiFilterData])

  useEffect(() => {
    const notifcationApi = setInterval(() => {
      dispatch(getLeadNotificationCount(userid)).then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          // playSuccessSound()
        }
      })
    }, 1 * 60 * 1000)
    dispatch(getLeadNotificationCount(userid)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        // playSuccessSound()
      }
    })
    return () => clearInterval(notifcationApi)
  }, [userid, dispatch])

  const menuStyle = {
    boxShadow: "none",
  }

  const handleOpenDropdown = useCallback(() => {
    const res = [...columns]
    let result = res?.filter((col) => col.checked === true)
    setDropdownData(res)
    setHeaderData(result)
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

  const onSearchLead = (e, b, c) => {
    if (e) {
      setSearchText(e)
      dispatch(searchLeads({ input: e, id: userid }))
    }
    if (!b) {
      // dispatch(searchLeads({ input: "", id: userid }))
      setSearchText("")
      dispatch(getAllLeads(allMultiFilterData))
      setSearchText("")
    }
  }

  return (
    <div className="lead-module small-box-padding">
      <div className="create-user-box">
        <MainHeading data={`Leads (${allLeadData?.length})`} />
        <div className="all-center">
          <Link to={`allTask`}>
            <Button className="mr-2" size="small" type="primary">
              All tasks
            </Button>
          </Link>
          {adminRole && (
            <div className="d-end mr-2">
              <Dropdown
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
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => {
                            setOpenDropdown(false)
                            setSelectedRow([])
                            setSelectedRowKeys([])
                          }}
                        >
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
                <Button size="small" onClick={handleOpenDropdown}>
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
            size="small"
          >
            Filter data
          </Button>
          <LeadCreateModel />
          <Link to={`notification`}>
            <div className="bell-box">
              <span className="bell-count">{notificationCount}</span>
              <span className="bell-icon">
                <i className="fa-regular fa-bell"></i>
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className={`${hideMUltiFilter ? "" : "d-none"} all-between py-2`}>
        <div className="filter-container">
          {adminRole && (
            <Select
              mode="multiple"
              maxTagCount="responsive"
              size="small"
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
          )}
          <Select
            mode="multiple"
            maxTagCount="responsive"
            size="small"
            style={{ width: "45%" }}
            value={allStatusMulti}
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
      <div className="flex-verti-center-hori-start mt-2">
        <Search
          placeholder="search"
          size="small"
          allowClear
          value={searchText}
          onSearch={onSearchLead}
          onChange={(e) => {
            setSearchText(e.target.value)
            if (!e.target.value && !e.target.value.trim()) {
              // dispatch(searchLeads({ input: "", id: userid }))
              dispatch(getAllLeads(allMultiFilterData))
              setSearchText("")
            }
          }}
          enterButton="search"
          style={{ width: "250px" }}
          prefix={<Icon icon="fluent:search-24-regular" />}
        />
      </div>
      <div className="table-arrow">
        <Suspense fallback={<TableScalaton />}>
            <CommonTable
              data={allLeadData}
              columns={columns}
              scroll={{ y: 520, x: adminRole ? 2500 : 1500 }}
              rowSelection={true}
              onRowSelection={onSelectChange}
              selectedRowKeys={selectedRowKeys}
              rowClassName={(record) => (!record.view ? "light-gray-row" : "")}
              rowKey={(record) => record?.id}
              pagination={true}
              nextDisable={allLeadData?.length < 50 ? true : false}
              prevDisable={page === 0 ? true : false}
              nextPage={handleNextPagination}
              prevPage={handlePrevPagination}
              footerContent={
                adminRole ? (
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
                        description="Are you sure to delete these leads ?."
                        okText="Yes"
                        cancelText="No"
                        onConfirm={handleDeleteMutipleLeads}
                      >
                        <Button
                          danger
                          disabled={
                            selectedRowKeys?.length === 0 ? true : false
                          }
                          size="small"
                        >
                          {leadDelLoading === "pending"
                            ? "Please wait..."
                            : "Delete"}
                        </Button>
                      </Popconfirm>

                      <Select
                        allowClear
                        showSearch
                        size="small"
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
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    </div>
                    <div>
                      <Select
                        showSearch
                        allowClear
                        size="small"
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
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    </div>
                    <div>
                      <Button
                        type="primary"
                        disabled={selectedRowKeys?.length === 0 ? true : false}
                        onClick={handleMultipleAssignedLeads}
                        size="small"
                      >
                        {multibtn === "pending" ? "Loading..." : "Send"}
                      </Button>
                    </div>
                    <Text>Selected rows: {selectedRowKeys?.length}</Text>
                  </div>
                ) : (
                  ""
                )
              }
            />
        </Suspense>
      </div>
    </div>
  )
}

export default LeadsModule
