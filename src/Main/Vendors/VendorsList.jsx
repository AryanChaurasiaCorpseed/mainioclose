import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllVendorsRequest } from "../../Toolkit/Slices/LeadSlice"
import OverFlowText from "../../components/OverFlowText"
import CommonTable from "../../components/CommonTable"
import TableScalaton from "../../components/TableScalaton"
import MainHeading from "../../components/design/MainHeading"
import SingleVendorRequestDetails from "./SingleVendorRequestDetails"
import { Icon } from "@iconify/react"
import { Flex, Typography } from "antd"
const { Text } = Typography

const VendorsList = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.leads.loading)
  const { userid } = useParams()

  useEffect(() => {
    dispatch(getAllVendorsRequest({ id: userid, page: 0 }))
  }, [dispatch, userid])

  const allVendorsRequestList = useSelector(
    (prev) => prev?.leads.allVendorsRequestList
  )

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 90,
      render: (_, data) => (
        <Flex gap={4} align='center'>
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
    },
    {
      dataIndex: "clientCompanyName",
      title: "Client company name",
    },
    {
      dataIndex: "clientMobileNumber",
      title: "Client contact",
    },
    {
      dataIndex: "budgetPrice",
      title: "Client budget",
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
      title: "RequestStatus",
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
          scroll={{ y: 520 }}
        />
      )}
    </>
  )
}

export default VendorsList
