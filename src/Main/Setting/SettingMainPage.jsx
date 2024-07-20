import React from "react"
import "./SettingMainPage.scss"
import { Link, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { Layout, Menu, theme } from "antd"
const { Sider, Content, Header } = Layout

const SettingMainPage = () => {
  // const currentUserId = useSelector((auth) => auth.AuthReducer.currentUser.id)
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)

  const items = [
    {
      key: "1",
      label: (
        <Link className="link-four" to={`/erp/${currentUserId}/setting`}>
          Lead status
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/setting/category`}
        >
          Lead category
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/setting/products`}
        >
          Lead product
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link className="link-four" to={`/erp/${currentUserId}/setting/slug`}>
          Lead slug
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link className="link-four" to={`/erp/${currentUserId}/setting/urls`}>
          Lead urls
        </Link>
      ),
    },
    {
      key: "6",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/setting/comments`}
        >
          Comments
        </Link>
      ),
    },
    {
      key: "7",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/setting/desigination`}
        >
          Desigination
        </Link>
      ),
    },
  ]
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (
    <>
      <Layout>
        <Sider
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Menu mode="inline" items={items} defaultSelectedKeys={["1"]} />
        </Sider>
        <Layout>
          {/* <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          /> */}
          <Content
            style={{
              margin: "24px 16px 0",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default SettingMainPage
