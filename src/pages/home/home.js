/*
 * @Author: your name
 * @Date: 2020-11-19 17:58:29
 * @LastEditTime: 2021-02-04 10:00:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edi
 * @FilePath: /mesonweb/src/pages/home/home.js
 */

import React from "react";

import data from "./homepage.html";

class HomePage extends React.Component {
  // constructor() {
  //     super();
  //     window.location.href="/homepage.html";
  //     // this.state = {
  //     //     iFrameHeight: "0px",
  //     // };

  // }

  render() {
    return (
      <iframe
        title="resg"
        srcDoc={data}
        style={{ width: "100%", border: "0px", height: "1100px" }}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        scrolling="auto"
      />
    );
  }

  // render() {
  //     return (
  //         <div style={{overflowY:"hidden"}}>
  //             <iframe
  //                 ref="iframe"
  //                 scrolling="yes"
  //                 frameBorder="0"
  //                 style={{
  //                     width: "100%",
  //                     height: this.state.iFrameHeight,
  //                     overflow: "hidden",
  //                 }}
  //                 onLoad={() => {
  //                     //iframe高度不超过content的高度即可
  //                     let h = document.documentElement.clientHeight-7;
  //                     this.setState({
  //                         iFrameHeight: h + "px",
  //                     });
  //                 }}
  //                 src={"/homepage.html"}
  //             />
  //         </div>
  //     );
  // }

  //     render() {
  //         return (
  //             <header class="header-global">
  //                 <nav id="navbar-main"
  //                     class="navbar navbar-main navbar-expand-lg navbar-dark navbar-theme-primary headroom py-lg-2 px-lg-6 headroom--not-bottom headroom--pinned headroom--top">
  //                 <div class="container">
  //                     <a class="navbar-brand @@logo_classes" href="../index.html">
  //                     <div class="d-flex align-items-center">
  //                         <img class="navbar-brand-dark rotate-logo" style="height: 60px"
  //                             src="/static/assets/brand/logo.svg" alt="Logo light"/>
  //                         <img class="navbar-brand-light rotate-logo" style="height: 60px"
  //                             src="/static/assets/brand/logo.svg" alt="Logo dark"/>
  //                     </div>
  //                 </a>
  //                 <div class="navbar-collapse collapse" id="navbar_global">

  //                     <ul class="navbar-nav navbar-nav-hover justify-content-center">
  //                         <li class="nav-item">
  //                             <a href="#home" class="nav-link scrollto">HOME</a>
  //                         </li>

  //                         <li class="nav-item">
  //                             <a href="#about" class="nav-link scrollto">ABOUT</a>
  //                         </li>

  //                         <li class="nav-item">
  //                             <a href="#dev" class="nav-link scrollto">DEVELOP</a>
  //                         </li>

  //                         <li class="nav-item">
  //                             <a href="#faq" class="nav-link scrollto">FAQ</a>
  //                         </li>

  //                         <li class="nav-item">
  //                             <a href="#pricing" class="nav-link scrollto">PRICING</a>
  //                         </li>

  //                         <li class="nav-item">
  //                             <a href="#blog" class="nav-link scrollto">BLOG</a>
  //                         </li>

  //                     </ul>

  //                 </div>

  //                 <div class="dropdown  mb-lg-0 ">
  //                     <a id="langsDropdown" style="color: white" href="#" data-toggle="dropdown" aria-haspopup="true"
  //                         aria-expanded="true" class="dropdown-toggle footer-language-link pb-2">
  //                         <img src="/static/assets/flags/united-states-of-america.svg" alt="USA Flag"
  //                             class="language-flag"/>
  //                         English
  //                         <i class="fas fa-chevron-down ml-1"></i>
  //                     </a>
  //                     <div aria-labelledby="langsDropdown" class="dropdown-menu dropdown-menu-center mt-0  "
  //                         style="position: absolute; transform: translate3d(0px, 30px, 0px); top: 0px; left: 0px; will-change: transform;"
  //                         x-placement="bottom-start">
  //                                 <a href="#" class="dropdown-item text-gray text-sm">
  //                                     <img src="/static/assets/flags/united-states-of-america.svg" alt="Germany Flag" class="language-flag"> English</a>
  //                         {/* <!-- <a href="#" class="dropdown-item text-gray text-sm"><img src="/static/assets/flags/china.svg" alt="Germany Flag" class="language-flag">中文</a>--> */}
  //                     </div>
  //                 </div>

  //                 <div class="d-flex d-lg-none align-items-center ml-auto">
  //                     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global"
  //                         aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation"><span
  //                             class="navbar-toggler-icon"></span></button>
  //                 </div>
  //             </div>
  //         </nav>
  //     </header>
  //     <main>

  //         <div class="preloader bg-soft flex-column justify-content-center align-items-center" style="display: none;">
  //             <img class="loader-element" src="/static/assets/brand/logo.svg" height="50" alt="Rocket logo">
  //         </div>

  //         {/* <!-- Hero --> */}
  //         <section style="    padding-bottom: 5em !important;" id="home"
  //             class="section-header pb-11 pb-lg-13 bg-primary text-white">
  //             <div class="container">
  //                 <div class="row justify-content-center">
  //                     <div class="col-12 col-md-10 text-center ">
  //                         {/* <!-- <h1 class="display-1 mb-4">Imagine what we will accomplish together</h1>--> */}

