import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import UserListComponent from "../../Tables/UserListComponent"
import { getAllIvr } from "../../Toolkit/Slices/IvrSlice"
import CreateNEditIVR from "../../Model/CreateNEditIVR"
import { Icon } from "@iconify/react"
import { Tooltip } from "antd"

const IVR = () => {
  const { allIvr, ivrLoading, ivrError } = useSelector((prev) => prev?.ivr)
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
      field: "recording",
      headerName: "Recording",
      width: 350,
      renderCell: (props) => (
        <audio controls className="audio-player" style={{ height: "40px" }}>
          <source
            src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
            type="audio/mpeg"
          />
        </audio>
      ),
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
        <CreateNEditIVR />
      </div>
      <div>
        {ivrLoading && <TableScalaton />}
        {ivrError && <SomethingWrong />}
        {allIvr && !ivrLoading && !ivrError && (
          <UserListComponent tableName={""} columns={columns} row={allIvr} />
        )}
      </div>
    </TableOutlet>
  )
}

export default IVR
