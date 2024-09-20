import React, { useCallback, useMemo, useState } from "react"
import {
  getAllLeads,
  getAllTaskData,
  handleViewHistory,
} from "../../../Toolkit/Slices/LeadSlice"
import { useDispatch } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Drawer, Tabs } from "antd"
import LeadDetailsPage from "../Inbox/LeadDetailsPage"
import { getAllHistory } from "../../../Toolkit/Slices/HistorySlice"
import SingleLeadTaskList from "./SingleLeadTaskList"
import Vendors from "./Vendors"
import { LeadActivityPage } from "./LeadActivityPage"
import LeadHistory from "./LeadHistory"

const LeadsDetailsMainPage = ({
  children,
  leadId,
  data,
  allMultiFilterData,
  setSearchText
}) => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const [openDrawer, setOpenDrawer] = useState(false)

  const items = useMemo(() => {
    return [
      {
        label: `Lead details`,
        key: "leadDetail",
        children: <LeadDetailsPage leadid={leadId} />,
      },
      {
        label: `Activities `,
        key: "activities",
        children: <LeadActivityPage leadid={leadId} />,
      },
      // {
      //   label: `Vendors`,
      //   key: "vendors",
      //   children: <Vendors leadId={leadId} />,
      // },
      {
        label: `All task`,
        key: "4",
        children: <SingleLeadTaskList />,
      },
      {
        label: `History`,
        key: "allTask",
        children: <LeadHistory leadid={leadId} />,
      },
    ]
  }, [leadId])

  const handleOnChange = useCallback(
    (e) => {
      if (e === "5") {
        dispatch(getAllHistory({ id: leadId }))
      }
      if (e === "4") {
        dispatch(getAllTaskData(leadId))
      }
    },
    [dispatch, leadId]
  )

  return (
    <>
      <Link
        className="link-heading"
        onClick={() => {
          dispatch(handleViewHistory({ leadId: leadId, userid: userid }))
          setOpenDrawer(true)
        }}
      >
        {children}
      </Link>
      <Drawer
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false)
          // dispatch(getAllLeads(allMultiFilterData))
          setSearchText('')
        }}
        width={"80%"}
        closeIcon={null}
        bodyStyle={{ padding: 12 }}
      >
        <Tabs
          defaultActiveKey="leadDetail"
          size="small"
          items={items}
          onChange={handleOnChange}
        />
      </Drawer>
    </>
  )
}

export default LeadsDetailsMainPage