  //                         <span style="
  //                         font-weight: 100;
  //                         font-size: 80px;
  //                     ">Meson</span>

  //                         <span style="
  //                         font-weight: 100;
  //                         font-size: 80px;
  //                     ">.network</span>

  //                         {/* <!--                    <p class="lead mb-5 px-lg-5">以商业实际应用为导向，开放网络接入标准，释放巨头垄断利润</p>--> */}
  //                         <p class="lead mb-5 px-lg-5">Unflinching focus on creating real commercial applications, Open
  //                             network access standard, Release monopolized value</p>

  //                         <div style="width: 100%;height: 10px;">

  //                         </div>

  //                         <div>current : DEV-1.1 test network</div>
  //                         <div>
  //                             <span id="autoprint"> </span>
  //                         </div>
  //                         <div>
  //                             <span id="autoprint2"></span>
  //                         </div>

  //                         {/* <!-- Button Modal --> */}
  //                         <div style="margin-top: 50px">
  //                             <a class="btn btn-secondary" href="/login"><span class="mr-2"><i
  //                                         class="fas fa-hand-pointer"></i></span> START</a>
  //                             <a class="btn  btn-outline-white btn-docs animate-up-2 ml-3"
  //                                 href="/static/docs/Meson-Network-v1.6.pdf"><i class="fas fa-book mr-2"></i>White
  //                                 Paper</a>
  //                         </div>

  //                     </div>
  //                 </div>
  //             </div>

  //         </section>

  //         <section class="section section-lg bg-primary text-white" style="padding-bottom: 15em;">
  //             <div class="container">

  //                 <div style="text-align: center;margin: 30px;">
  //                     <h2 class="h1 font-weight-bolder mb-4">How Meson Works</h2>
  //                 </div>

  //                 <div style="
  //             max-width: 400px;
  //             text-align: center;
  //             border: 1px dashed white;
  //     margin: 0px auto;
  //     font-size: 50px;
  //     padding: 20px 40px;">
  //                     <i class="fab fa-tiktok"></i>
  //                     <i class="fab fa-youtube"></i>
  //                     <i class="fab fa-twitch"></i>
  //                     <i class="fab fa-xbox"></i>
  //                     <span>........</span>
  //                 </div>

  //                 <div
  //                     style="position: relative ;height: 60px ; width: 100px;border: 1px dashed white;margin: 10px auto;border-bottom: 0px;border-top: 0px">
  //                     <span style="position: absolute;left: -20px;top:20px">$</span>
  //                     <span style="position: absolute;left: 110px;top:20px">Acceleration</span>

  //                     <i style="top: 50px;position: absolute;font-size: 20px;left: -7px;"
  //                         class="myblink fas fa-angle-down nav-link-arrow"></i>
  //                     <i style="position: absolute;left: 92px;font-size: 20px;top: -10px;"
  //                         class="myblink fas fa-angle-up nav-link-arrow"></i>
  //                 </div>

  //                 <div style="
  //                 position: relative;
  //             max-width: 400px;
  //             text-align: center;
  //             border: 1px dashed white;
  //     margin: 0px auto;
  //     font-size: 20px;
  //     padding: 20px 40px;">

  //                     <span>Meson Network [Layer2] <i class="  fas fa-cubes"></i> </span>

  //                     <div style="position: absolute;right: 10px;
  //     top: 80px;
  //     height: 260px;
  //     width: 1px;
  //     border-right: 1px dashed white;">

  //                     </div>

  //                     <i style="position: absolute;right: 5px;font-size: 20px;top: 70px;"
  //                         class="myblink fas fa-angle-up nav-link-arrow"></i>
  //                 </div>

  //                 <div
  //                     style="position: relative ;height: 60px ; width: 100px;border: 1px dashed white;margin: 10px auto;border-bottom: 0px;border-top: 0px">
  //                     <span style="position: absolute;left: -20px;top:20px">$</span>
  //                     <span style="position: absolute;left: 110px;top:20px">Acceleration</span>
  //                     <i style="top: 50px;position: absolute;font-size: 20px;left: -7px;"
  //                         class="myblink fas fa-angle-down nav-link-arrow"></i>
  //                     <i style="position: absolute;left: 92px;font-size: 20px;top: -10px;"
  //                         class="myblink fas fa-angle-up nav-link-arrow"></i>
  //                 </div>

  //                 <div style="
  //             max-width: 330px;
  //             text-align: center;
  //             border: 1px dashed white;
  //     margin: 0px auto;
  //     padding: 20px 40px;">

  //                     <div style="margin:5px; border: 1px solid white;border-radius: 5px">[Miner]Jack's Terminal Server <i
  //                             class="fas fa-server"></i></div>
  //                     <div style="margin:5px;border: 1px solid white;border-radius: 5px">[Miner]Leo's Terminal Server <i
  //                             class="fas fa-server"></i></div>
  //                     <div style="margin:5px;border: 1px solid white;border-radius: 5px">[Miner]Herry's Terminal Server <i
  //                             class="fas fa-server"></i></div>
  //                     <div style="margin:5px; ">....More distributed Terminals </div>
  //                 </div>

