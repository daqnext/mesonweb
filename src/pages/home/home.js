/*
 * @Author: your name
 * @Date: 2021-02-05 10:10:16
 * @LastEditTime: 2021-03-29 20:46:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/home/home.new.js
 */

import React from "react";
import header from "./header.html";
import hero from "./hero.html";
import howWorks from "./howWorks.html";
import about from "./about.html";
import dev from "./dev.html";
import solved from "./solved.html";
import pricing from "./pricing.html";
import blog from "./blog.html";
import faq from "./faq.html";
import footer from "./footer.html";

import ArweaveDemoPage from "../arweaveDemo/arweaveDemo";
import FileManagerDemoPage from "../fileManagerDemo/fileManagerDemo";
import NodeMapPage from "../nodeMap/nodeMap";
import VideoDemoPage from "../videoDemo/videoDome";
import Investors from "../investors/investors";
// import FinancingPage from "../financing/financing"

class HomePage extends React.Component {
  componentDidMount() {
    const typed = `
    var typed2 = new Typed('#autoprint2', {
      typeSpeed: 30,
      loop: false,
      onComplete: (self) => {
          setTimeout(() => {
              typed.reset();
          }, 5000);
      },
      strings: ['',
          '# mining and getting profit on general server. ']
  });
  typed2.stop();
  var typed = new Typed('#autoprint', {
      typeSpeed: 50,
      loop: false,
      onComplete: (self) => {
          typed2.start();
          typed2.reset();
      },
      strings: ['',
          '# the next generation distributed acceleration network.',
      ]
  });
    `;
    const blink = `
  function blink_text() {
    $('.myblink').fadeOut(500);
    $('.myblink').fadeIn(500);
}
setInterval(blink_text, 1000);
  `;
    const blog = `
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
}
var blogid = getUrlParam("blog")
console.log(blogid);
if (blogid != null) {

    //get blog in url
    var settings = {
        "url": "/api/v1/common/getblog",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({ "id": parseInt(blogid) }),
    };

    $.ajax(settings).done(function (response) {
        if (response.status == 0) {
            let blog = response.data
            //console.log(blog);
            $('#blogtitle').html(blog.title);
            $('#blogcover').attr('src', "https://coldcdn.com/api/cdn/hx9216" +blog.cover_img_url);
            if (blog.content_url) {
                $('#blogcontent').load("https://coldcdn.com/api/cdn/hx9216" +blog.content_url);
            }
        }
    });

    /////share////////
    var $config = {
        title: blog.title,
        description: blog.title,
        sites: [  'google', 'facebook', 'twitter','wechat'], // enable
        //disabled: ['google', 'facebook', 'twitter'], //
        wechatQrcodeTitle: "share this blog", //
        wechatQrcodeHelper: '',
    };
    socialShare('.social-share-cs', $config);
    $('html, body').animate({
        scrollTop: $('#blog').offset().top
    }, 1500, 'easeInOutExpo');

}else{
    $('#bloglistcontainerwhite').hide();
    //$('#blog2').hide();

}

//get blog list
var settings = {
    "url": "/api/v1/common/queryblog",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({ "limit": 60, "offset": 0 }),
};
$.ajax(settings).done(function (response) {
    if (response.status == 0) {
        let blogs = response.data.blogs
        //console.log(blogs);

        for (i = 0; i < blogs.length; i++) {
            let newblogitem=$('#blogitem').clone();
            $(newblogitem).attr('id','');
            $($(newblogitem).find('img')[0]).attr('src', "https://coldcdn.com/api/cdn/hx9216" +blogs[i].cover_img_url);
            $($(newblogitem).find('#blogitemtitle')[0]).html(blogs[i].title);
            $($(newblogitem).find('#blogitemtitle')[0]).attr("href","/?blog="+blogs[i].id);
            newblogitem.show();
            $('#bloglistcontainer').append(newblogitem);
        }
    }
});
  `;

    const navbar_global = `
  navbar_global_hide=function() {
    $('#navbar_global').removeClass("show")
    $("html").css("overflow","");
    $("body").css("overflow","");
}
  `;
    new Function(typed)();
    new Function(blink)();
    new Function(blog)();
    new Function(navbar_global)();
  }

