import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import MainPage from "./Main/MainPage"
import DashBoard from "./Main/DashBoard/DashBoard"
import HRMod from "./Main/HR/HRMod"
import SalesMod from "./Main/Sales/SalesMod"
import InboxPage from "./Main/Sales/Inbox/InboxPage"
import Accounts from "./Main/Accounts/Accounts"
import Operations from "./Main/Operations/Operations"
import ManageClientModule from "./Main/ManageClients/ManageClientModule"
import ActivityMasterModule from "./Main/ActivityMaster/ActivityMasterModule"
import QualityModule from "./Main/Quality/QualityModule"
import MyProfile from "./Main/MyProfile/MyProfile"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="/" element={<DashBoard />} />
            {/* hr module routes */}
            <Route path="/hr" element={<HRMod />}>
              <Route path="" element={<div>hrlinkone</div>} />
              <Route path="hrlinktwo" element={<div>hrlinktwo</div>} />
              <Route path="hrlinkthree" element={<div>hrlinkthree</div>} />
              <Route path="hrlinkfour" element={<div>hrlinkfour</div>} />
              <Route path="hrlinkfive" element={<div>hrlinkfive</div>} />
              <Route path="hrlinksix" element={<div>hrlinksix</div>} />
            </Route>
            {/* end */}
            {/* slaes module routes */}
            <Route path="/sales" element={<SalesMod />}>
              <Route path="" element={<InboxPage />} />
              <Route path="oppurtities" element={<div>oppurtities</div>} />
              <Route path="estimate" element={<div>estimate</div>} />
              <Route path="orders" element={<div>orders</div>} />
              <Route path="contacts" element={<div>comntacts</div>} />
              <Route path="leads" element={<div>leads</div>} />
            </Route>
            {/* end */}
            {/* accounts module routes */}
            <Route path="/account" element={<Accounts />}>
              <Route path="" element={<div>accounts first page</div>} />
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
              <Route path="accountsix" element={<div>Account six page</div>} />
            </Route>
            {/* end */}
            {/* operation module Routes */}
            <Route path="/operation" element={<Operations />}>
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
            <Route path="/manageclient" element={<ManageClientModule />}>
              <Route path="" element={<div>Client Number One</div>} />
              <Route path="clienttwo" element={<div>Client Number Two</div>} />
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
              <Route path="clientsix" element={<div>Client Number Six</div>} />
            </Route>
            {/* end */}
            {/* Activity Master module routes */}
            <Route path="/activity" element={<ActivityMasterModule />}>
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
            <Route path="/quality" element={<QualityModule />}>
              <Route path="" element={<div>Quality Number One</div>} />
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
            {/* profile routes */}
            <Route path="/profile" element={<MyProfile />}>
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
  )
}

export default App
