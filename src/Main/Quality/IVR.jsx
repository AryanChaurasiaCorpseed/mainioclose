import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import TableOutlet from "../../components/design/TableOutlet"
import MainHeading from "../../components/design/MainHeading"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import { getAllIvr } from "../../Toolkit/Slices/IvrSlice"
import CreateNEditIVR from "../../Model/CreateNEditIVR"
import CommonTable from "../../components/CommonTable"

const IVR = () => {
  const { allIvr, ivrLoading, ivrError } = useSelector((prev) => prev?.ivr)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllIvr())
  }, [dispatch])

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
      fixed: "left",
      width: 80,
    },
    {
      dataIndex: "agentName",
      title: "Agent name",
      fixed: "left",
      width:250,
    },
    {
      dataIndex: "callerName",
      title: "Caller name"
    },
    {
      dataIndex: "startTime",
      title: "Start time",
    },
    {
      dataIndex: "endTime",
      title: "End time",
    },
    {
      dataIndex: "duration",
      title: "Duration",
    },
    {
      dataIndex: "recording",
      title: "Recording",
      width:400,
      render: (_, props) => (
        <audio controls className="audio-player" style={{ height: "40px" }}>
          <source
            src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
            type="audio/mpeg"
          />
        </audio>
      ),
    },
  ]
   
  return (
    <TableOutlet>
      <div className="create-user-box">
        <MainHeading data={"All ivr"} />
        <CreateNEditIVR />
      </div>
      <div>
        {ivrLoading && <TableScalaton />}
        {ivrError && <SomethingWrong />}
        {allIvr && !ivrLoading && !ivrError && (
          <CommonTable
            data={allIvr}
            columns={columns}
            scroll={{ y: 600,x:1200 }}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default IVR
