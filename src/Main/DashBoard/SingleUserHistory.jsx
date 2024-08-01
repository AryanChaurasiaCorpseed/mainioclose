import React, { useEffect } from "react"
import MainHeading from "../../components/design/MainHeading"
import { Link, useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllHistory } from "../../Toolkit/Slices/HistorySlice"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import UserListComponent from "../../Tables/UserListComponent"

const SingleUserHistory = () => {
  const dispatch = useDispatch()

  const { leadid } = useParams()

  useEffect(() => {
    dispatch(getAllHistory({ id: leadid }))
  }, [])

  const { allHistory, historyLoading, historyError } = useSelector(
    (prev) => prev?.uhistory
  )


  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
    },
    {
      field: "userName",
      headerName: "UserName",
      width: 200,
    },
    {
      field: "event",
      headerName: "Event",
      width: 300,
    },
    {
      field: "updatedBy",
      headerName: "Updated By",
      width: 200,
    },
  ]

  return (
    <>
      <div className="create-user-box">
        <MainHeading data={`User History`} />
      </div>
      {historyLoading && <TableScalaton />}
      {historyError && <SomethingWrong />}
      {allHistory && !historyLoading && !historyError && (
        <UserListComponent tableName={""} columns={columns} row={allHistory} />
      )}
    </>
  )
}

export default SingleUserHistory
