import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  changeProcurementAssignee,
  getAllVendorsRequest,
} from "../../Toolkit/Slices/LeadSlice"
import OverFlowText from "../../components/OverFlowText"
import CommonTable from "../../components/CommonTable"
import TableScalaton from "../../components/TableScalaton"
import MainHeading from "../../components/design/MainHeading"
import SingleVendorRequestDetails from "./SingleVendorRequestDetails"
import { Icon } from "@iconify/react"
import { Button, Flex, notification, Select, Typography } from "antd"
import { getProcurementAssigneeList } from "../../Toolkit/Slices/CommonSlice"
import { getHighestPriorityRole } from "../Common/Commons"
const { Text } = Typography

const VendorsList = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.leads.loading)
  const currentRoles = useSelector((state) => state?.auth?.roles)
  const { userid } = useParams()
  const allVendorsRequestList = useSelector(
    (prev) => prev?.leads.allVendorsRequestList
  )
  const procurementAssigneeList = useSelector(
    (state) => state.common.procurementAssigneeList
  )
  const totalCount = useSelector((state) => state.leads.totalVendorRequestCount)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [assigneeId, setAssigneeId] = useState(null)
  const [paginationData, setPaginationData] = useState({
    page: 1,
    size: 50,
  })

  useEffect(() => {
    dispatch(
      getAllVendorsRequest({
        id: userid,
        page: paginationData?.page,
        size: paginationData?.size,
      })
    )
  }, [dispatch, userid])

  useEffect(() => {
    dispatch(getProcurementAssigneeList(userid))
  }, [userid, dispatch])

  const handlePagination = useCallback(
    (dataPage, size) => {
      dispatch(
        getAllVendorsRequest({
          id: userid,
          page: dataPage,
          size: size,
        })
      )
      setPaginationData({ size: size, page: dataPage })
    },
    [userid, dispatch]
  )

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

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
            notification.success({ message: "Assignee updated successfully." })
            dispatch(
              getAllVendorsRequest({
                id: userid,
                ...paginationData,
              })
            )
            setSelectedRowKeys([])
            setAssigneeId(null)
          } else {
            notification.error({ message: "Something went wrong !." })
          }
        })
        .catch(() => notification.error({ message: "Something went wrong !." }))
    },
    [dispatch, userid, paginationData]
  )

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 90,
      fixed: "left",
      render: (_, data) => (
        <Flex gap={4} align="center">
          <Text>{data?.id}</Text>
          <Icon
            icon="fluent:circle-16-filled"
            color={data?.proposalSentStatus ? "green" : "red"}
          />
        </Flex>
      ),
    },
    {
      dataIndex: "clientName",
      title: "Client name",
      fixed: "left",
    },
    {
      dataIndex: "clientCompanyName",
      title: "Client company name",
    },
    {
      dataIndex: "assignedTo",
      title: "Assigned to",
      render: (_, data) => (
        <Select
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
      dataIndex: "vendorComment",
      title: "Comment",
      render: (_, info) => (
        <OverFlowText>{info?.requirementDescription}</OverFlowText>
      ),
    },
    {
      dataIndex: "requestStatus",
      title: "Request status",
      render: (_, data) => <SingleVendorRequestDetails data={data} />,
    },
  ]

  return (
    <>
      <div className="create-user-box">
        <MainHeading data={`Vendors request list`} />
      </div>
      {loading === "pending" ? (
        <TableScalaton />
      ) : (
        <CommonTable
          data={allVendorsRequestList}
          columns={columns}
          scroll={{ y: 520, x: 1500 }}
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
                <Text>Selected rows: {selectedRowKeys?.length}</Text>
              </div>
            </div>
          }
        />
      )}
    </>
  )
}

export default VendorsList
