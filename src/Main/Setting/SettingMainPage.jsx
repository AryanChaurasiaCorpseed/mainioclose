import React from "react"
import "./SettingMainPage.scss"
import { Link, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { Layout, Menu, theme } from "antd"
const { Sider, Content, Header } = Layout

const SettingMainPage = () => {
  // const currentUserId = useSelector((auth) => auth.AuthReducer.currentUser.id)
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)

  const pathname = window.location.pathname

  const getPathKey = () => {
    const parts = pathname.split("/")
    const lastWord = parts[parts.length - 1]
    return lastWord
  }

  const items = [
    {
      key: "setting",
      label: (
        <Link className="link-four" to={`/erp/${currentUserId}/setting`}>
          Lead status
        </Link>
      ),
    },
    {
      key: "category",
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
      key: "products",
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
      key: "slug",
      label: (
        <Link className="link-four" to={`/erp/${currentUserId}/setting/slug`}>
          Lead slug
        </Link>
      ),
    },
    {
      key: "urls",
      label: (
        <Link className="link-four" to={`/erp/${currentUserId}/setting/urls`}>
          Lead urls
        </Link>
      ),
    },
    {
      key: "comments",
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
      key: "desigination",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/setting/desigination`}
        >
          Desigination
        </Link>
      ),
    },
    {
      key: "department",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/setting/department`}
        >
          Department
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
          <Menu mode="inline" items={items} defaultSelectedKeys={[getPathKey()]} />
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
