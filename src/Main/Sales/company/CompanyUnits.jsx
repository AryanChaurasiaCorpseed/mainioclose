import React, { lazy, Suspense } from "react"
import TableOutlet from "../../../components/design/TableOutlet"
import MainHeading from "../../../components/design/MainHeading"
import { useSelector } from "react-redux"
import OverFlowText from "../../../components/OverFlowText"
import TableScalaton from "../../../components/TableScalaton"
const CommonTable = lazy(() => import("../../../components/CommonTable"))

const CompanyUnits = () => {
  const allUnits = useSelector((state) => state.company.allCompanyUnits)
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: 50,
      fixed: "left",
    },
    {
      title: "Company name",
      dataIndex: "companyName",
      render: (_, record) => <OverFlowText>{record?.companyName}</OverFlowText>,
      fixed: "left",
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      render: (_, record) => (
        <OverFlowText>{record?.assignee?.fullName}</OverFlowText>
      ),
    },
    {
      title: "Contact no.",
      dataIndex: "primaryContact",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (_, record) => <OverFlowText>{record?.address}</OverFlowText>,
    },
    {
      title: "City",
      dataIndex: "city",
      render: (_, record) => <OverFlowText>{record?.city}</OverFlowText>,
    },
    {
      title: "State",
      dataIndex: "state",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Sec contact no.",
      dataIndex: "secondaryContact",
    },
    {
      title: "Sec address",
      dataIndex: "secAddress",
      render: (_, record) => <OverFlowText>{record?.secAddress}</OverFlowText>,
    },
    {
      title: "Sec city",
      dataIndex: "secCity",
      render: (_, record) => <OverFlowText>{record?.secCity}</OverFlowText>,
    },
    {
      title: "Sec city",
      dataIndex: "secState",
    },
    {
      title: "Sec country",
      dataIndex: "seCountry",
    },
  ]
  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All company units"} />
      </div>
      <>
        <Suspense fallback={<TableScalaton />}>
          <CommonTable
            data={allUnits}
            columns={columns}
            scroll={{ y: 650, x: 2000 }}
          />
        </Suspense>
      </>
    </TableOutlet>
  )
}

export default CompanyUnits
