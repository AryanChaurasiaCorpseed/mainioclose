import React from "react"
import "./SettingMainPage.scss"
import { Link, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { Layout, Menu, theme } from "antd"
const { Sider, Content } = Layout

const SettingMainPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)
  const pathname = window.location.pathname

  const getPathKey = () => {
    const parts = pathname?.split("/")
    const lastWord = parts[parts?.length - 1]
    return lastWord
  }

  const items = [
    {
      key: "leadStatus",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/setting/leadStatus`}
        >
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
    {
      key: "ipaddress",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/setting/ipaddress`}
        >
          Ip address
        </Link>
      ),
    },
    {
      key: "procurement",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/setting/procurement`}
        >
          Procurement
        </Link>
      ),
    },
  ]

  return (
    <>
      <Layout>
        <Sider
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            items={items}
            defaultSelectedKeys={[getPathKey()]}
          />
        </Sider>
        <Layout>
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
