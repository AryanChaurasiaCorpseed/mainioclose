import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../Images/CORPSEED.webp"
import img1 from "../Images/COMPLIANCE_RISK_MANAGEMENT.png"
import im2 from "../Images/COMPLIANCE_MONITORING_FRAMEWORK.png"
import img3 from "../Images/OUTSOURCE_AND_MANAGE_TASKS.png"
import img4 from "../Images/AUTOMATED_TRIGGERS_AND_ALERTS.png"
import masterImg from '../Images/ERP2.png'
// import img5 from "../Images/SECURED_CLOU_DOCUMENTS.svg"
import img6 from "../Images/COMPREHENSIV_DASHBOARDS_AND_REPORTS-01.png"
import "./LandingPage.scss"

const LandingPage = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY)
  const [visible, setVisible] = useState(true)

  const handleScroll = () => {
    const currentScrollPos = window.scrollY
    setVisible(prevScrollPos > currentScrollPos)
    setPrevScrollPos(currentScrollPos)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])
  return (
    <>
      <div id="page" class="site m-transparent-header">
        <a class="skip-link screen-reader-text" href="#primary">
          Skip to content
        </a>

        <header id="masthead" class="l-header site-header">
          <div class="l-header-inner">
            <div class="l-wrapper">
              <div class="w-100 pt2 pt3-l flex justify-start">
                <div class="l-header-logo-wrapper flex-auto relative z-9999">
                  <img
                    src={logo}
                    class="db no-lazyload"
                    alt="corpseed logo"
                    width="80px"
                    height="60px"
                  />
                </div>

                <nav
                  id="site-navigation"
                  class="l-header-nav main-navigation flex-auto flex"
                >
                  <span
                    class="menu-toggle dib pointer js-nav-btn relative z-9999"
                    aria-label="Open the menu"
                  >
                    <span class="line bg-blue" aria-hidden="true"></span>
                    <span class="line bg-blue" aria-hidden="true"></span>
                    <span class="line bg-blue" aria-hidden="true"></span>
                  </span>

                  {/* <ul
                    id="menu-main-navigation"
                    class="menu menu-main js-nav-menu"
                  >
                    <li
                      id="menu-item-12"
                      class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children submenu"
                    >
                      <a href="#" class="nav-products-link js-sub-menu-link">
                        Product Overview
                      </a>

                      <div class="sub-menu sub-menu-column-3 dn">
                        <ul class="list w-33-l pa3-l">
                          <li
                            id="menu-item-450"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <p class="list-title ttu">
                              Forecasting &amp; Purchasing
                            </p>
                          </li>

                          <li
                            id="menu-item-457"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="inventory-planning.html"
                              class="icon-sm icon-demand "
                              data-wpel-link="internal"
                            >
                              Inventory Planning
                            </a>
                          </li>
                        </ul>

                        <ul class="list w-33-l pa3-l">
                          <li
                            id="menu-item-449"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <p class="list-title ttu">Operational efficiency</p>
                          </li>

                          <li
                            id="menu-item-455"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="retail-management-software.html"
                              class="icon-sm icon-order "
                              data-wpel-link="internal"
                            >
                              Inventory &amp; Order Management
                            </a>
                          </li>

                          <li
                            id="menu-item-458"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="shipping-fulfillment-software.html"
                              class="icon-sm icon-shipping "
                              data-wpel-link="internal"
                            >
                              Shipping &amp; Fulfillment
                            </a>
                          </li>

                          <li
                            id="menu-item-466"
                            class="menu-item menu-item-type-custom menu-item-object-custom last-item"
                          >
                            <a
                              href="pos-software.html"
                              class="icon-sm icon-pos "
                              data-wpel-link="internal"
                            >
                              POS
                            </a>
                          </li>

                          <li
                            id="menu-item-459"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="warehouse-management-system.html"
                              class="icon-sm icon-warehouse "
                              data-wpel-link="internal"
                            >
                              Warehouse Management
                            </a>
                          </li>

                          <li
                            id="menu-item-465"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="retail-crm.html"
                              class="icon-sm icon-crm "
                              data-wpel-link="internal"
                            >
                              CRM
                            </a>
                          </li>
                        </ul>

                        <ul class="list w-33-l pa3-l">
                          <li
                            id="menu-item-448"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <p class="list-title ttu">Data insights</p>
                          </li>

                          <li
                            id="menu-item-463"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="retail-reporting-analytics.html"
                              class="icon-sm icon-reporting "
                              data-wpel-link="internal"
                            >
                              Retail Analytics
                            </a>
                          </li>

                          <li
                            id="menu-item-460"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="retail-accounting-software.html"
                              class="icon-sm icon-retail "
                              data-wpel-link="internal"
                            >
                              Retail Accounting
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>

                    <li
                      id="menu-item-13"
                      class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children submenu"
                    >
                      <a href="#" class="nav-services-link js-sub-menu-link">
                        Services
                      </a>

                      <ul class="sub-menu dn">
                        <li
                          id="menu-item-18"
                          class="menu-item menu-item-type-custom menu-item-object-custom"
                        >
                          <a
                            href="implementation-and-consultancy.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Implementation</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-19"
                          class="menu-item menu-item-type-custom menu-item-object-custom"
                        >
                          <a
                            href="training.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Training</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-20"
                          class="menu-item menu-item-type-custom menu-item-object-custom"
                        >
                          <a
                            href="/customer-support"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Support</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-21"
                          class="menu-item menu-item-type-custom menu-item-object-custom"
                        >
                          <a
                            href="customer-success.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Customer Success</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-480"
                          class="menu-item menu-item-type-custom menu-item-object-custom"
                        >
                          <a
                            href="flexible-infrastructure.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            Flexible Infrastructure
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li
                      id="menu-item-20"
                      class="menu-item menu-item-type-custom menu-item-object-custom"
                    >
                      <a href="pricing.html" class="nav-pricing-link ">
                        Pricing
                      </a>
                    </li>

                    <li
                      id="menu-item-14"
                      class="menu-item menu-item-type-custom menu-item-object-custom"
                    >
                      <a
                        href="app-store.html"
                        class="nav-integrations-link"
                        data-wpel-link="internal"
                      >
                        App Store
                      </a>
                    </li>

                    <li
                      id="menu-item-15"
                      class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children submenu"
                    >
                      <a
                        href="#"
                        class="nav-who-we-serve-link js-sub-menu-link"
                      >
                        Who we serve
                      </a>

                      <div class="sub-menu sub-menu-column-2 dn">
                        <ul class="list w-50-l pa3-l">
                          <li
                            id="menu-item-400"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <p class="list-title ttu">By Business Type</p>
                          </li>

                          <li
                            id="menu-item-467"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="ecommerce-management.html"
                              class=""
                              data-wpel-link="internal"
                            >
                              <span>E-Commerce Businesses</span>
                            </a>
                          </li>

                          <li
                            id="menu-item-470"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="multichannel.html"
                              class=""
                              data-wpel-link="internal"
                            >
                              <span>Multichannel Businesses</span>
                            </a>
                          </li>

                          <li
                            id="menu-item-471"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="direct-to-consumer.html"
                              class=""
                              data-wpel-link="internal"
                            >
                              <span>Direct-To-Consumer Businesses</span>
                            </a>
                          </li>

                          <li
                            id="menu-item-468"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="wholesale-management.html"
                              class=""
                              data-wpel-link="internal"
                            >
                              <span>Wholesale &amp; B2B Businesses</span>
                            </a>
                          </li>
                        </ul>

                        <ul class="list w-50-l pa3-l">
                          <li
                            id="menu-item-401"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <p class="list-title ttu">By Ecommerce Channel</p>
                          </li>

                          <li
                            id="menu-item-472"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="bigcommerce.html"
                              class=""
                              data-wpel-link="internal"
                            >
                              <span>BigCommerce Businesses</span>
                            </a>
                          </li>

                          <li
                            id="menu-item-473"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="magento.html"
                              class=""
                              data-wpel-link="internal"
                            >
                              <span>Magento Businesses</span>
                            </a>
                          </li>

                          <li
                            id="menu-item-474"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="shopify.html"
                              class=""
                              data-wpel-link="internal"
                            >
                              <span>Shopify Businesses</span>
                            </a>
                          </li>

                          <li
                            id="menu-item-475"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="amazon.html"
                              class=""
                              data-wpel-link="internal"
                            >
                              <span>Amazon Businesses</span>
                            </a>
                          </li>

                          <li
                            id="menu-item-476"
                            class="menu-item menu-item-type-custom menu-item-object-custom"
                          >
                            <a
                              href="ebay.html"
                              class=""
                              data-wpel-link="internal"
                            >
                              <span>eBay Businesses</span>
                            </a>
                          </li>

                          <li
                            id="menu-item-477"
                            class="menu-item menu-item-type-custom menu-item-object-custom last-item"
                          >
                            <a
                              href="walmart.html"
                              class=""
                              data-wpel-link="internal"
                            >
                              <span>Walmart Businesses</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>

                    <li
                      id="menu-item-16"
                      class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children submenu"
                    >
                      <a
                        href="#"
                        class="nav-why-brightpearl-link js-sub-menu-link"
                      >
                        Why Brightpearl
                      </a>

                      <ul class="sub-menu dn">
                        <li
                          id="menu-item-23"
                          class="menu-item menu-item-type-custom menu-item-object-custom"
                        >
                          <a
                            href="why-brightpearl.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Why Brightpearl</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-24"
                          class="menu-item menu-item-type-custom menu-item-object-custom"
                        >
                          <a
                            href="customer-stories.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Customer Stories</span>
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li
                      id="menu-item-17"
                      class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children submenu"
                    >
                      <a href="#" class="nav-resources-link js-sub-menu-link">
                        Resources
                      </a>

                      <ul class="sub-menu dn">
                        <li
                          id="menu-item-27"
                          class="menu-item menu-item-type-custom menu-item-object-custom"
                        >
                          <a
                            href="resource-center.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Resource Center</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-28"
                          class="menu-item menu-item-type-custom menu-item-object-custom"
                        >
                          <a
                            href="ecommerce-guides.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Guides</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-29"
                          class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home"
                        >
                          <a
                            href="blog.html"
                            class="nav-blog-link"
                            data-wpel-link="internal"
                          >
                            <span>Blog</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-30"
                          class="menu-item menu-item-type-custom menu-item-object-custom"
                        >
                          <a
                            href="press-and-media.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Press</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-31"
                          class="menu-item menu-item-type-custom menu-item-object-custom last-item"
                        >
                          <a
                            href="life-is-short-automate.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Life is Short, Let's Automate</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-32"
                          class="menu-item menu-item-type-custom menu-item-object-custom last-item"
                        >
                          <a
                            href="retales.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Re:tales Podcast</span>
                          </a>
                        </li>

                        <li
                          id="menu-item-33"
                          class="menu-item menu-item-type-custom menu-item-object-custom last-item"
                        >
                          <a
                            href="peak-season-series-2023.html"
                            class=""
                            data-wpel-link="internal"
                          >
                            <span>Peak Season Series 2023</span>
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li
                      id="menu-item-34"
                      class="menu-item menu-item-type-custom menu-item-object-custom last"
                    >
                      <a
                        href="bookdemo.html"
                        data-wpel-link="internal"
                        class="btn btn--block pv3 ph3-plus fw6 no-underline tc mt4 js-tlm-tracking"
                      >
                        Book a Demo
                      </a>
                    </li>
                  </ul> */}
                </nav>

                <div class="l-utilities-nav flex-auto center tr dn">
                  <ul class="list pl0 mv1 w-100">
                    <li class="ph3 dib">
                      {/* <a
                        href="https://login.brightpearlapp.com/"
                        id="login-btn-main"
                        class="nav-link nav-link-login no-underline"
                        data-wpel-link="external"
                        target="_blank"
                        rel="external noopener noreferrer"
                      >
                        Login
                      </a> */}
                      <Link to="/erp/login">Login</Link>
                    </li>
                    {/* <li class="pl1 dib">
                      <a
                        class="btn btn--std ph3-plus pv3 demo-btn-main js-tlm-tracking"
                        href="bookdemo.html"
                        data-wpel-link="internal"
                      >
                        Book a demo
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main id="primary" class="site-main">
          <section class="m-hero-gf m-hero-gf-home bg-black relative z-1">
            <div class="m-hero-gf-inner">
              <div class="l-wrapper mw-82 pv4 pb5-l">
                <div class="flex-l flex-row-l h-100 relative">
                  <div class="w-60-l pr5-l m-gf-hero-titles mw-700 max-w-none-l pb4 pb0-l center no-center-l">
                    <div class="title-wrapper tl">
                      <h1 class="pre-header sg-jade-light ttu title-sequel lh-copy mb2">
                        Effortless Compliance, Seamless Growth
                      </h1>

                      <h2 class="as-header-1 white pb3">
                        Navigating business approvals has never been easier.
                      </h2>

                      <div class="cms m-checks-list white">
                        <p>
                          We simplify the process of securing essential licenses
                          and permits, <strong>streamline operations</strong>,{" "}
                          <strong>handling everything </strong> from
                          <strong>application</strong> to compliance management.
                        </p>
                        <p>
                          We streamline the process of obtaining necessary
                          business approvals to ensure your operations are fully
                          compliant with regulatory requirements.
                        </p>
                        <ul>
                          <li>Focus on what you do best.</li>
                          <li>Growing your business.</li>
                          <li>Experience a hassle-free approval process.</li>
                        </ul>
                      </div>

                      {/* <div class="flex-l flex-row-l justify-between pt3-l tc tl-l">
                        <div class="w-50-l pt2">
                          <a href="#" class="btn btn--std js-form-reveal">
                            Book a free demo today
                          </a>
                        </div>

                        <div class="w-50-l tc tl-l pt3 pt2-l">
                          <img
                            src="wp-content/themes/bp-wp-2021/assets/img/sage/logo-capterra-with-score.svg"
                            alt="Capterra"
                            class="no-lazyload dib"
                            width="130"
                            height="42"
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>

                  <div class="w-40-l ph3-l mw-500 max-w-none-l center no-center-l">
                    <img
                      fetchpriority="high"
                      src={masterImg}
                      alt="Brightpearl Composite"
                      class="no-lazyload"
                      width="500"
                      height="650"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div class="l-wrapper mw-82 tc overflow-hidden pb4 pb0-l">
              <p class="intro-text sg-jade-light mb0 pb4 pb5-l">
                5,000+ pioneering brands rely on Brightpearl to grow further and
                faster
              </p>

              <ul class="m-company-logos-list m-columns-wrapper list flex flex-wrap flew-row justify-between">
                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-wild%402x.png"
                    alt="Wild"
                    class="dib"
                    width="128px"
                    height="40px"
                  />
                </li>
                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-goose-gander%402x.png"
                    alt="Goose and Gander"
                    class="dib"
                    width="128px"
                    height="20px"
                  />
                </li>
                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-monica-and-andy.png"
                    alt="Monica and Andy"
                    class="dib"
                    width="128px"
                    height="41px"
                  />
                </li>
                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-piglet%402x.png"
                    alt="Piglet"
                    class="dib"
                    width="112px"
                    height="45px"
                  />
                </li>
                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-lovepop%402x.png"
                    alt="Lovepop"
                    class="dib"
                    width="63px"
                    height="45px"
                  />
                </li>
                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-finlay%402x.png"
                    alt="Finlay"
                    class="dib"
                    width="128px"
                    height="18px"
                  />
                </li>

                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20128%2013'%3E%3C/svg%3E"
                    alt="Naturecan"
                    class="dib"
                    width="128px"
                    height="13px"
                    data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-naturecan.png"
                  />
                  <noscript>
                    <img
                      src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-naturecan.png"
                      alt="Naturecan"
                      class="dib"
                      width="128px"
                      height="13px"
                    />
                  </noscript>
                </li>
                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-flex.png"
                    alt="Flex"
                    class="dib"
                    width="74px"
                    height="45px"
                  />
                </li>

                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20128%2017'%3E%3C/svg%3E"
                    alt="Passenger"
                    class="dib"
                    width="128px"
                    height="17px"
                    data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-passenger%402x.png"
                  />
                  <noscript>
                    <img
                      src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-passenger%402x.png"
                      alt="Passenger"
                      class="dib"
                      width="128px"
                      height="17px"
                    />
                  </noscript>
                </li>
                <li class="ph3 ph4-l pb3 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20128%2036'%3E%3C/svg%3E"
                    alt="Jimmy Lion"
                    class="dib"
                    width="128px"
                    height="36px"
                    data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-jimmy-lion%402x.png"
                  />
                  <noscript>
                    <img
                      src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-jimmy-lion%402x.png"
                      alt="Jimmy Lion"
                      class="dib"
                      width="128px"
                      height="36px"
                    />
                  </noscript>
                </li>
                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-fairfax-favor%402x.png"
                    alt="fairfax & Favor"
                    class="dib"
                    width="120px"
                    height="45px"
                  />
                </li>
                <li class="ph3 ph4-l pb4 tc w-33 w-25-m w-15-l flex flex-row items-center justify-center">
                  <img
                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20128%208'%3E%3C/svg%3E"
                    alt="Holland Cooper"
                    class="dib"
                    width="128px"
                    height="8px"
                    data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-holland-cooper.png"
                  />
                  <noscript>
                    <img
                      src="wp-content/themes/bp-wp-2021/assets/img/home-page/logos/logo-holland-cooper.png"
                      alt="Holland Cooper"
                      class="dib"
                      width="128px"
                      height="8px"
                    />
                  </noscript>
                </li>
              </ul>
            </div> */}
          </section>

          {/* <section class="introduction bg-black">
            <div class="l-wrapper mw-82">
              <div class="flex-l flex-row-l pb4 pb5-l pt4-l">
                <div class="w-50-l tc tl-l pb4 pb0-l pt5-l pr5-l flex-l flex-row-l items-center-l">
                  <div class="intro-content">
                    <h2 class="mid title-sequel white mb0 pb4">
                      Tough times don’t last. <br />{" "}
                      <i>Brightpearl customers do.</i>
                    </h2>

                    <div class="cms white mw-600 center no-center-l">
                      <p>
                        A global market slowdown. A supply chain crisis.
                        Wavering consumer demand. Rising costs. It’s a tricky
                        time to be in retail. But it doesn’t have to be.
                      </p>
                      <p>
                        Out of the chaos,{" "}
                        <strong>opportunities are emerging</strong>. Be ready to
                        seize them with Brightpearl.
                      </p>
                      <p>
                        Automate your operations, intelligently plan your
                        inventory and make your investments go further with our
                        #1 Retail Operating System.
                      </p>
                    </div>

                    <a href="#" class="btn btn--std mt3 js-form-reveal">
                      Book a demo
                    </a>
                  </div>
                </div>

                <div class="w-50-l pl4-l flex-l flex-row-l">
                  <div class="center no-center-l mw-600 pt4-l tc tl-l">
                    <img
                      width="1330"
                      height="1148"
                      src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201330%201148'%3E%3C/svg%3E"
                      alt="Brightpearl customers"
                      class="dib"
                      data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/sage/tough-times-dont-last.png"
                    />
                    <noscript>
                      <img
                        width="1330"
                        height="1148"
                        src="wp-content/themes/bp-wp-2021/assets/img/sage/tough-times-dont-last.png"
                        alt="Brightpearl customers"
                        class="dib"
                      />
                    </noscript>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          <section class="what-we-offer">
            <div class="z-1">
              <div class="l-wrapper mw-82">
                <div class="row-1 flex-l flex-row-l pv4 pt5-l relative z-5">
                  <div class="w-50-l pr4-l pb3 center no-center-l mw-600">
                    <img
                      src={img1}
                      class="db"
                      alt="home-free-up-time"
                      width="568px"
                      height="467px"
                      data-lazy-src="wp-content/uploads/2024/03/home-free-up-time.png"
                    />
                  </div>

                  <div class="w-50-l pl5-l flex-l flex-row-l items-center-l">
                    <div class="center no-center-l mw-600 pt4-l tc tl-l">
                      <h2 class="mid title-sequel pt3">
                        Master Compliance, <i>Minimize Risk</i>
                      </h2>
                      <h3>by automating (almost) everything</h3>
                      <p>
                        Transform your approach to compliance with our
                        cutting-edge risk management solutions. We simplify the
                        complexities of regulatory requirements, identifying and
                        mitigating potential risks to ensure your business
                        remains secure and compliant.
                      </p>
                      <p>
                        With our expertise, you can confidently navigate legal
                        landscapes, avoid costly penalties, and focus on driving
                        your business forward. Let us turn compliance challenges
                        into opportunities for growth and stability.{" "}
                        <strong>Save 1000s of hours</strong> and focus your
                        energy where it counts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="m-sections-wrapper bg-grey">
              <div class="l-wrapper mw-82">
                <div class="row-2 flex-l flex-row-l pv4 pt5-l">
                  <div class="w-50-l pl4-l pb3 center no-center-l mw-600 order-1-l flex-l flex-row-l items-center-l">
                    <img
                      src={im2}
                      class="db"
                      alt="home-supply-chain"
                      width="568px"
                      height="414px"
                      data-lazy-src="wp-content/uploads/2024/02/home-supply-chain.png"
                    />
                  </div>

                  <div class="w-50-l pr5-l order-0-l flex-l flex-row-l items-center-l">
                    <div class="center no-center-l mw-600 pt4-l tc tl-l">
                      <h2 class="mid title-sequel pt3">
                        Stay Ahead with
                        <br /> <i>Proactive Compliance</i>
                      </h2>
                      <h3>
                        Elevate your business’s compliance strategy with our
                        advanced monitoring framework.
                      </h3>
                      <p>
                        We provide real-time insights and proactive oversight to
                        ensure your operations adhere to evolving regulations.
                        By implementing cutting-edge tools and expert analysis,
                        we help you stay ahead of compliance challenges,
                        mitigate risks, and maintain seamless regulatory
                        alignment.
                        <strong></strong>
                      </p>
                      <p>
                        Embrace a future of transparency and confidence with a
                        compliance monitoring system designed for dynamic
                        success.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="l-wrapper mw-82">
              <div class="row-3 flex-l flex-row-l pv4 pt5-l">
                <div class="w-50-l pr4-l pb3 center no-center-l mw-600">
                  <img
                    src={img3}
                    class="db"
                    alt="home-kpi-summary"
                    width="568px"
                    height="518px"
                    data-lazy-src="wp-content/uploads/2024/03/home-kpi-summary.png"
                  />
                </div>

                <div class="w-50-l pl5-l flex-l flex-row-l items-center-l">
                  <div class="center no-center-l mw-600 pt4-l tc tl-l">
                    <h2 class="mid title-sequel pt3">
                      Unlock Efficiency with
                      <br /> <i>Outsourced Excellence</i>
                    </h2>
                    <h3>
                      Streamline your operations by outsourcing and managing
                      critical tasks with ease.{" "}
                    </h3>
                    <p>
                      Our tailored solutions handle your administrative,
                      regulatory, and operational needs,{" "}
                      <strong>
                        allowing you to focus on strategic growth.
                      </strong>
                      .
                    </p>
                    <p>
                      Experience unparalleled efficiency and expertise as we
                      manage complex tasks and ensure seamless execution,
                      freeing you to concentrate on what truly matters—driving
                      your business forward.
                    </p>
                    {/* <p>
                      You can even <strong>access industry benchmarks</strong>{" "}
                      to see how your performance compares to your competition.
                    </p> */}
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-grey">
              <div class="l-wrapper mw-82">
                <div class="row-4 flex-l flex-row-l pv4 pv5-l">
                  <div class="w-50-l pl4-l pb2 center no-center-l mw-600 order-1-l">
                    <div class="mw-400 center">
                      <img
                        src={img4}
                        class="db m-picture-block"
                        alt="logos-plug-and-play-apps"
                        width="363px"
                        height="363px"
                        data-lazy-src="wp-content/uploads/2024/02/logos-plug-and-play-apps.png"
                      />
                    </div>
                  </div>

                  <div class="w-50-l pr5-l order-0-l flex-l flex-row-l items-center-l">
                    <div class="center no-center-l mw-600 tc tl-l">
                      <h2 class="mid title-sequel pt3">
                        Stay Ahead with
                        <br /> <i>Intelligent Alerts</i>
                      </h2>
                      <h3>
                        Revolutionize your business operations with automated
                        alerts and triggers that keep you informed and in
                        control.{" "}
                      </h3>
                      <p>
                        Our intelligent system delivers real-time notifications
                        and proactive alerts, ensuring you never miss critical
                        updates or deadlines. Streamline decision-making,
                        enhance responsiveness, and stay ahead of potential
                        issues with a solution designed to keep your business
                        running smoothly and efficiently.
                      </p>
                      {/* <p>
                        Add new sales channels – including TikTok, Instagram,
                        live stream platforms and more – in minutes. Curate an
                        ever-changing roster of the latest tech tools, as and
                        when your business needs them. Access deep APIs and a
                        certified network of development partners so that{" "}
                        <strong>where other brands falter, you can soar</strong>
                        .
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div class="l-wrapper mw-82">
              <div class="row-5 flex-l flex-row-l pt4 pt5-l">
                <div class="w-50-l pb4 pb0-l center no-center-l mw-600  flex-l flex-row-l items-end-l">
                  <img
                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20600%20359'%3E%3C/svg%3E"
                    alt="Brightpearl support"
                    class="db"
                    width="600px"
                    height="359px"
                    data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/home-page/brightpearl-support%402x.webp"
                  />
                  <noscript>
                    <img
                      src="wp-content/themes/bp-wp-2021/assets/img/home-page/brightpearl-support%402x.webp"
                      alt="Brightpearl support"
                      class="db"
                      width="600px"
                      height="359px"
                    />
                  </noscript>
                </div>

                <div class="w-50-l pb4 pl5-l flex-l flex-row-l items-center-l">
                  <div class="center no-center-l mw-600 pt4-l tc tl-l">
                    <h2 class="mid title-sequel">
                      Expert support
                      <br /> <i>at every step</i>
                    </h2>
                    <h3>with our end-to-end services</h3>
                  </div>
                  <p>
                    The right software is important, but it’s not enough on its
                    own. To unlock your unique growth potential, it has to be
                    optimized by experts and backed up by training and support.
                  </p>
                  <p>
                    At Brightpearl, our retail experts are with you every step
                    of the way. From{" "}
                    <a
                      href="implementation-and-consultancy.html"
                      data-wpel-link="internal"
                    >
                      flawless implementation
                    </a>{" "}
                    with a proven <strong>97% success rate</strong> and bespoke
                    onboarding training to ongoing consulting and 24/7 support,
                    we’ll ensure you get the very best from Brightpearl.
                  </p>
                </div>
              </div>
            </div> */}
          </section>

          <section class="get-connected-in-page bg-black">
            <div class="l-wrapper mw-82 pb4 pt5 pv5-l">
              <div class="row-5 flex-l flex-row-l">
                <div class="w-40-l pb4 pb0-l pl5-l mw-350 max-w-none-l center no-center-l order-1-l">
                  <img
                    src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20500%20385'%3E%3C/svg%3E"
                    alt="Keep Growing"
                    class="db"
                    width="500px"
                    height="385px"
                    data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/sage/keep-growing.png"
                  />
                  <noscript>
                    <img
                      src="wp-content/themes/bp-wp-2021/assets/img/sage/keep-growing.png"
                      alt="Keep Growing"
                      class="db"
                      width="500px"
                      height="385px"
                    />
                  </noscript>
                </div>

                <div class="w-60-l pb4 pb0-l pr5-l center no-center-l mw-600 max-w-none-l flex-l flex-row-l items-center-l order-0-l">
                  <div class="white mw-800 mw-none-l center tc tl-l pv4">
                    <h2 class="as-header-1 white">Ready to keep growing?</h2>

                    <p class="intro-text mb4 fw6">
                      Discover how Brightpearl can help control your cash flow
                    </p>

                    {/* <a href="#" class="btn btn--std fw6 js-form-reveal dib">
                      Book a demo
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="trusted-content">
            <div class="l-wrapper mw-82 pv4 pt5-l overflow-hidden">
              <div class="center mw-800 tc mb4 mb5-l">
                <h2 class="as-intro-text sg-jade-mid mb0 pb2">Our customers</h2>
                <h3 class="as-header-2 title-sequel">
                  Trusted by merchants
                  <br /> in every industry
                </h3>
              </div>

              <div class="flex flex-row flex-wrap m-columns-wrapper m-columns-wrapper--one-rem">
                <div class="w-100 w-50-m w-33-l pb4 mw-500 center no-center-l">
                  <div class="ph3 h-100 pb2-l">
                    <a
                      href="customer-stories/snow-cosmetics.html"
                      class="db h-100 relative pb4-ns hover-opacity"
                      data-wpel-link="internal"
                    >
                      <div
                        class="m-further-reading-link-image-wrap br6 overflow-hidden aspect-ratio aspect-ratio--16x9"
                        // style="background: url('wp-content/uploads/2022/12/customer-snow.png') center center;background-size: cover;"
                      ></div>

                      <div class="pt3 pb5 pb4-m pt4-l">
                        <p class="mb0 black fw6">
                          &quot;Brightpearl’s Automation Engine transformed how
                          we manage peaks. Without it, I would have had to
                          double our warehouse & operations staff. The inventory
                          planning tool factors in seasonality so that we
                          instantly say ’ok, we need to order 100,000 of that
                          item, not 10,000'.&quot;
                        </p>

                        <p class="black o-5 fw6 mv3">
                          {" "}
                          Trevor Martin, Snow’s Vice President of Operations
                        </p>

                        <p class="btn-ghost dib mb0 absolute b-1 l-0">
                          Learn more
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                <div class="w-100 w-50-m w-33-l pb4 mw-500 center no-center-l">
                  <div class="ph3 h-100 pb2-l">
                    <a
                      href="customer-stories/usa-lab.html"
                      class="db h-100 relative pb4-ns hover-opacity"
                      data-wpel-link="internal"
                    >
                      <div
                        class="m-further-reading-link-image-wrap br6 overflow-hidden aspect-ratio aspect-ratio--16x9"
                        // style="background: url('wp-content/uploads/2022/12/customer-usa-lab.jpg') center center;background-size: cover;"
                      ></div>

                      <div class="pt3 pb5 pb4-m pt4-l">
                        <p class="mb0 black fw6">
                          &quot;We had spreadsheets for everything and, at one
                          point, a third of our products were out of stock.
                          Brightpearl takes the guesswork out of managing stock.
                          Automation with Brightpearl has been fantastic, I
                          barely touch the system for standard orders.&quot;
                        </p>

                        <p class="black o-5 fw6 mv3">
                          Matt Wisniewski, COO, USA Lab
                        </p>

                        <p class="btn-ghost dib mb0 absolute b-1 l-0">
                          Learn more
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                <div class="w-100 w-50-m w-33-l pb4 mw-500 center no-center-l">
                  <div class="ph3 h-100 pb2-l">
                    <a
                      href="customer-stories/nooz-optics.html"
                      class="db h-100 relative pb4-ns hover-opacity"
                      data-wpel-link="internal"
                    >
                      <div
                        class="m-further-reading-link-image-wrap br6 overflow-hidden aspect-ratio aspect-ratio--16x9"
                        // style="background: url('wp-content/uploads/2022/12/customer-nooz-optics.jpg') center center;background-size: cover;"
                      ></div>

                      <div class="pt3 pb5 pb4-m pt4-l">
                        <p class="mb0 black fw6">
                          &quot;Brightpearl scales as we do. Previously, we were
                          reluctant to add the latest sales channels or tools
                          because it added complexity. Brightpearl has got rid
                          of that mentality – we now know we can quickly and
                          easily connect the apps we need, when we need
                          them.&quot;
                        </p>

                        <p class="black o-5 fw6 mv3">
                          Antoine Doolaeghe, Co-Founder, Nooz Optics
                        </p>

                        <p class="btn-ghost dib mb0 absolute b-1 l-0">
                          Learn more
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                <div class="w-100 w-50-m w-33-l pb4 mw-500 center no-center-l">
                  <div class="ph3 h-100 pb2-l">
                    <a
                      href="customer-stories/bond-touch.html"
                      class="db h-100 relative pb4-ns hover-opacity"
                      data-wpel-link="internal"
                    >
                      <div
                        class="m-further-reading-link-image-wrap br6 overflow-hidden aspect-ratio aspect-ratio--16x9"
                        // style="background: url('wp-content/uploads/2022/05/Bond-touch466.jpg') center center;background-size: cover;"
                      ></div>

                      <div class="pt3 pb5 pb4-m pt4-l">
                        <p class="mb0 black fw6">
                          &quot;Our aim was to stop our team doing almost all
                          manual tasks, and we were able to achieve that with
                          Brightpearl’s Automation Engine. Now, everything
                          except occasional warranty orders are handled
                          automatically.&quot;
                        </p>

                        <p class="black o-5 fw6 mv3">
                          Jorge Henriques, COO, Bond Touch
                        </p>

                        <p class="btn-ghost dib mb0 absolute b-1 l-0">
                          Learn more
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                <div class="w-100 w-50-m w-33-l pb4 mw-500 center no-center-l">
                  <div class="ph3 h-100 pb2-l">
                    <a
                      href="customer-stories/lovepop.html"
                      class="db h-100 relative pb4-ns hover-opacity"
                      data-wpel-link="internal"
                    >
                      <div
                        class="m-further-reading-link-image-wrap br6 overflow-hidden aspect-ratio aspect-ratio--16x9"
                        // style="background: url('wp-content/uploads/2020/08/Lovepop-graphic.png') center center;background-size: cover;"
                      ></div>

                      <div class="pt3 pb5 pb4-m pt4-l">
                        <p class="mb0 black fw6">
                          &quot;Our business is seasonal, we rely on Brightpearl
                          to help manage peak order volumes as well as
                          year-round implications for managing growth in overall
                          order volume. Having a system that can scale in both
                          elements is critical to our success.&quot;
                        </p>

                        <p class="black o-5 fw6 mv3">
                          Dan Nephew, Director of Systems & Operations, Lovepop
                        </p>

                        <p class="btn-ghost dib mb0 absolute b-1 l-0">
                          Learn more
                        </p>
                      </div>
                    </a>
                  </div>
                </div>

                <div class="w-100 w-50-m w-33-l pb4 mw-500 center no-center-l">
                  <div class="ph3 h-100 pb2-l">
                    <a
                      href="customer-stories/cleva.html"
                      class="db h-100 relative pb4-ns hover-opacity"
                      data-wpel-link="internal"
                    >
                      <div
                        class="m-further-reading-link-image-wrap br6 overflow-hidden aspect-ratio aspect-ratio--16x9"
                        // style="background: url('wp-content/uploads/2022/12/customer-cleva.webp') center center;background-size: cover;"
                      ></div>

                      <div class="pt3 pb5 pb4-m pt4-l">
                        <p class="mb0 black fw6">
                          &quot;With Brightpearl, you can focus on innovation
                          without being caught up in operational processes. With
                          everything taken care of in the background, your
                          business can grow at a good rate – and you feel
                          confident to move the brand forward.&quot;
                        </p>

                        <p class="black o-5 fw6 mv3">
                          Douglas Begg, Technical & Operations Director at Cleva
                          Europe
                        </p>

                        <p class="btn-ghost dib mb0 absolute b-1 l-0">
                          Learn more
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <section class="brightpearl-at-a-glance bg-black">
            <div class="l-wrapper mw-82 pt5 pb4 overflow-hidden">
              <div class="pb4 white tc">
                <h2 class="white mb0 pb4 pb5-l">
                  <span id="Why_Brightpearl">Why Brightpearl</span>
                </h2>
              </div>

              <div class="flex-m flex-row-m flex-wrap-m m-columns-wrapper m-columns-wrapper--one-rem">
                <div class="w-50-m w-33-l ph3 pb4 pb5-l">
                  <div class="flex flex-row">
                    <div class="pb3 w-25">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20119%20118'%3E%3C/svg%3E"
                        alt="glance-icon-award"
                        class="dib"
                        height="118px"
                        width="119px"
                        data-lazy-src="wp-content/uploads/2024/02/glance-icon-award.png"
                      />
                      <noscript>
                        <img
                          src="wp-content/uploads/2024/02/glance-icon-award.png"
                          alt="glance-icon-award"
                          class="dib"
                          height="118px"
                          width="119px"
                        />
                      </noscript>
                    </div>

                    <div class="w-75 pl3 pl4-l cms tl white">
                      <h3 class="white mb0 pb1">Cutting-edge software</h3>

                      <p class="p18 mb0">
                        Leading tech backed up with a 97% implementation success
                        rate
                      </p>
                    </div>
                  </div>
                </div>

                <div class="w-50-m w-33-l ph3 pb4 pb5-l">
                  <div class="flex flex-row">
                    <div class="pb3 w-25">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20119%20118'%3E%3C/svg%3E"
                        alt="glance-icon-sage"
                        class="dib"
                        height="118px"
                        width="119px"
                        data-lazy-src="wp-content/uploads/2024/02/glance-icon-sage.png"
                      />
                      <noscript>
                        <img
                          src="wp-content/uploads/2024/02/glance-icon-sage.png"
                          alt="glance-icon-sage"
                          class="dib"
                          height="118px"
                          width="119px"
                        />
                      </noscript>
                    </div>

                    <div class="w-75 pl3 pl4-l cms tl white">
                      <h3 class="white mb0 pb1">Part of Sage Group Plc</h3>

                      <p class="p18 mb0">
                        We're built on a solid foundation, which helps us invest
                        in product R&D
                      </p>
                    </div>
                  </div>
                </div>

                <div class="w-50-m w-33-l ph3 pb4 pb5-l">
                  <div class="flex flex-row">
                    <div class="pb3 w-25">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20119%20118'%3E%3C/svg%3E"
                        alt="glance-icon-shopify"
                        class="dib"
                        height="118px"
                        width="119px"
                        data-lazy-src="wp-content/uploads/2024/02/glance-icon-shopify.png"
                      />
                      <noscript>
                        <img
                          src="wp-content/uploads/2024/02/glance-icon-shopify.png"
                          alt="glance-icon-shopify"
                          class="dib"
                          height="118px"
                          width="119px"
                        />
                      </noscript>
                    </div>

                    <div class="w-75 pl3 pl4-l cms tl white">
                      <h3 class="white mb0 pb1">Certified Shopify Partner</h3>

                      <p class="p18 mb0">
                        We’re proud to be founding member of Shopify’s global
                        ERP Program
                      </p>
                    </div>
                  </div>
                </div>

                <div class="w-50-m w-33-l ph3 pb4 pb5-l">
                  <div class="flex flex-row">
                    <div class="pb3 w-25">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20119%20118'%3E%3C/svg%3E"
                        alt="glance-icon-trusted"
                        class="dib"
                        height="118px"
                        width="119px"
                        data-lazy-src="wp-content/uploads/2024/02/glance-icon-trusted.png"
                      />
                      <noscript>
                        <img
                          src="wp-content/uploads/2024/02/glance-icon-trusted.png"
                          alt="glance-icon-trusted"
                          class="dib"
                          height="118px"
                          width="119px"
                        />
                      </noscript>
                    </div>

                    <div class="w-75 pl3 pl4-l cms tl white">
                      <h3 class="white mb0 pb1">Proven track record</h3>

                      <p class="p18 mb0">
                        We power millions of orders a month for some of the
                        world’s biggest brands
                      </p>
                    </div>
                  </div>
                </div>

                <div class="w-50-m w-33-l ph3 pb4 pb5-l">
                  <div class="flex flex-row">
                    <div class="pb3 w-25">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20119%20118'%3E%3C/svg%3E"
                        alt="glance-icon-star"
                        class="dib"
                        height="118px"
                        width="119px"
                        data-lazy-src="wp-content/uploads/2024/02/glance-icon-star.png"
                      />
                      <noscript>
                        <img
                          src="wp-content/uploads/2024/02/glance-icon-star.png"
                          alt="glance-icon-star"
                          class="dib"
                          height="118px"
                          width="119px"
                        />
                      </noscript>
                    </div>

                    <div class="w-75 pl3 pl4-l cms tl white">
                      <h3 class="white mb0 pb1">Excellent reviews</h3>

                      <p class="p18 mb0">
                        We’ve earned great reviews from customers, including 4.5
                        stars on Trustpilot
                      </p>
                    </div>
                  </div>
                </div>

                <div class="w-50-m w-33-l ph3 pb4 pb5-l">
                  <div class="flex flex-row">
                    <div class="pb3 w-25">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20119%20118'%3E%3C/svg%3E"
                        alt="glance-icon-headset"
                        class="dib"
                        height="118px"
                        width="119px"
                        data-lazy-src="wp-content/uploads/2024/02/glance-icon-headset.png"
                      />
                      <noscript>
                        <img
                          src="wp-content/uploads/2024/02/glance-icon-headset.png"
                          alt="glance-icon-headset"
                          class="dib"
                          height="118px"
                          width="119px"
                        />
                      </noscript>
                    </div>

                    <div class="w-75 pl3 pl4-l cms tl white">
                      <h3 class="white mb0 pb1">Expert support</h3>

                      <p class="p18 mb0">
                        Our experts are always on hand for training and support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* <section class="integrations bg-grey">
            <div class="l-wrapper mw-82 pv5">
              <div class="pb4">
                <h2 class="as-intro-text sg-jade-mid mb0 pb2">
                  Brightpearl App Store
                </h2>

                <h3 class="as-header-2">
                  Instantly connect Brightpearl with the tools you need
                  <br /> to grow fearlessly
                </h3>
              </div>

              <div class="m-integrations-grid flex flex-row flex-wrap m-columns-wrapper m-columns-wrapper--one-rem relative z-5 justify-center justify-start-l">
                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="Shopify Icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-shopify-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-shopify-white-bg.svg"
                          alt="Shopify Icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">Shopify</p>
                      <p class="mb0 lh-title">E-Commerce</p>
                    </div>
                  </div>
                </div>

                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="Amazon icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-amazon-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-amazon-white-bg.svg"
                          alt="Amazon icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">Amazon</p>
                      <p class="mb0 lh-title">E-Commerce</p>
                    </div>
                  </div>
                </div>

                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="BigCommerce"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-bigcommerce-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-bigcommerce-white-bg.svg"
                          alt="BigCommerce"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">BigCommerce</p>
                      <p class="mb0 lh-title">E-Commerce</p>
                    </div>
                  </div>
                </div>

                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="Magento Icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-magento-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-magento-white-bg.svg"
                          alt="Magento Icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">Magento</p>
                      <p class="mb0 lh-title">E-Commerce</p>
                    </div>
                  </div>
                </div>

                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="eBay Icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-ebay-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-ebay-white-bg.svg"
                          alt="eBay Icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">eBay</p>
                      <p class="mb0 lh-title">E-Commerce</p>
                    </div>
                  </div>
                </div>
                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="Quickbooks Icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-quickbooks-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-quickbooks-white-bg.svg"
                          alt="Quickbooks Icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">Quickbooks</p>
                      <p class="mb0 lh-title">Accounting</p>
                    </div>
                  </div>
                </div>

                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="Lightspeed X-series Icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-lightspeed-x-series-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-lightspeed-x-series-white-bg.svg"
                          alt="Lightspeed X-series Icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">Lightspeed</p>
                      <p class="mb0 lh-title">E-Commerce</p>
                    </div>
                  </div>
                </div>

                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="Shipstation Icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-shipstation-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-shipstation-white-bg.svg"
                          alt="Shipstation Icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">Shipstation</p>
                      <p class="mb0 lh-title">Shipping</p>
                    </div>
                  </div>
                </div>

                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="Dotdigital Icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-dot-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-dot-white-bg.svg"
                          alt="Dotdigital Icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">Dotdigital</p>
                      <p class="mb0 lh-title">E-Commerce</p>
                    </div>
                  </div>
                </div>

                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="Xero Icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-xero-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-xero-white-bg.svg"
                          alt="Xero Icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">Xero</p>
                      <p class="mb0 lh-title">Accounting</p>
                    </div>
                  </div>
                </div>
                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="Square Icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-square-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-square-white-bg.svg"
                          alt="Square Icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">Square</p>
                      <p class="mb0 lh-title">E-Commerce</p>
                    </div>
                  </div>
                </div>

                <div class="m-integrations-grid-item w-100 w-50-m w-25-l ph3 pb3">
                  <div class="bg-white br4 pa1 h-100 flex flex-row items-center">
                    <div class="m-integration-grid-logo">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2088%2088'%3E%3C/svg%3E"
                        alt="Klaviyo Icon"
                        class="db m-picture-block"
                        width="88px"
                        height="88px"
                        data-lazy-src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-klaviyo-white-bg.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/misc/icon-klaviyo-white-bg.svg"
                          alt="Klaviyo Icon"
                          class="db m-picture-block"
                          width="88px"
                          height="88px"
                        />
                      </noscript>
                    </div>

                    <div class="m-integration-grid-text pl2">
                      <p class="intro-text mb0 lh-title pb2">Klaviyo</p>
                      <p class="mb0 lh-title">E-Commerce</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="pt4 pb3">
                <a
                  href="app-store.html"
                  class="btn-ghost"
                  data-wpel-link="internal"
                >
                  See all Brightpearl apps
                </a>
              </div>
            </div>
          </section> */}

          {/* <section class="news-and-events relative overflow-hidden">
            <div class="l-wrapper mw-82 pv4 pv5-l">
              <div class="pb4">
                <h2 class="as-intro-text sg-jade-mid mb0 pb2">More reading</h2>

                <h3 class="as-header-2 title-sequel">
                  Events, News and Insights
                </h3>
              </div>

              <div class="m-columns-wrapper-lg m-columns-wrapper m-columns-wrapper--one-rem">
                <div class="m-news-events-slider-wrapper js-slider-news-events">
                  <div class="w-100 w-50-m w-33-l pb4 mw-500 center no-center-l">
                    <div class="ph3 h-100">
                      <a
                        href="press-and-media/press-releases/brightpearl-acquires-inventory-planner-giving-savvy-merchants-better-ways-to-accurately-predict-demand.html"
                        class="db h-100 relative pb4-ns hover-opacity"
                        target="_blank"
                        data-wpel-link="internal"
                      >
                        <div
                          class="m-further-reading-link-image-wrap br6 overflow-hidden aspect-ratio aspect-ratio--16x9"
                          // style="background: url('wp-content/uploads/2021/09/Brightpearl-Acquires-Inventory-Planner.png') center center;background-size: cover;"
                        ></div>

                        <div class="pt3 pb5 pb4-m pt4-l">
                          <p class="fw6 sg-jade-mid">
                            <span id="News">Brightpearl News</span>
                          </p>
                          <h3 class="mb3 lh-title black">
                            Brightpearl Acquires Inventory Planner
                          </h3>

                          <p class="btn-ghost mb0 absolute b-1 l-0">
                            Learn more
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div class="w-100 w-50-m w-33-l pb4 mw-500 center no-center-l">
                    <div class="ph3 h-100">
                      <a
                        href="lightning-50.html"
                        class="db h-100 relative pb4-ns hover-opacity"
                        target="_blank"
                        data-wpel-link="internal"
                      >
                        <div
                          class="m-further-reading-link-image-wrap br6 overflow-hidden aspect-ratio aspect-ratio--16x9"
                          // style="background: url('wp-content/uploads/2022/03/Screenshot-2022-03-11-at-11.42.36.png') center center;background-size: cover;"
                        ></div>

                        <div class="pt3 pb5 pb4-m pt4-l">
                          <p class="fw6 sg-jade-mid">Brightpearl News</p>
                          <h3 class="mb3 lh-title black">
                            Sign-ups are open for Brightpearl’s Lightning 50 -
                            ranking the fastest-growing UK & US e-commerce
                            brands
                          </h3>

                          <p class="btn-ghost mb0 absolute b-1 l-0">
                            Learn more
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div class="w-100 w-50-m w-33-l pb4 mw-500 center no-center-l">
                    <div class="ph3 h-100">
                      <a
                        href="ecommerce-guides/tis-the-season-us.html"
                        class="db h-100 relative pb4-ns hover-opacity"
                        target="_blank"
                        data-wpel-link="internal"
                      >
                        <div
                          class="m-further-reading-link-image-wrap br6 overflow-hidden aspect-ratio aspect-ratio--16x9"
                          // style="background: url('wp-content/uploads/2021/10/guide-detail-tis-the-season.png') center center;background-size: cover;"
                        ></div>

                        <div class="pt3 pb5 pb4-m pt4-l">
                          <p class="fw6 sg-jade-mid">Market Insights</p>
                          <h3 class="mb3 lh-title black">
                            [Exclusive report] Tis the Season (to be scalable) -
                            US
                          </h3>

                          <p class="btn-ghost mb0 absolute b-1 l-0">
                            Download now
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div class="w-100 w-50-m w-33-l pb4 mw-500 center no-center-l">
                    <div class="ph3 h-100">
                      <a
                        href="ecommerce-guides/tis-the-season-uk.html"
                        class="db h-100 relative pb4-ns hover-opacity"
                        target="_blank"
                        data-wpel-link="internal"
                      >
                        <div
                          class="m-further-reading-link-image-wrap br6 overflow-hidden aspect-ratio aspect-ratio--16x9"
                          // style="background: url('wp-content/uploads/2021/10/guide-detail-tis-the-season.png') center center;background-size: cover;"
                        ></div>

                        <div class="pt3 pb5 pb4-m pt4-l">
                          <p class="fw6 sg-jade-mid">Market Insights</p>
                          <h3 class="mb3 lh-title black">
                            [Exclusive report] Tis the Season (to be scalable) -
                            UK
                          </h3>

                          <p class="btn-ghost mb0 absolute b-1 l-0">
                            Download now
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          <section class="get-connected bg-black">
            <div class="l-wrapper mw-82 pv4 pt5-l">
              <div class="white mw-600 center tc pv4">
                <h2 class="as-header-1 white">
                  <span id="Contact">Got questions</span>
                </h2>

                <p class="intro-text mb4 fw6">
                  Ready to reach your potential? Book a demo today to see how
                  Brightpearl can help you do business better.
                </p>

                <a
                  href="#"
                  class="btn btn--std btn--orange fw6 js-form-reveal dib"
                >
                  Book a demo
                </a>
              </div>
            </div>
          </section>
        </main>

        <div class="m-slide-out-form bg-black js-slide-out-form">
          <div class="m-slide-out-form-inner mw-700 relative">
            <a
              href="#"
              class="white m-slide-out-form-close js-slide-out-form-close db"
            >
              <span class="dib v-mid">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 14.819 14.819"
                  width="22px"
                  height="22px"
                >
                  <title>cross</title>
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <line
                        x1="1.01"
                        y1="1.01"
                        x2="13.808"
                        y2="13.808"
                        fill="none"
                        stroke="#ffffff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.021"
                      />
                      <line
                        x1="13.808"
                        y1="1.01"
                        x2="1.01"
                        y2="13.808"
                        fill="none"
                        stroke="#ffffff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.021"
                      />
                    </g>
                  </g>
                </svg>
              </span>
              <span class="hide-text dib v-mid">Close</span>
            </a>

            <h2 class="white">
              {" "}
              <span>
                {" "}
                See the benefits of Brightpearl's Retail Operating System in
                action
              </span>
            </h2>
          </div>
        </div>

        {/* <div
          class="m-home-banner dn db-l bg-section-map-lines"
          // style="position:fixed;bottom:0;left:0;right:0;z-index:100; background-color: #000;"
          style={{position:'fixed',bottom:0,left:0,right:0,zIndex:100,backgroundColor:'#000'}}
        >
          <div class="l-wrapper mw-72">
            <a
              href="https://www.brightpearl.com/ecommerce-guides/hyper-scalable-era-explained"
              class="db"
              data-wpel-link="internal"
            >
              <div class="flex flex-row justify-center">
                <div
                  class="w-40-l tl pv3"
                  // style="background:url('https://www.brightpearl.com/wp-content/themes/bp-wp-2021/assets/img/banner/bg-banner-hyper.png') center right no-repeat; background-size: contain; min-height: 100px;"
                  style={{backgroundSize:'contain',minHeight:'100px'}}
                >
                  <h3 class="title-sequel white mb0">
                    The <span class="bp-orange">Hyper-scalable</span> <br />
                    Era Explained
                  </h3>
                </div>

                <div class="w-30-l pv3 ph4 tl flex flex-row items-center">
                  <p class="white fw6 mb0">
                    What it is, why it matters and how retailers can reap the
                    benefits
                  </p>
                </div>

                <div class="w-20-l pv3 flex flex-row items-center">
                  <p class="btn ph4 pv3 btn--orange mb0 lh-solid dib ml3 nowrap fw6">
                    Get the report
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div> */}

        <footer id="colophon" class="l-footer site-footer bg-black">
          <div class="l-wrapper mw-82 pv4 pv6-l lh-copy">
            <div class="l-footer-inner">
              <div class="footer-row-1 flex-l flex-row-l">
                <div class="w-50-l pr4-l">
                  <div class="pv4 mb4 mt3-l br3">
                    <div class="mw-700 pb4 pb5-l">
                      <img
                        src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20185%2045'%3E%3C/svg%3E"
                        alt="Brightpearl by Sage"
                        width="185px"
                        height="45px"
                        data-lazy-src="https://www.brightpearl.com/wp-content/themes/bp-wp-2021/assets/img/logo-brightpearl-by-sage-white.svg"
                      />
                      <noscript>
                        <img
                          src="wp-content/themes/bp-wp-2021/assets/img/logo-brightpearl-by-sage-white.svg"
                          alt="Brightpearl by Sage"
                          width="185px"
                          height="45px"
                        />
                      </noscript>
                    </div>

                    <div class="m-footer-social pt4-l">
                      <div class="flex-l flex-row-l w-50-l pr4-l">
                        <div class="w-50-l mb4 mb0-l">
                          <ul class="list pl0 lh-copy">
                            <li class="dib v-mid pr3">
                              <h5 class="mb0 white">
                                <b>Follow Us</b>
                              </h5>
                            </li>

                            <li class="m-footer-social-icon dib v-mid pr2">
                              <a
                                href="https://www.facebook.com/BrightpearlHQ"
                                target="_blank"
                                class="facebook db hide-text hover-opacity white"
                                data-wpel-link="external"
                                rel="external noopener noreferrer"
                              >
                                Facebook
                              </a>
                            </li>
                            <li class="m-footer-social-icon dib v-mid pr2">
                              <a
                                href="https://twitter.com/BrightpearlHQ"
                                target="_blank"
                                class="twitter db hide-text hover-opacity white"
                                data-wpel-link="external"
                                rel="external noopener noreferrer"
                              >
                                X (Twitter)
                              </a>
                            </li>
                            <li class="m-footer-social-icon dib v-mid pr2">
                              <a
                                href="https://www.linkedin.com/company/brightpearl/"
                                target="_blank"
                                class="linkedin db hide-text hover-opacity white"
                                data-wpel-link="external"
                                rel="external noopener noreferrer"
                              >
                                LinkedIn
                              </a>
                            </li>
                            <li class="m-footer-social-icon dib v-mid">
                              <a
                                href="https://www.youtube.com/user/brightpearldocs"
                                target="_blank"
                                class="youtube db hide-text hover-opacity white"
                                data-wpel-link="external"
                                rel="external noopener noreferrer"
                              >
                                Youtube
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-50-l pl5-l mb4 mb0-l">
                  <div class="flex-m flex-row-m pt4-l">
                    <div class="w-100 w-50-m w-33-l ph2-l">
                      <div class="white f5 ">
                        <h2 class="mt3 o-7 h2-uppercase white">Company</h2>

                        <ul class="list pl0 lh-copy">
                          <li class="pt4-ns pt2 pb2">
                            <a
                              href="brightpearl-history.html"
                              class="link"
                              data-wpel-link="internal"
                            >
                              Brightpearl history
                            </a>
                          </li>
                          <li class="pb2">
                            <a
                              href="opportunities.html"
                              class="link"
                              data-wpel-link="internal"
                            >
                              Opportunities
                            </a>
                          </li>
                          <li class="pb2">
                            <a
                              href="press-and-media.html"
                              class="link"
                              data-wpel-link="internal"
                            >
                              Press
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="w-100 w-50-m w-33-l ph2-m">
                      <div class="white f5 ">
                        <h2 class="mt3 o-7 h2-uppercase white">
                          Partner Services
                        </h2>

                        <ul class="list pl0 lh-copy">
                          <li class="pt4-ns pt2 pb2">
                            <a
                              href="partners.html"
                              class="link"
                              data-wpel-link="internal"
                            >
                              Find a partner
                            </a>
                          </li>
                          <li class="pb2">
                            <a
                              href="become-a-partner.html"
                              class="link"
                              data-wpel-link="internal"
                            >
                              Become a partner
                            </a>
                          </li>
                          <li class="pb2">
                            <a
                              href="refer-a-customer.html"
                              class="link"
                              data-wpel-link="internal"
                            >
                              Refer a customer
                            </a>
                          </li>
                          <li class="pb2">
                            <a
                              href="partners/index.html#partner-resources"
                              class="link"
                              data-wpel-link="internal"
                            >
                              Partner resources
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="w-100 w-50-m w-33-l ph2-m">
                      <div class="white f5">
                        <h2 class="h2-uppercase mt3 o-7 white">Support</h2>
                        <ul class="list pl0 lh-copy">
                          <li class="pt4-ns pt2 pb2">
                            <a
                              href="https://help.brightpearl.com/s/"
                              class="link"
                              target="_blank"
                              data-wpel-link="external"
                              rel="external noopener noreferrer"
                            >
                              Knowledge Center
                            </a>
                          </li>
                          <li class="pb2">
                            <a
                              href="https://api-docs.brightpearl.com/"
                              class="link"
                              target="_blank"
                              data-wpel-link="external"
                              rel="external noopener noreferrer"
                            >
                              API
                            </a>
                          </li>
                          <li class="pb2">
                            <a
                              href="contact-us.html"
                              class="link"
                              data-wpel-link="internal"
                            >
                              Get in touch
                            </a>
                          </li>
                          <li class="pb2">
                            <a
                              href="contact-support.html"
                              class="link"
                              data-wpel-link="internal"
                            >
                              Contact Support
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="footer-row-3 pt4 pt5-l">
                <div class="flex-l flex-row-l">
                  <div class="w-50-l pr5-l">
                    <p class="white">
                      &copy; Brightpearl Copyright 2024 All rights reserved
                    </p>
                  </div>

                  <div class="w-50-l pl5-l pr4-l flex-l flex-row-l justify-between-l">
                    <a
                      href="privacy-policy.html"
                      class="db dib-m link white pr3-m"
                      data-wpel-link="internal"
                    >
                      Privacy policy
                    </a>
                    <a
                      href="our-cookie-policy.html"
                      class="db dib-m link white ph3-m"
                      data-wpel-link="internal"
                    >
                      Cookie policy
                    </a>
                    <a
                      href="customer-terms.html"
                      class="db dib-m link white ph3-m"
                      data-wpel-link="internal"
                    >
                      Customer Terms
                    </a>
                    <a
                      href="security.html"
                      class="db dib-m link white ph3-m"
                      data-wpel-link="internal"
                    >
                      Security
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default LandingPage

// <div className="main-container">
//   <div className={visible ? "navbar-container" : "hide"}>
//     <div className="logo">
//       <img className="main-logo-image" src={logo} alt="" />
//     </div>
//     <div className="nav-btn-container">
//       <ul className="nav-btn">
//         <li className="nav-btn-li">
//           <Link className="nav-btn-li-link" to="/erp/login">
//             <button>Login</button>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   </div>
//   <div className="start-content-container">
//     <div className="start-content-container-right" >
//       <h1>Retail Operating System</h1>
//     </div>
//     <div></div>
//   </div>
// </div>