  //                 <div style="
  //             position: relative;
  //             max-width: 400px;
  //             text-align: center;
  //             border: 1px dashed white;
  //     margin: 0px auto;
  //     margin-top: 30px;
  //     padding: 20px 40px;">

  //                     <i style="top: -17px;position: absolute;font-size: 20px;right: 4px;"
  //                         class="myblink fas fa-angle-down nav-link-arrow"></i>
  //                     <div>[Optional Storage Layer 1]</div>
  //                     <div style="margin:5px;border: 1px solid white;border-radius: 5px">IPFS</div>
  //                     <div style="margin:5px;border: 1px solid white;border-radius: 5px">FILECOIN</div>
  //                     <div style="margin:5px;border: 1px solid white;border-radius: 5px">CRUST</div>
  //                     <div style="margin:5px;border: 1px solid white;border-radius: 5px">ARWEAVE</div>
  //                 </div>

  //             </div>
  //             <div class="pattern bottom"></div>
  //         </section>

  //         <section id="about" class="section section-lg pt-6">
  //             <div class="container">
  //                 <div class="row justify-content-center mb-5 mb-lg-6">
  //                     <div class="col-12 col-md-8 text-center">
  //                         <h2 class="h1 font-weight-bolder mb-4">Try Meson</h2>
  //                         {/* <!--                    <p class="lead">Meson 提供中小企业稳定、价格合理的加速服务，为终端用户提供资源变现渠道</p></div>--> */}
  //                         <p class="lead">Meson offers stable and affordable acceleration services for SMEs, providing a
  //                             method for end-users to actively monetize</p>
  //                     </div>
  //                 </div>
  //                 <div class="row">
  //                     <div class="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0 text-center">
  //                         <div class="card border-light p-4">
  //                             <div class="card-header pb-0">
  //                                 <div class="image-md"><img src="/static/assets/icons/sales.svg" alt="icon"></div>
  //                                 <h2 class="h4 mt-3">Miner[Terminal]</h2>
  //                                 {/* <!--                            <p class="mb-0">按标准接入网络提供服务并获取 token</p></div>--> */}
  //                                 <p class="mb-0">Provide services by accessing the network according to standards and
  //                                     obtain tokens</p>
  //                             </div>
  //                             <div class="card-body">
  //                                 <ul class="list-group">
  //                                     <li class="list-group-item d-flex text-left pl-0"><span class="list-icon"><i
  //                                                 class="fas fa-check-circle text-success"></i></span>
  //                                         {/* <!--                                    <div>带宽存储资源闲置</div>--> */}
  //                                         <div>Idle bandwidth/storage resources</div>
  //                                     </li>
  //                                     <li class="list-group-item d-flex text-left pl-0"><span class="list-icon"><i
  //                                                 class="fas fa-check-circle text-success"></i></span>
  //                                         {/* <!--                                    <div>终端一键部署</div>--> */}
  //                                         <div>One-Click Terminal Deployment</div>
  //                                     </li>
  //                                     <li class="list-group-item d-flex text-left pl-0"><span class="list-icon"><i
  //                                                 class="fas fa-check-circle text-success"></i></span>
  //                                         {/* <!--                                    <div>实时查看收益</div>--> */}
  //                                         <div>View earnings in real time</div>
  //                                     </li>
  //                                 </ul>
  //                             </div>
  //                             <div class="card-footer pt-0"><a href="/login" class="btn btn-block btn-primary">start<span
  //                                         class="icon icon-xs ml-2"><i class="fas fa-arrow-right"></i></span></a></div>
  //                         </div>
  //                     </div>

