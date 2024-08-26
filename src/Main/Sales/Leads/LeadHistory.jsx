import React, { useEffect, useState } from "react"
import "./LeadHistory.scss"
import UserLeadComponent from "../../../Tables/UserLeadComponent"
import { getQuery } from "../../../API/GetQuery"
import { useParams } from "react-router-dom"
import TableScalaton from "../../../components/TableScalaton"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CommonTable from "../../../components/CommonTable"
import OverFlowText from "../../../components/OverFlowText"
import MainHeading from "../../../components/design/MainHeading"
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
      dataIndex: "id",
      title: "Id",
      width: 60,
      render: (_, props) => {
        return <p className="mb-0">{props?.id}</p>
      },
    },
    {
      dataIndex: "createdDate",
      title: "Date",
      render: (_, props) => {
        let date = new Date(props?.createdDate)
        let dateNew = date.toLocaleDateString()
        return (
          <p className="mb-0">
            {dateNew.toString()} <span> - </span>
            {new Date(props?.createdDate).getHours()}:
            {new Date(props?.createdDate).getMinutes()}
          </p>
        )
      },
    },
    { dataIndex: "createdBy", title: "Created By" },
    {
      dataIndex: "event",
      title: "Event Type",
      render: (_, records) => (
        <OverFlowText>{records?.event}</OverFlowText>
      ),
    },
    {
      dataIndex: "description",
      title: "Description",
      render: (_, records) => (
        <OverFlowText>{records?.description}</OverFlowText>
      ),
    },
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
      {/* <h3 className="big-heading">Lead History</h3> */}
      <MainHeading data={'Lead history'}   />
      <div className="mt-3">
        {historyScalaton ? (
          <TableScalaton />
        ) : (
          // <UserLeadComponent row={leadHistoryData} columns={columns} />
          <CommonTable
            data={leadHistoryData}
            columns={columns}
            scroll={{ y: 520 }}
          />
        )}
      </div>
    </div>
  )
}

export default LeadHistory
