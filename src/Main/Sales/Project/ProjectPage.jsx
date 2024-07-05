import React, { useEffect } from "react"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import TableScalaton from "../../../components/TableScalaton"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import UserListComponent from "../../../Tables/UserListComponent"
import { useDispatch, useSelector } from "react-redux"
import { getProjectAction } from "../../../Toolkit/Slices/ProjectSlice"
import ColComp from "../../../components/small/ColComp"

const ProjectPage = () => {
  const dispatch = useDispatch()

  const currUserId = useSelector((prev) => prev?.auth?.currentUser?.id)

  useEffect(() => {
    dispatch(getProjectAction({ id: currUserId }))
  }, [currUserId,dispatch])

  const { allProject, loadingProject, errorProject } = useSelector(
    (prev) => prev?.project
  )

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      width: 220,
      renderCell: (props) => <ColComp data={props?.row?.projectName} />,
    },
    {
      field: "assigneeName",
      headerName: "Assignee Name",
      width: 220,
      renderCell: (props) => <ColComp data={props?.row?.assigneeName} />,
    },
  ]

  return (
    <TableOutlet>
      <MainHeading data={`ALL Projects`} />
      <div className="mt-3">
        {loadingProject && <TableScalaton />}
        {errorProject && <SomethingWrong />}
        {allProject && !loadingProject && !errorProject && (
          <UserListComponent
            tableName={""}
            columns={columns}
            // getRowId={(row) => row.companyId}
            row={allProject}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default ProjectPage