  //                     <div class="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0 text-center">
  //                         <div class="card border-light p-4">
  //                             <div class="card-header pb-0">
  //                                 <div class="image-md"><img src="/static/assets/icons/research.svg" alt="icon"></div>
  //                                 <h2 class="h4 mt-3">Client</h2>
  //                                 {/* <!--                            <p class="mb-0">使用 Meson 加速您的应用并保护其免受互联网的恶意攻击</p></div>--> */}
  //                                 <p class="mb-0">Use Meson to accelerate your application and protect it from malicious
  //                                     attacks from the Internet</p>
  //                             </div>
  //                             <div class="card-body">
  //                                 <ul class="list-group">
  //                                     <li class="list-group-item d-flex text-left pl-0"><span class="list-icon"><i
  //                                                 class="fas fa-check-circle text-success"></i></span>
  //                                         {/* <!--                                    <div>后台创建并配置专属链接</div>--> */}
  //                                         <div>Create and configure dedicated links</div>
  //                                     </li>
  //                                     <li class="list-group-item d-flex text-left pl-0"><span class="list-icon"><i
  //                                                 class="fas fa-check-circle text-success"></i></span>
  //                                         {/* <!--                                    <div>网络自动部署</div>--> */}
  //                                         <div>Automatic network deployment</div>
  //                                     </li>
  //                                     <li class="list-group-item d-flex text-left pl-0"><span class="list-icon"><i
  //                                                 class="fas fa-check-circle text-success"></i></span>
  //                                         {/* <!--                                    <div>全球加速</div>--> */}
  //                                         <div>Global acceleration</div>
  //                                     </li>
  //                                 </ul>
  //                             </div>
  //                             <div class="card-footer pt-0"><a href="/login" class="btn btn-block btn-primary">start<span
  //                                         class="icon icon-xs ml-2"><i class="fas fa-arrow-right"></i></span></a></div>
  //                         </div>
  //                     </div>
  //                     <div class="col-12 col-md-6 col-lg-4 mb-5 mb-lg-0 text-center">
  //                         <div class="card border-light p-4">
  //                             <div class="card-header pb-0">
  //                                 <div class="image-md"><img src="/static/assets/icons/marketing.svg" alt="icon"></div>
  //                                 {/* <!--                            <h2 class="h4 mt-3">合作</h2>--> */}
  //                                 <h2 class="h4 mt-3">Cooperation</h2>
  //                                 {/* <!--                            <p class="mb-0">合理的商业模式通过 Meson 来触达更多终端节点</p></div>--> */}
  //                                 <p class="mb-0">Reasonable business model to reach more terminal nodes through Meson</p>
  //                             </div>
  //                             <div class="card-body">
  //                                 <ul class="list-group">
  //                                     <li class="list-group-item d-flex text-left pl-0"><span class="list-icon"><i
  //                                                 class="fas fa-check-circle text-success"></i></span>
  //                                         {/* <!--                                    <div>商业模式沟通</div>--> */}
  //                                         <div>Communicate business models</div>
  //                                     </li>
  //                                     <li class="list-group-item d-flex text-left pl-0"><span class="list-icon"><i
  //                                                 class="fas fa-check-circle text-success"></i></span>
  //                                         <div>Establishing standards & Profit distribution</div>
  //                                     </li>
  //                                     <li class="list-group-item d-flex text-left pl-0"><span class="list-icon"><i
  //                                                 class="fas fa-check-circle text-success"></i></span>
  //                                         {/* <!--                                    <div>网络反馈</div>--> */}
  //                                         <div>Network feedback</div>
  //                                     </li>
  //                                 </ul>
  //                             </div>
  //                             <div class="card-footer pt-0"><a href="/login" class="btn btn-block btn-primary">start<span
  //                                         class="icon icon-xs ml-2"><i class="fas fa-arrow-right"></i></span></a></div>
  //                         </div>
  //                     </div>
  //                 </div>
  //             </div>
  //         </section>

  //         <section id="dev" class="section section-lg pb-5 bg-soft" style="
  //     padding-top: 0px;
  //     padding-bottom: 12rem !important;
  //     background-color: white !important;

  // ">
  //             <div class="container">
  //                 <div class="row">
  //                     <div class="col-12 text-center mb-5">
  //                         <h2 class="mb-4">Join Dev Team</h2>
  //                         <p class="lead mb-5">Join dev team to get extra<span class="font-weight-bolder"> Tokens</span>
  //                         </p><a href="#" class="icon icon-lg text-gray mr-3"><span class="fab fa-github-alt"></span>
  //                         </a><a href="#" class="icon icon-lg text-gray mr-3"><span class="fab fa-aws"></span> </a><a
  //                             href="#" class="icon icon-lg text-gray"><span class="fab fa-node"></span></a>
  //                     </div>
  //                     <div class="col-12 text-center">
  //                         <a href="https://github.com/daqnext" class="btn btn-secondary animate-up-2"><span
  //                                 class="mr-2"><i class="fab fa-github-alt"></i></span>https://github.com/daqnext</a>
  //                     </div>
  //                 </div>
  //             </div>
  //         </section>

  //         <section class="section section-lg bg-primary text-white">
  //             <div class="container">
  //                 <div class="row row-grid align-items-center">
  //                     <div class="col-12 col-lg-5">

  //                         <h2 class="h1 font-weight-bolder mb-4">The Problem Meson Solved</h2>

  //                     </div>
  //                     <div class="col-12 col-lg-6 ml-lg-auto">
  //                         <div class="row">
  //                             <div class="col-12 col-sm-6">
  //                                 <div class="card bg-white shadow-soft text-primary rounded mb-4">
  //                                     <div class="px-3 px-lg-4 py-5 text-center"><span class="icon icon-lg mb-4"><span
  //                                                 class="fab fa-hotjar"></span></span>
  //                                         <h5 class="font-weight-normal text-primary">Streaming Media Outbreak</h5>
  //                                         <p>Stream media platforms such as TikTok, Netflix and Youtube spent tens of
  //                                             billions of US dollars to purchase acceleration services</p>
  //                                     </div>
  //                                 </div>
  //                                 <div class="card bg-white shadow-soft text-primary rounded mb-4">
  //                                     <div class="px-3 px-lg-4 py-5 text-center"><span class="icon icon-lg mb-4"><span
  //                                                 class="fas fa-unlink"></span></span>
  //                                         <h5 class="font-weight-normal text-primary">Break Market Monopoly</h5>
  //                                         <p>Market pricing was fixed and market profit is split between several
  //                                             acceleration solution giants, ordinary terminals that can provide comparable
  //                                             configurations and services are not able to acquire any benefits</p>
  //                                     </div>
  //                                     <!--                                <p>Global cloud computing is growing rapidly, but many IDC server rooms have underutilized servers and bandwidth, with low idle rates and no good liquidity channels.</p></div>-->
  //                                 </div>

