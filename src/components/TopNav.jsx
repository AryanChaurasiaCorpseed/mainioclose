import React from "react"
import "./TopNav.scss"
import { useNavigate } from "react-router-dom"
import EnquirySend from "./EnquirySend"
import ProfileDrawer from "./ProfileDrawer"

const TopNav = () => {
  const navigate = useNavigate()
  const logoutUser = () => {
    const token = localStorage.removeItem("Access Token")
    navigate("/erp/login")
  }

  return (
    <div className="top-navbar">
      <div className="top-search-box"></div>
      <div className="top-nav-right-container">
        <div className="notes-box">
          <EnquirySend />
        </div>
        <ProfileDrawer />
      </div>
    </div>
  )
}

export default TopNav
