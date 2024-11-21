import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import MainPage from "./Main/MainPage"
import DashBoard from "./Main/DashBoard/DashBoard"
import HRMod from "./Main/HR/HRMod"
import SalesMod from "./Main/Sales/SalesMod"
import InboxPage from "./Main/Sales/Inbox/InboxPage"
import ContactModule from "./Main/Sales/Contacts/ContactModule"
import Estimate from "./Main/Sales/Estimate/Estimate"
import LeadsModule from "./Main/Sales/Leads/LeadsModule"
import Opportunities from "./Main/Sales/Opportunities/Opportunities"
import OrdersModule from "./Main/Sales/Orders/OrdersModule"
import Login from "./Login/Login"
import SignUp from "./Login/SignUp"
import LeadDetailsPage from "./Main/Sales/Inbox/LeadDetailsPage"
import HomePage from "./Home/HomePage"
import FrontMainPage from "./Home/FrontMainPage"
import MainLoginRouter from "./Login/MainLoginRouter"
import OtpPage from "./Login/OtpPage"
import ForgetPassword from "./Login/ForgetPassword"
import ChangePassword from "./Login/ChangePassword"
import ForgetOtpPage from "./Login/ForgetOtpPage"
import DisplayDashboardUser from "./Main/DashBoard/DisplayDashboardUser"
import DisplayUserTwo from "./Main/DashBoard/DisplayUserTwo"
import SetNewPasswordPage from "./Login/SetNewPasswordPage"
import EstimateCreatePage from "./Main/Sales/Leads/EstimateCreatePage"
import TableScalaton from "./components/TableScalaton"
import LeadHistory from "./Main/Sales/Leads/LeadHistory"
import NewGetFile from "./Routes/NewGetFile"
import PaswordUpdateMessage from "./Login/PaswordUpdateMessage"
import ComingSoonPage from "./Home/ComingSoonPage"
import SettingMainPage from "./Main/Setting/SettingMainPage"
import LeadStatusPage from "./Main/Setting/LeadStatus/LeadStatusPage"
import ProductsChange from "./Main/Setting/Products/ProductsChange"
import NotFoundPage from "./components/NotFoundPage"
import LeadCategory from "./Main/Setting/Category/LeadCategory"
import AllNotificationPage from "./Main/Sales/Leads/AllNotificationPage"
import AllDeactivateUser from "./Main/DashBoard/AllDeactivateUser"
import { useSelector } from "react-redux"
import GetAllTaskList from "./Main/Sales/Leads/GetAllTaskList"
import AllTickets from "./Main/DashBoard/AllTickets"
import HrUserList from "./Main/HR/HrUserList"
import AllManagerApprovals from "./Main/DashBoard/AllManagerApprovals"
import HRApprovalList from "./Main/HR/HRApprovalList"
import UserRating from "./Main/HR/UserRating"
import SlugCreate from "./Main/Setting/slug/SlugCreate"
import UrlsPage from "./Main/Setting/urls/UrlsPage"
import SingleUserHistory from "./Main/DashBoard/SingleUserHistory"
import MainCompanyPage from "./Main/Sales/company/MainCompanyPage"
import ProjectPage from "./Main/Sales/Project/ProjectPage"
import UserService from "./Main/HR/UserService"
import Compliances from "./Main/Compliance/Compliances"
import QualityModule from "./Main/Quality/QualityModule"
import IVR from "./Main/Quality/IVR"
import Accounts from "./Main/Accounts/Accounts"
import { AccountsList } from "./Main/Accounts/AccountsList"
import { ConfigProvider } from "antd"
import Comments from "./Main/Setting/Comments/Comments"
import { lazy, Suspense } from "react"
import Desigination from "./Main/Setting/Desigination/Desigination"
import Department from "./Main/Setting/Department/Department"
import CompanyForm from "./Main/Accounts/CompanyForm"
import CompanyPageLayout from "./Main/Sales/company/CompanyPageLayout"
import Industry from "./Main/Industry/Industry"
import SubIndustry from "./Main/Industry/SubIndustry/SubIndustry"
import SubsubIndustry from "./Main/Industry/SubsubIndustry/SubsubIndustry"
import IndustryData from "./Main/Industry/IndustryData/IndustryData"
import Industries from "./Main/Industry/Industries/Industries"
import HomePageFile from "./Home/HomePageFile"
import LandingPage from "./Home/LandingPage"
import IpAddress from "./Main/Setting/IpAddress/IpAddress"
import VendorsList from "./Main/Vendors/VendorsList"
import ProjectGraph from "./Main/GraphDashboard/ProjectGraph"
import MainGraphPage from "./Main/GraphDashboard/MainGraphPage"
import Procurement from "./Main/Vendors/Procurement"
import MainCompanyFormPage from "./Main/Accounts/MainCompanyFormPage"
import VendorsRequestList from "./Main/Sales/Leads/VendorsRequestList"
import ClientDesigination from "./Main/Setting/ClientDesiginations/ClientDesigination"
import MainComanyModule from "./Main/Sales/company/MainComanyModule"
import GraphMainPage from "./Main/GraphDashboard/GraphMainPage"

