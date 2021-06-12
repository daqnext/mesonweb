/*
 * @Author: your name
 * @Date: 2021-05-31 17:46:53
 * @LastEditTime: 2021-06-08 17:06:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/liveStreamingPlayPage/liveStreamingPlayPage.js
 */
import React, { Component } from "react";
import VideoPlayer from "./liveStreamingPlayer";
import Utils from "../../utils/utils";
import axios from "axios";
import Global from "../../global/global";
import "./liveStreaming.css";

class LiveStreamingPlayPage extends Component {
  constructor(props) {
    super(props);

    this.sendWatchingJob = null;
    this.id = Utils.GetUrlParam("id", window.location.search);
    console.log(this.id);
    if (this.id == null || this.id == "") {
      return;
    }

    this.state={
      title:"Title1",
      videoSrc:"",
      requestFinish:false
    }

    console.log("get live stream info");
    axios.get(Global.apiHost + "/api/v1/livestreaming/livestreaminginfo/" + this.id).then((response)=>{
      console.log(response);
      if (!(response.status==200&&response.data.status==0)) {
        console.log("get livestreaminginfo error");
        return
      }
      
        let streamInfo=response.data.data
        if (streamInfo.streamPlatformType=="MesonStream") {
          let m3u8FileUrl="http://"+streamInfo.originServerDomain+":8080/"+streamInfo.userId+"/"+streamInfo.streamKey+"/"+"mesonlive.m3u8";
        this.setState({
          title:streamInfo.streamName,
          videoSrc:m3u8FileUrl,
          requestFinish:true,
        })
        }
        
      
      
    }).catch(()=>{
      this.setState({
        videoSrc:
          "https://assets.shuquxs.xyz:10086/public/static/video/hls/minemeson/3MinutesToMineMeson.m3u8",
          requestFinish:true
      })
    })

    
  }

  componentDidMount() {
    console.log("send watching msg");
    axios.get(Global.apiHost + "/api/v1/livestreaming/watching/" + this.id);
    this.sendWatchingJob = setInterval(() => {
      console.log("send watching msg");
      axios.get(Global.apiHost + "/api/v1/livestreaming/watching/" + this.id);
    }, 1000 * 60 * 3);
  }

  componentWillUnmount() {
    console.log("stop watch");
    if (this.sendWatchingJob != null) {
      clearInterval(this.sendWatchingJob);
    }
  }

  render() {
    return (
      <div>
        <div className="livevideo-title">{this.state.title}</div>
        <div className="div-video">
          {this.state.requestFinish&&<VideoPlayer src={this.state.videoSrc}></VideoPlayer>}
        </div>
      </div>
    );
  }
}

export default LiveStreamingPlayPage;
