import React, { lazy, Suspense } from "react"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import SomethingWrong from "../../../components/usefulThings/SomethingWrong"
import TableScalaton from "../../../components/TableScalaton"
import { useSelector } from "react-redux"
import ColComp from "../../../components/small/ColComp"
import OverFlowText from "../../../components/OverFlowText"
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
      render:(_,record)=><OverFlowText>{record?.client}</OverFlowText>
    },
    {
      dataIndex: "companyName",
      title: "Company name",
      render:(_,record)=><OverFlowText>{record?.companyName}</OverFlowText>
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
    {
      dataIndex: "pAddress",
      title: "Primary address",
      render:(_,record)=><OverFlowText>{record?.pAddress}</OverFlowText>
    },
    {
      dataIndex: "pCity",
      title: "Primary city",
      render:(_,record)=><OverFlowText>{record?.pCity}</OverFlowText>
    },
    {
      dataIndex: "pState",
      title: "Primary state",
      render:(_,record)=><OverFlowText>{record?.pState}</OverFlowText>
    },
    {
      dataIndex: "pCountry",
      title: "Primary country",
      render:(_,record)=><OverFlowText>{record?.pCountry}</OverFlowText>
    },
    {
      dataIndex: "pPinCode",
      title: "Primary pincode",
    },
    {
      dataIndex: "sAddress",
      title: "Secondary address",
      render:(_,record)=><OverFlowText>{record?.sAddress}</OverFlowText>
    },
    {
      dataIndex: "sCity",
      title: "Secondary city",
      render:(_,record)=><OverFlowText>{record?.sCity}</OverFlowText>
    },
    {
      dataIndex: "sState",
      title: "Secondary state",
      render:(_,record)=><OverFlowText>{record?.sState}</OverFlowText>
    },
    {
      dataIndex: "sCountry",
      title: "Secondary country",
      render:(_,record)=><OverFlowText>{record?.sCountry}</OverFlowText>
    },
    {
      dataIndex: "sPinCode",
      title: "Secondary pincode",
    },
  ]
  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All projects"} />
      </div>
      <>
        {compProjectError && <SomethingWrong />}
        {!compProjectError && (
          <Suspense fallback={<TableScalaton />}>
            <CommonTable
              data={compProject}
              columns={compColumns}
              scroll={{ y: 650, x: 3000 }}
            />
          </Suspense>
        )}
      </>
    </TableOutlet>
  )
}

export default ProjectsComp
