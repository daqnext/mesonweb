/*
 * @Author: your name
 * @Date: 2021-04-07 20:27:52
 * @LastEditTime: 2021-05-11 08:36:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/home/home2.js
 */

import React from "react";
import ArweaveDemoPage from "../arweaveDemo/arweaveDemo";
import FileManagerDemoPage from "../fileManagerDemo/fileManagerDemo";
import NodeMapPage from "../nodeMap/nodeMap";
import IndexBlogPage from "../indexBlog/indexBlog"
import VideoDemoPage from "../videoDemo/videoDome";
import "./home2.css";

class HomePage extends React.Component {
    componentDidMount() {
        const scriptjs = `
        abc()
      `;
        new Function(scriptjs)();
      }


      fileManager() {
        return (
            <FileManagerDemoPage></FileManagerDemoPage>
        );
      }

  render() {
    return (
      <div style={{backgroundColor:"#1748C8"}}>
        <div class="ie-panel">
          <a href="http://windows.microsoft.com/en-US/internet-explorer/">
            <img
              src="https://assets.meson.network:10443/static/images/ie8-panel/warning_bar_0000_us.jpg"
              height="42"
              width="820"
              alt="You are using an outdated browser. For a faster, safer browsing experience, upgrade for free today."
            ></img>
          </a>
        </div>

        <div class="preloader">
          <div class="preloader-body">
            <div class="cssload-container">
              <span class="cssload-dots"></span>
              <span class="cssload-dots"></span>
              <span class="cssload-dots"></span>
              <span class="cssload-dots"></span>
              <span class="cssload-dots"></span>
              <span class="cssload-dots"></span>
              <span class="cssload-dots"></span>
              <span class="cssload-dots"></span>
              <span class="cssload-dots"></span>
              <span class="cssload-dots"></span>
            </div>
            <img
              src="https://assets.meson.network:10443/static/images/logo-default-324x88.png"
              alt=""
              width="162"
              height="44"
            ></img>
          </div>
        </div>

        <div class="page">
          <div class="particles-js" id="particles-js"></div>
      
          <header class="section page-header page-header-absolute">
            {/* <!--RD Navbar--> */}
            
            <div class="rd-navbar-wrap">
              <nav
                class="rd-navbar rd-navbar-classic"
                data-layout="rd-navbar-fixed"
                data-sm-layout="rd-navbar-fixed"
                data-md-layout="rd-navbar-fixed"
                data-md-device-layout="rd-navbar-fixed"
                data-lg-layout="rd-navbar-static"
                data-lg-device-layout="rd-navbar-fixed"
                data-xl-layout="rd-navbar-static"
                data-xl-device-layout="rd-navbar-static"
                data-xxl-layout="rd-navbar-static"
                data-xxl-device-layout="rd-navbar-static"
                data-lg-stick-up-offset="46px"
                data-xl-stick-up-offset="46px"
                data-xxl-stick-up-offset="46px"
                data-lg-stick-up="true"
                data-xl-stick-up="true"
                data-xxl-stick-up="true"
                data-lg-auto-height="false"
                data-xl-auto-height="false"
                data-xxl-auto-height="false"
              >
                <div class="rd-navbar-main-outer">
                  <div class="rd-navbar-main">
                    {/* <!--RD Navbar Panel--> */}
                    <div class="rd-navbar-panel">
                      {/* <!--RD Navbar Toggle--> */}
                      <button
                        class="rd-navbar-toggle"
                        data-rd-navbar-toggle=".rd-navbar-nav-wrap"
                      >
                        <span></span>
                      </button>
                      {/* <!--RD Navbar Brand--> */}
                      <div class="rd-navbar-brand">
                        {/* <!--Brand--> */}
                        <a class="brand" href="index.html">
                          <img
                            class="brand-logo-light"
                            src="https://assets.meson.network:10443/static/images/logo-default-324x88.png"
                            alt=""
                            width="162"
                            height="44"
                          ></img>
                        </a>
                      </div>
                      <div class="select-ln-wrap">
                        <select
                          data-container-class="select-ln"
                          data-dropdown-class="select-ln-dropdown"
                        >
                          <option>EN</option>
                        </select>
                      </div>
                    </div>
                    <div class="rd-navbar-main-element">
                      <div class="rd-navbar-nav-wrap">
                        <ul class="rd-navbar-nav">
                          {/* <!--
                      <li class="rd-nav-item"><a class="rd-nav-link" href="#">Pages</a>
                        <ul class="rd-menu rd-navbar-dropdown">
                          <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="blog.html">Blog</a>
                          </li>
                          <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="blog-post.html">Blog Post</a>
                          </li>
                          <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="login.html">Login</a>
                          </li>
                          <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="register.html">Register</a>
                          </li>
                          <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="404.html">404</a>
                          </li>
                          <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="privacy-policy.html">Privacy Policy</a>
                          </li>
                          <li class="rd-dropdown-item"><a class="rd-dropdown-link" href="search-results.html">Search Results</a>
                          </li>
                        </ul>
                      </li>
                      --> */}

                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="#home">
                              Home
                            </a>
                          </li>
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="#nodes">
                              Nodes
                            </a>
                          </li>
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="#roadmap">
                              Roadmap
                            </a>
                          </li>
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="#demo">
                              Demo
                            </a>
                          </li>
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="#faq">
                              Faq
                            </a>
                          </li>
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="#contacts">
                              Contacts
                            </a>
                          </li>
                        </ul>
                      </div>
                      <a
                        class="button button-xs button-default-outline-3 rd-navbar-fixed-element-1"
                        href="/login"
                      >
                        <span class="button-text">Log In</span>
                        <span class="icon mdi mdi-login"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </header>

          <div class="gradient-1 bg-vide-1">
            {/* <div
              class="gradient-6 bg-vide"
              //data-vide-bg="/static/video/video-1"
              //data-vide-options="posterType: jpg, position: 50% 50%"
            ></div> */}
            {/* <!-- About--> */}
            <section class="section section-inset-1" id="home">
              <div class="container">
                <div class="row row-30 justify-content-xl-between align-items-md-center align-items-xxl-start">
                  <div class="col-md-6 col-xl-5 offset-top-xxl-15 wow fadeInLeft">
                    <div class="box-style-1">
                      <div class="headings-default">
                        <div class="headings-default-subtitle">CDN</div>
                        <h2>
                          MESON.NETWORK
                          <br />
                          TESTNET-2.0
                        </h2>
                      </div>
                      <p style={{fontSize:"18px"}}>
                      Bandwidth trading platform built on blockchain
                      </p>
                      <div class="group-md group-middle justify-content-center">
                        <a class="button button-isi button-primary" href="/login">
                          Get started
                        </a>
                        <a class="button button-default-outline" href="https://assets.meson.network:10443/static/docs/Meson-Network-v1.6.pdf">
                          White Paper
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 wow fadeIn">
                    <div class="img-style-1 img-style-3">
                      <img
                        src="https://assets.meson.network:10443/static/images/image-1-715x521.png"
                        alt=""
                        width="715"
                        height="521"
                      />
                      <img
                        src="https://assets.meson.network:10443/static/images/dash.gif"
                        // style="position:absolute;left:0;top:0"
                        style={{position:"absolute",left:"0",top:"0"}}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Clients--> */}
            <section class="section-style-1">
              <div class="container">
                <div class="clients-default-wrap wow fadeInRight">
                  <div class="row row-20 align-items-center justify-content-center justify-content-md-start justify-content-lg-between">
                    <div class="col-auto col-sm-4 col-lg-auto">
                      <a class="clients-default" href="https://mask.io">
                        <img
                          src="https://assets.meson.network:10443/static/images/logos/mask.svg"
                          alt=""
                          width="82"
                          height="30"
                        ></img>
                      </a>
                    </div>
                    <div class="col-auto col-sm-4 col-lg-auto">
                      <a
                        class="clients-default"
                        href="https://www.arweave.org/"
                      >
                        <img
                          src="https://assets.meson.network:10443/static/images/logos/arweave.svg"
                          alt=""
                          width="116"
                          height="26"
                        ></img>
                      </a>
                    </div>
                    <div class="col-auto col-sm-4 col-lg-auto">
                      <a
                        class="clients-default"
                        href="https://cointelegraph.com/news/blockchain-project-takes-on-cloudflare-and-amazon-web-services"
                      >
                        <img
                          src="https://assets.meson.network:10443/static/images/logos/cointelegraph.png"
                          alt=""
                          width="130"
                          height="25"
                        ></img>
                      </a>
                    </div>
                    <div class="col-auto col-sm-4 col-lg-auto">
                      <a class="clients-default" href="https://ipfs.io/">
                        <img
                          src="https://assets.meson.network:10443/static/images/logos/ipfs.svg"
                          alt=""
                          width="86"
                          height="15"
                        ></img>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div
            class="gradient-3"
            // style="margin-top: 190px;padding-bottom: 120px;"
            style={{paddingTop:"120px"}}
          >
            {/* <!-- Pre-Sale--> */}
            <section class="section section-xs" id="nodes">
              <div class="container">
              <NodeMapPage></NodeMapPage>
                {/* <div class="row row-30 justify-content-center justify-content-xl-between align-items-center align-items-xl-start">
                  <div class="col-sm-4 col-md-4 text-center">
                    <div id="myearth" 
                    // style="height: 480px;margin-top: 60px"
                    style={{height:"480px",marginTop:"60px"}}
                    >
                      <div id="glow"></div>
                    </div>
                  </div>
                  <div class="col-md-7 col-xl-7 wow fadeInUp ">
                    <div class="headings-default">
                      <div class="headings-default-subtitle">Miners</div>
                      <h3>Nodes & Capacity</h3>
                    </div>

                    <p class="d-inline-block text-width-medium">
                      Your node information will be listed here after 5-10 mins
                      when you start the mining terminal program on your server
                    </p>

                    <table id="nodetable" border="1" 
                    // style="    width: 96%;"
                    style={{width:"100%"}}
                    >
                      <tr>
                        <th>Region</th>
                        <th>ID</th>
                        <th>Bandwidth</th>
                        <th>OS</th>
                        <th>Count</th>
                      </tr>

                      <tr>
                        <td>Global</td>
                        <td>/</td>
                        <td>/</td>
                        <td>/</td>
                        <td>233</td>
                      </tr>

                      <tr>
                        <td>North-America</td>
                        <td>/</td>
                        <td>/</td>
                        <td>/</td>
                        <td>100</td>
                      </tr>

                      <tr>
                        <td>USA</td>
                        <td>ID-xxxxxxxxxx</td>
                        <td>123Mb/s</td>
                        <td>Ubuntu</td>
                        <td>1</td>
                      </tr>

                      <tr>
                        <td>USA</td>
                        <td>ID-xxxxxxxxxx</td>
                        <td>123Mb/s</td>
                        <td>Ubuntu</td>
                        <td>1</td>
                      </tr>

                      <tr>
                        <td>USA</td>
                        <td>ID-xxxxxxxxxx</td>
                        <td>123Mb/s</td>
                        <td>Ubuntu</td>
                        <td>1</td>
                      </tr>

                      <tr>
                        <td>USA</td>
                        <td>ID-xxxxxxxxxx</td>
                        <td>123Mb/s</td>
                        <td>Ubuntu</td>
                        <td>1</td>
                      </tr>
                    </table>

                    <style></style>

                    <div class="group-xl group-middle discount-details justify-content-center justify-content-sm-start">
                      <div>
                        <p class="discount-details-title">
                          Tokens exchange rate
                        </p>
                        <ul class="discount-details-list">
                          <li>1 MESON = ? BTC</li>
                          <li>1 MESON = ? ETH</li>
                        </ul>
                      </div>
                      <a class="button button-isi button-primary" href="#">
                        Start Mining
                      </a>
                    </div>
                  </div>
                </div> */}

                
              </div>
            </section>
            {/* <!-- Values--> */}
            {/* <!--
                  <section class="section section-lg text-center">
                    <div class="container">
                      <div class="row row-30">
                        <div class="col-lg-6 wow fadeInUp">
                          <div class="donut-chart" data-donut="[{ &quot;Title&quot;: &quot;Team&quot;, &quot;Percentage&quot;: &quot;0.12&quot;, &quot;Fill&quot;: &quot;#a0d7ff&quot; }, { &quot;Title&quot;: &quot;Advisors&quot;, &quot;Percentage&quot;: &quot;0.12&quot;, &quot;Fill&quot;: &quot;#29a5ff&quot; }, { &quot;Title&quot;: &quot;Reserve&quot;, &quot;Percentage&quot;: &quot;0.26&quot;, &quot;Fill&quot;: &quot;#3cc774&quot; }, { &quot;Title&quot;: &quot;ICO&quot;, &quot;Percentage&quot;: &quot;0.5&quot;, &quot;Fill&quot;: &quot;#ffd234&quot; }]">
                            <div class="donut-chart-caption">
                              <div class="donut-chart-text">Distribution<br>of Tokens</div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 wow fadeInUp" data-wow-delay=".1s">
                          <div class="donut-chart" data-donut="[{ &quot;Title&quot;: &quot;Marketing&quot;, &quot;Percentage&quot;: &quot;0.25&quot;, &quot;Fill&quot;: &quot;#3cc774&quot; }, { &quot;Title&quot;: &quot;Development&quot;, &quot;Percentage&quot;: &quot;0.32&quot;, &quot;Fill&quot;: &quot;#ffd234&quot; }, { &quot;Title&quot;: &quot;Partnership&quot;, &quot;Percentage&quot;: &quot;0.3&quot;, &quot;Fill&quot;: &quot;#a0d7ff&quot; }, { &quot;Title&quot;: &quot;Legal &amp; Taxation&quot;, &quot;Percentage&quot;: &quot;0.13&quot;, &quot;Fill&quot;: &quot;#29a5ff&quot; }]">
                            <div class="donut-chart-caption">
                              <div class="donut-chart-text">Funds<br>Allocation</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

         --> */}
          </div>

          <div class="gradient-4">
            {/* <!-- Our Roadmap--> */}
            <section class="section-timeline text-sm-left" id="roadmap">
              <div class="container container-custom-1">
                <div class="row">
                  <div class="col-sm-7 col-lg-6 col-xl-5 wow fadeInLeft">
                    <div class="headings-default">
                      <div class="headings-default-subtitle">Steps</div>
                      <h3>Our Roadmap</h3>
                    </div>
                    <p class="d-inline-block text-width-medium">
                      Take a look at our roadmap, showing various stages of our
                      platform development and its eventual success.
                    </p>
                  </div>
                </div>
              </div>
              <svg
                class="timeline-svg"
                x="0"
                y="0"
                viewBox="0 0 1920 500"
                preserveAspectRatio="none"
              >
                <path
                  class="timeline-svg-path"
                  d="M 0 490  C 250 525 340 350 460 320  S 600 280 770 350  S 960 350 1070 260  S 1240 140 1420 160  S 1850 100 1920 0"
                ></path>
              </svg>
              {/* <!-- Owl Carousel--> */}
              <div
                class="owl-carousel owl-style-1"
                data-items="1"
                data-autoplay="false"
                data-loop="false"
                data-nav="true"
                data-animation-in="fadeIn"
                data-animation-out="fadeOut"
                data-mouse-drag="false"
                data-touch-drag="false"
              >
                <div class="timeline-dots">
                  <div class="timeline-dot">
                    <time class="timeline-dot-time" datetime="2019">
                      Q1/2020
                    </time>
                    <div class="timeline-dot-title">
                      <a href="#">Internal Development TestNet-0.1</a>
                    </div>
                  </div>
                  <div class="timeline-dot">
                    <time class="timeline-dot-time" datetime="2019">
                      Q1/2021
                    </time>
                    <div class="timeline-dot-title">
                      <a href="#">Fundraising Seed Round </a>
                    </div>
                  </div>
                  <div class="timeline-dot">
                    <time class="timeline-dot-time" datetime="2019">
                      Q2/2021
                    </time>
                    <div class="timeline-dot-title">
                      <a href="#">
                        TestNet-2.0 Expansion & Private Round Fundraising
                      </a>
                    </div>
                  </div>
                  <div class="timeline-dot">
                    <time class="timeline-dot-time" datetime="2019">
                      Q3&Q4/2021
                    </time>
                    <div class="timeline-dot-title">
                      <a href="#">MainNet Launch</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Section Mobile--> */}
            <section class="section section-xs section-inset-2">
              <div class="container" 
            //   style="text-align: left"
              style={{textAlign:"left"}}
              >
                <div class="row row-30">
                  <div
                    class="col-md-8 col-lg-6 col-xl-5 inset-bottom-md-100"
                    // style="margin-right: 100px"
                    style={{marginRight:"100px"}}
                  >
                    <div class="box-style-2 wow fadeInUp">
                      <div class="headings-default">
                        <div class="headings-default-subtitle">DEMO</div>
                        <h3>Video Acceleration by Meson</h3>
                      </div>
                      <p class="d-inline-block text-width-medium">
                        Meson provids standard http 302 redirection with no
                        heavy SDK integration and can be used to transmit video
                        globally{" "}
                      </p>
                      <ul class="list-marked list-2-columns d-inline-block d-md-block">
                        <li>No SDK but Http 302</li>
                        <li>Low cost distributed CDN</li>
                        <li>One-click to use</li>
                        <li>Global & fast CDN</li>
                      </ul>
                      <div class="group-xl group-middle justify-content-center">
                        <a class="button button-isi button-primary" href="/login">
                          Start to use meson
                        </a>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-md-4 col-lg-6 col-xl-5 align-self-middle d-md-block wow fadeInLeft"
                    // style="margin-top: 60px"
                    style={{marginTop:"60px"}}
                  >
                    <video
                      poster="https://assets.meson.network:10443/static/img/newCover.png"
                      src="https://coldcdn.com/api/cdn/wr1cs5/video/spacex2.mp4"
                      controls="controls"
                    //   style="width: 100%; object-fit: fill; border-radius: 10px;"
                    style={{width:"100%",objectFit:"fill",borderRadius:"10px"}}
                    ></video>
                  </div>
                </div>
              </div>
            </section>

