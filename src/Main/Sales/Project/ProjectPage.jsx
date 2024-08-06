import React, { useEffect } from "react"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import TableScalaton from "../../../components/TableScalaton"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import { useDispatch, useSelector } from "react-redux"
import { getProjectAction } from "../../../Toolkit/Slices/ProjectSlice"
import ColComp from "../../../components/small/ColComp"
import CommonTable from "../../../components/CommonTable"

const ProjectPage = () => {
  const dispatch = useDispatch()

  const currUserId = useSelector((prev) => prev?.auth?.currentUser?.id)

  useEffect(() => {
    dispatch(getProjectAction({ id: currUserId }))
  }, [currUserId, dispatch])

  const { allProject, loadingProject, errorProject } = useSelector(
    (prev) => prev?.project
  )

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      width: 50,
    },
    {
      dataIndex: "client",
      title: "Client",
    },
    {
      dataIndex: "leadNane",
      title: "Lead name",
    },
    {
      dataIndex: "projectName",
      title: "Project name",
      render: (_, props) => <ColComp data={props?.projectName} />,
    },
    {
      dataIndex: "assigneeName",
      title: "Assignee name",
      render: (_, props) => <ColComp data={props?.assigneeName} />,
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (_, data) => <ColComp data={data?.status} />,
    },
  ]

  return (
    <TableOutlet>
      <MainHeading data={`All projects`} />
      <div className="mt-3">
        {loadingProject && <TableScalaton />}
        {errorProject && <SomethingWrong />}
        {allProject && !loadingProject && !errorProject && (
          <CommonTable
            data={allProject}
            columns={columns}
            scroll={{ y: 600 }}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default ProjectPage
