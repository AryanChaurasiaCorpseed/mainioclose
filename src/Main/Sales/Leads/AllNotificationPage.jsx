import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import UserLeadComponent from "../../../Tables/UserLeadComponent"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllNotification,
  updateNotification,
} from "../../../Toolkit/Slices/NotificationSlice"
import MainHeading from "../../../components/design/MainHeading"
import CommonTable from "../../../components/CommonTable"

const AllNotificationPage = () => {
  // const [allNotificationData, setAllNotificationData] = useState([])
  const { userid } = useParams()

  const allNotifications = useSelector((state) => state.notify.allNotifications)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateNotification(userid))
  }, [])
  // const SingleNotification = allNotifications[0]

  // useEffect(() => {
  //   getNotiFun()
  // }, [])

  useEffect(() => {
    dispatch(getAllNotification(userid))
  }, [userid, dispatch])

  // const getNotiFun = async () => {
  //   try {
  //     const getAllNoty = await getQuery(
  //       `/leadService/api/v1/notification/getAllNotification?userId=${userid}`
  //     )
  //     //    getAllNoty.data.reverse()
  //     setAllNotificationData(getAllNoty.data.reverse())
  //     const updateNoty = await putQueryNoData(
  //       `/leadService/api/v1/notification/viewNotification?userId=${userid}`
  //     )
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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
    <div className="small-box-padding">
      <>
        <MainHeading data={`All Notification`} />
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
