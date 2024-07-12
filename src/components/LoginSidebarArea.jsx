import React from "react"
import "./LoginSidebarArea.scss"

const LoginSidebarArea = () => {
  return (
    <div className="bg-image-logo">
      <div className="content-container">
        <div className="heading-container">
          <h2 className="h-one">
            {/* Sell, market, and service 
          with the <span>world's #1 CRM.</span> */}
            Empower Your Business
          </h2>
          <h2 className="h-one">with Our Comprehensive ERP Solution</h2>
        </div>
        <div className="sub-content">
          <p className="side-paraa">
            Optimize, streamline, and grow with our advanced ERP solution.
            Welcome to the future of business management. Our state-of-the-art
            ERP platform empowers you to integrate and automate your core
            business processes, putting efficiency and accuracy at the heart of
            your operations.
          </p>
        </div>
      </div>
      <div className="landing-img">
        {/* <img src="https://img.freepik.com/premium-photo/business-people-using-laptop-with-document-management-erp-enterprise-resource-planning-conceptenterprise-resource-management-erp-software-system-business-resources-plan-presented_162459-4032.jpg?w=996" /> */}
      </div>
    </div>
  )
}

export default LoginSidebarArea
