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
import CompDetails from "./Main/Sales/company/CompDetails"
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
const SpinLoading = lazy(() => import("./components/SpinLoading"))

function App() {
  const authStatus = useSelector((state) => state.auth.isAuth)
  const authRoles = useSelector((state) => state.auth.roles)

  console.log("ckjvhjdhgich", authRoles)

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          colorBorder: "#cccccc",
        },
        components: {
          Card: {
            actionsLiMargin: 6,
          },
          Typography: {
            fontSize: 13,
          },
          Button: {
            contentFontSize: 13,
            contentFontSizeSM: 12,
          },
          Popconfirm: {
            fontSize: 13,
          },
        },
      }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/newfile" element={<NewGetFile />}></Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />}>
              <Route path="/" element={<FrontMainPage />} />
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
              <Route path=":userid/users" element={<DashBoard />}>
                <Route path="" element={<DisplayDashboardUser />} />
                <Route path=":userid/history" element={<SingleUserHistory />} />
                <Route path="tickets" element={<AllTickets />} />
                <Route path="manager" element={<AllManagerApprovals />} />
                <Route path="muiuser" element={<DisplayUserTwo />} />
                <Route path="deactivateUser" element={<AllDeactivateUser />} />
              </Route>
              {/* hr module routes */}
              <Route path="/erp/:userid/hr" element={<HRMod />}>
                <Route path="" element={<HrUserList />} />
                <Route path="approveUser" element={<HRApprovalList />} />
                <Route path="userservice" element={<UserService />} />
                <Route path="userservice/:serviceid" element={<UserRating />} />
                <Route path="hrlinkfour" element={<div>hrlinkfour</div>} />
                <Route path="hrlinkfive" element={<div>hrlinkfive</div>} />
                <Route path="hrlinksix" element={<div>hrlinksix</div>} />
              </Route>
              {/* end */}
              <Route path="/erp/:userid/compliance" element={<Compliances />} />
              {/* slaes module routes */}
              <Route path="/erp/:userid/sales" element={<SalesMod />}>
                <Route path="" element={<InboxPage />} />
                <Route path="scalaton" element={<TableScalaton />} />
                {/* <Route path=":id" element={<LeadDetailsPage />} /> */}

                <Route path="oppurtities" element={<Opportunities />} />
                <Route path="company" element={<MainCompanyPage />} />
                <Route path="project" element={<ProjectPage />} />
                <Route
                  path="company/:companyId/details"
                  element={<CompDetails />}
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
                <Route path="" element={<AccountsList />} />
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
                <Route path="" element={<IVR />} />
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
              <Route path="/erp/:userid/setting" element={<SettingMainPage />}>
                <Route path="" element={<LeadStatusPage />} />
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
