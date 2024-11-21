import React, { lazy, Suspense, useCallback, useEffect, useState } from "react"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteTempAssignee,
  getAllTempCompanies,
  searchCompany,
  updateCompanyAssignee,
  updateMultiCompanyAssignee,
  updateMultiTempCompanyAssignee,
} from "../../../Toolkit/Slices/CompanySlice"
import TableScalaton from "../../../components/TableScalaton"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import ColComp from "../../../components/small/ColComp"
import { useParams } from "react-router-dom"
import { getAllLeadUser } from "../../../Toolkit/Slices/LeadSlice"
import {
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Flex,
  Input,
  notification,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd"
import OverFlowText from "../../../components/OverFlowText"
import { Icon } from "@iconify/react"
import { getHighestPriorityRole } from "../../Common/Commons"
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../../components/Constants"
import CompanyHistory from "./CompanyHistory"
import { CSVLink } from "react-csv"
const CommonTable = lazy(() => import("../../../components/CommonTable"))
const { Search } = Input
const { Text } = Typography

const TemporaryCompanies = () => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const currUser = useSelector((prev) => prev?.auth?.currentUser)
  const leadUserNew = useSelector((state) => state.leads.getAllLeadUserData)
  const currentRoles = useSelector((state) => state?.auth?.roles)
  const allUsers = useSelector((state) => state.user.allUsers)
  const { allTemporaryCompanies, loadingCompany, errorCompany } = useSelector(
    (prev) => prev?.company
  )
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRow, setSelectedRow] = useState([])
  const [assigneeId, setAssigneeId] = useState(null)
  const [assignedProcessing, setAssignedProcessing] = useState("")
  const [dropdownData, setDropdownData] = useState([])
  const [openDropdown, setOpenDropdown] = useState(false)
  const [headerData, setHeaderData] = useState([])
  const [tempAssigneeId, setTempAssigneeId] = useState(null)
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 50,
  })
  const [filterUserId, setFilterUserId] = useState("")

  useEffect(() => {
    dispatch(
      getAllTempCompanies({
        id: currUser?.id,
        page: paginationData?.page,
        size: paginationData?.size,
        filterUserId,
      })
    )
  }, [dispatch, currUser])

  useEffect(() => {
    dispatch(getAllLeadUser(userid))
  }, [userid, dispatch])

  const onSelectChange = (newSelectedRowKeys, rowsData) => {
    setSelectedRowKeys(newSelectedRowKeys)
    setSelectedRow(rowsData)
  }

  const onSearchLead = (e, b) => {
    dispatch(searchCompany({ inputText: e, userId: userid }))
    if (!b) {
      dispatch(searchCompany({ inputText: "", userId: userid }))
    }
  }

  const handlePagination = useCallback(
    (dataPage, size) => {
      dispatch(
        getAllTempCompanies({
          id: currUser?.id,
          page: dataPage,
          size: size,
          filterUserId: filterUserId,
        })
      )
      setPaginationData({ size: size, page: dataPage })
    },
    [currUser, dispatch, filterUserId]
  )

  const handleUpdateAssignee = useCallback(
    (assigneeId, companyId) => {
      let data = {
        companyId: companyId,
        assigneeId: assigneeId,
        currentUserId: userid,
      }
      dispatch(updateCompanyAssignee(data))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Assignee is updated successfully",
            })
            dispatch(
              getAllTempCompanies({
                id: currUser?.id,
                page: paginationData?.page,
                size: paginationData?.size,
                filterUserId,
              })
            )
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." })
        })
    },
    [dispatch, currUser, paginationData, filterUserId]
  )

  const filterCompanyBasedOnUser = useCallback(
    (filterUserId) => {
      if (filterUserId) {
        dispatch(
          getAllTempCompanies({
            id: currUser?.id,
            page: paginationData?.page,
            size: paginationData?.size,
            filterUserId,
          })
        )
        setFilterUserId(filterUserId)
      }
    },
    [paginationData, dispatch, currUser]
  )

  const tagsInTooltip = (data, type) => {
    return data?.map((items) => {
      return (
        <Tag className="slug-items-tooltip">
          {type === "lead" ? items?.leadNameame : items?.projectName}
        </Tag>
      )
    })
  }

  const columns = [
    {
      dataIndex: "companyId",
      title: "Id",
      fixed: "left",
      width: 80,
      checked: true,
    },
    {
      dataIndex: "companyName",
      title: "Company name",
      fixed: "left",
      checked: true,
      width: 250,
      render: (_, props) => (
        <OverFlowText linkText={true} to={`${props?.companyId}/details`}>
          {props?.companyName}
        </OverFlowText>
      ),
    },
    {
      dataIndex: "assignee",
      title: "Assignee",
      checked: true,
      render: (_, props) =>
        getHighestPriorityRole(currentRoles) === "ADMIN" ? (
          <Select
            size="small"
            showSearch
            style={{ width: "100%" }}
            value={props?.assignee?.id}
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
            onChange={(e) => handleUpdateAssignee(e, props?.companyId)}
          />
        ) : (
          <ColComp data={props?.assignee?.fullName} />
        ),
    },
    {
      dataIndex: "gstNo",
      title: "GST number",
      checked: false,
      render: (_, props) => <ColComp data={props?.gstNo} />,
    },
    {
      dataIndex: "gstType",
      title: "GST type",
      checked: false,
      render: (_, props) => <ColComp data={props?.gstType} />,
    },
    {
      dataIndex: "primaryContact",
      title: "Client name",
      checked: false,
      render: (_, record) => (
        <OverFlowText>{record?.primaryContact?.name}</OverFlowText>
      ),
    },
    {
      dataIndex: "projects",
      title: "Projects",
      checked: false,
      render: (_, data) =>
        data?.project?.length > 0 && data?.project?.length === 1 ? (
          <OverFlowText>{data?.project?.[0]?.projectName}</OverFlowText>
        ) : data?.project?.length >= 2 ? (
          <div className="flex-vert-hori-center">
            <OverFlowText>{data?.project?.[0]?.projectName} </OverFlowText>
            <Tooltip
              title={tagsInTooltip(data?.project)}
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
      dataIndex: "leads",
      title: "Leads",
      checked: false,
      render: (_, data) =>
        data?.lead?.length > 0 && data?.lead?.length === 1 ? (
          <OverFlowText>{data?.lead?.[0]?.leadNameame}</OverFlowText>
        ) : data?.lead?.length >= 2 ? (
          <div className="flex-vert-hori-center">
            <OverFlowText>{data?.lead?.[0]?.leadNameame} </OverFlowText>
            <Tooltip
              title={tagsInTooltip(data?.lead, "lead")}
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
      dataIndex: "primarydesigination",
      title: "Desigination",
      checked: false,
      render: (_, record) => (
        <OverFlowText>{record?.primaryContact?.designation}</OverFlowText>
      ),
    },
    {
      dataIndex: "contactNo",
      title: "Contact no.",
      checked: false,
      render: (_, record) => (
        <OverFlowText>{record?.primaryContact?.contactNo}</OverFlowText>
      ),
    },
    {
      dataIndex: "emails",
      title: "Email",
      checked: false,
      render: (_, record) => (
        <OverFlowText>{record?.primaryContact?.emails}</OverFlowText>
      ),
    },
    {
      dataIndex: "whatsappNo",
      title: "Whatsapp no.",
      checked: false,
      render: (_, record) => (
        <OverFlowText>{record?.primaryContact?.whatsappNo}</OverFlowText>
      ),
    },
    {
      dataIndex: "address",
      title: "Address",
      checked: false,
      render: (_, props) => <OverFlowText>{props?.address}</OverFlowText>,
    },
    {
      dataIndex: "city",
      title: "City",
      checked: false,
      render: (_, props) => <ColComp data={props?.city} />,
    },
    {
      dataIndex: "state",
      title: "State",
      checked: false,
      render: (_, props) => <ColComp data={props?.state} />,
    },

    {
      dataIndex: "country",
      title: "Country",
      checked: false,
      render: (_, props) => <ColComp data={props?.country} />,
    },
    {
      dataIndex: "secAddress",
      title: "Secondary address",
      checked: false,
      render: (_, props) => <OverFlowText>{props?.secAddress}</OverFlowText>,
    },
    {
      dataIndex: "secCity",
      title: "Secondary city",
      checked: false,
      render: (_, props) => <ColComp data={props?.secCity} />,
    },
    {
      dataIndex: "secState",
      title: "Secondary state",
      checked: false,
      render: (_, props) => <ColComp data={props?.secState} />,
    },
    {
      dataIndex: "seCountry",
      title: "Secondary country",
      checked: false,
      render: (_, props) => <ColComp data={props?.seCountry} />,
    },
    {
      dataIndex: "History",
      title: "Company history",
      checked: false,
      render: (_, props) => <CompanyHistory companyId={props.companyId} />,
    },
  ]

  const menuStyle = {
    boxShadow: "none",
  }

  const updateMultiAssigneeForCompanies = useCallback(() => {
    setAssignedProcessing("pending")
    dispatch(
      updateMultiCompanyAssignee({
        companyId: selectedRowKeys,
        currentUserId: userid,
        assigneeId: assigneeId,
      })
    )
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          setAssignedProcessing("success")
          notification.success({
            message: "Companies assigned to user successfully",
          })
          dispatch(
            getAllTempCompanies({
              id: currUser?.id,
              page: paginationData?.page,
              size: paginationData?.size,
              filterUserId,
            })
          )
          setSelectedRowKeys([])
          setAssigneeId(null)
        } else {
          setAssignedProcessing("error")
          notification.error({ message: "Something went wrong !." })
        }
      })
      .catch(() => {
        setAssignedProcessing("error")
        notification.error({ message: "Something went wrong !." })
      })
  }, [selectedRowKeys, assigneeId, dispatch, userid])

  const updateMultiTempAssigneeForCompanies = useCallback(() => {
    setAssignedProcessing("pending")
    dispatch(
      updateMultiTempCompanyAssignee({
        companyId: selectedRowKeys,
        currentUserId: userid,
        assigneeId: tempAssigneeId,
      })
    )
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          setAssignedProcessing("success")
          notification.success({
            message: "Companies assigned to user successfully",
          })
          dispatch(
            getAllTempCompanies({
              id: currUser?.id,
              page: paginationData?.page,
              size: paginationData?.size,
              filterUserId,
            })
          )
          setSelectedRowKeys([])
          setTempAssigneeId(null)
        } else {
          setAssignedProcessing("error")
          notification.error({ message: "Something went wrong !." })
        }
      })
      .catch(() => {
        setAssignedProcessing("error")
        notification.error({ message: "Something went wrong !." })
      })
  }, [
    selectedRowKeys,
    tempAssigneeId,
    dispatch,
    userid,
    paginationData,
    filterUserId,
    currUser,
  ])

  const handleDeleteAssignee = useCallback(() => {
    dispatch(
      deleteTempAssignee({
        companyId: selectedRowKeys,
        currentUserId: userid,
        assigneeId: userid,
      })
    )
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Assignee's are deleted from companies",
          })
          dispatch(
            getAllTempCompanies({
              id: currUser?.id,
              page: paginationData?.page,
              size: paginationData?.size,
              filterUserId,
            })
          )
          setSelectedRowKeys([])
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
  }, [
    dispatch,
    selectedRowKeys,
    userid,
    paginationData,
    filterUserId,
    currUser,
  ])

  const exportedData = selectedRow?.map((item) => ({
    Id: item?.companyId,
    "Company name": item?.companyName,
    Assignee: item?.assignee?.fullName,
    "GST number": item?.gstNo,
    "GST type": item?.gstType,
    "Client name": item?.primaryContact?.name,
    Projects: item?.project?.map((data) => data?.projectName),
    Leads: item?.lead?.map((data) => data?.leadNameame),
    Desigination: item?.primaryContact?.designation,
    "Contact no.": item?.primaryContact?.contactNo,
    Email: item?.primaryContact?.emails,
    "Whatsapp no.": item?.primaryContact?.whatsappNo,
    Address: item?.address,
    City: item?.city,
    State: item?.state,
    Country: item?.country,
    "Secondary address": item?.secAddress,
    "Secondary city": item?.secCity,
    "Secondary state": item?.secState,
    "Secondary country": item?.seCountry,
  }))

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

  const handleOpenDropdown = useCallback(() => {
    const res = [...columns]
    let result = res?.filter((col) => col.checked === true)
    setDropdownData(res)
    setHeaderData(result)
    setOpenDropdown(true)
  }, [columns])

  return (
    <TableOutlet>
      <MainHeading
        data={`Temporary companies (${
          allTemporaryCompanies?.[0]?.total === undefined
            ? 0
            : allTemporaryCompanies?.[0]?.total
        })`}
      />
      <Flex justify="space-between" align="center">
        <div className="flex-verti-center-hori-start mt-2">
          <Search
            size="small"
            onSearch={onSearchLead}
            style={{ width: "220px" }}
            placeholder="search"
            onChange={(e) =>
              !e.target.value
                ? dispatch(searchCompany({ inputText: "", userId: userid }))
                : ""
            }
            enterButton="search"
            prefix={<Icon icon="fluent:search-24-regular" />}
          />
          {getHighestPriorityRole(currentRoles) === "ADMIN" && (
            <Select
              showSearch
              allowClear
              style={{ width: "250px" }}
              placeholder="Filter out companies"
              value={filterUserId === "" ? null : filterUserId}
              options={
                allUsers?.length > 0
                  ? allUsers?.map((item) => ({
                      label: item?.fullName,
                      value: item?.id,
                    }))
                  : []
              }
              filterOption={(input, option) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              onChange={filterCompanyBasedOnUser}
              onClear={() =>
                dispatch(
                  getAllTempCompanies({
                    id: currUser?.id,
                    page: paginationData?.page,
                    size: paginationData?.size,
                    filterUserId: "",
                  })
                )
              }
            />
          )}
        </div>
        <Dropdown
          disabled={selectedRow?.length === 0 ? true : false}
          open={openDropdown}
          // onOpenChange={(e) => setOpenDropdown(e)}
          trigger={["click"]}
          overlayClassName="global-drop-down"
          menu={{ items: columnDropDown(handleSelectColumns) }}
          dropdownRender={(menu) => (
            <div className="dropdown-content">
              <div className="dropdown-content-container">
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
                  <Button size="small" onClick={() => setOpenDropdown(false)}>
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
                      data={exportedData}
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
            Export
          </Button>
        </Dropdown>
      </Flex>
      <div className="mt-3">
        {loadingCompany && <TableScalaton />}
        {errorCompany && <SomethingWrong />}
        {allTemporaryCompanies && !loadingCompany && !errorCompany && (
          <Suspense fallback={<TableScalaton />}>
            <CommonTable
              data={allTemporaryCompanies}
              columns={columns}
              scroll={{ x: 3300, y: 480 }}
              rowSelection={true}
              onRowSelection={onSelectChange}
              selectedRowKeys={selectedRowKeys}
              rowKey={(record) => record?.companyId}
              pagination={true}
              page={paginationData?.page}
              pageSize={paginationData?.size}
              totalCount={allTemporaryCompanies?.[0]?.total}
              handlePagination={handlePagination}
              footerContent={
                <div className={`bottom-line`}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 12,
                    }}
                  >
                    <Flex gap={8}>
                      <Button
                        danger
                        size="small"
                        onClick={handleDeleteAssignee}
                        disabled={selectedRowKeys?.length===0}
                      >
                        Delete assignee
                      </Button>
                      <Select
                        showSearch
                        allowClear
                        size="small"
                        style={{ width: 200 }}
                        value={assigneeId}
                        placeholder="select user"
                        options={
                          leadUserNew?.length > 0
                            ? leadUserNew?.map((ele) => ({
                                label: ele?.fullName,
                                value: ele?.id,
                              }))
                            : []
                        }
                        onChange={(e) => setAssigneeId(e)}
                        onClear={() => setAssigneeId(null)}
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                      <Button
                        type="primary"
                        disabled={
                          selectedRowKeys?.length === 0 && !assigneeId
                            ? true
                            : false
                        }
                        onClick={updateMultiAssigneeForCompanies}
                        size="small"
                      >
                        {assignedProcessing === "pending"
                          ? "Loading..."
                          : "Send"}
                      </Button>
                    </Flex>
                    <Flex gap={8}>
                      <Select
                        showSearch
                        allowClear
                        size="small"
                        style={{ width: 200 }}
                        value={tempAssigneeId}
                        placeholder="select temporary user"
                        options={
                          leadUserNew?.length > 0
                            ? leadUserNew?.map((ele) => ({
                                label: ele?.fullName,
                                value: ele?.id,
                              }))
                            : []
                        }
                        onChange={(e) => setTempAssigneeId(e)}
                        onClear={() => setTempAssigneeId(null)}
                        filterOption={(input, option) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                      <Button
                        type="primary"
                        disabled={
                          selectedRowKeys?.length === 0 && !assigneeId
                            ? true
                            : false
                        }
                        onClick={updateMultiTempAssigneeForCompanies}
                        size="small"
                      >
                        {assignedProcessing === "pending"
                          ? "Loading..."
                          : "Update temp assignee"}
                      </Button>
                    </Flex>
                    <Text>Selected rows: {selectedRowKeys?.length}</Text>
                  </div>
                </div>
              }
            />
          </Suspense>
        )}
      </div>
    </TableOutlet>
  )
}

export default TemporaryCompanies
