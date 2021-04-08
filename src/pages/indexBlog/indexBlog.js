/*
 * @Author: your name
 * @Date: 2021-04-08 17:31:34
 * @LastEditTime: 2021-04-08 20:54:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/indexBlog/indexBlog.js
 */
import React from "react";
import axios from "axios";
// import "./world copy 2";
import Global from "../../global/global";
import moment from "moment";

export default class IndexBlog extends React.Component {
  constructor(props) {
    super(props);

    this.state={
        blogList:[]
    }
  }

  async componentDidMount(){
    let response = await axios.post(
        Global.apiHost + "/api/v1/common/queryblog",
        {
            limit: 60, offset: 0
        },
      );
      if (response.data.status != 0) {
        console.error("get active node error");
        return;
      }
      //console.log(response.data)
      let responseData = response.data.data.blogs;
      //console.log(responseData)
  
      this.setState({ blogList: responseData });
  }


  render(){
      return(
        <div class="gradient-2">
        <section class="section section-md text-sm-left">
          <div class="container">
            <div class="row row-30 row-md-60">

            {this.state.blogList.map((value, index, array) => {
                //console.log(value)
                let title=value.title
                let pTime=moment(value.publish_time*1000).format("MM-DD-YYYY")
                let coverImgUrl="https://coldcdn.com/api/cdn/hx9216" +value.cover_img_url
                let contentUrl="https://coldcdn.com/api/cdn/hx9216" +value.content_url
                return (
                    <div class="col-lg-8 post-wrap">
                    {/* <!-- Post--> */}
                    <article class="post">
                      <a class="post-figure" href="#">
                        <img
                          src={coverImgUrl}
                          alt=""
                          width="773"
                          height="311"
                        />
                      </a>
                      <div class="post-body">
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
    
                        <h6 class="post-title">
                          <a href="#">
                            {title}
                          </a>
                        </h6>
                        <p class="post-text">
                        
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}


              <div class="col-lg-4">
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
              </div>
            </div>
          </div>
        </section>
      </div>

      )
  }
}
