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
import { Layout, Menu, theme } from "antd"
const { Header, Sider, Footer, Content } = Layout
toast.configure()

const MainPage = () => {
  const { userid } = useParams()
  const currentUser = useSelector((state) => state)
  const dispatch = useDispatch()
  const items=SideBar()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    dispatch(getDepartmentOfUser(userid))
  }, [dispatch, userid])

  const authStatus = useSelector((state) => state.auth.isAuth)
  
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  // const items = [
  //   {
  //     label:'Item1',
  //     key:'1'
  //   },
  //   {
  //     label:'Item2',
  //     key:'2'
  //   },
  //   {
  //     label:'Item3',
  //     key:'3'
  //   }
  // ];

  const pathname = window.location.pathname

  const getPathKey = () => {
    const parts = pathname.split("/")
    const lastWord = parts[parts.length - 1]
    return lastWord
  }

  const getSecondLastKey= () => {
    const parts = pathname.split("/")
    const lastWord = parts[parts.length - 2]
    return lastWord
  }


  console.log('sjabasdkjhdjhciu',getPathKey(),getSecondLastKey())




  return (
    <>
      {/* <div className="main-page">
        <div className="side-nav">
          <SideBar />
        </div>
        <div className="right-data">
          <TopNav />
          <Outlet />
        </div>
      </div> */}

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
            defaultSelectedKeys={[getPathKey()]}
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
            }}
          >
            <TopNav />
          </Header>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Outlet />
          </Content>
          {/* <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    </>
  )
}

export default MainPage
