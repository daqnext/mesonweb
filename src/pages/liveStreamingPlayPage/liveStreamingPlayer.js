/*
 * @Author: your name
 * @Date: 2021-05-31 17:33:36
 * @LastEditTime: 2021-05-31 17:47:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/liveStreamingPlayPage/liveStreamingPlayPage.js
 */

import React, { Component } from "react";
import Videojs from "video.js";
//import "videojs-contrib-hls";
import "video.js/dist/video-js.css";

class LiveStreamingPlayer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    // 销毁播放器
    if (this.player) {
      this.player.dispose();
    }
  }
  componentDidMount() {
    const { height, width, src } = this.props;
    console.log(this.props)
    this.player = Videojs(
      "custom-video",
      {
        height,
        width,
        bigPlayButton: true,
        textTrackDisplay: false,
        errorDisplay: false,
        controlBar: true,
        type: "application/x-mpegURL",
      },
      function () {
        this.play();
      }
    );
    this.player.src({ src });
  }

  render() {
    return (
      <video
        id="custom-video"
        className="video-js"
        controls
        preload="auto"
      ></video>
    );
  }
}

export default LiveStreamingPlayer;

