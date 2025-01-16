import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import SideBar from "./SideBar";
import { Outlet, useParams } from "react-router";
import TopNav from "../components/TopNav";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDepartmentOfUser } from "../Toolkit/Slices/AuthSlice";
import { Layout, Menu, theme } from "antd";
import { getAllLeadUser } from "../Toolkit/Slices/LeadSlice";
const { Header, Sider, Content } = Layout;
toast.configure();

const MainPage = () => {
  const { userid } = useParams();
  const dispatch = useDispatch();
  const items = SideBar();
  const [collapsed, setCollapsed] = useState(false);
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    dispatch(getDepartmentOfUser(userid));
    dispatch(getAllLeadUser(userid));
  }, [dispatch, userid]);

  const pathname = window.location.pathname;

  const getPathKey = () => {
    const parts = pathname.split("/");
    const lastWord = parts[parts.length - 1];
    return lastWord;
  };

  const getSecondLastKey = () => {
    const parts = pathname.split("/");
    const lastWord = parts[parts.length - 2];
    return lastWord;
  };

  const getThirdLastKey = () => {
    const parts = pathname.split("/");
    const lastWord = parts[parts.length - 3];
    return lastWord;
  };

  const [openKeys, setOpenKeys] = useState(getSecondLastKey());

  // useEffect(() => {
  //   const key = getSecondLastKey();
  //   setOpenKeys(key);
  // }, []);

  console.log('fkdjbsdkjfkj',[openKeys])

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
              getSecondLastKey() === "accountSetting"
                ? "accountSetting"
                : getSecondLastKey() === "erpSetting"
                ? "erpSetting"
                : getThirdLastKey() === "setting"
                ? "setting"
                : getPathKey(),
            ]}
            defaultOpenKeys={[openKeys]}
            mode="inline"
            items={items}
            onOpenChange={(e) => setOpenKeys(e[e?.length - 1])}
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
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainPage;