const SpinLoading = lazy(() => import("./components/SpinLoading"))

function App() {
  const authStatus = useSelector((state) => state.auth.isAuth)

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 6,
          colorText: "#2e2e2e",
          colorTextHeading: "#2e2e2e",
          colorTextDisabled: "#8c8c8c",
          colorTextPlaceholder: "#8c8c8c",
        },
        components: {
          Card: {
            actionsLiMargin: 6,
            paddingLG:12,
            padding:12,
            paddingSM:12
          },
          Typography: {
            fontSize: 12,
          },
          Button: {
            contentFontSize: 13,
            contentFontSizeSM: 12,
            borderRadius: 4,
            borderRadiusLG: 4,
            borderRadiusSM: 4,
            controlHeightSM: 28,
            paddingInlineSM: 10,
          },
          Popconfirm: {
            fontSize: 13,
          },
          Select: {
            fontSize: 12,
            contentFontSize: 11,
            contentFontSizeSM: 11,
            optionFontSize: 12,
            optionHeight: 28,
            controlHeightSM: 28,
            borderRadius: 4,
            borderRadiusSM: 4,
            borderRadiusLG: 4,
            fontSizeLG: 13,
          },
          Input: {
            borderRadius: 4,
            borderRadiusSM: 4,
            borderRadiusLG: 4,
            controlHeightSM: 28,
          },
          Divider: {
            colorSplit: "#D3D3D3",
            margin: 4,
          },
          Table: {
            colorText: "#2e2e2e",
            headerColor: "#222222",
            fontWeightStrong: 600,
            cellFontSize: 12,
            cellFontSizeMD: 12,
            cellFontSizeSM: 12,
            cellPaddingBlock: 8,
            cellPaddingInline: 8,
            cellPaddingBlockMD: 8,
          },
          Tabs: {
            fontSize: 13,
            fontSizeSM: 13,
            fontWeightStrong: 600,
            cardPaddingSM: "5px 12px",
            horizontalMargin: "0px 0px 4px 0px",
          },
          Collapse: {
            headerPadding: "6px 8px",
          },
          Menu: {
            horizontalLineHeight: 38,
            itemHeight: 32,
            itemPaddingInline: 12,
            groupTitleFontSize: 12,
            fontSize: 13,
            fontSizeLG: 13,
          },
          Form: {
            fontSize: 12,
            fontSizeLG: 12,
          },
          List: {
            descriptionFontSize: 12,
            fontSize: 12,
            fontSizeSM: 12,
            titleMarginBottom: 0,
          },
          Timeline: {
            fontSize: 12,
            itemPaddingBottom: 78,
          },
          Pagination: {
            fontSizeSM: 12,
            itemSizeSM: 22,
          },
          DatePicker:{
            controlHeightSM: 28,
            contentFontSizeSM: 12,
          }
          
        },
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/newfile" element={<NewGetFile />}></Route>
            <Route path="*" element={<NotFoundPage />} />

            {/* <Route path="/" element={<HomePage />}>
              <Route path="/" element={<FrontMainPage />} />
              <Route path="/contact" element={<div>Contact</div>} />
            </Route> */}

            <Route path="/" element={<HomePageFile />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contact" element={<div>Contact</div>} />
            </Route>

            <Route path="/erp" element={<MainLoginRouter />}>
              <Route path="login" element={<Login />} />
              <Route
                path="setpassword/:userid/thankyou"
                element={<PaswordUpdateMessage />}
              />
              <Route path="signup" element={<SignUp />} />
              <Route path="otp" element={<OtpPage />} />
              <Route path="forgetotp" element={<ForgetOtpPage />} />
              <Route path="forgetpassword" element={<ForgetPassword />} />.
              <Route path="change" element={<ChangePassword />} />
              <Route
                path="setpassword/:userid"
                element={<SetNewPasswordPage />}
              />
            </Route>

            <Route
              path="/erp"
              element={authStatus ? <MainPage /> : <Navigate to="/erp/login" />}
            >
              <Route path=":userid/dashboard" element={<DashBoard />}>
                <Route path="users" element={<DisplayDashboardUser />} />
                <Route
                  path="users/:leadid/history"
                  element={<SingleUserHistory />}
                />
                <Route path="tickets" element={<AllTickets />} />
                <Route path="manager" element={<AllManagerApprovals />} />
                <Route path="muiuser" element={<DisplayUserTwo />} />
                <Route
                  path="users/deactivateUser"
                  element={<AllDeactivateUser />}
                />
                {/* <Route path="records" element={<MainGraphPage />} /> */}
                <Route path="records" element={<GraphMainPage />} />
              </Route>

              {/* hr module routes */}
              <Route path="/erp/:userid/hr" element={<HRMod />}>
                <Route path="userlist" element={<HrUserList />} />
                <Route path="approveUser" element={<HRApprovalList />} />
                <Route path="userservice" element={<UserService />} />
                <Route path="userservice/:serviceid" element={<UserRating />} />
                <Route path="hrlinkfour" element={<div>hrlinkfour</div>} />
                <Route path="hrlinkfive" element={<div>hrlinkfive</div>} />
                <Route path="hrlinksix" element={<div>hrlinksix</div>} />
              </Route>
              {/* end */}
              <Route path="/erp/:userid/compliance" element={<Compliances />} />
              {/* sales module routes */}
              <Route path="/erp/:userid/sales" element={<SalesMod />}>
                <Route path="inbox" element={<InboxPage />} />
                <Route path="scalaton" element={<TableScalaton />} />
                {/* <Route path=":id" element={<LeadDetailsPage />} /> */}

                <Route path="oppurtities" element={<Opportunities />} />
                {/* <Route path="company" element={<MainCompanyPage />} /> */}
                <Route path="company" element={<MainComanyModule/>} />
                <Route path="project" element={<ProjectPage />} />
                <Route path="vendors-request" element={<VendorsRequestList />} />
                <Route
                  path="lead-form"
                  element={<CompanyForm/>}
                />
                <Route
                  path="company/:companyId/details"
                  element={<CompanyPageLayout />}
                />
                <Route path="estimate" element={<Estimate />} />
                <Route path="orders" element={<OrdersModule />} />
                <Route path="leads/:leadid" element={<LeadDetailsPage />} />
                <Route
                  path="leads/:leadid/estimate"
                  element={<EstimateCreatePage />}
                />
                <Route path="contacts" element={<ContactModule />} />
                <Route path="leads/:leadid/history" element={<LeadHistory />} />
                <Route path="leads" element={<LeadsModule />} />
                <Route path="leads/allTask" element={<GetAllTaskList />} />
                <Route
                  path="leads/notification"
                  element={<AllNotificationPage />}
                />
              </Route>
              {/* end */}
              {/* accounts module routes */}
              <Route path="/erp/:userid/account" element={<Accounts />}>
                {/* <Route path="accountlist" element={<AccountsList />} /> */}
                {/* <Route path="companyForm" element={<CompanyForm />} /> */}
                <Route
                  path="companyForm"
                  element={<MainCompanyFormPage role={"sales"} />}
                />
                <Route
                  path="accounttwo"
                  element={<div>account second page</div>}
                />
                <Route
                  path="accountthird"
                  element={<div>account third page</div>}
                />
                <Route
                  path="accountforth"
                  element={<div>account forth page</div>}
                />
                <Route
                  path="accountfive"
                  element={<div>Account five page</div>}
                />
                <Route
                  path="accountsix"
                  element={<div>Account six page</div>}
                />
              </Route>
              {/* end */}
              {/* operation module Routes */}
              <Route path="/erp/:userid/operation" element={<ComingSoonPage />}>
                <Route path="" element={<div>Operation Number one </div>} />
                <Route
                  path="operationtwo"
                  element={<div>Operation Number Two</div>}
                />
                <Route
                  path="operationthree"
                  element={<div>Operation Number Three</div>}
                />
                <Route
                  path="operationfour"
                  element={<div>Operation Number Four</div>}
                />
                <Route
                  path="operationfive"
                  element={<div>Operation Number Five</div>}
                />
                <Route
                  path="operationsix"
                  element={<div>Operation Number Six</div>}
                />
              </Route>
              {/* end */}
              {/* manage client module route */}
              <Route
                path="/erp/:userid/manageclient"
                element={<ComingSoonPage />}
              >
                <Route path="" element={<div>Client Number One</div>} />
                <Route
                  path="clienttwo"
                  element={<div>Client Number Two</div>}
                />
                <Route
                  path="clientthree"
                  element={<div>Client Number Three</div>}
                />
                <Route
                  path="clientfour"
                  element={<div>Client Number Four</div>}
                />
                <Route
                  path="clientfive"
                  element={<div>Client Number Five</div>}
                />
                <Route
                  path="clientsix"
                  element={<div>Client Number Six</div>}
                />
              </Route>
              {/* end */}
              {/* Activity Master module routes */}
              <Route path="/erp/:userid/activity" element={<ComingSoonPage />}>
                <Route path="" element={<div>Activity Number One</div>} />
                <Route
                  path="activitytwo"
                  element={<div>Activity Number Two</div>}
                />
                <Route
                  path="activitythree"
                  element={<div>Activity Number Three</div>}
                />
                <Route
                  path="activityfour"
                  element={<div>Activity Number Four</div>}
                />
                <Route
                  path="activityfive"
                  element={<div>Activity Number Five</div>}
                />
                <Route
                  path="activitysix"
                  element={<div>Activity Number Six</div>}
                />
              </Route>
              {/* end */}
              {/* quality module routes */}
              <Route path="/erp/:userid/quality" element={<QualityModule />}>
                <Route path="ivr" element={<IVR />} />
                <Route
                  path="qualitytwo"
                  element={<div>Quality Number Two</div>}
                />
                <Route
                  path="qualitythree"
                  element={<div>Quality Number Three</div>}
                />
                <Route
                  path="qualityfour"
                  element={<div>Quality Number Four</div>}
                />
                <Route
                  path="qualityfive"
                  element={<div>Quality Number Five</div>}
                />
                <Route
                  path="qualitysix"
                  element={<div>Quality Number Six</div>}
                />
              </Route>
              {/* end */}

              {/* Industry route */}
              <Route path="/erp/:userid/industries" element={<Industry />}>
                <Route path="industryData" element={<IndustryData />} />
                <Route path="subindustry" element={<SubIndustry />} />
                <Route path="subsubindustry" element={<SubsubIndustry />} />
                <Route path="industry" element={<Industries />} />
              </Route>

              {/* end */}

              {/* Vebdors Url */}
              <Route path="/erp/:userid/vendors" element={<VendorsList />} />

              {/* end */}

              <Route path="/erp/:userid/setting" element={<SettingMainPage />}>
                <Route path="leadStatus" element={<LeadStatusPage />} />
                <Route path="products" element={<ProductsChange />} />
                <Route path="category" element={<LeadCategory />} />
                <Route path="slug" element={<SlugCreate />} />
                <Route path="urls" element={<UrlsPage />} />
                <Route
                  path="comments"
                  element={
                    <Suspense fallback={<SpinLoading />}>
                      <Comments />
                    </Suspense>
                  }
                />
                <Route
                  path="desigination"
                  element={
                    <Suspense fallback={<SpinLoading />}>
                      <Desigination />
                    </Suspense>
                  }
                />
                <Route
                  path="department"
                  element={
                    <Suspense fallback={<SpinLoading />}>
                      <Department />
                    </Suspense>
                  }
                />
                <Route
                  path="ipaddress"
                  element={
                    <Suspense fallback={<SpinLoading />}>
                      <IpAddress />
                    </Suspense>
                  }
                />
                <Route
                  path="procurement"
                  element={
                    <Suspense fallback={<SpinLoading />}>
                      <Procurement />
                    </Suspense>
                  }
                />
                <Route
                  path="clientDesigination"
                  element={
                    <Suspense fallback={<SpinLoading />}>
                      <ClientDesigination />
                    </Suspense>
                  }
                />
              </Route>

              {/* profile routes */}
              <Route path="/erp/:userid/profile" element={<ComingSoonPage />}>
                <Route path="" element={<div>Profile Number One</div>} />
                <Route
                  path="profiletwo"
                  element={<div>Profile Number Two</div>}
                />
                <Route
                  path="profilethree"
                  element={<div>Profile Number Three</div>}
                />
                <Route
                  path="profilefour"
                  element={<div>Profile Number Four</div>}
                />
              </Route>
              {/* end */}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  )
}

export default App
