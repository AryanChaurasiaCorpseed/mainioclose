import React, { Suspense } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import TableScalaton from "../../../components/TableScalaton"
import ColComp from "../../../components/small/ColComp"
import LeadCreateModel from "../../../Model/LeadCreateModel"
import LeadsDetailsMainPage from "../Leads/LeadsDetailsMainPage"

const CommonTable = React.lazy(() => import(`../../../components/CommonTable`))

const CompDetails = () => {
  const { companyId } = useParams()
  const { compLeads, compLeadsError } = useSelector((prev) => prev?.company)

  const compLeadsCol = [
    {
      dataIndex: "leadId",
      title: "Id",
      width: 80,
      fixed:'left',
    },
    {
      dataIndex: "leadName",
      title: "Lead name",
      fixed:'left',
      render: (_, props) => (
        <LeadsDetailsMainPage leadId={props?.leadId} data={props}>
          {props?.leadName}
        </LeadsDetailsMainPage>
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
        <MainHeading data={"All leads by company"} />
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
              scroll={{ y: 650, x: 1500 }}
            />
          </Suspense>
        )}
      </>
    </TableOutlet>
  )
}

export default CompDetails
