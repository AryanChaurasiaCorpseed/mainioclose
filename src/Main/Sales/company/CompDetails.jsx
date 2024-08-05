import React, { Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getCompanyLeadsAction,
  getCompanyProjectAction,
} from "../../../Toolkit/Slices/CompanySlice"
import { Link, useParams } from "react-router-dom"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import TableScalaton from "../../../components/TableScalaton"
import ColComp from "../../../components/small/ColComp"
import { putQuery } from "../../../API/PutQuery"
import CommonTable from "../../../components/CommonTable"
import LeadCreateModel from "../../../Model/LeadCreateModel"

const UserListComponent = React.lazy(() =>
  import(`../../../Tables/UserListComponent`)
)

const CompDetails = () => {
  const dispatch = useDispatch()
  const { companyId, userid } = useParams()


  const { compLeads, compLeadsError } = useSelector((prev) => prev?.company)

  const viewHistory = async (leadId) => {
    try {
      const singlePage = await putQuery(
        `/leadService/api/v1/lead/viewHistoryCreate?userId=${userid}&leadId=${leadId}`
      )
    } catch (err) {
      console.log(err)
    }
  }

  const compLeadsCol = [
    {
      dataIndex: "leadId",
      title: "Id",
      width: 60,
    },
    {
      dataIndex: "leadName",
      title: "Lead name",
      render: (_, props) => (
        <Link
          to={`/erp/${userid}/sales/leads/${props.leadId}`}
          onClick={() => viewHistory(props.leadId)}
          className="link-heading"
        >
          {props?.leadName}
        </Link>
      ),
    },
    {
      dataIndex: "originalName",
      title: "Original name",
      render: (_, props) => <ColComp data={props?.originalName} />,
    },
    {
      dataIndex: "client",
      title: "Client name",
      render: (_, props) => <ColComp data={props?.client} />,
    },
    {
      dataIndex: "email",
      title: "Email",
      width: 250,
      render: (_, props) => <ColComp data={props?.email} />,
    },

    {
      dataIndex: "assignee",
      title: "Assignee name",
      width: 150,
      render: (_, props) => <ColComp data={props?.assignee?.fullName} />,
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (_, props) => <ColComp data={props?.status?.name} />,
    },
    {
      dataIndex: "city",
      title: "City",
      render: (_, props) => <ColComp data={props?.city} />,
    },
    {
      dataIndex: "ipAddress",
      title: "IP address",
      render: (_, props) => <ColComp data={props?.ipAddress} />,
    },
  ]

  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All Leads"} />
        <div className="all-center">
          <LeadCreateModel leadByCompany={true} companyId={companyId} />
        </div>
      </div>
      <>
        {compLeadsError && <SomethingWrong />}
        {!compLeadsError && (
          <Suspense fallback={<TableScalaton />}>
            <CommonTable
              data={compLeads}
              columns={compLeadsCol}
              scroll={{ y: 650, x: 1000 }}
            />
          </Suspense>
        )}
      </>
    </TableOutlet>
  )
}

export default CompDetails