  //                             </div>

  //                             <div class="col-12 col-sm-6 pt-lg-5">
  //                                 <div class="card bg-white shadow-soft text-primary rounded mb-4">
  //                                     <div class="px-3 px-lg-4 py-5 text-center"><span class="icon icon-lg mb-4"><span
  //                                                 class="fas fa-hand-holding-usd"></span></span>
  //                                         <h5 class="font-weight-normal text-primary">Excavate Sunk Cost</h5>
  //                                         <p>Due to the swift develpoment of cloud computing, there are many free general
  //                                             servers around the world. However, at any given point in time, a significant
  //                                             portion of their bandwidth remains idle and without a good method to
  //                                             actively monetize</p>
  //                                     </div>
  //                                 </div>
  //                                 <div class="card bg-white shadow-soft text-primary rounded mb-4">
  //                                     <div class="px-3 px-lg-4 py-5 text-center"><span class="icon icon-lg mb-4"><span
  //                                                 class="fas fa-circle-notch"></span></span>
  //                                         <h5 class="font-weight-normal text-primary">The Missing Commercial Loop in the
  //                                             Blockchain</h5>
  //                                         <p>Many blockchain projects lack a closed commercial utility loop, and are
  //                                             unable to grow sustainably</p>
  //                                     </div>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //             </div>

  //         </section>

  //         <section id="pricing" class="section-header bg-primary text-white pb-7 pb-lg-11" style="padding-top: 10px">
  //             <div class="container">
  //                 <div class="row   mb-3">
  //                     <div class="col-12 col-md-10  ">
  //                         <h1 class="display-2 mb-3">CDN Pricing</h1>

  //                     </div>
  //                 </div>
  //                 <div class="row text-gray">
  //                     <div class="col-12 col-lg-6">
  //                         <div class="card shadow-soft mb-5 mb-lg-6 px-2">
  //                             <div class="card-header border-light py-5 px-4">
  //                                 <div class="d-flex mb-3"><span class="h5 mb-0">$</span> <span
  //                                         class="price display-2 mb-0" data-annual="0" data-monthly="0">0</span>
  //                                     <span class="h6 font-weight-normal align-self-end">/month</span></div>
  //                                 <h4 class="mb-3 text-black">Free trial</h4>
  //                                 <p class="font-weight-normal mb-0">Free use with 10GB global accerlation</p>
  //                             </div>
  //                             <div class="card-body pt-5">
  //                                 <ul class="list-group simple-list">
  //                                     <li class="list-group-item font-weight-normal"><span class="icon-gray"><i
  //                                                 class="fas fa-check"></i></span>Global Support
  //                                     </li>
  //                                     <li class="list-group-item font-weight-normal"><span class="icon-gray"><i
  //                                                 class="fas fa-check"></i></span>Free
  //                                     </li>
  //                                     <li class="list-group-item font-weight-normal"><span class="icon-gray"><i
  //                                                 class="fas fa-check"></i></span>10GB Limit
  //                                     </li>
  //                                 </ul>
  //                             </div>
  //                         </div>
  //                     </div>
  //                     <div class="col-12 col-lg-6">
  //                         <div class="card shadow-soft mb-5 mb-lg-6">
  //                             <div class="card-header border-light py-5 px-4">
  //                                 <div class="d-flex mb-3 text-primary"><span class="h5 mb-0">$</span> <span
  //                                         class="price display-2 text-primary mb-0" data-annual="199"
  //                                         data-monthly="99">0.003 </span> <span
  //                                         class="h6 font-weight-normal align-self-end">/GB</span>
  //                                 </div>
  //                                 <h4 class="mb-3 text-black">FAST/STABLE/CHEAP</h4>
  //                                 <p class="font-weight-normal mb-0">No bandwidth limit</p>
  //                             </div>
  //                             <div class="card-body pt-5">
  //                                 <ul class="list-group simple-list">
  //                                     <li class="list-group-item font-weight-normal"><span class="icon-primary"><i
  //                                                 class="fas fa-check"></i></span>Global Support(220+ countries)
  //                                     </li>
  //                                     <li class="list-group-item font-weight-normal"><span class="icon-primary"><i
  //                                                 class="fas fa-check"></i></span>All features on <span
  //                                             class="font-weight-bolder">FREE</span> plan
  //                                     </li>
  //                                     <li class="list-group-item font-weight-normal"><span class="icon-primary"><i
  //                                                 class="fas fa-check"></i></span>No bandwidth limit
  //                                     </li>
  //                                 </ul>
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //                 <div class="row justify-content-center">
  //                     <div class="col col-md-10 text-center"><a href="/login" target="_blank"
  //                             class="btn btn-secondary animate-up-2">Start free<span class="icon icon-xs ml-3"><i
  //                                     class="fas fa-arrow-right"></i></span></a></div>
  //                 </div>
  //             </div>
  //         </section>

  //         <section id="blog" class="section-header bg-primary text-white pb-7 pb-lg-11"
  //             style="padding-top: 0px !important;">
  //             <div class="container">
  //                 <div class="row">
  //                     <div class="col-12 col-md-8">
  //                         <h1 class="display-2 mb-4">Blog</h1>
  //                     </div>
  //                 </div>
  //             </div>
  //         </section>

