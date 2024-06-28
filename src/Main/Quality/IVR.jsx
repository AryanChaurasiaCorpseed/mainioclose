import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import UserListComponent from "../../Tables/UserListComponent"
import { getAllIvr } from "../../Toolkit/Slices/IvrSlice"
import CreateNEditIVR from "../../Model/CreateNEditIVR"


const IVR = () => {
  const { allIvr, ivrLoading, ivrError } = useSelector(
    (prev) => prev?.ivr
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllIvr())
  }, [dispatch])

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "agentName",
      headerName: "Agent Name",
      width: 250,
    },
    {
        field: "callerName",
        headerName: "Caller Name",
        width: 250,
      },
      {
        field: "startTime",
        headerName: "Start Time",
        width: 150,
      },
      {
        field: "endTime",
        headerName: "End Time",
        width: 150,
      },
    {
      field: "duration",
      headerName: "Duration",
      width: 150,
    },
  ]
  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All IVR "} />
        <CreateNEditIVR/>
      </div>
      <div>
        {ivrLoading && <TableScalaton />}
        {ivrError && <SomethingWrong />}
        {allIvr && !ivrLoading && !ivrError && (
          <UserListComponent
            tableName={""}
            columns={columns}
            row={allIvr}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default IVR
