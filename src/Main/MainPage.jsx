import React, { useEffect, useState } from "react"
import "./MainPage.scss"
import SideBar from "./SideBar"
import { Outlet, useParams } from "react-router"
import TopNav from "../components/TopNav"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getDepartmentOfUser } from "../Toolkit/Slices/AuthSlice"
import { Layout, Menu, theme } from "antd"
import { getAllUsers } from "../Toolkit/Slices/UsersSlice"
import {
  getAllContactDetails,
  getAllLeadUser,
  getAllOppurtunities,
  getAllProductData,
  getAllProductWithCattegory,
  getAllStatusData,
  getAllTaskStatus,
} from "../Toolkit/Slices/LeadSlice"
import { getAllUrlList } from "../Toolkit/Slices/LeadUrlSlice"
import { getAllSlugList } from "../Toolkit/Slices/LeadSlugSlice"
const { Header, Sider, Content } = Layout
toast.configure()

const MainPage = () => {
  const { userid } = useParams()
  const dispatch = useDispatch()
  const items = SideBar()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  useEffect(() => {
    dispatch(getDepartmentOfUser(userid))
    dispatch(getAllLeadUser(userid))
  }, [dispatch, userid])

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllContactDetails())
    dispatch(getAllStatusData())
    dispatch(getAllSlugList())
    dispatch(getAllProductData())
    dispatch(getAllTaskStatus())
    dispatch(getAllOppurtunities())
    dispatch(getAllProductWithCattegory())
    dispatch(getAllUrlList())
  }, [dispatch])

  const pathname = window.location.pathname

  const getPathKey = () => {
    const parts = pathname.split("/")
    const lastWord = parts[parts.length - 1]
    return lastWord
  }

  const getSecondLastKey = () => {
    const parts = pathname.split("/")
    const lastWord = parts[parts.length - 2]
    return lastWord
  }

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />

          <Menu
            theme="dark"
            defaultSelectedKeys={[
              getSecondLastKey() === "setting" ? "setting" : getPathKey(),
            ]}
            defaultOpenKeys={[getSecondLastKey()]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              height: "45px",
            }}
          >
            <TopNav />
          </Header>
          <Content
            style={{
              margin: "0 16px",
              backgroundColor:'#ffffff'
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default MainPage
