import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  getAllChildLeads,
  getAllLeads,
  getAllTaskData,
  handleViewHistory,
} from "../../../Toolkit/Slices/LeadSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { Drawer, Tabs } from "antd"
import LeadDetailsPage from "../Inbox/LeadDetailsPage"
import { getAllHistory } from "../../../Toolkit/Slices/HistorySlice"
import SingleLeadTaskList from "./SingleLeadTaskList"
import { LeadActivityPage } from "./LeadActivityPage"
import LeadHistory from "./LeadHistory"
import Vendors from "../../Vendors/Vendors"
import LeadChilds from "./LeadChilds"

const LeadsDetailsMainPage = ({
  children,
  leadId,
  data,
  allMultiFilterData,
  setSearchText,
}) => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const singleLeadResponseData = useSelector(
    (state) => state.leads.singleLeadResponseData
  )
  const [openDrawer, setOpenDrawer] = useState(false)
  const [currLeadId, setCurrLeadId] = useState(null)

  useEffect(() => {
    setCurrLeadId(leadId)
  }, [leadId])


  const items = useCallback(() => {
    return [
      {
        label: `Lead details`,
        key: "leadDetail",
        children: <LeadDetailsPage leadid={currLeadId} />,
      },
      ...(singleLeadResponseData?.parent===true
        ? [
            {
              label: `Lead child's`,
              key: "leadChilds",
              children: <LeadChilds leadid={currLeadId} />,
            },
          ]
        : []),
      {
        label: `Activities `,
        key: "activities",
        children: <LeadActivityPage leadid={currLeadId} />,
      },
      {
        label: `Vendors`,
        key: "vendors",
        children: <Vendors leadId={currLeadId} />,
      },
      {
        label: `All task`,
        key: "allTask",
        children: <SingleLeadTaskList />,
      },
      {
        label: `History`,
        key: "history",
        children: <LeadHistory leadid={currLeadId} />,
      },
    ]
  }, [currLeadId,singleLeadResponseData])

  const handleOnChange = useCallback(
    (e) => {
      if (e === "history") {
        dispatch(getAllHistory({ id: currLeadId }))
      }
      if (e === "allTask") {
        dispatch(getAllTaskData(currLeadId))
      }
      if (e === "leadChilds") {
        dispatch(getAllChildLeads(singleLeadResponseData?.leadName))
      }
    },
    [dispatch, currLeadId,singleLeadResponseData]
  )

  const handleCloseDrawer = useCallback(() => {
    setOpenDrawer(false)
    setCurrLeadId(null)
    // if (allMultiFilterData) {
    //   dispatch(getAllLeads(allMultiFilterData))
    // }
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
          setCurrLeadId(leadId)
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
          items={items()}
          onChange={handleOnChange}
        />
      </Drawer>
    </>
  )
}

export default LeadsDetailsMainPage
