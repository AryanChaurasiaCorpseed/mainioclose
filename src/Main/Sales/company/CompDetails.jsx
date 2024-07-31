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

const UserListComponent = React.lazy(() =>
  import(`../../../Tables/UserListComponent`)
)

const CompDetails = () => {
  const dispatch = useDispatch()

  const [projectdep, setProjectDep] = useState(true)

  const { companyId, userid } = useParams()

  useEffect(() => {
    dispatch(getCompanyProjectAction({ id: companyId }))
  }, [companyId, dispatch])

  useEffect(() => {
    dispatch(getCompanyLeadsAction({ id: companyId }))
  }, [companyId, dispatch])

  const { compProject, compProjectError } = useSelector((prev) => prev?.company)

  const { compLeads, compLeadsError } = useSelector((prev) => prev?.company)

  const toggleProjecttrue = () => {
    setProjectDep(true)
  }
  const toggleProjectfalse = () => {
    setProjectDep(false)
  }

  const viewHistory = async (leadId) => {
    try {
      const singlePage = await putQuery(
        `/leadService/api/v1/lead/viewHistoryCreate?userId=${userid}&leadId=${leadId}`
      )
    } catch (err) {
      console.log(err)
    }
  }

  const compColumns = [
    {
      dataIndex: "projectId",
      title: "Id",
      width: 80,
      fixed: "left",
    },
    {
      dataIndex: "projectName",
      title: "Project name",
      fixed: "left",
      render: (_, props) => <ColComp data={props?.projectName} />,
    },
    {
      dataIndex: "product",
      title: "Product",
      render: (_, props) => <ColComp data={props?.product} />,
    },
    {
      dataIndex: "assignee",
      title: "Assignee",
      render: (_, props) => <ColComp data={props?.assignee?.fullName} />,
    },
  ]

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
          className={`${props.view ? "" : "fw-600"}`}
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
      <div className="all-center">
        <button
          onClick={toggleProjecttrue}
          className={`normal-btn ${projectdep ? "active" : ""}`}
        >
          Projects
        </button>
        <button
          onClick={toggleProjectfalse}
          className={`normal-btn ${projectdep ? "" : "active"}`}
        >
          Leads
        </button>
      </div>
      <MainHeading data={`${projectdep ? "All Projects" : "All Leads"}`} />
      {projectdep ? (
        <>
          {compProjectError && <SomethingWrong />}
          {!compProjectError && (
            <Suspense fallback={<TableScalaton />}>
              <CommonTable
                data={compProject}
                columns={compColumns}
                scroll={{ y: 650, x: 1000 }}
              />
            </Suspense>
          )}
        </>
      ) : (
        ""
      )}

      {projectdep ? (
        ""
      ) : (
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
      )}
    </TableOutlet>
  )
}

export default CompDetails
