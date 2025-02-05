import React, { useCallback, useEffect, useState } from "react";
import CommonTable from "../../../components/CommonTable";
import {
  Button,
  Drawer,
  Flex,
  Input,
  notification,
  Popconfirm,
  Select,
  Tooltip,
  Typography,
} from "antd";
import MainHeading from "../../../components/design/MainHeading";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  approvedAndDisapprovedStatus,
  getEstimateByStatus,
  getTotalCountOfEstimate,
  searchAccountEstimate,
} from "../../../Toolkit/Slices/AccountSlice";
import OverFlowText from "../../../components/OverFlowText";
import dayjs from "dayjs";
import { getEstimateByLeadId } from "../../../Toolkit/Slices/LeadSlice";
import ViewEstimate from "./ViewEstimate";
const { Text } = Typography;
const { Search } = Input;

const AccountEstimate = () => {
  const dispatch = useDispatch();
  const { userid } = useParams();
  const allEstimateByStatus = useSelector(
    (state) => state.account.allEstimateByStatus
  );
  const totalEstimateCount = useSelector(
    (state) => state.account.totalEstimateCount
  );
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [openModal, setOpenModal] = useState(false);
  const [formId, setFormId] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 50,
  });

  useEffect(() => {
    dispatch(
      getEstimateByStatus({
        userId: userid,
        status: selectedFilter,
        page: paginationData?.page,
        size: paginationData?.size,
      })
    );
    dispatch(
      getTotalCountOfEstimate({ userId: userid, status: selectedFilter })
    );
  }, [dispatch, selectedFilter, userid]);

  const handlePagination = useCallback(
    (dataPage, size) => {
      dispatch(
        getEstimateByStatus({
          userId: userid,
          status: selectedFilter,
          page: dataPage,
          size: size,
        })
      );
      setPaginationData({ size: size, page: dataPage });
    },
    [userid, selectedFilter, dispatch]
  );

  const onSearchLead = (e, b) => {
    dispatch(
      searchAccountEstimate({
        searchText: e,
        userId: userid,
      })
    );
    if (!b) {
      dispatch(
        searchAccountEstimate({
          searchText: "",
          userId: userid,
        })
      );
    }
  };

  const handleViewEstimate = (value) => {
    dispatch(getEstimateByLeadId(value?.leadId));
    setOpenDrawer(true);
  };

  const handleChangeStatus = (e, id) => {
    dispatch(
      approvedAndDisapprovedStatus({
        status: e,
        estimateId: id,
        userId: userid,
      })
    )
      .then((resp) => {
        if (resp.meta.requestStatus === "fulfilled") {
          notification.success({ message: "Status updated successfully" });
          dispatch(
            getEstimateByStatus({
              userId: userid,
              status: selectedFilter,
              page: paginationData?.page,
              size: paginationData?.size,
            })
          );
        } else {
          notification.error({ message: "Something went wrong !." });
        }
      })
      .catch(() => notification.error({ message: "Something went wrong !." }));
  };

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 80,
      fixed: "left",
    },
    {
      datIndex: "productName",
      title: "Product name",
      fixed: "left",
      render: (_, data) => (
        <Button type="link" onClick={() => handleViewEstimate(data)}>
          {data?.productName}
        </Button>
      ),
    },
    {
      dataIndex: "companyName",
      title: "Company name",
    },
    {
      dataIndex: "createDate",
      title: "Created date",
      render: (_, data) => dayjs(data?.createDate).format("YYYY-MM-DD"),
    },
    {
      dataIndexL: "unitName",
      title: "Unit name",
    },
    {
      dataIndex: "panNo",
      title: "Pan no.",
    },
    {
      dataIndex: "gstNo",
      title: "Gst no.",
    },
    {
      dataIndex: "status",
      title: "Status",
    },
    {
      dataIndex: "companyAge",
      title: "Company age",
    },
    {
      dataIndex: "orderNumber",
      title: "Order number",
    },
    {
      dataIndex: "primaryContact",
      title: "Pcont. name",
      ellipsis: {
        showTitle: false,
      },
      render: (info, data) => (
        <Tooltip
          placement="topLeft"
          title={<Text>{data?.primaryContact?.name}</Text>}
          color="#fff"
        >
          {data?.primaryContact?.name}
        </Tooltip>
      ),
    },
    {
      dataIndex: "primaryContactEmail",
      title: "Pcont. email",
      ellipsis: {
        showTitle: false,
      },
      render: (info, data) => (
        <Tooltip
          placement="topLeft"
          title={<Text>{data?.primaryContact?.emails}</Text>}
          color="#fff"
        >
          {data?.primaryContact?.emails}
        </Tooltip>
      ),
    },
    {
      dataIndex: "primaryContactCont",
      title: "Pcont. contact",
      render: (_, data) => (
        <OverFlowText>{data?.primaryContact?.contactNo}</OverFlowText>
      ),
    },
    {
      dataIndex: "primaryContactWhats",
      title: "Pcont. whatsapp",
      render: (_, data) => (
        <OverFlowText>{data?.primaryContact?.whatsappNo}</OverFlowText>
      ),
    },
    {
      dataIndex: "secondaryContact",
      title: "Scont. name",
      render: (_, data) => (
        <OverFlowText>{data?.secondaryContact?.name}</OverFlowText>
      ),
    },
    {
      dataIndex: "secondaryContactEmail",
      title: "Scont. email",
      render: (_, data) => (
        <OverFlowText>{data?.secondaryContact?.emails}</OverFlowText>
      ),
    },
    {
      dataIndex: "secondaryContactCont",
      title: "Scont. contact",
      render: (_, data) => (
        <OverFlowText>{data?.secondaryContact?.contactNo}</OverFlowText>
      ),
    },
    {
      dataIndex: "secondaryContactWhats",
      title: "Scont. whatsapp",
      render: (_, data) => (
        <OverFlowText>{data?.secondaryContact?.whatsappNo}</OverFlowText>
      ),
    },
    {
      dataIndex: "govermentfees",
      title: "Govt. fee",
    },
    {
      dataIndex: "govermentCode",
      title: "Govt. code",
    },
    {
      dataIndex: "govermentGst",
      title: "Govt. Gst",
    },
    {
      dataIndex: "professionalFees",
      title: "Prof. fee",
    },
    {
      dataIndex: "professionalCode",
      title: "Prof. code",
    },
    {
      dataIndex: "profesionalGst",
      title: "Prof. Gst",
    },
    {
      dataIndex: "serviceCharge",
      title: "Service charges",
    },
    {
      dataIndex: "serviceCode",
      title: "Service code",
    },
    {
      dataIndex: "serviceGst",
      title: "Service Gst",
    },
    {
      dataIndex: "otherFees",
      title: "Other fee",
    },
    {
      dataIndex: "otherCode",
      title: "Other code",
    },
    {
      dataIndex: "otherGst",
      title: "Other Gst",
    },
    {
      dataIndex: "invoiceNote",
      title: "Invoice note",
    },
    {
      datIndex: "address",
      title: "Address",
    },
    {
      datIndex: "city",
      title: "City",
    },
    {
      dataIndex: "country",
      title: "Country",
    },
    {
      dataIndex: "paymentRegistration",
      title: "Payment registration",
      // render: (_, data) => (
      //   <Button
      //     size="small"
      //     type="text"
      //     onClick={() => {
      //       handleSetData(data);
      //       dispatch(getPaymentDetailListByEstimateId(data?.id));
      //     }}
      //   >
      //     <Icon icon="fluent:add-16-regular" width="16" height="16" />
      //   </Button>
      // ),
    },
    {
      dataIndex: "Action",
      title: "Action",
      fixed: "right",
      width: 250,
      render: (_, data) => (
        <Flex gap={8} align="center">
          <Popconfirm
            title="Approved estimate"
            description="Do you want to approved this estimate ?."
            okText="Yes"
            onConfirm={() => handleChangeStatus("Approved", data?.id)}
          >
            <Button
              size="small"
              type={data?.status === "Approved" ? "primary" : "default"}
            >
              Approved
            </Button>
          </Popconfirm>
          <Popconfirm
            title="Disapproved estimate"
            description="Do you want to disapproved this estimate ?."
            okText="Yes"
            disabled={data?.status === "Approved" ? true : false}
            onConfirm={() => handleChangeStatus("Disapproved", data?.id)}
          >
            <Button
              size="small"
              disabled={data?.status === "Approved" ? true : false}
              type={data?.status === "Disapproved" ? "primary" : "default"}
            >
              Disapproved
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Flex vertical style={{ padding: 4 }}>
        <div className="create-user-box">
          <MainHeading data={"Estimate"} />
        </div>
        <div style={{ marginTop: 3 }}>
          <Flex gap={8} style={{ marginBottom: 4 }}>
            <Search
              size="small"
              onSearch={onSearchLead}
              style={{ width: "220px" }}
              placeholder="search"
              onChange={(e) =>
                !e.target.value
                  ? dispatch(
                      searchAccountEstimate({
                        searchText: "",
                        userId: userid,
                      })
                    )
                  : ""
              }
              enterButton="search"
              prefix={<Icon icon="fluent:search-24-regular" />}
            />
            <Select
              style={{ width: "220px" }}
              showSearch
              size="small"
              value={selectedFilter}
              options={[
                { label: "All", value: "All" },
                { label: "Initiated", value: "Initiated" },
                { label: "Approved", value: "Approved" },
                { label: "Disapproved", value: "Disapproved" },
              ]}
              onChange={(e) => {
                setSelectedFilter(e);
                setPaginationData({
                  page: 1,
                  size: 50,
                });
              }}
            />
          </Flex>
          <CommonTable
            data={allEstimateByStatus}
            columns={columns}
            scroll={{ x: 5000, y: "67vh" }}
            rowSelection={true}
            page={paginationData?.page}
            pageSize={paginationData?.size}
            rowKey={(record) => record?.id}
            pagination={true}
            totalCount={totalEstimateCount}
            handlePagination={handlePagination}
          />
        </div>
      </Flex>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        width={"60%"}
        closeIcon={null}
      >
        <ViewEstimate />
      </Drawer>
    </>
  );
};

export default AccountEstimate;
