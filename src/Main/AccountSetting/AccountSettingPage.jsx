import React from "react";
import "./Accounts.scss";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Menu, theme } from "antd";
const { Sider, Content } = Layout;

const AccountSettingPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id);
  const pathname = window.location.pathname;

  const getPathKey = () => {
    const parts = pathname?.split("/");
    const lastWord = parts[parts?.length - 1];
    return lastWord;
  };

  const items = [
    {
      key: "voucherType",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/accountSetting/voucherType`}
        >
          Vouchers type
        </Link>
      ),
    },
    {
      key: "ledgerType",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/accountSetting/ledgerType`}
        >
          Ledger type
        </Link>
      ),
    },
    {
      key: "ledger",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/accountSetting/ledger`}
        >
          Ledger
        </Link>
      ),
    },
    {
      key: "voucher",
      label: (
        <Link
          className="link-four"
          to={`/erp/${currentUserId}/accountSetting/voucher`}
        >
          Voucher
        </Link>
      ),
    },
  ];

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
        <Layout style={{ backgroundColor: "#fff" }}>
          <Content
            style={{
              margin: "24px 16px 0",
              backgroundColor: "#fff",
              height: "90vh",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AccountSettingPage;
