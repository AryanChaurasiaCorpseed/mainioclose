import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCompliances } from "../../Toolkit/Slices/ComplianceSlice"
import TableOutlet from "../../components/design/TableOutlet"
import UserListComponent from "../../Tables/UserListComponent"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import MainHeading from "../../components/design/MainHeading"
import "./Compliance.scss"
import { ViewComplianceDoc } from "./ViewComplianceDoc"
import CommonTable from "../../components/CommonTable"

const Compliances = () => {
  const { allCompliance, complianceLoading, complianceError } = useSelector(
    (prev) => prev?.compliance
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCompliances())
  }, [dispatch])

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "name",
      title: "Catagory name",
    },
    {
      dataIndex: "documents",
      title: "Documents",
      render: (_, props) => <ViewComplianceDoc data={props} />,
    },
  ]
  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All compliances"} />
      </div>
      <div>
        {complianceLoading && <TableScalaton />}
        {complianceError && <SomethingWrong />}
        {allCompliance && !complianceLoading && !complianceError && (
          <CommonTable
            data={allCompliance}
            columns={columns}
            scroll={{ y: 600 }}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default Compliances
