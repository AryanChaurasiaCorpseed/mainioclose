import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCompliances } from "../../Toolkit/Slices/ComplianceSlice"
import TableOutlet from "../../components/design/TableOutlet"
import UserListComponent from "../../Tables/UserListComponent"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import MainHeading from "../../components/design/MainHeading"
import './Compliance.scss'
import { ViewComplianceDoc } from "./ViewComplianceDoc"

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
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "name",
      headerName: "Catagory Name",
      width: 250,
    },
    {
      field: "documents",
      headerName: "Documents",
      width: 250,
      renderCell: (props) => <ViewComplianceDoc data={props?.row} />,
    },
  ]
  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All Compliances"} />
        <button
          className="team-edit-button create-user-btn"
          // onClick={() => setHidebox((prev) => !prev)}
        >
          <i className="fa-solid mr-1 fa-circle-plus"></i>
        </button>
      </div>
      <div>
        {complianceLoading && <TableScalaton />}
        {complianceError && <SomethingWrong />}
        {allCompliance && !complianceLoading && !complianceError && (
          <UserListComponent
            tableName={""}
            columns={columns}
            row={allCompliance}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default Compliances
