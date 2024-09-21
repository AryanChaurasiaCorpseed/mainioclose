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
import { LeadActivityPage } from "./LeadActivityPage"
import LeadHistory from "./LeadHistory"
import Vendors from "../../Vendors/Vendors"

const LeadsDetailsMainPage = ({
  children,
  leadId,
  data,
  allMultiFilterData,
  setSearchText,
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
      {
        label: `Vendors`,
        key: "vendors",
        children: <Vendors leadId={leadId} />,
      },
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

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false)
    // dispatch(getAllLeads(allMultiFilterData))
    // if (typeof setSearchText === "function") {
    //   setSearchText((prev) => "")
    // }
  }, [])

  return (
    <>
      <Link
        className="link-heading"
        onClick={() => {
          if (allMultiFilterData) {
            dispatch(
              handleViewHistory({ leadId: leadId, userid: userid })
            ).then((resp) => {
              if (resp.meta.requestStatus === "fulfilled") {
                // dispatch(getAllLeads(allMultiFilterData))
              }
            })
          } else {
            dispatch(handleViewHistory({ leadId: leadId, userid: userid }))
          }
          setOpenDrawer(true)
        }}
      >
        {children}
      </Link>
      <Drawer
        open={openDrawer}
        onClose={handleCloseDrawer}
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
