import React from "react"
import NavBar from "./NavBar"
import HomeFooter from "./HomeFooter"
import { Outlet } from "react-router-dom"
const HomePageFile = () => {
  return (
    <>
      {/* <NavBar /> */}
      <Outlet />
      {/* <HomeFooter /> */}
    </>
  )
}

export default HomePageFile
