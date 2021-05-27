/*
 * @Author: your name
 * @Date: 2021-04-09 09:48:27
 * @LastEditTime: 2021-05-18 21:10:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/blogContent/blogContent.js
 */

import React from "react";
import axios from "axios";
import Global from "../../global/global";
import IndexBlogPage from "../indexBlog/indexBlog"
import moment from "moment";
import { times } from "chartist";

export default class IndexBlog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      blogId: 0,
      blogCoverImgUrl: "",
      blogContentUrl: "",
      blogContent: "",
      blogAuthor: "",
      blogPublishTime: 0,
      blogTitle: "",
    };
  }

  async GetBlogInfo(blogId) {
    let url = "/api/v1/common/getblog";
    let response = await axios.post(url, { id: blogId });
    if (response.data.status != 0) {
      console.error("get blog info error blogId:", blogId);
      return;
    }
    //console.log(response.data);
    let blogInfo = response.data.data;
    this.GetBlogContent(Global.s3BindDomain + blogInfo.content_url);

    this.setState({
      blogId: blogInfo.id,
      blogCoverImgUrl: Global.s3BindDomain + blogInfo.cover_img_url,
      blogContentUrl: Global.s3BindDomain + blogInfo.content_url,
      blogAuthor: blogInfo.author_name,
      blogPublishTime: blogInfo.publish_time,
      blogTitle: blogInfo.title,
    });
  }

  async GetBlogContent(contentUrl) {
    let response = await axios.get(contentUrl);
    //console.log(response);
    if (response.data) {
      this.setState({
        blogContent: response.data,
      });
    }
  }

  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }

  async componentDidMount() {
    const scriptjs = `
    abc()
  `;
    new Function(scriptjs)();

    //let blogId=this.props.match.params.blogId
    let blogId = this.getQueryVariable("id");
    //console.log(blogId);
    if (blogId === false) {
      console.log("blogId error");
      return;
    }
    blogId = parseInt(blogId);

    this.GetBlogInfo(blogId);
  }

  render() {
    return (
      <div>
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
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="/#home">
                              Home
                            </a>
                          </li>
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="/#nodes">
                              Nodes
                            </a>
                          </li>
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="/#roadmap">
                              Roadmap
                            </a>
                          </li>
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="/#demo">
                              Demo
                            </a>
                          </li>
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="/#faq">
                              Faq
                            </a>
                          </li>
                          <li class="rd-nav-item">
                            <a class="rd-nav-link" href="/#contacts">
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

          <div class="gradient-1 bg-vide-1 bg-vide-2">
            {/* <!-- Breadcrumbs--> */}
            <section class="breadcrumbs-custom" style={{ height: "150px" }}>
              <div class="container">
                <div class="headings-default">
                  <div class="headings-default-subtitle">Blog Post</div>
                  <h3>{this.state.blogTitle}</h3>
                </div>
              </div>
            </section>
          </div>
          <div class="gradient-2">
            <section class="section section-md text-sm-left">
              <div class="container">
                <div class="row row-30 row-md-60">
                  <div class="col-lg-12">
                    <article class="post">
                      <a class="post-figure" href="blog-post.html">
                        <img
                          src={this.state.blogCoverImgUrl}
                          alt=""
                          width="773"
                          height="360"
                        />
                      </a>
                      <div class="post-body post-body-2">
                        <div class="post-info-panel">
                          <ul class="list-inline">
                            <li>
                              <time class="post-time" datetime="2019">
                                {moment(this.state.blogPublishTime*1000).format("MM-DD-YYYY")}
                              </time>
                            </li>
                            <li>
                            <span class="post-tag">Blockchain</span>
                            </li>
                          </ul>
                        </div>
                        {/* <div class="post-share">
                          <div
                            class="post-share-button"
                            data-custom-toggle=""
                            data-custom-toggle-disable-on-blur="true"
                          ></div>
                          <ul class="post-social-list">
                            <li>
                              <a class="icon mdi mdi-facebook" href="#"></a>
                            </li>
                            <li>
                              <a class="icon mdi mdi-twitter" href="#"></a>
                            </li>
                          </ul>
                        </div> */}
                        <h4 class="post-title post-title-2">
                          {this.state.blogTitle}
                        </h4>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.state.blogContent,
                          }}
                        ></div>
                      </div>
                    </article>

                    {/* <div class="box-default">
                </div> */}

                    {/* <div class="box-default">
                </div> */}
                  </div>

                  {/* <div class="col-lg-4">
                <div class="row row-30 row-md-55 inset-left-xl-70">
                  <div class="col-12">
                    
                    <form class="rd-form rd-search" action="search-results.html" method="GET">
                      <div class="form-wrap">
                        <label class="form-label" for="rd-search-form-input">Search</label>
                        <input class="form-input" id="rd-search-form-input" type="text" name="s" autocomplete="off"/>
                        <button class="button-search mdi mdi-magnify" type="submit"></button>
                      </div>
                    </form>
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-12">
                    <h6 class="title-style-2">Categories</h6>
                    <ul class="list-marked-2 list-link d-inline-block">
                      <li><a href="#">Blockchain</a></li>
                      <li><a href="#">Cryptocurrency</a></li>
                      <li><a href="#">Technology</a></li>
                      <li><a href="#">News</a></li>
                    </ul>
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-12">
                    <h6 class="title-style-2">Tags</h6>
                    <ul class="list-tag group d-inline-block">
                      <li><a class="link-tag" href="#">Bitcoin</a></li>
                      <li><a class="link-tag" href="#">Ethereum</a></li>
                      <li><a class="link-tag" href="#">Tokens</a></li>
                      <li><a class="link-tag" href="#">Crypto</a></li>
                    </ul>
                  </div>
                  <div class="col-sm-6 col-md-4 col-lg-12">
                    <h6 class="title-style-2">Archive</h6>
                    <div class="select-wrap">
                      <select data-placeholder="Select a Month">
                        <option label="placeholder"></option>
                        <option>December 2019</option>
                        <option>November 2019</option>
                        <option>October 2019</option>
                        <option>September 2019</option>
                        <option>August 2019</option>
                      </select>
                    </div>
                  </div>
                </div>
                
              </div> */}
                </div>
              </div>
              <IndexBlogPage></IndexBlogPage>
            </section>
          </div>

          <section class="section section-md bg-secondary-9 text-sm-left wow fadeInUp">
            <div class="container">
              <div class="row row-30 row-md-50">
                <div class="ol-sm-6 col-lg-3">
                  <div class="inset-left-xl-70">
                    <div class="title-style-1">General</div>
                    <ul class="list-style-1 d-inline-block footitems">
                      <li>
                        <a class="rd-nav-link" href="/#roadmap">
                          Roadmap
                        </a>
                      </li>
                      <li>
                        <a
                          class="rd-nav-link"
                          href="https://assets.meson.network:10443/static/docs/Meson-Network-v1.6.pdf"
                        >
                          White Paper
                        </a>
                      </li>
                      <li>
                        <a class="rd-nav-link" href="/#demo">
                          Demo
                        </a>
                      </li>
                      <li>
                        <a class="rd-nav-link" href="/#faq">
                          Faq
                        </a>
                      </li>
                      <li>
                        <a class="rd-nav-link" href="/#contacts">
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
