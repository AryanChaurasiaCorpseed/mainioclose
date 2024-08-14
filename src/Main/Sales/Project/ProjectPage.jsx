import React, { useEffect } from "react"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import TableScalaton from "../../../components/TableScalaton"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import { useDispatch, useSelector } from "react-redux"
import { getProjectAction } from "../../../Toolkit/Slices/ProjectSlice"
import ColComp from "../../../components/small/ColComp"
import CommonTable from "../../../components/CommonTable"
import OverFlowText from "../../../components/OverFlowText"

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
      fixed: "left",
    },
    {
      dataIndex: "client",
      title: "Client",
      fixed: "left",
    },
    {
      dataIndex: "leadNane",
      title: "Lead name",
      fixed: "left",
    },
    {
      dataIndex: "projectName",
      title: "Project name",
      render: (_, props) => <OverFlowText>{props?.projectName}</OverFlowText>,
    },
    {
      dataIndex: "assigneeName",
      title: "Assignee name",
      render: (_, props) => <OverFlowText>{props?.assigneeName}</OverFlowText>,
    },
    {
      dataIndex: "status",
      title: "Status",
      render: (_, data) => <ColComp data={data?.status} />,
    },
    {
      dataIndex: "pAddress",
      title: "Primary address",
      render: (_, record) => <OverFlowText>{record?.pAddress}</OverFlowText>,
    },
    {
      dataIndex: "pCity",
      title: "Primary city",
      render: (_, record) => <OverFlowText>{record?.pCity}</OverFlowText>,
    },
    {
      dataIndex: "pState",
      title: "Primary state",
      render: (_, record) => <OverFlowText>{record?.pState}</OverFlowText>,
    },
    {
      dataIndex: "pCountry",
      title: "Primary country",
      render: (_, record) => <OverFlowText>{record?.pCountry}</OverFlowText>,
    },
    {
      dataIndex: "pPinCode",
      title: "Primary pincode",
      render: (_, record) => <OverFlowText>{record?.pPinCode}</OverFlowText>,
    },
    {
      dataIndex: "sAddress",
      title: "Secondary address",
      render: (_, record) => <OverFlowText>{record?.sAddress}</OverFlowText>,
    },
    {
      dataIndex: "sCity",
      title: "Secondary city",
      render: (_, record) => <OverFlowText>{record?.sCity}</OverFlowText>,
    },
    {
      dataIndex: "sState",
      title: "Secondary state",
      render: (_, record) => <OverFlowText>{record?.sState}</OverFlowText>,
    },
    {
      dataIndex: "sCountry",
      title: "Secondary country",
      render: (_, record) => <OverFlowText>{record?.sCountry}</OverFlowText>,
    },
    {
      dataIndex: "sPinCode",
      title: "Secondary pincode",
      render: (_, record) => <OverFlowText>{record?.sPinCode}</OverFlowText>,
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
            scroll={{ y: 600, x: 2500 }}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default ProjectPage