  //         <section id="blog2"  class="section section-lg line-bottom-light">
  //             <div class="container mt-n7 mt-sm-n9 mt-lg-n12 z-2"  >
  //                 <div class="row"  id="bloglistcontainer">
  //                     <div class="col-lg-12 mb-5" id="bloglistcontainerwhite">
  //                         <div class="card bg-white border-light shadow-soft " style="padding: 25px;">
  //                             <div class="social-share-cs" style="float: right"></div>
  //                             <div  id="blogtitle"  style="margin: 10px 0px;font-size: 22px;"></div>
  //                             <img id="blogcover" src="" style="margin: 10px 0;border-radius: 10px;" />
  //                             <div id="blogcontent"></div>
  //                             <div id="blograwtext"></div>
  //                         </div>
  //                     </div>

  //                     <div class="col-12 col-md-6 col-lg-4 mb-4 mb-lg-5" id="blogitem" style="display: none">
  //                         <div class="card bg-white border-light shadow-soft  rounded"    >
  //                             <img src="#" class="card-img-top fmxh-300" alt="">
  //                             <div class="card-body p-0 pt-4" style="text-align: center;padding: 10px !important;">
  //                                 <a href="#" style="color: gray;"   id="blogitemtitle"  ></a>
  //                             </div>
  //                         </div>
  //                     </div>

  //                 </div>
  //             </div>
  //         </section>

  //         <div class="container" id="faq" style="margin-bottom: 100px">
  //             <div class="row justify-content-center mb-4 mb-lg-6" style="    margin: 120px 0px 0px 0px !important;">
  //                 <div class="col-12 col-lg-8 text-center">
  //                     <h1 class="display-3 mb-4">FAQ</h1>
  //                 </div>
  //             </div>
  //             <div class="row justify-content-center">
  //                 <div class="col-12 col-lg-8">
  //                     <div class="accordion">
  //                         <div class="card card-sm card-body border border-light rounded mb-3">
  //                             <div data-target="#panel-1" class="accordion-panel-header" data-toggle="collapse"
  //                                 role="button" aria-expanded="false" aria-controls="panel-1"><span class="h6 mb-0">How to
  //                                     prevent the scenario where terminal users used IP pools to fake a large amount of
  //                                     access requests and maliciously earn tokens?</span>
  //                                 <span class="icon"><i class="fas fa-angle-down"></i></span></div>
  //                             <div class="collapse" id="panel-1">
  //                                 <div class="pt-3">
  //                                     <p class="mb-0">We would obfuscate file names and hide the original urls.
  //                                         We also use IP statistical analysis to screen out cheating terminal nodes.</p>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                         <div class="card card-sm card-body border border-light rounded mb-3">
  //                             <div data-target="#panel-2" class="accordion-panel-header" data-toggle="collapse"
  //                                 role="button" aria-expanded="false" aria-controls="panel-2"><span class="h6 mb-0">What
  //                                     would happen if users used Meson to cache illegal content?</span>
  //                                 <span class="icon"><i class="fas fa-angle-down"></i></span></div>
  //                             <div class="collapse" id="panel-2">
  //                                 <div class="pt-3">
  //                                     <p class="mb-0">We could use AI systems to discover and delete illegal
  //                                         content.</p>
  //                                 </div>
  //                             </div>
  //                         </div>

  //                         <!--
  //                     <div class="card card-sm card-body border border-light rounded mb-3">
  //                         <div data-target="#panel-3" class="accordion-panel-header" data-toggle="collapse" role="button"
  //                              aria-expanded="false" aria-controls="panel-3"><span class="h6 mb-0">CDN companies in China need to apply for licenses, will this be a problem for Meson?</span>
  //                             <span class="icon"><i class="fas fa-angle-down"></i></span></div>
  //                         <div class="collapse" id="panel-3">
  //                             <div class="pt-3"><p class="mb-0">Decentralized and distributed nodes do not have such
  //                                 problems.</p></div>
  //                         </div>
  //                     </div>
  //                     -->

  //                         <div class="card card-sm card-body border border-light rounded mb-3">
  //                             <div data-target="#panel-4" class="accordion-panel-header" data-toggle="collapse"
  //                                 role="button" aria-expanded="false" aria-controls="panel-4"><span class="h6 mb-0">What
  //                                     is the safety assurance for enterprise level users?</span>
  //                                 <span class="icon"><i class="fas fa-angle-down"></i></span></div>
  //                             <div class="collapse" id="panel-4">
  //                                 <div class="pt-3">
  //                                     <p class="mb-0">The code is open source so any users can check and verify
  //                                         the security of the protocol.</p>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                         <div class="card card-sm card-body border border-light rounded mb-3">
  //                             <div data-target="#panel-5" class="accordion-panel-header" data-toggle="collapse"
  //                                 role="button" aria-expanded="false" aria-controls="panel-5"><span class="h6 mb-0">How to
  //                                     deal with terminal nodes that cheat and do not transmit data?</span>
  //                                 <span class="icon"><i class="fas fa-angle-down"></i></span></div>
  //                             <div class="collapse" id="panel-5">
  //                                 <div class="pt-3">
  //                                     <p class="mb-0">All terminal nodes need to stake token, once cheating
  //                                         behaviors are discovered, penalties will be given out to terminal nodes.</p>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //             </div>