            {/* <!-- Section ipfs--> */}
            <section class="section section-xs section-inset-2" id="demo">
              <div class="container" 
            //   style="text-align: left;"
              style={{textAlign:"left"}}
              >
                <div class="row row-30">
                  <div
                    class="col-md-8 col-lg-6 col-xl-5 inset-bottom-md-100"
                    // style="margin-right: 100px;"
                    style={{marginRight:"100px"}}
                  >
                    <div class="box-style-2 wow fadeInUp">
                      <div class="headings-default">
                        <div class="headings-default-subtitle">DEMO</div>
                        <h3>IPFS & MESON</h3>
                      </div>
                      <p class="d-inline-block text-width-medium">
                        IPFS can be used as storage layer while Meson.network
                        works as a global CDN cache layer{" "}
                      </p>
                      <ul class="list-marked list-2-columns d-inline-block d-md-block">
                        <li>IPFS storage</li>
                        <li>Layer1 & Layer2</li>
                        <li>Global file accerlation</li>
                      </ul>
                    </div>
                  </div>

                  <div
                    class="col-md-4 col-lg-6 col-xl-5 align-self-middle   d-md-block wow fadeInLeft"
                    // style="margin-top: 60px"
                    style={{marginTop:"60px"}}
                  >
                  <FileManagerDemoPage></FileManagerDemoPage>
                    {/* <div 
                    // style="padding-top: 10px;"
                    style={{paddingTop:"10px"}}
                    >
                      <div 
                    //   style="cursor: pointer;"
                      style={{cursor:"pointer"}}
                      >
                        <div class="container">
                          <div
                            tabindex="0"
                            // style="flex: 1 1 0%; display: flex; flex-direction: column; align-items: center; padding: 20px; border-width: 2px; border-radius: 2px; border-color: white; border-style: dashed; color: white; outline: none; transition: border 0.24s ease-in-out 0s;"
                            style={{flex:"1 1 0%",display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",borderWidth:"2px",borderRadius:"2px",borderColor:"white",borderStyle:"dashed",color:"white",outline:"none",transition:"border 0.24s ease-in-out 0s"}}
                          >
                            <input
                              multiple=""
                              type="file"
                              autocomplete="off"
                              tabindex="-1"
                            //   style="display: none;"
                              style={{display:"none"}}
                            />
                            <p 
                            // style="font-size: 20px; margin: 5px;"
                            style={{fontSize:"20px",margin:"5px"}}
                            >
                              Click to select files
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="container">
                        <div
                          class="toast-body"
                        //   style="border: 2px dashed white; max-height: 500px; overflow-y: scroll; margin-top: 10px; color: rgba(255, 255, 255, 0.58);"
                          style={{border:"2px dashed white",maxHeight:"500px",overflowY:"scroll",marginTop:"10px",color:"rgba(255, 255, 255, 0.58)"}}
                        ></div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </section>

            {/* <!-- Section Arweave--> */}
            <section class="section section-xs section-inset-2">
              <div class="container" 
            //   style="text-align: left"
              style={{textAlign:"left"}}
              >
                <div class="row row-30">
                  <div
                    class="col-md-8 col-lg-6 col-xl-5 inset-bottom-md-100"
                    // style="margin-right: 100px;"
                    style={{marginRight:"100px"}}
                  >
                    <div class="box-style-2 wow fadeInUp">
                      <div class="headings-default">
                        <div class="headings-default-subtitle">DEMO</div>
                        <h3>Arweave & MESON</h3>
                      </div>
                      <p class="d-inline-block text-width-medium">
                        Arweave can be used as storage layer while Meson.network
                        works as a global CDN cache layer{" "}
                      </p>
                      <ul class="list-marked list-2-columns d-inline-block d-md-block">
                        <li>Arweave storage</li>
                        <li>Layer1 & Layer2</li>
                        <li>Global file accerlation</li>
                      </ul>
                    </div>
                  </div>

