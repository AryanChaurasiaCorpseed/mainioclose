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
          Lead Status
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
          Lead Category
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
          Lead Product
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link className="link-four" to={`/erp/${currentUserId}/setting/slug`}>
          Lead Slug
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link className="link-four" to={`/erp/${currentUserId}/setting/urls`}>
          Lead Urls
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
  ]
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  return (
    <>
      {/* <div className="setting">
        <div className="side-links">
          <div className="customization">
            <h3 className="heading-four">Customization</h3>
            <Link className="link-four" to={`/erp/${currentUserId}/setting`}>
              Lead Status
            </Link>
            <Link
              className="link-four"
              to={`/erp/${currentUserId}/setting/category`}
            >
              Lead Category
            </Link>
            <Link
              className="link-four"
              to={`/erp/${currentUserId}/setting/products`}
            >
              Lead Product
            </Link>
            <Link
              className="link-four"
              to={`/erp/${currentUserId}/setting/slug`}
            >
              Lead Slug
            </Link>
            <Link
              className="link-four"
              to={`/erp/${currentUserId}/setting/urls`}
            >
              Lead Urls
            </Link>
            <Link
              className="link-four"
              to={`/erp/${currentUserId}/setting/comments`}
            >
              Comments
            </Link>
          </div>
        </div>
        <div className="side-data">
          <Outlet />
        </div>
      </div> */}

      <Layout >
        <Sider
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Menu mode="inline" items={items} />
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