  //         </div>

  //         {/* <!--#include file="./footer.html"--> */}
  //         <footer class="footer section pt-6 pt-md-8 pt-lg-10 pb-3 bg-primary text-white overflow-hidden"
  //             style="padding-top: 150px !important;">

  //             <div class="container">
  //                 <div class="row">
  //                     <div class="col-lg-4 mb-4 mb-lg-0"><a class="footer-brand mr-lg-5 d-flex" href="./index.html"><img
  //                                 src="/static/assets/brand/logo.svg" class="mr-3" alt="Footer logo">
  //                             <h4 style="margin-top: 5px">Meson.Network</h4>
  //                         </a>
  //                         {/* <!--                    <p class="my-4">以商业实际应用为导向，开放网络接入标准，释放巨头垄断利润</p>--> */}
  //                         <p class="my-4">Unflinching focus on creating real commercial applications, Open network access
  //                             standard, Release monopolized value</p>
  //                     </div>

  //                     <div class="col-6 col-sm-3 col-lg-2 mb-4 mb-lg-0">
  //                         <h5>General</h5>
  //                         <ul class="links-vertical">
  //                             <li><a href="#home" class="scrollto">Home</a></li>
  //                             <li><a href="#about" class="scrollto">About</a></li>
  //                             <li><a href="#pricing" class="scrollto">Pricing</a></li>
  //                             <li><a href="/static/docs/Meson-Network-v1.4.pdf">News and Events</a></li>
  //                         </ul>
  //                     </div>

  //                     <div class="col-6 col-sm-3 col-lg-2 mb-4 mb-lg-0">
  //                         <h5>Technology</h5>
  //                         <ul class="links-vertical">
  //                             <li><a href="#faq" class="scrollto">FAQ</a></li>
  //                             <li><a href="/static/docs/Meson-Network-v1.4.pdf">Whitepaper</a></li>
  //                             <li><a href="https://github.com/daqnext">Developers</a></li>
  //                             <li><a href="mailto: daqnext@gmail.com">Contact</a></li>
  //                         </ul>
  //                     </div>

  //                     <div class="col-12 col-sm-6 col-lg-4" style="font-size: 30px">
  //                         <h5>Community</h5>
  //                         <a href="https://t.me/mesonnetwork"><i class="fab fa-telegram"></i> </a>
  //                         <a href="https://discord.gg/jW3uq87Y"><i class="fab fa-discord"></i> </a>
  //                         <a href="https://github.com/daqnext"><i class="fab fa-github"></i> </a>
  //                         <a href="https://medium.com/daqnext"><i class="fab fa-medium-m"></i></a>
  //                         <a href="https://twitter.com/daqnext/"><i class="fab fa-twitter"></i></a>
  //                         <a href="mailto: daqnext@gmail.com"><i class="fas fa-envelope"></i></a>
  //                     </div>
  //                 </div>

  //                 <hr class="my-4 my-lg-5">
  //                 <div class="row">
  //                     <div class="col pb-4 mb-md-0">
  //                         <div class="d-flex text-center justify-content-center align-items-center">
  //                             <p class="font-weight-normal font-small mb-0">Copyright © <a href="https://meson.network"
  //                                     target="_blank">meson.network</a>
  //                                 <span class="current-year">2020</span>. All rights reserved.</p>
  //                         </div>
  //                     </div>
  //                 </div>
  //             </div>

  //         </footer>
  //     </main>

  //     {/* <!-- Core --> */}
  //     <script src="/static/vendor/jquery/dist/jquery.min.js"></script>
  //     <script src="/static/vendor/jquery.easing/jquery.easing.min.js"></script>
  //     <script src="/static/vendor/popper.js/dist/umd/popper.min.js"></script>
  //     <script src="/static/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
  //     <script src="/static/vendor/headroom.js/dist/headroom.min.js"></script>

  //     {/* <!-- Vendor JS --> */}
  //     <script src="/static/vendor/jquery-countdown/dist/jquery.countdown.min.js"></script>
  //     <script src="/static/vendor/smooth-scroll/dist/smooth-scroll.polyfills.min.js"></script>
  //     {/* <!--
  // <script src="/static/vendor/countup.js/dist/countUp.min.js"></script>

  // <script src="/static/vendor/prismjs/prism.js"></script>
  // --> */}

  //     {/* <!-- Chartist --> */}
  //     {/* <!--
  // <script src="/static/vendor/chartist/dist/chartist.min.js"></script>
  // <script src="/static/vendor/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js"></script>
  // --> */}

  //     {/* <!-- Vector Maps -->
  //     <!--
  // <script src="/static/vendor/jqvmap/dist/jquery.vmap.min.js"></script>
  // <script src="/static/vendor/jqvmap/dist/maps/jquery.vmap.world.js"></script>
  // --> */}

  //     {/* <!-- Rocket JS --> */}
  //     <script src="/static/js/rocket.js"></script>

  //     <script>
  //         {var typed2 = new Typed('#autoprint2', {
  //             typeSpeed: 30,
  //             loop: false,
  //             onComplete: (self) => {
  //                 setTimeout(() => {
  //                     typed.reset();
  //                 }, 5000);
  //             },
  //             strings: ['',
  //                 '# mining and getting profit on general server. ']
  //         });