                  <div
                    class="col-md-4 col-lg-6 col-xl-5 align-self-middle d-md-block wow fadeInLeft"
                    // style="margin-top: 80px"
                    style={{marginTop:"80px"}}
                  >
                    <ArweaveDemoPage></ArweaveDemoPage>
                    {/* <div class="form-group">
                      <input
                        class="form-control arweave-hash-input"
                        type="text"
                        placeholder="Input file ID(Hash) in Arweave"
                      />
                    </div> */}
                    {/* <div 
                    // style="color: rgba(255, 255, 255, 0.58);"
                    style={{color:"rgba(255, 255, 255, 0.58)"}}
                    >
                      <div>Origin Arweave link</div>
                      <div class="input-group " 
                    //   style="margin-bottom: 0px;"
                      style={{marginBottom:"0px"}}
                      >
                        <input
                          id="ipfslink"
                          class="form-control"
                          type="text"
                          value="https://arweave.net/"
                        //   style="background: none; color: white; padding-left: 5px;"
                          style={{background:"none",color:"white",paddingLeft:"5px"}}
                        />
                        <div class="input-group-append">
                          <div
                            class="btn   btn-light"
                            // style=" border: 1px solid white; color: white;"
                            style={{border:"1px solid white",color:"white"}}
                          >
                            copy
                          </div>
                        </div>
                      </div>
                      <div>Accelerated link by meson:</div>
                      <div class="input-group ">
                        <input
                          id="mesonlink"
                          class="form-control"
                          type="text"
                          value="https://coldcdn.com/api/cdn/bronil/"
                        //   style="background: none; color: white; padding-left: 5px;"
                          style={{background:"none",color:"white",paddingLeft:"5px"}}
                        />
                        <div class="input-group-append">
                          <div
                            class="btn   btn-light"
                            // style="border: 1px solid white; color: white;"
                            style={{border:"1px solid white",color:"white"}}
                          >
                            copy
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="gradient-2">
            <section class="section section-xs section-inset-3 text-center">
              <div class="container">
                <div class="box-relative wow fadeInUp">
                  <div class="headings-default">
                    <div class="headings-default-subtitle">Features</div>
                    <h3>
                      Bandwidth
                      <br /> Ecosystem
                    </h3>
                  </div>
                  <p class="d-inline-block text-width-medium">
                    Meson.Network aims at building a global bandwidth ecosystem
                    and trading platform with 'Meson' token as an exchange media
                  </p>
                </div>
                <div class="row row-xxl row-30 justify-content-center">
                  <div
                    class="col-sm-6 col-md-4 wow fadeInUp"
                    data-wow-delay=".1s"
                  >
                    {/* <!-- Service default--> */}
                    <article class="service-default block-md">
                      <div class="service-default-icon">
                        <img src="https://assets.meson.network:10443/static/images/miner.svg" style={{height:"50px"}} />
                      </div>
                      <div class="service-default-caption">
                        <div class="heading-6 service-default-title">
                          <a href="#">Miner[Terminal]</a>
                        </div>
                        <p class="service-default-text">
                          Provide services by accessing the network according to
                          standards and obtain tokens
                        </p>
                      </div>
                    </article>
                  </div>
                  <div class="col-sm-6 col-md-4 wow fadeInUp">
                    {/* <!-- Service default--> */}
                    <article class="service-default block-md">
                      <div class="service-default-icon">
                        <img src="https://assets.meson.network:10443/static/images/client.svg" style={{height:"60px"}}/>
                      </div>
                      <div class="service-default-caption">
                        <div class="heading-6 service-default-title">
                          <a href="#">Client</a>
                        </div>
                        <p class="service-default-text">
                          Use Meson to accelerate your application and protect
                          it from malicious attacks from the Internet
                        </p>
                      </div>
                    </article>
                  </div>
                  <div
                    class="col-sm-6 col-md-4 wow fadeInUp"
                    data-wow-delay=".1s"
                  >
                    {/* <!-- Service default--> */}
                    <article class="service-default block-md">
                      <div class="service-default-icon">
                        <img src="https://assets.meson.network:10443/static/images/op.svg" style={{height:"60px"}} />
                      </div>
                      <div class="service-default-caption">
                        <div class="heading-6 service-default-title">
                          <a href="#">Cooperation</a>
                        </div>
                        <p class="service-default-text">
                          Reasonable business model to reach more terminal nodes
                          through Meson Network
                        </p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="gradient-5">
            <section class="section section-md section-collapse text-center">
              {/* <!--
          <div class="container">
            <div class="box-relative wow fadeInUp">
              <div class="headings-default">
                <div class="headings-default-subtitle">Team</div>
                <h3>Our Dedicated Team</h3>
              </div>
              <p class="d-inline-block text-width-medium">Since our establishment, we have gathered a team composed of experienced professionals in various sectors.</p>
            </div>
            <div class="row row-xl row-30 justify-content-center team-default-wrap">
              <div class="col-sm-6 col-md-5 col-lg-3 wow fadeInUp" data-wow-delay=".1s">
              
                <article class="team-default"><a class="team-default-figure" href="#"><img class="team-default-img img-duotone" src="images/team-1-202x171.jpg" alt="" width="202" height="171" data-gradient-map="#002ba7, #FFFFFF"/></a>
                  <div class="heading-6 team-default-name"><a href="#">Ann McMillan</a></div>
                  <div class="team-default-status">CEO, Founder</div><a class="team-default-social mdi mdi-linkedin" href="#"></a>
                </article>
              </div>
              <div class="col-sm-6 col-md-5 col-lg-3 wow fadeInUp">
                
                <article class="team-default"><a class="team-default-figure" href="#"><img class="team-default-img img-duotone" src="images/team-2-202x171.jpg" alt="" width="202" height="171" data-gradient-map="#002ba7, #FFFFFF"/></a>
                  <div class="heading-6 team-default-name"><a href="#">John Smith</a></div>
                  <div class="team-default-status">Blockchain Developer</div><a class="team-default-social mdi mdi-linkedin" href="#"></a>
                </article>
              </div>
              <div class="col-sm-6 col-md-5 col-lg-3 wow fadeInUp" data-wow-delay=".1s">
               
                <article class="team-default"><a class="team-default-figure" href="#"><img class="team-default-img img-duotone" src="images/team-3-202x171.jpg" alt="" width="202" height="171" data-gradient-map="#002ba7, #FFFFFF"/></a>
                  <div class="heading-6 team-default-name"><a href="#">Jane Peterson</a></div>
                  <div class="team-default-status">Content Marketer</div><a class="team-default-social mdi mdi-linkedin" href="#"></a>
                </article>
              </div>
              <div class="col-sm-6 col-md-5 col-lg-3 wow fadeInUp">
               
                <article class="team-default"><a class="team-default-figure" href="#"><img class="team-default-img img-duotone" src="images/team-4-202x171.jpg" alt="" width="202" height="171" data-gradient-map="#002ba7, #FFFFFF"/></a>
                  <div class="heading-6 team-default-name"><a href="#">Peter Williams</a></div>
                  <div class="team-default-status">Community Manager</div><a class="team-default-social mdi mdi-linkedin" href="#"></a>
                </article>
              </div>
            </div><a class="button button-isi button-primary wow fadeInUp" href="#">Read more about us</a>
          </div>
        --> */}
            </section>
            <section
              class="section section-lg section-collapse text-center wow fadeInUp"
              id="faq"
            >
              <div class="container">
                <div class="headings-default">
                  <div class="headings-default-subtitle">FAQ</div>
                  <h3>Frequently Asked Questions</h3>
                </div>
                <div class="row row-md justify-content-center">
                  <div class="col-xl-10">
                    {/* <!--Bootstrap tabs--> */}
                    <div class="tabs-custom tabs-line">
                      {/* <!--Nav tabs--> */}
                      <ul class="nav nav-tabs">
                        <li class="nav-item" role="presentation">
                          <a
                            class="nav-link active"
                            href="#tabs-1-1"
                            data-toggle="tab"
                          >
                            General
                          </a>
                        </li>
                        <li class="nav-item" role="presentation">
                          <a
                            class="nav-link"
                            href="#tabs-1-2"
                            data-toggle="tab"
                          >
                            Tokens
                          </a>
                        </li>
                        <li class="nav-item" role="presentation">
                          <a
                            class="nav-link"
                            href="#tabs-1-3"
                            data-toggle="tab"
                          >
                            Mining
                          </a>
                        </li>
                      </ul>
                      {/* <!--Tab panes--> */}
                      <div class="tab-content">
                        <div class="tab-pane fade show active" id="tabs-1-1">
                          {/* <!--Bootstrap collapse--> */}
                          <div
                            class="card-group-custom card-group-corporate"
                            id="accordion1"
                            role="tablist"
                            aria-multiselectable="false"
                          >
                            {/* <!--Bootstrap card--> */}
                            <article class="card card-custom card-corporate">
                              <div class="card-header" role="tab">
                                <div class="card-title">
                                  <a
                                    id="accordion1-card-head-orwftlqm"
                                    data-toggle="collapse"
                                    data-parent="#accordion1"
                                    href="#accordion1-card-body-ljpkcjdn"
                                    aria-controls="accordion1-card-body-ljpkcjdn"
                                    aria-expanded="true"
                                    role="button"
                                  >
                                    How to prevent the scenario where terminal
                                    users used IP pools to fake a large amount
                                    of access requests and maliciously earn
                                    tokens?
                                    <div class="card-arrow"></div>
                                  </a>
                                </div>
                              </div>
                              <div
                                class="collapse show"
                                id="accordion1-card-body-ljpkcjdn"
                                aria-labelledby="accordion1-card-head-orwftlqm"
                                data-parent="#accordion1"
                                role="tabpanel"
                              >
                                <div class="card-body">
                                  <p>
                                    Our token economy is a bandwidth renting
                                    model which will not incentivize usage
                                  </p>
                                </div>
                              </div>
                            </article>
                            {/* <!--Bootstrap card--> */}
                            <article class="card card-custom card-corporate">
                              <div class="card-header" role="tab">
                                <div class="card-title">
                                  <a
                                    class="collapsed"
                                    id="accordion1-card-head-oeghbyle"
                                    data-toggle="collapse"
                                    data-parent="#accordion1"
                                    href="#accordion1-card-body-dapthqik"
                                    aria-controls="accordion1-card-body-dapthqik"
                                    aria-expanded="false"
                                    role="button"
                                  >
                                    What would happen if users used Meson to
                                    cache illegal content?
                                    <div class="card-arrow"></div>
                                  </a>
                                </div>
                              </div>
                              <div
                                class="collapse"
                                id="accordion1-card-body-dapthqik"
                                aria-labelledby="accordion1-card-head-oeghbyle"
                                data-parent="#accordion1"
                                role="tabpanel"
                              >
                                <div class="card-body">
                                  <p>
                                    Meson.Network will delpoy AI system to
                                    detect the illegal content according to the
                                    rule in different countries
                                  </p>
                                </div>
                              </div>
                            </article>
                            {/* <!--Bootstrap card--> */}
                            <article class="card card-custom card-corporate">
                              <div class="card-header" role="tab">
                                <div class="card-title">
                                  <a
                                    class="collapsed"
                                    id="accordion1-card-head-tduexqpx"
                                    data-toggle="collapse"
                                    data-parent="#accordion1"
                                    href="#accordion1-card-body-jvjljrol"
                                    aria-controls="accordion1-card-body-jvjljrol"
                                    aria-expanded="false"
                                    role="button"
                                  >
                                    How to deal with cheating terminal nodes
                                    that do not transmit data or transmit wrong
                                    data?<div class="card-arrow"></div>
                                  </a>
                                </div>
                              </div>
                              <div
                                class="collapse"
                                id="accordion1-card-body-jvjljrol"
                                aria-labelledby="accordion1-card-head-tduexqpx"
                                data-parent="#accordion1"
                                role="tabpanel"
                              >
                                <div class="card-body">
                                  <p>
                                    All terminal nodes need to stake tokens on
                                    mainnet, once cheating behaviors are
                                    discovered by meson validators, penalties
                                    will be given out to these nodes.
                                  </p>
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                        <div class="tab-pane fade" id="tabs-1-2">
                          <div
                            class="card-group-custom card-group-corporate"
                            id="accordion2"
                            role="tablist"
                            aria-multiselectable="false"
                          >
                            {/* <!--Bootstrap card--> */}
                            <article class="card card-custom card-corporate">
                              <div class="card-header" role="tab">
                                <div class="card-title">
                                  <a
                                    class="collapsed"
                                    id="accordion2-card-head-rdreayya"
                                    data-toggle="collapse"
                                    data-parent="#accordion2"
                                    href="#accordion2-card-body-iyqlwryd"
                                    aria-controls="accordion2-card-body-iyqlwryd"
                                    aria-expanded="false"
                                    role="button"
                                  >
                                    Will all test-network tokens be mapped to
                                    mainnet?
                                    <div class="card-arrow"></div>
                                  </a>
                                </div>
                              </div>
                              <div
                                class="collapse"
                                id="accordion2-card-body-iyqlwryd"
                                aria-labelledby="accordion2-card-head-rdreayya"
                                data-parent="#accordion2"
                                role="tabpanel"
                              >
                                <div class="card-body">
                                  <p>
                                    All the test-network tokens will be mapped
                                    to 1% of the mainnet tokens.
                                  </p>
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                        <div class="tab-pane fade" id="tabs-1-3">
                          <div
                            class="card-group-custom card-group-corporate"
                            id="accordion3"
                            role="tablist"
                            aria-multiselectable="false"
                          >
                            {/* <!--Bootstrap card--> */}
                            <article class="card card-custom card-corporate">
                              <div class="card-header" role="tab">
                                <div class="card-title">
                                  <a
                                    id="accordion3-card-head-nhtmlfcg"
                                    data-toggle="collapse"
                                    data-parent="#accordion3"
                                    href="#accordion3-card-body-ekduvhcc"
                                    aria-controls="accordion3-card-body-ekduvhcc"
                                    aria-expanded="true"
                                    role="button"
                                  >
                                    What is the test-network token mining rules?
                                    <div class="card-arrow"></div>
                                  </a>
                                </div>
                              </div>
                              <div
                                class="collapse show"
                                id="accordion3-card-body-ekduvhcc"
                                aria-labelledby="accordion3-card-head-nhtmlfcg"
                                data-parent="#accordion3"
                                role="tabpanel"
                              >
                                <div class="card-body">
                                  <p>
                                    Please register and after login you will
                                    find all the mining rules.
                                  </p>
                                </div>
                              </div>
                            </article>
                            {/* <!--Bootstrap card--> */}
                            <article class="card card-custom card-corporate">
                              <div class="card-header" role="tab">
                                <div class="card-title">
                                  <a
                                    class="collapsed"
                                    id="accordion3-card-head-aemtnplu"
                                    data-toggle="collapse"
                                    data-parent="#accordion3"
                                    href="#accordion3-card-body-prxanmis"
                                    aria-controls="accordion3-card-body-prxanmis"
                                    aria-expanded="false"
                                    role="button"
                                  >
                                    What is the basic requirement to do mining
                                    <div class="card-arrow"></div>
                                  </a>
                                </div>
                              </div>
                              <div
                                class="collapse"
                                id="accordion3-card-body-prxanmis"
                                aria-labelledby="accordion3-card-head-aemtnplu"
                                data-parent="#accordion3"
                                role="tabpanel"
                              >
                                <div class="card-body">
                                  <p>
                                    You need a server with at least 40GB storage
                                    and a public stable static ip is required
                                    during mining
                                  </p>
                                </div>
                              </div>
                            </article>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="gradient-5">
            <section class="section section-lg" id="contacts">
              <div class="container">
                <div class="row row-30 row-md-50 align-items-center">
                  <div class="col-md-6 wow fadeInUp">
                    <div class="inset-right-xl-70">
                      <div class="headings-default">
                        <div class="headings-default-subtitle">Contacts</div>
                        <h3>Join Meson Community</h3>
                      </div>
                      <p class="d-inline-block text-width-medium">
                        Unflinching focus on creating real commercial
                        applications, Open network access standard, Release
                        monopolized value
                      </p>
                    </div>
                  </div>

