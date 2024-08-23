import React from "react"
import "./HeroSection.scss"
import sideImage from "../Images/homePic.png"
import SectionSaprater from "../components/design/SectionSaprater"
import HomeImageComp from "../components/HomeImageComp"
import HomeTextComp from "../components/HomeTextComp"
import homeImg from '../Images/erpImg.jpg'
import erp from '../Images/ERP2.png'

const HeroSection = () => (
  // <div className="container hero-section home-section-padding">
  //   <div className="right-section">
  //     <div className="hero-text">
  //       <h3 className="small-head">Your Trusted ERP Partner</h3>
  //       <h2 className="big-head">
  //         Transforming <br /> CA & CS <br /> Management
  //       </h2>
  //     </div>
  //     <div className="hero-button">
  //       <button className="left-btn">Start Now - It's Free</button>
  //       <button className="right-btn">
  //         Talk to Expert <i className="fa-solid fa-arrow-right"></i>
  //       </button>
  //     </div>
  //     <p className="forever-text">
  //       <span className="text-blue">Free,</span> forever, with one users. No
  //       card required.
  //     </p>
  //   </div>
  //   <div>
  //     <div className="left-image-box">
  //       <img src={sideImage} />
  //     </div>
  //   </div>
  // </div>

  <SectionSaprater>
    <div className="d-flex home-hero container">
      <div className="row">
        <div className="hero-text col-md-7">
          <h2 className="large-text">
            Low-code-based ERP <br />
            alternative: <span>Efficient. </span>
          </h2>
          <p className="hero-para">
            Craft custom ERP solutions to mirror your organization's unique
            processes, manage efficiently, automate seamlessly, and integrate
            effortlessly—all while maintaining cost control and transparency,
            with no hidden expenses.
          </p>
          <button className="tell-us-btn">Book a Free Demo</button>
          <ul className="mt-4 list-data">
            <li>
              <i className="fa-regular mr-2 fa-circle-check"></i>Highly customizable
            </li>
            <li>
              <i className="fa-regular mr-2 fa-circle-check"></i>Seamlessly connect with over 650 applications
            </li>
            <li>
              <i className="fa-regular mr-2 fa-circle-check"></i>Multi-device
              capability - Web and mobile apps
            </li>
            <li>
              <i className="fa-regular mr-2 fa-circle-check"></i>Enterprise-grade
              security - ISO/IEC 27001, SOC 2 TYPE II, GDPR
            </li>
            <li>
              <i className="fa-regular mr-2 fa-circle-check"></i>Simplified user
              governance
            </li>
          </ul>
        </div>
        <div className="hero-image col-md-5">
          <HomeImageComp
            // imageurl={`https://images.pexels.com/photos/18409224/pexels-photo-18409224/free-photo-of-glass-ceiling-over-staircase.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
            imageurl={homeImg}
            imgalt={`about image`}
            className={``}
          />
        </div>
      </div>
    </div>
  </SectionSaprater>
)

export default HeroSection