  //         typed2.stop();

  //         var typed = new Typed('#autoprint', {
  //             typeSpeed: 50,
  //             loop: false,
  //             onComplete: (self) => {
  //                 typed2.start();
  //                 typed2.reset();
  //             },
  //             strings: ['',
  //                 '# the next generation distributed acceleration network.',
  //             ]
  //         });
  //     }
  //     </script>

  //     <script>

  //         // Smooth scroll for the navigation menu and links with .scrollto classes

  //         /*
  //        $('.navbar-toggler').click(function (){
  //            $('#navbar_global').show();
  //        });
  //          */

  //         var scrolltoOffset = $('#navbar-main').outerHeight() - 21;
  //         $(document).on('click', '.scrollto', function (e) {

  //             $('#navbar_global').removeClass('show');

  //             if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
  //                 var target = $(this.hash);
  //                 if (target.length) {
  //                     e.preventDefault();

  //                     var scrollto = target.offset().top - scrolltoOffset;

  //                     if ($(this).attr("href") == '#header') {
  //                         scrollto = 0;
  //                     }

  //                     $('html, body').animate({
  //                         scrollTop: scrollto
  //                     }, 1500, 'easeInOutExpo');

  //                     if ($(this).parents('.nav-menu, .mobile-nav').length) {
  //                         $('.nav-menu .active, .mobile-nav .active').removeClass('active');
  //                         $(this).closest('li').addClass('active');
  //                     }

  //                     if ($('body').hasClass('mobile-nav-active')) {
  //                         $('body').removeClass('mobile-nav-active');
  //                         $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  //                         $('.mobile-nav-overly').fadeOut();
  //                     }
  //                     return false;
  //                 }
  //             }
  //         });

  //     </script>

  //     <script>
  //         function blink_text() {
  //             $('.myblink').fadeOut(500);
  //             $('.myblink').fadeIn(500);
  //         }
  //         setInterval(blink_text, 1000);
  //     </script>

  //     <!-- blog -->
  //     <script>
  //         function getUrlParam(name) {
  //             var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //             var r = window.location.search.substr(1).match(reg);
  //             if (r != null) return unescape(r[2]); return null;
  //         }
  //         var blogid = getUrlParam("blog")
  //         console.log(blogid);
  //         if (blogid != null) {

  //             //get blog in url
  //             var settings = {
  //                 "url": "/api/v1/common/getblog",
  //                 "method": "POST",
  //                 "timeout": 0,
  //                 "headers": {
  //                     "Content-Type": "application/json"
  //                 },
  //                 "data": JSON.stringify({ "id": parseInt(blogid) }),
  //             };

  //             $.ajax(settings).done(function (response) {
  //                 if (response.status == 0) {
  //                     let blog = response.data
  //                     //console.log(blog);
  //                     $('#blogtitle').html(blog.title);
  //                     $('#blogcover').attr('src', "https://coldcdn.com/api/cdn/hx9216" +blog.cover_img_url);
  //                     if (blog.content_url) {
  //                         $('#blogcontent').load("https://coldcdn.com/api/cdn/hx9216" +blog.content_url);
  //                     }
  //                 }
  //             });

  //             /////share////////
  //             var $config = {
  //                 title: blog.title,
  //                 description: blog.title,
  //                 sites: [  'google', 'facebook', 'twitter','wechat'], // enable
  //                 //disabled: ['google', 'facebook', 'twitter'], //
  //                 wechatQrcodeTitle: "share this blog", //
  //                 wechatQrcodeHelper: '',
  //             };
  //             socialShare('.social-share-cs', $config);

  //             $('html, body').animate({
  //                 scrollTop: $('#blog').offset().top
  //             }, 1500, 'easeInOutExpo');

  //         }else{
  //             $('#bloglistcontainerwhite').hide();
  //             //$('#blog2').hide();

  //         }

  //         //get blog list
  //         var settings = {
  //             "url": "/api/v1/common/queryblog",
  //             "method": "POST",
  //             "timeout": 0,
  //             "headers": {
  //                 "Content-Type": "application/json"
  //             },
  //             "data": JSON.stringify({ "limit": 6, "offset": 0 }),
  //         };
  //         $.ajax(settings).done(function (response) {
  //             if (response.status == 0) {
  //                 let blogs = response.data.blogs
  //                 //console.log(blogs);

  //                 for (i = 0; i < blogs.length; i++) {
  //                     let newblogitem=$('#blogitem').clone();
  //                     $(newblogitem).attr('id','');
  //                     $($(newblogitem).find('img')[0]).attr('src', "https://coldcdn.com/api/cdn/hx9216" +blogs[i].cover_img_url);
  //                     $($(newblogitem).find('#blogitemtitle')[0]).html(blogs[i].title);
  //                     $($(newblogitem).find('#blogitemtitle')[0]).attr("href","/homepage.html?blog="+blogs[i].id);
  //                     newblogitem.show();
  //                     $('#bloglistcontainer').append(newblogitem);
  //                 }

  //             }
  //         });

  //     </script>
  //         )
  //     }
}

export default HomePage;
