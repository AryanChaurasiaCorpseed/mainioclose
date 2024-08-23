import React, { useEffect } from "react"
import "./InboxPage.scss"
import { useParams } from "react-router-dom"
import MainHeading from "../../../components/design/MainHeading"
import CommonTable from "../../../components/CommonTable"
import { useDispatch, useSelector } from "react-redux"
import { getAllNotification } from "../../../Toolkit/Slices/NotificationSlice"

const InboxPage = () => {
  const { userid } = useParams()
  const dispatch = useDispatch()
  const allNotifications = useSelector((state) => state.notify.allNotifications)

  useEffect(() => {
    dispatch(getAllNotification(userid))
  }, [dispatch, userid])

  const columns = [
    {
      dataIndex: "id",
      title: "S.No",
      width: 60,
      render: (_, props) => {
        return <p className="mb-0">{props?.id}</p>
      },
    },
    {
      dataIndex: "message",
      title: "Message",
      render: (_, props) => {
        const notify = props?.view
        return (
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
    <div className="inbox-page cm-padding-one">
      <div className="pb-3">
        <MainHeading data={`Inbox`} />
      </div>

      <CommonTable
        data={allNotifications}
        columns={columns}
        scroll={{ y: 550 }}
      />
    </div>
  )
}

export default InboxPage
