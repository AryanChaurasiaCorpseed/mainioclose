import React, { useCallback, useEffect, useRef, useState } from "react"
import "./SideBar.scss"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutFun } from "../Toolkit/Slices/AuthSlice"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Avatar, Button, Popover, Space } from "antd"
import axios from "axios"
import {
  getUserProfilePhoto,
  updateProfilePhoto,
} from "../Toolkit/Slices/UserProfileSlice"
import ProfileDrawer from "../components/ProfileDrawer"
toast.configure()

const SideBar = () => {
  const dispatch = useDispatch()
  const { userid } = useParams()
  const navigate = useNavigate()
  const currentRoles = useSelector((state) => state?.auth?.roles)
  const currentUserDetail = useSelector(
    (state) => state.auth.getDepartmentDetail
  )
  const adminRole = currentRoles?.includes("ADMIN")
  const hrRole = currentRoles?.includes("HR")
  const currentUserId = useSelector((state) => state.auth?.currentUser?.id)
  function getHighestPriorityRole(roles) {
    if (roles.includes("ADMIN")) {
      return "ADMIN"
    }
  }

  useEffect(() => {
    if (currentUserId !== undefined) {
      dispatch(getUserProfilePhoto(currentUserId))
    }
  }, [currentUserId])



  return (
    <div className="sideTab">
      <ProfileDrawer />
      <div className="pt-4">
        <div className="side-tabs">
          <NavLink
            to={`/erp/${userid}/users`}
            className={`nav-heading ${({ isActive }) =>
              isActive ? "linkactive" : ""}`}
            data-toggle="collapse"
            data-target={`#collapseDashboardModule`}
            aria-expanded="true"
            aria-controls="collapseDashboardModule"
          >
            <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
            <i className="fa-solid fa-house"></i> Dashboard
          </NavLink>
          <div
            id={`collapseDashboardModule`}
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="link-child">
              {getHighestPriorityRole(currentRoles) !== "ADMIN" ? (
                <>
                  <NavLink
                    className="link-itemss"
                    to={`${userid}/users/tickets`}
                  >
                    Tickets
                  </NavLink>
                  <NavLink
                    className="link-itemss"
                    to={`${userid}/users/manager`}
                  >
                    Approval
                  </NavLink>
                </>
              ) : getHighestPriorityRole(currentRoles) !== "ADMIN" &&
                currentUserDetail?.department === "HR" ? (
                <>
                  <NavLink className="link-itemss" to={`${userid}/users`}>
                    Users
                  </NavLink>
                  <NavLink
                    className="link-itemss"
                    to={`${userid}/users/tickets`}
                  >
                    Tickets
                  </NavLink>
                  <NavLink
                    className="link-itemss"
                    to={`${userid}/users/manager`}
                  >
                    Approval
                  </NavLink>
                </>
              ) : getHighestPriorityRole(currentRoles) === "ADMIN" ? (
                <>
                  <NavLink className="link-itemss" to={`${userid}/users`}>
                    Users
                  </NavLink>
                  <NavLink
                    className="link-itemss"
                    to={`${userid}/users/tickets`}
                  >
                    Tickets
                  </NavLink>
                  <NavLink
                    className="link-itemss"
                    to={`${userid}/users/manager`}
                  >
                    Approval
                  </NavLink>
                </>
              ) : (
                ""
              )}

              {/* <NavLink className="link-itemss" to={`${userid}/muiuser`}>
              mui users
            </NavLink> */}
              {/* <NavLink className="link-itemss" to="hr/hrlinktwo">
              HR Second
            </NavLink>
            <NavLink className="link-itemss" to="hr/hrlinkthree">
              HR Third
            </NavLink>
            <NavLink className="link-itemss" to="hr/hrlinkfour">
              HR Forth
            </NavLink>
            <NavLink className="link-itemss" to="hr/hrlinkfive">
              HR Fifth
            </NavLink>
            <NavLink className="link-itemss" to="hr/hrlinksix">
              HR Six
            </NavLink> */}
            </div>
          </div>
        </div>

        {/*  */}

        {/* <div className="side-tabs">
        <NavLink
          to={`/erp/${userid}`}
          className={`nav-heading ml-3`}
          data-toggle="collapse"
          data-target={`#collapseOne`}
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <i className="fa-solid mr-2 fa-gear"></i> DashBoard
        </NavLink>
        
      </div> */}
        {/* end */}

        {/* sales links start */}

        {(currentUserDetail?.department === "Sales" ||
          currentUserDetail?.department === "Quality") &&
        getHighestPriorityRole(currentRoles) !== "ADMIN" ? (
          <div className="side-tabs">
            <NavLink
              to={`/erp/${userid}/sales/leads`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
              data-toggle="collapse"
              data-target={`#collapseSalesModule`}
              aria-expanded="true"
              aria-controls="collapseSalesModule"
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-regular mr-2 fa-rectangle-list"></i> Sales
            </NavLink>
            <div
              id={`collapseSalesModule`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="link-child">
                {currentUserDetail?.department == "Sales" &&
                getHighestPriorityRole(currentRoles) !== "ADMIN" ? (
                  <>
                    <NavLink
                      className="link-itemss"
                      to={`${userid}/sales/leads`}
                    >
                      <i className="fa-solid mr-1 fa-calculator"></i>
                      <span>Leads</span>
                    </NavLink>
                    <NavLink className="link-itemss" to={`${userid}/sales`}>
                      <i className="fa-solid mr-1 fa-inbox"></i>
                      <span>Inbox</span>
                    </NavLink>
                    <NavLink
                      className="link-itemss"
                      to={`${userid}/sales/company`}
                    >
                      <i className="fa-regular fa-building"></i>
                      <span>Company</span>
                    </NavLink>
                    <NavLink
                      className="link-itemss"
                      to={`${userid}/sales/project`}
                    >
                      <i className="fa-regular fa-building"></i>
                      <span>Project</span>
                    </NavLink>
                  </>
                ) : currentUserDetail?.department == "Quality" &&
                  getHighestPriorityRole(currentRoles) !== "ADMIN" ? (
                  <>
                    <NavLink
                      className="link-itemss"
                      to={`${userid}/sales/leads`}
                    >
                      <i className="fa-solid mr-1 fa-calculator"></i>
                      <span>Leads</span>
                    </NavLink>
                    <NavLink className="link-itemss" to={`${userid}/sales`}>
                      <i className="fa-solid mr-1 fa-inbox"></i>
                      <span>Inbox</span>
                    </NavLink>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : getHighestPriorityRole(currentRoles) === "ADMIN" ? (
          <div className="side-tabs">
            <NavLink
              to={`/erp/${userid}/sales/leads`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
              data-toggle="collapse"
              data-target={`#collapseSalesModule`}
              aria-expanded="true"
              aria-controls="collapseSalesModule"
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-regular mr-2 fa-rectangle-list"></i> Sales
            </NavLink>
            <div
              id={`collapseSalesModule`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="link-child">
                <NavLink className="link-itemss" to={`${userid}/sales/leads`}>
                  <i className="fa-solid mr-1 fa-calculator"></i>
                  <span>Leads</span>
                </NavLink>
                <NavLink
                  className="link-itemss"
                  to={`${userid}/sales/contacts`}
                >
                  <i className="fa-solid mr-1 fa-user"></i>
                  <span>Contacts</span>
                </NavLink>

                <NavLink className="link-itemss" to={`${userid}/sales`}>
                  <i className="fa-solid mr-1 fa-inbox"></i>
                  <span>Inbox</span>
                </NavLink>

                <NavLink className="link-itemss" to={`${userid}/sales/company`}>
                  <i className="fa-regular fa-building"></i>
                  <span>Company</span>
                </NavLink>
                <NavLink className="link-itemss" to={`${userid}/sales/project`}>
                  <i className="fa-regular fa-building"></i>
                  <span>Project</span>
                </NavLink>

                {/* <NavLink
                className="link-itemss"
                to={`${userid}/sales/oppurtities`}
              >
                <i className="fa-solid mr-1 fa-trophy"></i><span>Oppurtities</span>
              </NavLink>
                <NavLink className="link-itemss" to="sales/estimate">
                <i className="fa-solid mr-1 fa-file-lines"></i><span>Estimate</span>
              </NavLink>
                <NavLink className="link-itemss" to="sales/orders">
                <i className="fa-solid mr-1 fa-box"></i>Orders
              </NavLink> */}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {getHighestPriorityRole(currentRoles) !== "ADMIN" &&
        currentUserDetail?.department === "Sales" ? (
          <div className="side-tabs">
            <NavLink
              to={`/erp/${userid}/compliance`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
              // data-toggle="collapse"
              // data-target={`#collapseHrModule`}
              // aria-expanded="true"
              // aria-controls="collapseHrModule"
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-solid mr-2 fa-clipboard-check"></i> Compliances
            </NavLink>
          </div>
        ) : getHighestPriorityRole(currentRoles) === "ADMIN" ? (
          <div className="side-tabs">
            <NavLink
              to={`${userid}/compliance`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
              // data-toggle="collapse"
              // data-target={`#collapseHrModule`}
              // aria-expanded="true"
              // aria-controls="collapseHrModule"
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-solid mr-2 fa-clipboard-check"></i> Compliances
            </NavLink>
          </div>
        ) : (
          ""
        )}

        {/* end */}

        {/* hr links start */}

        {getHighestPriorityRole(currentRoles) !== "ADMIN" &&
        currentUserDetail?.department === "HR" ? (
          <div className="side-tabs">
            <NavLink
              to={`/erp/${userid}/hr`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
              data-toggle="collapse"
              data-target={`#collapseHrModule`}
              aria-expanded="true"
              aria-controls="collapseHrModule"
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-solid mr-2 fa-gear"></i> HR
            </NavLink>
            <div
              id={`collapseHrModule`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="link-child">
                <NavLink className="link-itemss" to={`/erp/${userid}/hr`}>
                  User list
                </NavLink>

                <NavLink
                  className="link-itemss"
                  to={`/erp/${userid}/hr/approveUser`}
                >
                  Approval list
                </NavLink>
              </div>
            </div>
          </div>
        ) : getHighestPriorityRole(currentRoles) === "ADMIN" ? (
          <div className="side-tabs">
            <NavLink
              to={`/erp/${userid}/hr`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
              data-toggle="collapse"
              data-target={`#collapseHrModule`}
              aria-expanded="true"
              aria-controls="collapseHrModule"
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-solid mr-2 fa-gear"></i> HR
            </NavLink>
            <div
              id={`collapseHrModule`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="link-child">
                <NavLink className="link-itemss" to={`/erp/${userid}/hr`}>
                  User list
                </NavLink>

                <NavLink
                  className="link-itemss"
                  to={`/erp/${userid}/hr/approveUser`}
                >
                  Approval list
                </NavLink>

                <NavLink
                  className="link-itemss"
                  to={`/erp/${userid}/hr/userservice`}
                >
                  Rating list
                </NavLink>
              </div>
              {/* <div className="link-child">
            <NavLink className="link-itemss" to="hr">
              HR First
            </NavLink>
            <NavLink className="link-itemss" to="hr/hrlinktwo">
              HR Second
            </NavLink>
            <NavLink className="link-itemss" to="hr/hrlinkthree">
              HR Third
            </NavLink>
            <NavLink className="link-itemss" to="hr/hrlinkfour">
              HR Forth
            </NavLink>
            <NavLink className="link-itemss" to="hr/hrlinkfive">
              HR Fifth
            </NavLink>
            <NavLink className="link-itemss" to="hr/hrlinksix">
              HR Six
            </NavLink>
          </div> */}
            </div>
          </div>
        ) : (
          ""
        )}

        {/* end */}

        {/* accounts links start */}
        {currentUserDetail?.department === "Accounts" &&
        getHighestPriorityRole(currentRoles) === "ADMIN" ? (
          <div className="side-tabs">
            <NavLink
              to={`/erp/${userid}/account`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
              data-toggle="collapse"
              data-target={`#collapseAccountModule`}
              aria-expanded="true"
              aria-controls="collapseAccountModule"
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-solid fa-money-check-dollar"></i> Accounts
            </NavLink>
            <div
              id={`collapseAccountModule`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="link-child">
                <NavLink className="link-itemss" to={`/erp/${userid}/account`}>
                  Accounts list
                </NavLink>
              </div>
            </div>
          </div>
        ) : getHighestPriorityRole(currentRoles) === "ADMIN" ? (
          <div className="side-tabs">
            <NavLink
              to={`/erp/${userid}/account`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
              data-toggle="collapse"
              data-target={`#collapseAccountModule`}
              aria-expanded="true"
              aria-controls="collapseAccountModule"
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-solid fa-money-check-dollar"></i> Accounts
            </NavLink>
            <div
              id={`collapseAccountModule`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="link-child">
                <NavLink className="link-itemss" to={`/erp/${userid}/account`}>
                  Accounts List
                </NavLink>
                {/* <NavLink className="link-itemss" to="account/accounttwo">
                Account Link 2
              </NavLink>
              <NavLink className="link-itemss" to="account/accountthird">
                Account Link 3
              </NavLink>
              <NavLink className="link-itemss" to="account/accountforth">
                Account Link 4
              </NavLink>
              <NavLink className="link-itemss" to="account/accountfive">
                Account Link 5
              </NavLink>
              <NavLink className="link-itemss" to="account/accountsix">
                Account Link 6
              </NavLink> */}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* end */}

        {/* operations links start */}
        {/* <div className="side-tabs">
          <NavLink
            to={`/erp/${userid}/operation`}
            className={`nav-heading ${({ isActive }) =>
              isActive ? "linkactive" : ""}`}
            data-toggle="collapse"
            data-target={`#collapseOperationModule`}
            aria-expanded="true"
            aria-controls="collapseOperationModule"
          >
            <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
            <i className="fa-solid fa-gears"></i> Operations
          </NavLink>
          <div
            id={`collapseOperationModule`}
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="link-child">
              <NavLink className="link-itemss" to="operation">
                Operation Link 1
              </NavLink>
              <NavLink className="link-itemss" to="operation/operationtwo">
                Operation Link 2
              </NavLink>
              <NavLink className="link-itemss" to="operation/operationthree">
                Operation Link 3
              </NavLink>
              <NavLink className="link-itemss" to="operation/operationfour">
                Operation Link 4
              </NavLink>
              <NavLink className="link-itemss" to="operation/operationfive">
                Operation Link 5
              </NavLink>
              <NavLink className="link-itemss" to="operation/operationsix">
                Operation Link 6
              </NavLink>
            </div>
          </div>
        </div> */}
        {/* end */}

        {/* Manage Clinets links start */}
        {/* <div className="side-tabs">
          <NavLink
            to={`/erp/${userid}/manageclient`}
            className={`nav-heading ${({ isActive }) =>
              isActive ? "linkactive" : ""}`}
            data-toggle="collapse"
            data-target={`#collapseManageClientModule`}
            aria-expanded="true"
            aria-controls="collapseManageClientModule"
          >
            <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
            <i className="fa-solid fa-people-arrows"></i> Manage Clients
          </NavLink>
          <div
            id={`collapseManageClientModule`}
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="link-child">
              <NavLink className="link-itemss" to="manageclient">
                {" "}
                Manage Client 1
              </NavLink>
              <NavLink className="link-itemss" to="manageclient/clienttwo">
                Manage Client 2
              </NavLink>
              <NavLink className="link-itemss" to="manageclient/clientthree">
                Manage Client 3
              </NavLink>
              <NavLink className="link-itemss" to="manageclient/clientfour">
                Manage Client 4
              </NavLink>
              <NavLink className="link-itemss" to="manageclient/clientfive">
                Manage Client 5
              </NavLink>
              <NavLink className="link-itemss" to="manageclient/clientsix">
                Manage Client 6
              </NavLink>
            </div>
          </div>
        </div> */}
        {/* end */}

        {/* activity Master links start */}
        {/* <div className="side-tabs">
          <NavLink
            to={`/erp/${userid}/activity`}
            className={`nav-heading ${({ isActive }) =>
              isActive ? "linkactive" : ""}`}
            data-toggle="collapse"
            data-target={`#collapseActivityMasterModule`}
            aria-expanded="true"
            aria-controls="collapseActivityMasterModule"
          >
            <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
            <i className="fa-solid mr-2 fa-user-group"></i> Activity Master
          </NavLink>
          <div
            id={`collapseActivityMasterModule`}
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="link-child">
              <NavLink className="link-itemss" to="activity">
                Activity Link 1
              </NavLink>
              <NavLink className="link-itemss" to="activity/activitytwo">
                Activity Link 2
              </NavLink>
              <NavLink className="link-itemss" to="activity/activitythree">
                Activity Link 3
              </NavLink>
              <NavLink className="link-itemss" to="activity/activityfour">
                Activity Link 4
              </NavLink>
              <NavLink className="link-itemss" to="activity/activityfive">
                Activity Link 5
              </NavLink>
              <NavLink className="link-itemss" to="activity/activitysix">
                Activity Link 6
              </NavLink>
            </div>
          </div>
        </div> */}
        {/* end */}

        {/* Quality links start */}
        {currentUserDetail?.department === "Quality" &&
        getHighestPriorityRole(currentRoles) !== "ADMIN" ? (
          <div className="side-tabs">
            <NavLink
              to={`/erp/${userid}/quality`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
              data-toggle="collapse"
              data-target={`#collapseQualityModule`}
              aria-expanded="true"
              aria-controls="collapseQualityModule"
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-solid fa-filter"></i> Quality
            </NavLink>
            <div
              id={`collapseQualityModule`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="link-child">
                <NavLink className="link-itemss" to={`${userid}/quality`}>
                  {" "}
                  IVR
                </NavLink>
                {/* <NavLink className="link-itemss" to="quality/qualitytwo">
                Quality Link 2
              </NavLink>
              <NavLink className="link-itemss" to="quality/qualitythree">
                Quality Link 3
              </NavLink>
              <NavLink className="link-itemss" to="quality/qualityfour">
                Quality Link 4
              </NavLink>
              <NavLink className="link-itemss" to="quality/qualityfive">
                Quality Link 5
              </NavLink>
              <NavLink className="link-itemss" to="quality/qualitysix">
                Account Link 6
              </NavLink> */}
              </div>
            </div>
          </div>
        ) : getHighestPriorityRole(currentRoles) === "ADMIN" ? (
          <div className="side-tabs">
            <NavLink
              to={`/erp/${userid}/quality`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
              data-toggle="collapse"
              data-target={`#collapseQualityModule`}
              aria-expanded="true"
              aria-controls="collapseQualityModule"
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-solid fa-filter"></i> Quality
            </NavLink>
            <div
              id={`collapseQualityModule`}
              className="collapse"
              aria-labelledby="headingOne"
              data-parent="#accordion"
            >
              <div className="link-child">
                <NavLink className="link-itemss" to={`${userid}/quality`}>
                  {" "}
                  IVR
                </NavLink>
                {/* <NavLink className="link-itemss" to="quality/qualitytwo">
                Quality Link 2
              </NavLink>
              <NavLink className="link-itemss" to="quality/qualitythree">
                Quality Link 3
              </NavLink>
              <NavLink className="link-itemss" to="quality/qualityfour">
                Quality Link 4
              </NavLink>
              <NavLink className="link-itemss" to="quality/qualityfive">
                Quality Link 5
              </NavLink>
              <NavLink className="link-itemss" to="quality/qualitysix">
                Account Link 6
              </NavLink> */}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {getHighestPriorityRole(currentRoles) === "ADMIN" && (
          <div className="side-tabs">
            <NavLink
              to={`/erp/${userid}/setting`}
              className={`nav-heading ${({ isActive }) =>
                isActive ? "linkactive" : ""}`}
            >
              <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
              <i className="fa-regular mr-2 fa-user"></i> Setting
            </NavLink>
          </div>
        )}

        {/* end */}

        {/* Profile links start */}
        {/* <div className="side-tabs">
          <NavLink
            to={`/erp/${userid}/profile`}
            className={`nav-heading ${({ isActive }) =>
              isActive ? "linkactive" : ""}`}
            data-toggle="collapse"
            data-target={`#collapseProfileModule`}
            aria-expanded="true"
            aria-controls="collapseProfileModule"
          >
            <i className="fa-solid mr-1 fa-angle-right"></i>{" "}
            <i className="fa-regular mr-2 fa-user"></i> Profile
          </NavLink>
          <div
            id={`collapseProfileModule`}
            className="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
          >
            <div className="link-child">
              <NavLink className="link-itemss" to="profile">
                Profile Link 1
              </NavLink>
              <NavLink className="link-itemss" to="profile/profiletwo">
                Profile Link 2
              </NavLink>
              <NavLink className="link-itemss" to="profile/profilethree">
                Profile Link 3
              </NavLink>
              <NavLink className="link-itemss" to="profile/profilefour">
                Profile Link 4
              </NavLink>
            </div>
          </div>
        </div> */}
        {/* end */}
      </div>
    </div>
  )
}

export default SideBar
