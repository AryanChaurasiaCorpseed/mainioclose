import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllNotification,
  updateNotification,
} from "../../../Toolkit/Slices/NotificationSlice"
import MainHeading from "../../../components/design/MainHeading"
import CommonTable from "../../../components/CommonTable"
import LeadsDetailsMainPage from "./LeadsDetailsMainPage"

const AllNotificationPage = () => {
  const { userid } = useParams()
  const allNotifications = useSelector((state) => state.notify.allNotifications)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllNotification(userid))
    dispatch(updateNotification(userid))
  }, [userid, dispatch])

  const columns = [
    {
      dataIndex: "id",
      title: "S.No",
      width: 60,
      filterable: false,
      render: (_, props) => {
        return <p className="mb-0">{props?.id}</p>
      },
    },
    {
      dataIndex: "message",
      title: "Message",
      render: (_, props) => {
        const notify = props?.view
        return props?.type === "lead" ? (
          <LeadsDetailsMainPage leadId={props?.leadId} data={props}>
            {props?.message}
          </LeadsDetailsMainPage>
        ) : (
          <p className={`mb-0 ${!notify ? "noti-view" : ""}`}>
            {props?.message}
          </p>
        )
      },
    },
    {
      dataIndex: "notifyDate",
      title: "Date",
      render: (_, props) => {
        const data = props?.notifyDate
        return data === null || undefined ? (
          "NA"
        ) : (
          <p>
            {new Date(props.notifyDate).toLocaleDateString()} -{" "}
            {new Date(props.notifyDate).getHours()}:
            {new Date(props.notifyDate).getMinutes()}
          </p>
        )
      },
    },
  ]

  return (
    <div className="small-box-padding">
      <>
        <MainHeading data={`All notification`} />
        <div>
          <CommonTable
            data={allNotifications}
            columns={columns}
            scroll={{ y: 550 }}
          />
        </div>
      </>
    </div>
  )
}

export default AllNotificationPage
