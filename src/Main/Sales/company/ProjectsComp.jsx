import React, { lazy, Suspense, useEffect } from "react"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import TableScalaton from "../../../components/TableScalaton"
import { useDispatch, useSelector } from "react-redux"
import { getCompanyProjectAction } from "../../../Toolkit/Slices/CompanySlice"
import ColComp from "../../../components/small/ColComp"
import { useParams } from "react-router-dom"
const CommonTable = lazy(() => import("../../../components/CommonTable"))

const ProjectsComp = () => {
  const { compProject, compProjectError } = useSelector((prev) => prev?.company)


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
      dataIndex: "client",
      title: "Client",
    },
    {
      dataIndex: "companyName",
      title: "Company name",
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
    {
      dataIndex: "status",
      title: "Status",
    },
  ]
  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All Projects"} />
      </div>
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
    </TableOutlet>
  )
}

export default ProjectsComp