                  <ul class="contact-default d-inline-block inset-left-xl-70" style={{margin:"0 auto"}}>
                    <li class="unit unit-spacing-lg align-items-center">
                      <div class="unit-left">
                        <span class="contact-default-icon icon fab fa-discord"></span>
                      </div>
                      <div class="unit-body">
                        <a
                          class="contact-default-link"
                          href="https://discord.gg/z6YfSHDkmS"
                        >
                          Join us on Discord
                        </a>
                      </div>
                    </li>

                    <li class="unit unit-spacing-lg align-items-center">
                      <div class="unit-left">
                        <span class="contact-default-icon icon fab fa-telegram"></span>
                      </div>
                      <div class="unit-body">
                        <a
                          class="contact-default-link"
                          href="https://t.me/mesonnetwork"
                        >
                          Join us on Telegram
                        </a>
                      </div>
                    </li>

                    <li class="unit unit-spacing-lg align-items-center">
                      <div class="unit-left">
                        <span class="contact-default-icon icon fab fa-github "></span>
                      </div>
                      <div class="unit-body">
                        <a
                          class="contact-default-link"
                          href="https://github.com/daqnext"
                        >
                          Join us on Github
                        </a>
                      </div>
                    </li>

                    <li class="unit unit-spacing-lg align-items-center">
                      <div class="unit-left">
                        <span class="contact-default-icon icon fab fa-twitter "></span>
                      </div>
                      <div class="unit-body">
                        <a
                          class="contact-default-link"
                          href="https://twitter.com/NetworkMeson"
                        >
                          Twitter
                        </a>
                      </div>
                    </li>

