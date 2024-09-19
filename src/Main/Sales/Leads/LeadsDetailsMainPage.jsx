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

const LeadsDetailsMainPage = ({ children,leadId, data, allMultiFilterData }) => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [activeKey, setActiveKey] = useState("1")

  const items = useMemo(() => {
    return [
      {
        label: `Lead details`,
        key: "1",
        children: <LeadDetailsPage leadid={leadId} />,
      },
      {
        label: `Activities `,
        key: "2",
        children: <LeadActivityPage leadid={leadId} />,
      },
      // {
      //   label: `Vendors`,
      //   key: "3",
      //   children: <Vendors leadId={leadId}  />,
      // },
      {
        label: `All task`,
        key: "4",
        children: <SingleLeadTaskList />,
      },
      {
        label: `History`,
        key: "5",
        children: <LeadHistory leadid={leadId} />,
      },
    ]
  }, [leadId])

  const handleOnChange = useCallback(
    (e) => {
      setActiveKey(e)
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
          dispatch(
            handleViewHistory({ leadId: leadId, userid: userid })
          ).then((resp) => {
            if (resp.meta.requestStatus === "fulfilled") {
              dispatch(getAllLeads(allMultiFilterData))
            }
          })
          setOpenDrawer(true)
        }}
      >
        {children}
      </Link>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        width={"80%"}
        closeIcon={null}
        bodyStyle={{ padding: 12 }}
      >
        <Tabs
          activeKey={activeKey}
          defaultActiveKey="1"
          size="small"
          items={items}
          onChange={handleOnChange}
        />
      </Drawer>
    </>
  )
}

export default LeadsDetailsMainPage
