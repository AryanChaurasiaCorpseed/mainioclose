import React, { Suspense, useCallback, useEffect, useState } from "react";
import "./LeadsModule.scss";
import { Link, useParams } from "react-router-dom";
import LeadCreateModel from "../../../Model/LeadCreateModel";
import { useDispatch, useSelector } from "react-redux";
import TableScalaton from "../../../components/TableScalaton";
import { CSVLink } from "react-csv";
import {
  deleteMultipleLeads,
  getAllLeadCount,
  getAllLeads,
  getAllLeadsForExport,
  getAllStatusData,
  getLeadNotificationCount,
  handleDeleteSingleLead,
  handleFlagByQualityTeam,
  handleLeadassignedToSamePerson,
  importLeadsSheet,
  multiAssignedLeads,
  searchLeads,
  updateAssigneeInLeadModule,
  updateHelper,
} from "../../../Toolkit/Slices/LeadSlice";
import MainHeading from "../../../components/design/MainHeading";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Dropdown,
  Flex,
  Input,
  notification,
  Popconfirm,
  Popover,
  Select,
  Space,
  Spin,
  Typography,
  Upload,
} from "antd";
import { Icon } from "@iconify/react";
import CompanyFormModal from "../../Accounts/CompanyFormModal";
import OverFlowText from "../../../components/OverFlowText";
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../../components/Constants";
import {
  playErrorSound,
  playSuccessSound,
  rangePresets,
} from "../../Common/Commons";
import LeadsDetailsMainPage from "./LeadsDetailsMainPage";
import dayjs from "dayjs";
const { Text, Title } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const CommonTable = React.lazy(() => import(`../../../components/CommonTable`));