                    <li class="unit unit-spacing-lg align-items-center">
                      <div class="unit-left">
                        <span class="contact-default-icon icon fab fa-medium "></span>
                      </div>
                      <div class="unit-body">
                        <a
                          class="contact-default-link"
                          href="https://medium.com/meson-network"
                        >
                          Medium
                        </a>
                      </div>
                    </li>

                    <li class="unit unit-spacing-lg align-items-center">
                      <div class="unit-left">
                        <span class="contact-default-icon icon fas fa-envelope"></span>
                      </div>
                      <div class="unit-body">
                        <a
                          class="contact-default-link"
                          href="mailto:admin@meson.network"
                        >
                          Email US
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div class="gradient-1 bg-vide-1 bg-vide-2">

            {/* <!-- Breadcrumbs--> */}
            <section class="breadcrumbs-custom"
            //style={{background:"url(https://assets.meson.network:10443/static/video/video-3.jpg)"}}
            >
              <div class="container">
                <div class="headings-default">
                  <div class="headings-default-subtitle">News</div>
                  <h3>News update</h3>
                </div>
              </div>
            </section>
          </div>

          {/* <!-- news start--> */}   
                  
          <IndexBlogPage></IndexBlogPage>

          {/* <!-- news end--> */}

          <section class="section section-md bg-secondary-9 text-sm-left wow fadeInUp">
            <div class="container">
              <div class="row row-30 row-md-50">
                {/* <!--
            <div class="col-lg-5"  >
              <div class="inset-right-xl-50">
                <div class="title-style-1">Subscribe to our newsletter</div>
                <form class="rd-mailform rd-form rd-form-inline" data-form-output="form-output-global" data-form-type="subscribe" method="post" action="bat/rd-mailform.php">
                  <div class="form-wrap">
                    <input class="form-input" id="subscribe-form-email" type="email" name="email" data-constraints="@Email @Required">
                    <label class="form-label" for="subscribe-form-email">E-mail</label>
                  </div>
                  <div class="form-button">
                    <button class="button button-icon-2 button-primary" type="submit"><span class="icon mdi mdi-email-outline"></span></button>
                  </div>
                </form>
              </div>
            </div>


            <div class="col-sm-6 col-lg-3"  >
              <div class="inset-left-xl-70">
                <div class="title-style-1">Social media</div>
                <ul class="list-inline list-inline-md list-social">

                  <li><a class="icon mdi mdi-facebook" href="#"></a></li>
                  <li><a class="icon mdi mdi-youtube-play" href="#"></a></li>
                  <li><a class="icon mdi mdi-instagram" href="#"></a></li>
                  <li><a class="icon mdi mdi-twitter" href="#"></a></li>
                </ul>
              </div>
            </div>
          --> */}

