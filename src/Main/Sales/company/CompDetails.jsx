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
      field: "projectId",
      headerName: "ID",
      width: 80,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.projectName} />,
    },
    {
      field: "product",
      headerName: "Product",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.product} />,
    },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.assignee} />,
    },
  ]

  const compLeadsCol = [
    {
      field: "leadId",
      headerName: "ID",
      width: 60,
    },
    {
      field: "leadName",
      headerName: "Lead Name",
      width: 150,
      renderCell: (props) => (
        <Link
          to={`/erp/${userid}/sales/leads/${props.row.leadId}`}
          onClick={() => viewHistory(props.row.leadId)}
          className={`${props.row.view ? "" : "fw-600"}`}
        >
          {props?.row?.leadName}
        </Link>
      ),
    },
    {
      field: "originalName",
      headerName: "Original Name",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.originalName} />,
    },
    {
      field: "client",
      headerName: "Client Name",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.client} />,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (props) => <ColComp data={props?.row?.email} />,
    },

    {
      field: "assignee",
      headerName: "Assignee Name",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.assignee?.fullName} />,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.status?.name} />,
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.city} />,
    },
    {
      field: "ipAddress",
      headerName: "IP Address",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.ipAddress} />,
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
              <UserListComponent
                tableName={""}
                columns={compColumns}
                getRowId={(row) => row.projectId}
                row={compProject}
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
              <UserListComponent
                tableName={""}
                columns={compLeadsCol}
                getRowId={(row) => row.leadId}
                row={compLeads}
              />
            </Suspense>
          )}
        </>
      )}
    </TableOutlet>
  )
}

export default CompDetails
