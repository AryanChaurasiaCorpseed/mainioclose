import React, { useEffect, useState } from "react"
import "./LeadHistory.scss"
import UserLeadComponent from "../../../Tables/UserLeadComponent"
import { getQuery } from "../../../API/GetQuery"
import { useParams } from "react-router-dom"
import TableScalaton from "../../../components/TableScalaton"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()

const LeadHistory = () => {
  const [leadHistoryData, setLeadHistoryData] = useState([])
  const [historyScalaton, setHistoryScalaton] = useState(true)


  const { leadid } = useParams()

  useEffect(() => {
    leadHistoryFun()
  }, [])

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      width: 60,
      filterable: false,
      renderCell: (props) => {
        return (
          <p className="mb-0">
            {props.api.getRowIndexRelativeToVisibleRows(props?.row?.id) + 1}
          </p>
        )
      },
    },
    {
      field: "createdDate",
      headerName: "Date",
      width: 200,
      renderCell: (props) => {
        let date = new Date(props?.row?.createdDate)
        let dateNew = date.toLocaleDateString()
        return <p className="mb-0">{dateNew.toString()} <span> - </span>
         {new Date(props.row.createdDate).getHours()}:
            {new Date(props.row.createdDate).getMinutes()}
        </p>
      },
    },
    { field: "createdBy", headerName: "Created By", width: 150 },
    { field: "event", headerName: "Event Type", width: 200 },
    { field: "description", headerName: "Description", width: 450 },
  ]

  const leadHistoryFun = async () => {
    try {
      const leadHistory = await getQuery(
        `/leadService/api/v1/leadHistory/getAllLeadHistory?leadId=${leadid}`
      )

      setLeadHistoryData(leadHistory.data.reverse())
      setHistoryScalaton(false)
    } catch (err) {
      if (err.response.status === 500) {
        toast.error("Something Went Wrong")
      }
      if (err.response.status === 401) {
        toast.error("Something Went Wrong")
      }
      console.log("Err", err)
    }
  }

  return (
    <div className="p-3">
      <h3 className="big-heading">Lead History</h3>
      <div className="mt-3">
      {historyScalaton ? (
        <TableScalaton />
      ) : (
        <UserLeadComponent row={leadHistoryData} columns={columns} />
      )}
      </div>
    </div>
  )
}

export default LeadHistory
