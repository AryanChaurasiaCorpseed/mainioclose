import React from "react"
import { Link } from "react-router-dom"
import logo from "../Images/CORPSEED.webp"

const NavBar = () => {
  return (
    <div className="container main-web-logo logo-container">
      <div className="logo">
        <div className="erp-image">
          <img className="main-logo-image" src={logo} alt="" />
        </div>
      </div>
      <div>
        <ul className="main-nav-items">
          <li>
            <Link
              className="single-link tell-us-btn text-white"
              to="/erp/login"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