const LeadsModule = () => {
  const allLeadData = useSelector((state) => state.leads.allLeads);
  const leadUserNew = useSelector((state) => state.leads.getAllLeadUserData);
  const getAllStatus = useSelector((state) => state.leads.getAllStatus);
  const leadresponseStatus = useSelector(
    (state) => state.leads.leadresponseStatus
  );
  const notificationCount = useSelector(
    (state) => state.leads.notificationCount
  );
  const currentUserDetail = useSelector(
    (state) => state.auth.getDepartmentDetail
  );
  const totalCount = useSelector((state) => state.leads.totalCount);
  const allLeadsForExport = useSelector(
    (state) => state.leads.allLeadsForExport
  );
  const [multibtn, setMultibtn] = useState("");
  const [leadDelLoading, setLeadDelLoading] = useState("");
  const [hideMUltiFilter, setHideMUltiFilter] = useState(false);
  const [filterBtnNew, setFilterBtnNew] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const onSelectChange = (newSelectedRowKeys, rowsData) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRow(rowsData);
  };

  const { userid } = useParams();
  const dispatch = useDispatch();
  const [allMultiFilterData, setAllMultiFilterData] = useState({
    userId: Number(userid),
    userIdFilter: [],
    statusId: [1],
    toDate: "",
    fromDate: "",
    page: 1,
    size: 50,
  });

  const [assignedLeadInfo, setAssignedLeadInfo] = useState({
    statusId: null,
    assigneId: null,
  });

  useEffect(() => {
    dispatch(getAllLeads(allMultiFilterData));
    dispatch(getAllLeadCount(allMultiFilterData));
    dispatch(getAllLeadsForExport(allMultiFilterData));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllStatusData());
  }, [dispatch]);

  const handlePagination = useCallback(
    (dataPage, size) => {
      dispatch(getAllLeads({ ...allMultiFilterData, page: dataPage, size }));
      setAllMultiFilterData((prev) => ({ ...prev, page: dataPage, size }));
    },
    [allMultiFilterData, dispatch]
  );

  const handleDeleteMutipleLeads = useCallback(() => {
    let obj = {
      leadId: selectedRowKeys,
      updatedById: Number(userid),
    };
    setLeadDelLoading("pending");
    dispatch(deleteMultipleLeads(obj))
      .then((response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          notification.success({ message: "Leads deleted successfully" });
          // playSuccessSound()
          dispatch(getAllLeads(allMultiFilterData));
          setLeadDelLoading("success");
          setSelectedRowKeys([]);
        } else {
          setLeadDelLoading("rejected");
          notification.error({ message: "Something went wrong !." });
          // playErrorSound()
        }
      })
      .catch(() => {
        setLeadDelLoading("rejected");
        notification.error({ message: "Something went wrong !." });
        // playErrorSound()
      });
  }, [selectedRowKeys, userid, dispatch, allMultiFilterData]);

  const currentUserRoles = useSelector((state) => state?.auth?.roles);
  const adminRole = currentUserRoles.includes("ADMIN");
  const allUsers = useSelector((state) => state.user.allUsers);

  const exportData = allLeadsForExport?.map((row) => ({
    Id: row?.id,
    "Lead name": row?.leadName,
    "Missed task": row?.missedTaskName,
    Frequency: row?.count,
    Status: row?.status,
    "Client name": row?.clientName,
    Email: row?.clientEmail,
    "Mobile no.": row?.clientMobNo,
    "Assignee person": row?.assigneeName,
    "Assignee email": row?.assigneeEmail,
    "Created by": row?.createdBy,
    Source: row?.source,
    "Updated By": row?.updatedBy,
    "Reopen By": row?.reopenBy,
    "Reopen By Quality": row?.isReopenByQuality,
    "Created Date": dayjs(row?.createDate).format("YYYY-MM-DD"),
  }));

  const headers = [
    "Id",
    "Lead name",
    "Missed task",
    "Frequency",
    "Status",
    "Client name",
    "Email",
    "Mobile no.",
    "Assignee person",
    "Assignee email",
    "Created by",
    "Helper",
    "Source",
    "Updated By",
    "Reopen By",
    "Reopen By Quality",
    "Created Date",
  ];

  const handleHelperChange = useCallback(
    (id, leadId) => {
      let temp = {
        leadId: leadId,
        userId: id,
      };
      dispatch(updateHelper(temp))
        .then((response) => {
          if (response?.meta?.requestStatus === "fulfilled") {
            notification.success({ message: "Helper updated successfully" });
            // playSuccessSound()
            dispatch(getAllLeads(allMultiFilterData));
          } else {
            notification.error({ message: "Something went wrong !." });
            // playErrorSound()
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." });
          // playErrorSound()
        });
    },
    [dispatch, allMultiFilterData]
  );

  const handleUpdateAssignee = useCallback(
    (id, leadId) => {
      let data = {
        leadId: leadId,
        id: id,
        userid: userid,
      };
      dispatch(updateAssigneeInLeadModule(data))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Assignee is updated successfully.",
            });
            // playSuccessSound()
            dispatch(getAllLeads(allMultiFilterData));
          } else {
            notification.error({ message: "Something went wrong !." });
            // playErrorSound()
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." });
          // playErrorSound()
        });
    },
    [userid, allMultiFilterData, dispatch]
  );

  const leadDeleteResponse = useCallback(
    (id) => {
      let obj = {
        id,
        userid,
      };
      dispatch(handleDeleteSingleLead(obj))
        .then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Lead deleted successfully." });
            // playSuccessSound()
            dispatch(getAllLeads(allMultiFilterData));
          } else {
            notification.error({ message: "Something went wrong !." });
            // playErrorSound()
          }
        })
        .catch(() => {
          notification.error({ message: "Something went wrong !." });
          // playErrorSound()
        });
    },
    [userid, dispatch, allMultiFilterData]
  );

  const leadAssignedToSame = (id) => {
    dispatch(handleLeadassignedToSamePerson(id))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          notification.success({
            message: "Lead assigned to same person successfully",
          });
          // playSuccessSound()
          dispatch(getAllLeads(allMultiFilterData));
        } else {
          notification.error({ message: "Something went wrong !." });
          // playErrorSound()
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong !." });
        // playErrorSound()
      });
  };

  const handleFlag = useCallback(
    (data) => {
      dispatch(
        handleFlagByQualityTeam({
          currentUerId: userid,
          leadId: data?.id,
          isMarked: data?.reopenByQuality ? false : true,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({
              message: "Lead status updated successfully",
            });
            dispatch(getAllLeads(allMultiFilterData));
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    },
    [dispatch, userid,allMultiFilterData]
  );

  const columns = [
    {
      dataIndex: "sno",
      title: "S no.",
      fixed: "left",
      width: 80,
      checked: true,
      render: (y, data, idx) => (
        <Flex justify="space-between" align="center">
          <Text>{idx + 1}</Text>
          {currentUserDetail?.department === "Quality Team" && (
            <Button size="small" type="text" onClick={() => handleFlag(data)}>
              <Icon
                icon="fluent:flag-24-filled"
                color={data?.reopenByQuality ? "red" : ""}
              />F
            </Button>
          )}
        </Flex>
      ),
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
        const nameA = a.leadName.toLowerCase();
        const nameB = b.leadName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      },
      render: (_, data) => (
        <LeadsDetailsMainPage
          allMultiFilterData={allMultiFilterData}
          setSearchText={setSearchText}
          leadId={data?.id}
          data={data}
        >
          {data?.originalName ? data?.originalName : data?.leadName}
        </LeadsDetailsMainPage>
      ),
    },
    {
      title: "Lead freq.",
      dataIndex: "count",
    },
    ...(adminRole
      ? [
          {
            title: "Mobile no.",
            dataIndex: "mobileNo",
            checked: true,
          },
        ]
      : []),
    {
      title: "Missed task",
      dataIndex: "missedTaskDate",
      checked: true,
      render: (_, data) => {
        const taskStatus = data?.missedTaskStatus;
        const taskName = data?.missedTaskName;
        const taskDate = new Date(data?.missedTaskDate).toLocaleDateString();
        const hours = new Date(data?.missedTaskDate).getHours();
        const minutes = new Date(data?.missedTaskDate).getMinutes();
        const taskCreated = data?.missedTaskCretedBy;
        return taskName !== null ? (
          <OverFlowText type={taskName !== null ? "danger" : ""}>
            {taskStatus} - {taskCreated} - {taskName} | {taskDate} {hours}:
            {minutes}
          </OverFlowText>
        ) : (
          <Text>NA</Text>
        );
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
        const nameA = a.clients[0]?.name?.toLowerCase();
        const nameB = b.clients[0]?.name?.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      },
      render: (_, data) => (
        <OverFlowText>
          {data?.clients[0]?.name ? data?.clients[0]?.name : "NA"}
        </OverFlowText>
      ),
    },
    ...(adminRole
      ? [
          {
            title: "Email",
            dataIndex: "email",
            checked: true,
            render: (_, record) => <OverFlowText>{record?.email}</OverFlowText>,
          },
        ]
      : []),
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
          ...(adminRole
            ? [
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
                  render: (_, data) => (
                    <OverFlowText>{data?.source}</OverFlowText>
                  ),
                },
              ]
            : []),
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
                <Button  size="small" danger>
                  <Icon
                    icon="fluent:delete-20-regular"
                    height={18}
                    width={18}
                  />
                  Delete
                </Button>
              </Popconfirm>
            ),
          },
        ]
      : []),
  ];

  const handleMultipleAssignedLeads = useCallback(() => {
    let obj = {
      leadIds: selectedRowKeys,
      updatedById: userid,
      ...assignedLeadInfo,
    };
    setMultibtn("pending");
    dispatch(multiAssignedLeads(obj))
      .then((response) => {
        if (response?.meta?.requestStatus === "fulfilled") {
          notification.success({ message: "Leads assigned successfully ." });
          // playSuccessSound()
          dispatch(getAllLeads(allMultiFilterData));
          setMultibtn("success");
          setSelectedRowKeys([]);
          setAssignedLeadInfo({
            statusId: null,
            assigneId: null,
          });
        } else {
          notification.error({ message: "Something went wrong !." });
          // playErrorSound()
          setMultibtn("rejected");
        }
      })
      .catch(() => {
        notification.error({ message: "Something went wrong !." });
        // playErrorSound()
        setMultibtn("rejected");
      });
  }, [dispatch, selectedRowKeys, userid, assignedLeadInfo, allMultiFilterData]);

  useEffect(() => {
    const notifcationApi = setInterval(() => {
      dispatch(getLeadNotificationCount(userid)).then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          // playSuccessSound()
        }
      });
    }, 1 * 60 * 1000);
    dispatch(getLeadNotificationCount(userid)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        // playSuccessSound()
      }
    });
    return () => clearInterval(notifcationApi);
  }, [userid, dispatch]);

  const onSearchLead = (e, b, c) => {
    if (e) {
      setSearchText(e);
      dispatch(searchLeads({ input: e, id: userid }));
    }
    if (!b) {
      // dispatch(searchLeads({ input: "", id: userid }))
      setSearchText("");
      dispatch(getAllLeads(allMultiFilterData));
    }
  };

  const props = {
    name: "file",
    multiple: true,
    action: "/leadService/api/v1/upload/uploadimageToFileSystem",
    onChange(info) {
      setUploadedFile(info?.file?.response);
    },
    onDrop(e) { },
  };

  const handleUploadFile = useCallback(() => {
    if (uploadedFile) {
      dispatch(importLeadsSheet(uploadedFile))
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "File uploaded successfully !." });
          } else {
            notification.error({ message: "Something wemt wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something wemt wrong !." })
        );
    }
  }, [dispatch, uploadedFile]);

  const handleApplyFilter = useCallback(() => {
    setSelectedRowKeys([]);
    dispatch(getAllLeads(allMultiFilterData));
    dispatch(getAllLeadsForExport(allMultiFilterData));
    dispatch(getAllLeadCount(allMultiFilterData));
  }, [allMultiFilterData, dispatch]);

  const handleResetFilter = useCallback(() => {
    dispatch(
      getAllLeads({
        userId: Number(userid),
        userIdFilter: [],
        statusId: [1],
        toDate: "",
        fromDate: "",
        page: 1,
        size: 50,
      })
    );
    dispatch(
      getAllLeadsForExport({
        userId: Number(userid),
        userIdFilter: [],
        statusId: [1],
        toDate: "",
        fromDate: "",
        page: 1,
        size: 50,
      })
    );
    dispatch(
      getAllLeadCount({
        userId: Number(userid),
        userIdFilter: [],
        statusId: [1],
        toDate: "",
        fromDate: "",
        page: 1,
        size: 50,
      })
    );
  }, [dispatch, userid]);

  return (
    <div className="lead-module small-box-padding">
      <div className="create-user-box">
        <MainHeading data={`Leads (${totalCount})`} />
        <div className="all-center">
          <Link to={`allTask`}>
            <Button className="mr-2" size="small" type="primary">
              All tasks
            </Button>
          </Link>
          {adminRole && (
            <div className="d-end mr-2">
              <CSVLink
                className="text-white"
                data={exportData}
                headers={headers}
                filename={"exported_data.csv"}
              >
                <Button
                  size="small"
                  // onClick={() => {
                  //   setOpenDropdown(false);
                  //   setSelectedRow([]);
                  //   setSelectedRowKeys([]);
                  // }}
                >
                  <Icon
                    icon="fluent:arrow-upload-16-filled"
                    height={BTN_ICON_HEIGHT}
                    width={BTN_ICON_WIDTH}
                  />{" "}
                  Export
                </Button>
              </CSVLink>
            </div>
          )}

          <Button
            onClick={() => setHideMUltiFilter((prev) => !prev)}
            className="mr-2"
            size="small"
          >
            Filter data
          </Button>

          {
            adminRole && (
              <Popover
                trigger={"click"}
                overlayInnerStyle={{ minWidth: 200 }}
                placement="bottomRight"
                content={
                  <Flex vertical gap={24}>
                    <Flex vertical gap={8}>
                      <Title level={5}>Upload csv file or excel sheet </Title>
                      <Upload {...props}>
                        <Button>
                          <Icon
                            icon="fluent:attach-16-regular"
                            width="16"
                            height="16"
                          />
                          Attach
                        </Button>
                      </Upload>
                    </Flex>
                    <Button type="primary" onClick={handleUploadFile}>
                      Submit
                    </Button>
                  </Flex>
                }
              >
                <Button size="small" className="mr-2">
                  {" "}
                  <Icon
                    icon="fluent:arrow-download-16-filled"
                    height={BTN_ICON_HEIGHT}
                    width={BTN_ICON_WIDTH}
                  />{" "}
                  Import
                </Button>
              </Popover>
            )
          }

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
              value={allMultiFilterData?.userIdFilter}
              placeholder="Select users"
              onChange={(e) =>
                setAllMultiFilterData((prev) => ({ ...prev, userIdFilter: e }))
              }
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
            value={allMultiFilterData?.statusId}
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
            onChange={(e) =>
              setAllMultiFilterData((prev) => ({ ...prev, statusId: e }))
            }
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>

        <div className="filter-right-container">
          <RangePicker
            placement="bottomRight"
            presets={rangePresets}
            value={[
              allMultiFilterData?.toDate
                ? dayjs(allMultiFilterData?.toDate)
                : "",
              allMultiFilterData?.fromDate
                ? dayjs(allMultiFilterData?.fromDate)
                : "",
            ]}
            disabledDate={(current) =>
              current && current > dayjs().endOf("day")
            }
            onChange={(dates, dateStrings) => {
              if (dates) {
                setAllMultiFilterData((prev) => ({
                  ...prev,
                  toDate: dateStrings[0],
                  fromDate: dateStrings[1],
                }));
              }
            }}
          />

          <Button size="small" type="primary" onClick={handleApplyFilter}>
            Apply filter
          </Button>
          <Button size="small" onClick={handleResetFilter}>
            Reset filter
          </Button>
        </div>
      </div>
      <div className="flex-verti-center-hori-start my-2">
        <Search
          placeholder="search"
          size="small"
          allowClear
          value={searchText}
          onSearch={onSearchLead}
          onChange={(e) => {
            setSearchText(e.target.value);
            if (!e.target.value && !e.target.value.trim()) {
              dispatch(getAllLeads(allMultiFilterData));
              setSearchText("");
            }
          }}
          enterButton="search"
          style={{ width: "250px" }}
          prefix={<Icon icon="fluent:search-24-regular" />}
        />
      </div>
      <div className="table-arrow">
        <Suspense fallback={<TableScalaton />}>
          <Spin
            size="large"
            spinning={leadresponseStatus === "pending" ? true : false}
          >
            <CommonTable
              data={allLeadData}
              columns={columns}
              scroll={{ y: "70vh", x: adminRole ? 2500 : 1500 }}
              rowSelection={true}
              onRowSelection={onSelectChange}
              selectedRowKeys={selectedRowKeys}
              rowClassName={(record) => (!record.view ? "light-gray-row" : "")}
              rowKey={(record) => record?.id}
              pagination={true}
              page={allMultiFilterData?.page}
              pageSize={allMultiFilterData?.size}
              totalCount={totalCount}
              handlePagination={handlePagination}
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
                        value={assignedLeadInfo?.statusId}
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
                        value={assignedLeadInfo?.assigneId}
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
          </Spin>
        </Suspense>
      </div>
    </div>
  );
};

export default LeadsModule;
