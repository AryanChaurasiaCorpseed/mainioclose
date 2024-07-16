import React from "react"
import "./SettingMainPage.scss"
import { Link, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

const SettingMainPage = () => {
  // const currentUserId = useSelector((auth) => auth.AuthReducer.currentUser.id)
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)

  return (
    <div className="setting">
      <div className="side-links">
        <div className="customization">
          <h3 className="heading-four">Customization</h3>
          <Link className="link-four" to={`/erp/${currentUserId}/setting`}>
            Lead Status
          </Link>
          <Link className="link-four" to={`/erp/${currentUserId}/setting/category`}>
            Lead Category
          </Link>
          <Link className="link-four" to={`/erp/${currentUserId}/setting/products`}>
            Lead Product
          </Link>
          <Link className="link-four" to={`/erp/${currentUserId}/setting/slug`}>
            Lead Slug
          </Link>
          <Link className="link-four" to={`/erp/${currentUserId}/setting/urls`}>
            Lead Urls
          </Link>
          <Link className="link-four" to={`/erp/${currentUserId}/setting/comments`}>
            Comments
          </Link>
        </div>
      </div>
      <div className="side-data">
        <Outlet />
      </div>
    </div>
  )
}

export default SettingMainPage
