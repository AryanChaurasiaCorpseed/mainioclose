import React, { useEffect } from "react"
import MainHeading from "../../components/design/MainHeading"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllHistory } from "../../Toolkit/Slices/HistorySlice"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import CommonTable from "../../components/CommonTable"

const SingleUserHistory = ({leadid}) => {
  const dispatch = useDispatch()

  // const { leadid } = useParams()

  // useEffect(() => {
  //   dispatch(getAllHistory({ id: leadid }))
  // }, [dispatch, leadid])

  const { allHistory, historyLoading, historyError } = useSelector(
    (prev) => prev?.uhistory
  )

  const columns = [
    {
      dataIndex: "id",
      title: "Id",
    },
    {
      dataIndex: "userName",
      title: "User name",
    },
    {
      dataIndex: "event",
      title: "Event",
    },
    {
      dataIndex: "updatedBy",
      title: "Updated by",
    },
  ]

  return (
    <>
      <div className="create-user-box">
        <MainHeading data={`User history`} />
      </div>
      {historyLoading && <TableScalaton />}
      {historyError && <SomethingWrong />}
      {allHistory && !historyLoading && !historyError && (
        <CommonTable data={allHistory} columns={columns} scroll={{ y: 520 }} />
      )}
    </>
  )
}

export default SingleUserHistory
