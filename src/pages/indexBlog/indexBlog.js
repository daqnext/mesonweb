/*
 * @Author: your name
 * @Date: 2021-04-08 17:31:34
 * @LastEditTime: 2021-04-09 20:01:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/indexBlog/indexBlog.js
 */
import React from "react";
import axios from "axios";
// import "./world copy 2";
import Global from "../../global/global";
import moment from "moment";
import { times } from "chartist";

export default class IndexBlog extends React.Component {
  constructor(props) {
    super(props);
    this.pageCount=1

    this.state = {
      blogList: [],
      totalBlogCount: 0,
      currentPage: 1,
      pageCount:1
    };
  }

  async componentDidMount() {
    this.GetBlogList(3,0)
  }

  async GetBlogList(limit,offset){
    let response = await axios.post(
      Global.apiHost + "/api/v1/common/queryblog",
      {
        limit: limit,
        offset: offset,
      }
    );
    if (response.data.status != 0) {
      console.error("get active node error");
      return;
    }
    //console.log(response.data);
    let responseData = response.data.data.blogs;
    //console.log(responseData)

    this.setState({
      blogList: responseData,
      totalBlogCount: response.data.data.total,
    });
  }

  pagination() {
    let pageArray = [];
    //console.log(this.state.totalBlogCount);
    let pageCount = Math.floor(this.state.totalBlogCount / 3);
    if (this.state.totalBlogCount / 3 > pageCount) {
      pageCount++;
    }
    this.pageCount=pageCount
    
    let startPage = this.state.currentPage-1
    if (startPage<1) {
      startPage=1
    }

    let endPage = startPage+2
    if (endPage>this.pageCount) {
      endPage=this.pageCount
    }

    

    if (endPage>3) {
      startPage = endPage-2
    }
    //console.log("startPage",startPage)
    //console.log("endPage",endPage)

    let showPagination=3
    if (pageCount<showPagination) {
      showPagination = pageCount
    }
    
    for (let i = 0; i < showPagination; i++) {
      pageArray.push(startPage+i);
    }
    //console.log(pageArray);

    return (
      <div class="pagination-wrap text-center">
        <nav aria-label="Page navigation">
          <ul class="pagination">
          <li class="page-item">
                    <span class="page-link"
                    onClick={()=>{
                      
                      if (this.state.currentPage>1) {
                        let page = this.state.currentPage-1
                        //console.log(page)
                        this.GetBlogList(3,3*(page-1))
                        this.setState({currentPage:page})
                      }
                    }}
                    >&lt;</span>
                  </li>
            {pageArray.map((value, index, num, arr) => {
              if (this.state.currentPage==value) {
                return (
                  <li class="page-item active">
                    <span class="page-link"
                    // onClick={()=>{
                    //   console.log(value)
                    // }}
                    >{value}</span>
                  </li>
                );
              }else{
                return (
                  <li class="page-item">
                    <span class="page-link"
                    onClick={()=>{
                      //console.log(value)
                      this.GetBlogList(3,3*(value-1))
                      this.setState({currentPage:value})
                    }}
                    >{value}</span>
                  </li>
                );
              }
              
            })}
            <li class="page-item">
                    <span class="page-link"
                    onClick={()=>{
                      //console.log(this.pageCount)
                      if (this.state.currentPage<this.pageCount) {
                        let page = this.state.currentPage+1
                        //console.log(page)
                        this.GetBlogList(3,3*(page-1))
                        this.setState({currentPage:page})
                      }
                    }}
                    >&gt;</span>
                  </li>
            {/* <li class="page-item page-item-control disabled"><a class="page-link" aria-label="Previous"><span class="icon" aria-hidden="true"></span></a></li>
                      <li class="page-item active"><span class="page-link">1</span></li>
                      <li class="page-item"><a class="page-link" href="#">2</a></li>
                      <li class="page-item"><a class="page-link" href="#">3</a></li>
                      <li class="page-item page-item-control"><a class="page-link" aria-label="Next"><span class="icon" aria-hidden="true"></span></a></li> */}
          </ul>
        </nav>
      </div>
    );
  }

  render() {
    return (
      <div class="gradient-2">
        <section class="section section-md text-sm-left">
          <div class="container">
            <div class="row row-30 row-md-60">
              {this.state.blogList.map((value, index, array) => {
                //console.log(value)
                let title = value.title;
                let pTime = moment(value.publish_time * 1000).format(
                  "MM-DD-YYYY"
                );
                let coverImgUrl =
                  "https://coldcdn.com/api/cdn/hx9216" + value.cover_img_url;
                let contentUrl =
                  "https://coldcdn.com/api/cdn/hx9216" + value.content_url;
                return (
                  <div class="col-lg-4 post-wrap">
                    {/* <!-- Post--> */}
                    <article class="post">
                      <a
                        class="post-figure"
                        href={`/blog?id=${value.id}`}
                        style={{ height: "150px" }}
                      >
                        <img
                          src={coverImgUrl}
                          alt=""
                          width="773"
                          height="311"
                        />
                      </a>
                      <div class="post-body" style={{ height: "150px" }}>
                        <div class="post-info-panel">
                          <ul class="list-inline">
                            <li>
                              <time class="post-time" datetime="2019">
                                {pTime}
                              </time>
                            </li>
                            <li>
                              <span class="post-tag">Blockchain</span>
                            </li>
                          </ul>
                        </div>

                        <h6 class="post-title" style={{ fontSize: "16px" }}>
                          <a href={`/blog?id=${value.id}`}>{title}</a>
                        </h6>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: "20px" }}>
              {this.pagination()}

              {/* <div class="col-lg-4">
                <div class="row row-30 row-md-55 inset-left-xl-70">
                  <div class="col-sm-6 col-md-4 col-lg-12">
                    <h6 class="title-style-2">Categories</h6>
                    <ul class="list-marked-2 list-link d-inline-block">
                      <li>
                        <span href="#">Blockchain</span>
                      </li>
                      <li>
                        <span href="#">Cryptocurrency</span>
                      </li>
                      <li>
                        <span href="#">CDN</span>
                      </li>
                      <li>
                        <span href="#">Storage</span>
                      </li>
                      <li>
                        <span href="#">Livstreaming</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
