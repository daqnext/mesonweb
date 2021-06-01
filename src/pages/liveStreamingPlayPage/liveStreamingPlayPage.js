/*
 * @Author: your name
 * @Date: 2021-05-31 17:46:53
 * @LastEditTime: 2021-05-31 17:58:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/liveStreamingPlayPage/liveStreamingPlayPage.js
 */
import React, { Component } from "react";
import VideoPlayer from "./liveStreamingPlayer";

class LiveStreamingPlayPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {}
  componentDidMount() {}

  render() {
    return (
      <div style={{width:"100%",height:"100%"}}>
        <VideoPlayer
        //   width="800px"
        //   height="480px"
          src="https://assets.shuquxs.xyz:10086/public/static/video/hls/minemeson/3MinutesToMineMeson.m3u8"
        ></VideoPlayer>
      </div>
    );
  }
}

export default LiveStreamingPlayPage;