                <div class="ol-sm-6 col-lg-3">
                  <div class="inset-left-xl-70">
                    <div class="title-style-1">General</div>
                    <ul class="list-style-1 d-inline-block footitems">
                      <li>
                        <a class="rd-nav-link" href="#roadmap">
                          Roadmap
                        </a>
                      </li>
                      <li>
                        <a class="rd-nav-link" href="https://assets.meson.network:10443/static/docs/Meson-Network-v1.6.pdf">
                          White Paper
                        </a>
                      </li>
                      <li>
                        <a class="rd-nav-link" href="#demo">
                          Demo
                        </a>
                      </li>
                      <li>
                        <a class="rd-nav-link" href="#faq">
                          Faq
                        </a>
                      </li>
                      <li>
                        <a class="rd-nav-link" href="#contacts">
                          Contacts
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="col-sm-6 col-lg-4">
                  <div class="inset-left-xl-70">
                    <div class="title-style-1">Community</div>
                    <ul class="list-style-1 d-inline-block footitems">
                      <li>
                        <a href="https://discord.gg/z6YfSHDkmS">
                          <i class="icon fab fa-discord"></i> Discord
                        </a>
                      </li>
                      <li>
                        <a href="https://t.me/mesonnetwork">
                          <i class="icon fab fa-telegram"></i> Telegram
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/daqnext">
                          <i class="icon  fab fa-github"></i> Github
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/NetworkMeson">
                          <i class="icon fab fa-twitter"></i> Twitter
                        </a>
                      </li>
                      <li>
                        <a href="https://medium.com/meson-network">
                          <i class="icon  fab fa-medium"></i> Medium
                        </a>
                      </li>
                      <li>
                        <a href="mailto:admin@meson.network">
                          <i class="icon fas fa-envelope"></i> Email US
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <footer class="section footer-classic context-light wow fadeInUp">
            <div class="container">
              <p class="rights">
                <span>
                  Copyright © meson.network 2021. All rights reserved.
                </span>
              </p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default HomePage;
