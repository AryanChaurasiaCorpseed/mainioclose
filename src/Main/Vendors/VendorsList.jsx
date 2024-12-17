import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProcurementAssignee,
  getAllVendorsRequest,
  getAllVendorsStatus,
  handleVendorsLoading,
  searchInVendorsList,
  vendorsFilteration,
} from "../../Toolkit/Slices/LeadSlice";
import OverFlowText from "../../components/OverFlowText";
import CommonTable from "../../components/CommonTable";
import TableScalaton from "../../components/TableScalaton";
import MainHeading from "../../components/design/MainHeading";
import SingleVendorRequestDetails from "./SingleVendorRequestDetails";
import { Icon } from "@iconify/react";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  notification,
  Popover,
  Select,
  Typography,
} from "antd";
import { getProcurementAssigneeList } from "../../Toolkit/Slices/CommonSlice";
import { getHighestPriorityRole, rangePresets } from "../Common/Commons";
import dayjs from "dayjs";
import { CSVLink } from "react-csv";
import { BTN_ICON_HEIGHT, BTN_ICON_WIDTH } from "../../components/Constants";
const { Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;

const VendorsList = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const loading = useSelector((state) => state.leads.loading);
  const currentRoles = useSelector((state) => state?.auth?.roles);
  const { userid } = useParams();
  const allVendorsRequestList = useSelector(
    (prev) => prev?.leads.allVendorsRequestList
  );
  const procurementAssigneeList = useSelector(
    (state) => state.common.procurementAssigneeList
  );
  const totalCount = useSelector(
    (state) => state.leads.totalVendorRequestCount
  );
  const vendorsExportData = useSelector(
    (state) => state.leads.vendorsExportData
  );
  const vendorFilterationLoading = useSelector(
    (state) => state.leads.vendorFilterationLoading
  );
  const vendorsStatus = useSelector((state) => state.leads.vendorsStatus);
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [assigneeId, setAssigneeId] = useState(null);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 50,
  });
  const [filterQuery, setFilterQuery] = useState({
    userIdBy: userid,
    status: null,
    startDate: null,
    endDate: null,
    userId: getHighestPriorityRole(currentRoles) !== "ADMIN" ? [userid] : [],
  });

  useEffect(() => {
    dispatch(
      getAllVendorsRequest({
        id: userid,
        page: paginationData?.page,
        size: paginationData?.size,
      })
    );
    dispatch(getAllVendorsStatus());
  }, [dispatch, userid]);

  useEffect(() => {
    if (getHighestPriorityRole(currentRoles) === "ADMIN") {
      dispatch(getProcurementAssigneeList(userid));
    }
  }, [userid, dispatch]);

  const handlePagination = useCallback(
    (dataPage, size) => {
      dispatch(
        getAllVendorsRequest({
          id: userid,
          page: dataPage,
          size: size,
        })
      );
      setPaginationData({ size: size, page: dataPage });
    },
    [userid, dispatch]
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleChangeAssignee = useCallback(
    (e, id) => {
      dispatch(
        changeProcurementAssignee({
          data: id,
          updatedById: userid,
          assigneeToId: e,
        })
      )
        .then((resp) => {
          if (resp.meta.requestStatus === "fulfilled") {
            notification.success({ message: "Assignee updated successfully." });
            dispatch(
              getAllVendorsRequest({
                id: userid,
                ...paginationData,
              })
            );
            setSelectedRowKeys([]);
            setAssigneeId(null);
          } else {
            notification.error({ message: "Something went wrong !." });
          }
        })
        .catch(() =>
          notification.error({ message: "Something went wrong !." })
        );
    },
    [dispatch, userid, paginationData]
  );

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 70,
      fixed: "left",
      render: (_, data) => (
        <Flex justify="space-between" align="center">
          <Text>{data?.id}</Text>
          <Icon
            icon="fluent:circle-16-filled"
            color={
              data?.status === "Finished"
                ? "green"
                : data?.status === "Cancel"
                ? "black"
                : "red"
            }
          />
        </Flex>
      ),
    },
    {
      dataIndex: "clientName",
      title: "Client name",
      fixed: "left",
      render: (_, data) => (
        <SingleVendorRequestDetails paginationData={paginationData} data={data}>
          {data?.clientName}
        </SingleVendorRequestDetails>
      ),
    },
    {
      dataIndex: "clientCompanyName",
      title: "Client company name",
    },
    ...(getHighestPriorityRole(currentRoles) === "ADMIN"
      ? [
          {
            dataIndex: "assignedTo",
            title: "Assigned to",
            render: (_, data) => (
              <Select
                size="small"
                placeholder="Select assignee"
                style={{ width: "95%" }}
                value={data?.assigneeId}
                options={
                  procurementAssigneeList?.length > 0
                    ? procurementAssigneeList?.map((item) => ({
                        label: item?.fullName,
                        value: item?.id,
                      }))
                    : []
                }
                onChange={(e) => handleChangeAssignee(e, [data?.id])}
              />
            ),
          },
        ]
      : []),
    {
      dataIndex: "assigneeName",
      title: "Assignee name",
    },
    ...(getHighestPriorityRole(currentRoles) === "ADMIN"
      ? [
          {
            dataIndex: "clientMobileNumber",
            title: "Client contact",
          },
        ]
      : []),
    {
      dataIndex: "budgetPrice",
      title: "Client budget",
    },
    {
      dataIndex: "vendorCategoryName",
      title: "Category name",
    },
    {
      dataIndex: "vendorSubCategoryName",
      title: "Subcategory name",
    },
    {
      dataIndex: "receivedDate",
      title: "Receieved date",
    },
    {
      dataIndex: "completedDate",
      title: "Completed date",
    },
    {
      dataIndex: "completionDays",
      title: "Completion days",
    },
    {
      dataIndex: "tatDaysLeft",
      title: "TAT days left",
    },
    {
      dataIndex: "overDueTat",
      title: "Overdue TAT",
    },
    {
      dataIndex: "subCategoryTatDays",
      title: "Subcategory TAT days",
    },

    {
      dataIndex: "raiseBy",
      title: "Raised by",
    },
    {
      dataIndex: "vendorComment",
      title: "Comment",
      render: (_, info) => (
        <OverFlowText>{info?.requirementDescription}</OverFlowText>
      ),
    },
  ];

  const onSearch = (e, b, c) => {
    if (e) {
      setSearchText(e);
      dispatch(searchInVendorsList({ userId: userid, searchInput: e }));
    }
    if (!b) {
      setSearchText("");
      dispatch(
        getAllVendorsRequest({
          id: userid,
          page: paginationData?.page,
          size: paginationData?.size,
        })
      );
    }
  };

  const handleFilter = useCallback(
    (values) => {
      const data = {
        userIdBy: userid,
        startDate: dayjs(values?.dateRange?.[0]).format("YYYY-MM-YY"),
        endDate: dayjs(values?.dateRange?.[1]).format("YYYY-MM-YY"),
        ...values,
      };
      dispatch(vendorsFilteration(data));
    },
    [dispatch, filterQuery]
  );

  const handleResetFilter = () => {
    setFilterQuery({
      userIdBy: userid,
      status: null,
      startDate: null,
      endDate: null,
      userId: [],
    });
    form.resetFields();
    dispatch(handleVendorsLoading(""));
    dispatch(
      getAllVendorsRequest({
        id: userid,
        page: paginationData?.page,
        size: paginationData?.size,
      })
    );
  };

  const exportData = vendorsExportData?.map((row) => ({
    Id: row?.id,
    "Client name": row?.clientName,
    Status: row?.currentStatus,
    "Genrated by": row?.generateByPersonName,
    "Sub Category name": row?.subCategoryName,
    "Assigned to": row?.assignedToPersonName,
    "Start date": row?.startDate,
    "End date": row?.endDate,
    "Completion date": row?.completionDate,
    "Completion days": row?.completionDays,
    "Research TAT": row?.vendorCategoryResearchTat,
    "Completion TAT": row?.vendorCompletionTat,
    "Left TAT": row?.tatDaysLeft,
    "Over Due TAT": row?.overDueTat,
  }));

  const headers = [
    "Id",
    "Client name",
    "Status",
    "Genrated by",
    "Sub Category name",
    "Assigned to",
    "Start date",
    "End date",
    "Completion date",
    "Completion days",
    "Research TAT",
    "Completion TAT",
    "Left TAT",
    "Over Due TAT",
  ];

  return (
    <>
      <Flex justify="space-between">
        <Flex vertical gap={8}>
          <div className="create-user-box">
            <MainHeading data={`Vendors request list ${totalCount}`} />
          </div>
          <Search
            placeholder="search"
            size="small"
            allowClear
            value={searchText}
            onSearch={onSearch}
            onChange={(e) => {
              setSearchText(e.target.value);
              if (!e.target.value && !e.target.value.trim()) {
                dispatch(
                  getAllVendorsRequest({
                    id: userid,
                    page: paginationData?.page,
                    size: paginationData?.size,
                  })
                );
                setSearchText("");
              }
            }}
            enterButton="search"
            style={{ width: "250px" }}
            prefix={<Icon icon="fluent:search-24-regular" />}
          />
        </Flex>

        {getHighestPriorityRole(currentRoles) === "ADMIN" && (
          <Flex gap={8} align="center" justify="flex-end">
            <Popover
              trigger={"click"}
              placement="bottomRight"
              overlayStyle={{ width: "400px" }}
              title="Filter for export"
              content={
                <Form layout="vertical" form={form} onFinish={handleFilter}>
                  <Form.Item
                    label="Select date range"
                    name="dateRange"
                    rules={[
                      {
                        required: true,
                        message: "please select the date range",
                      },
                    ]}
                  >
                    <RangePicker
                      style={{ width: "100%" }}
                      size="small"
                      presets={rangePresets}
                      disabledDate={(current) =>
                        current && current > dayjs().endOf("day")
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Select status" name="status">
                    <Select
                      size="small"
                      style={{ width: "100%" }}
                      placeholder="Select status"
                      options={
                        vendorsStatus?.length > 0
                          ? vendorsStatus?.map((item) => ({
                              label: item?.statusName,
                              value: item?.statusName,
                            }))
                          : []
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Select users" name="userId">
                    <Select
                      style={{ width: "100%" }}
                      mode="multiple"
                      maxTagCount={"responsive"}
                      placeholder="Select users"
                      options={
                        procurementAssigneeList?.length > 0
                          ? procurementAssigneeList?.map((item) => ({
                              label: item?.fullName,
                              value: item?.id,
                            }))
                          : []
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary">
                      Apply
                    </Button>
                  </Form.Item>
                </Form>
              }
            >
              <Button type="text">
                <Icon
                  icon="fluent:filter-24-filled"
                  height={32}
                  width={32}
                  color={
                    vendorFilterationLoading === "success" ? "#0958d9" : "gray"
                  }
                />
              </Button>
            </Popover>

            <Button
              size="small"
              onClick={handleResetFilter}
              // disabled={
              //   filterQuery?.startDate === null && filterQuery?.endDate === null
              // }
            >
              Reset filter
            </Button>
            <CSVLink
              className="text-white"
              data={exportData}
              headers={headers}
              filename={"exported_data.csv"}
            >
              <Button
                size="small"
                disabled={
                  filterQuery?.startDate === null &&
                  filterQuery?.endDate === null
                }
              >
                <Icon
                  icon="fluent:arrow-upload-16-filled"
                  height={BTN_ICON_HEIGHT}
                  width={BTN_ICON_WIDTH}
                />
                Export
              </Button>
            </CSVLink>
          </Flex>
        )}
      </Flex>
      {loading === "pending" ? (
        <TableScalaton />
      ) : (
        <CommonTable
          data={allVendorsRequestList}
          columns={columns}
          scroll={{ y: 520, x: 2700 }}
          rowSelection={true}
          onRowSelection={onSelectChange}
          selectedRowKeys={selectedRowKeys}
          rowKey={(record) => record?.id}
          rowClassName={(record) => (!record.view ? "light-gray-row" : "")}
          pagination={true}
          page={paginationData?.page}
          pageSize={paginationData?.size}
          totalCount={totalCount}
          handlePagination={handlePagination}
          footerContent={
            <div className={`bottom-line`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Select
                  allowClear
                  showSearch
                  value={assigneeId}
                  size="small"
                  style={{ width: 200 }}
                  placeholder="Select status"
                  options={
                    procurementAssigneeList?.length > 0
                      ? procurementAssigneeList?.map((item) => ({
                          label: item?.fullName,
                          value: item?.id,
                        }))
                      : []
                  }
                  onChange={(e) => setAssigneeId(e)}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
                <div>
                  <Button
                    type="primary"
                    disabled={selectedRowKeys?.length === 0 ? true : false}
                    onClick={() =>
                      handleChangeAssignee(assigneeId, selectedRowKeys)
                    }
                    size="small"
                  >
                    Send
                  </Button>
                </div>
                <Text>Selected rows : {selectedRowKeys?.length}</Text>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default VendorsList;
