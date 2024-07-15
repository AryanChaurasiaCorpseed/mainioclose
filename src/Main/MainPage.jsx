import React, { useEffect, useState } from "react"
import "./MainPage.scss"
import SideBar from "./SideBar"
import { Outlet, useParams } from "react-router"
import TopNav from "../components/TopNav"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getNotificationFun } from "../Toolkit/Slices/NotificationSlice"
import { getDepartmentOfUser } from "../Toolkit/Slices/AuthSlice"
toast.configure()

const MainPage = () => {
  const [toasterData, setToasterData] = useState(false)
  const { userid } = useParams()

  const currentUser = useSelector((state) => state)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   setInterval(() => {
  //     dispatch(getNotificationFun(userid))
  //     setToasterData((prev) => !prev)
  //   }, 10000)
  // }, [])

  // const allNotifications = useSelector((state) => state.notify.allNotifications)

  // useEffect(() => {
  //   const SingleNotification = allNotifications[0]
  //   const start = Date.now()
  //   let startPoint = Date.now() + 120000
  //   let anotherDate = start - 10000
  //   let bool = true
  //   let apiDate = new Date(SingleNotification?.notifyDate).getTime()
  //   setTimeout(() => {
  //     if (start >= apiDate && start <= apiDate + 30000) {
  //       toast.success(SingleNotification.message)
  //     }
  //   }, 1000)
  // }, [toasterData])
  useEffect(()=>{
    dispatch(getDepartmentOfUser(userid))
  },[dispatch,userid])

  const authStatus = useSelector((state) => state.auth.isAuth)

  return (
    <div className="main-page">
      <div className="side-nav">
        <SideBar />
      </div>
      <div className="right-data">
        <TopNav />       
        <Outlet />
      </div>
    </div>
  )
}

export default MainPage
