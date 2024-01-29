import React, { useEffect, useState } from "react"
import "./InboxPage.scss"
import {  useLocation } from "react-router-dom"
import axios from "axios"
import MUIDataTable from "mui-datatables"
import DataGridTables from "../../../components/DataGridTables"
import LeadsModule from "../Leads/LeadsModule"
import DataTableFirst from "../../../components/DataTableFirst"
import UserListComponent from "../../../Tables/UserListComponent"
import InboxListComponent from "../../../Tables/InboxListComponent"
import TableScalaton from "../../../components/TableScalaton"
import UserLeadComponent from "../../../Tables/UserLeadComponent"

const InboxPage = () => {
  const [activeTab, setActiveTab] = useState(false)
  const [allLeadData, setAllLeadData] = useState([])
  const [inboxScalaton, setInboxScalaton] = useState(true)

  useEffect(() => {
    getAllLead()
  }, [])

  const location = useLocation()
  const currentPath = location.pathname.split()
  const splitPath = currentPath[0].split("/")
  const currentUserId = Number(splitPath[2])


  const leadColumns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "comment",
      label: "Comment",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "count",
      label: "Count",
      options: {
        filter: true,
        sort: true,
      },
    },
  ]

  const inboxColumn = [

    { field: "name", headerName: "Name", width: 250 },
    { field: "comment", headerName: "Comment", width: 550 },
    { field: "count", headerName: "Count", width: 150 },
  ]

  // const columns = [
  //   { field: "leadId", headerName: "ID", width: 150 },
  //   { field: "name", headerName: "Name", width: 150 },
  //   { field: "comment", headerName: "Comment", width: 150 },
  //   { field: "count", headerName: "Count", width: 150 },
  // ]

  const filterOptions = {
    filterType: "checkbox",
  }

  const getAllLead = async () => {
    try {
      const allLead = await axios.get(
        `/leadService/api/v1/inbox/getAllInboxData?userId=${1}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )

      setAllLeadData(allLead.data)
      setInboxScalaton(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="inbox-page cm-padding-one">
     <div className="pb-3">
      <h1 className="table-heading">Inbox</h1>
      </div>
      <div className="inbox-top-btn">
        <button to="/sales" className={`tab-btn `}>
          Inbox
        </button>
        <button to="/sales2" className={`tab-btn `}>
          Done (25)
        </button>
        <button to="/sales3" className={`tab-btn `}>
          Failure (45)
        </button>
      </div>


      {/* <LeadsModule */}

      {/* <DataGridTables /> */}
      {inboxScalaton ? (
        <TableScalaton />
      ) : (
        <UserLeadComponent columns={inboxColumn} getRowId={(row) => row.leadId} row={allLeadData} />
      )}

      {/* <UserLeadComponent columns={inboxColumn} getRowId={(row) => row.leadId} row={allLeadData} /> */}

      {/* <UserListComponent tableName={"Inbox"} columns={columns} row ={setAllLeadData} /> */}
      {/* // <InboxListComponent tableName={"Inbox"} columns={columns} row ={setAllLeadData}  />  */}
      {/* <div className="mt-5">
        <MUIDataTable
          title={"Inbox"}
          data={allLeadData}
          columns={leadColumns}
          options={filterOptions}
        />
      </div> */}

      {/* data table */}
      {/* <div className="table-responsive mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Comment</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {allLeadData.map((lead, i) => (
              <tr key={i}>
                <td>{lead.leadId}</td>
                <td>
                  <Link to={`/erp/${currentUserId}/sales/${lead.leadId}`}>{lead.name}</Link>
                </td>
                <td>{lead.comment}</td>
                <td>{lead.count===0 ? lead.count : <div className="lead-count">{lead.count}</div>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  )
}

export default InboxPage
