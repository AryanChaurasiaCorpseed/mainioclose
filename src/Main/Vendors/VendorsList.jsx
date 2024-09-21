import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllVendorsRequest } from "../../Toolkit/Slices/LeadSlice"
import OverFlowText from "../../components/OverFlowText"
import CommonTable from "../../components/CommonTable"
import TableScalaton from "../../components/TableScalaton"
import MainHeading from "../../components/design/MainHeading"
import SingleVendorRequestDetails from "./SingleVendorRequestDetails"

const VendorsList = () => {
  const dispatch = useDispatch()

  const { userid } = useParams()

  useEffect(() => {
    dispatch(getAllVendorsRequest(userid))
  }, [dispatch, userid])

  const allVendorsRequestList = useSelector(
    (prev) => prev?.leads.allVendorsRequestList
  )

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
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
      dataIndex: "clientBudget",
      title: "Client budget",
    },
    {
      dataIndex: "vendorSharedPrice",
      title: "Vendor shared price",
    },
    {
      dataIndex: "vendorComment",
      title: "Comment",
      render: (info) => <OverFlowText>{info}</OverFlowText>,
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

      {allVendorsRequestList?.length > 0 ? (
        <CommonTable
          data={allVendorsRequestList}
          columns={columns}
          scroll={{ y: 520 }}
        />
      ) : (
        <TableScalaton />
      )}
    </>
  )
}

export default VendorsList
