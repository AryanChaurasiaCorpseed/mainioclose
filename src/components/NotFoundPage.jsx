import React from "react"
import "./NotFoundPage.scss"
import { Link } from "react-router-dom"
import { Button, Result } from "antd"

const NotFoundPage = () => {
  return (
    <>
      {/* <div className="flex-container">
        <div className="text-center">
          <h1>
            <span className="fade-in" id="digit1">
              4
            </span>
            <span className="fade-in" id="digit2">
              0
            </span>
            <span className="fade-in" id="digit3">
              4
            </span>
          </h1>
          <h3 className="fadeIn">PAGE NOT FOUND</h3>
          <Link to='/' className="found-btn">
            Return To Home
          </Link>
        </div>
      </div>
      <div className="flex-container">
        <div className="text-center">
          <h1>
            <span className="fade-in" id="digit1">
              4
            </span>
            <span className="fade-in" id="digit2">
              0
            </span>
            <span className="fade-in" id="digit3">
              4
            </span>
          </h1>
          <h3 className="fadeIn">PAGE NOT FOUND</h3> 
        </div>
      </div> */}
      <div className="container-page">
        <img src="https://www.corpseed.com/assets/img/brands/CORPSEED.webp" alt="corpseed" />
      </div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </>
  )
}

export default NotFoundPage
