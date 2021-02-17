/*
 * @Author: your name
 * @Date: 2021-02-05 10:10:16
 * @LastEditTime: 2021-02-17 21:44:49
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

import ArweaveDemoPage from "../arweaveDemo/arweaveDemo"
import FileManagerDemoPage from "../fileManagerDemo/fileManagerDemo"
import NodeMapPage from "../nodeMap/nodeMap"
import FinancingPage from "../financing/financing"

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
        "url": "https://meson.network/api/v1/common/getblog",
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
    "url": "https://meson.network/api/v1/common/queryblog",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({ "limit": 6, "offset": 0 }),
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
    new Function(typed)();
    new Function(blink)();
    new Function(blog)();
  }

  fileManager(){
    return(
      <>
      <div style={{backgroundColor:"#0948B3"}}>
                <div className="container" style={{color:"white"}}>
                    <h1 className=" font-weight-bolder" style={{margin:"0",color:"white",paddingBottom:"10px"}}>Demo:</h1>
                        <h2 className=" font-weight-bolder" style={{margin:"0",color:"white",paddingBottom:"10px",fontSize:"18px"}}>IPFS storage &
                            meson acceleration</h2>
                </div>
        </div>
        <FileManagerDemoPage></FileManagerDemoPage>
        {/* <div style=" background-color: #0948B3;">
            <iframe id="ipfswin" ref="iframe" scrolling="no" frameBorder="0" style="width:100%;border-radius: 10px;background-color: #0948B3;" src="/demofilemanager"></iframe>
        </div> */}

      </>
    )
  }

  arweave(){
    return(
        <>
        <div style={{backgroundColor:"#0948B3",paddingTop:"50px"}}>
            <div className="container" style={{color:"white"}}>
                <h2 className=" font-weight-bolder" style={{margin:"0",color:"white",paddingBottom:"10px",fontSize:"18px"}}>Arweave & meson acceleration</h2>
            </div>
        </div>
        <ArweaveDemoPage></ArweaveDemoPage>
        {/* <div style=" background-color: #0948B3;">
            <iframe id="arweavewin" ref="iframe" scrolling="no" frameBorder="0"
                style="width:100%;height:250px;border-radius: 10px;background-color: #0948B3;" src="/demoarweave"></iframe>
        </div> */}
        </> 
    )
  }

  nodeMap(){
    return(
      <div className="node-map" >
      
        <NodeMapPage></NodeMapPage>
      
      </div> 
  )
  }

  financing(){
    return(
      <>
      
        <FinancingPage></FinancingPage>
      
      </> 
  )
  }

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
        {this.financing()}
        {this.fileManager()}
        {this.arweave()}
        <div
          dangerouslySetInnerHTML={{
            __html: howWorks,
          }}
        ></div>
        <div
          style={{background:"white"}}
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