  fileManager() {
    return (
      <>
        <div style={{ backgroundColor: "#02233e" }}>
          <div className="container" style={{ color: "white" }}>
            <h3
              style={{
                // textShadow: "2px 2px 2px black",
                borderBottom: "2px solid",
                fontWeight: 60,
                // opacity: "70%",
                margin: "0px",
                color: "white",
                paddingBottom: "3px",
                paddingTop: "100px",
              }}
            >
              IPFS & Meson
            </h3>
          </div>
        </div>
        <FileManagerDemoPage></FileManagerDemoPage>
        {/* <div style=" background-color: #02233e;">
            <iframe id="ipfswin" ref="iframe" scrolling="no" frameBorder="0" style="width:100%;border-radius: 10px;background-color: #02233e;" src="/demofilemanager"></iframe>
        </div> */}
      </>
    );
  }

  arweave() {
    return (
      <>
        <div style={{ backgroundColor: "#02233e", paddingTop: "0px" }}>
          <div className="container" style={{ color: "white" }}>
            <h3
              style={{
                // textShadow: "2px 2px 2px black",
                borderBottom: "2px solid",
                fontWeight: 60,
                // opacity: "70%",
                margin: "0px",
                color: "white",
                paddingBottom: "3px",
                paddingTop: "100px",
              }}
            >
              Arweave & Meson
            </h3>
          </div>
        </div>
        <ArweaveDemoPage></ArweaveDemoPage>
        {/* <div style=" background-color: #02233e;">
            <iframe id="arweavewin" ref="iframe" scrolling="no" frameBorder="0"
                style="width:100%;height:250px;border-radius: 10px;background-color: #02233e;" src="/demoarweave"></iframe>
        </div> */}
      </>
    );
  }

  nodeMap() {
    return (
      <div className="node-map" style={{ backgroundColor: "#02233e" }}>
        <NodeMapPage></NodeMapPage>
        {/* <div style={{backgroundColor:"#02233e",paddingTop:"50px"}}>
            <div className="container" style={{color:"white"}}>
                <h2 className=" font-weight-bolder" style={{margin:"0",color:"white",paddingBottom:"20px",fontSize:"28px"}}>Acceleration node</h2>
            </div>
        </div>
        <img src={worldmap} style={{width:"60%"}}></img>
       */}
      </div>
    );
  }

  videoDemo() {
    return (
      <>
        <div style={{ backgroundColor: "#02233e", paddingTop: "0px" }}>
          <div className="container" style={{ padding: "5px 15px", color: "white" }}>
            <h3
              style={{
                padding: "none",
                // textShadow: "2px 2px 2px black",
                // borderBottom: "2px solid",
                fontWeight: 60,
                // opacity: "70%",
                margin: "0px",
                color: "white",
                paddingBottom: "3px",
                paddingTop: "100px",
              }}
            >
              <span
                style={{
                  padding: "7px 10px",
                  backgroundColor: "rgb(1,18,32)",
                  borderRadius: "5px",
                  fontSize:"1.25rem"
                }}
              >
                Global Livestreaming by Meson
              </span>
            </h3>
          </div>
        </div>
        <VideoDemoPage></VideoDemoPage>
      </>
    );
  }

  // financing(){
  //   return(
  //     <>

  //       <FinancingPage></FinancingPage>

  //     </>
  // )
  // }

  render() {
    return (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: header,
          }}
        ></div>
        <div
          dangerouslySetInnerHTML={{
            __html: hero,
          }}
        ></div>
        {this.nodeMap()}
        {this.videoDemo()}
        {/* {this.financing()} */}
        {this.fileManager()}
        {this.arweave()}
        <div
          dangerouslySetInnerHTML={{
            __html: howWorks,
          }}
        ></div>
        <div
          style={{ background: "white" }}
          dangerouslySetInnerHTML={{
            __html: about,
          }}
        ></div>
        <div
          dangerouslySetInnerHTML={{
            __html: dev,
          }}
        ></div>
        <div
          dangerouslySetInnerHTML={{
            __html: solved,
          }}
        ></div>
        <div
          dangerouslySetInnerHTML={{
            __html: pricing,
          }}
        ></div>
        <div
          dangerouslySetInnerHTML={{
            __html: blog,
          }}
        ></div>
        <div
          dangerouslySetInnerHTML={{
            __html: faq,
          }}
        ></div>
        {/* <Investors></Investors> */}
        <div
          dangerouslySetInnerHTML={{
            __html: footer,
          }}
        ></div>
      </>
    );
  }
}

export default HomePage;
