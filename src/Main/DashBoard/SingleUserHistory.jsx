import React, { useEffect } from "react"
import MainHeading from "../../components/design/MainHeading"
import { Link, useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getAllHistory } from "../../Toolkit/Slices/HistorySlice"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import UserListComponent from "../../Tables/UserListComponent"
import CommonTable from "../../components/CommonTable"

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
      dataIndex: "id",
      title: "ID",
    },
    {
      dataIndex: "userName",
      title: "UserName",
    },
    {
      dataIndex: "event",
      title: "Event",
    },
    {
      dataIndex: "updatedBy",
      title: "Updated By",
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
        // <UserListComponent tableName={""} columns={columns} row={allHistory} />
        <CommonTable data={allHistory} columns={columns} scroll={{ y: 520 }} />
      )}
    </>
  )
}

export default SingleUserHistory
