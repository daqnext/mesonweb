/*
 * @Author: your name
 * @Date: 2021-03-21 14:46:41
 * @LastEditTime: 2021-03-21 20:39:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/videoDemo/videoDome.js
 */

import React, { useCallback, useMemo } from "react";
import { withAlert } from "react-alert";

class VideoDemoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ backgroundColor: "#02233e", paddingTop: "10px" }}>
        <div className="container">
          <video
            poster="https://assets.meson.network:10443/static/img/videoCover.jpg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              borderRadius: "10px",
            }}
            src="https://coldcdn.com/api/cdn/wr1cs5/video/spacex2.mp4"
            controls="controls"
          ></video>
        </div>
      </div>
    );
  }
}

export default withAlert()(VideoDemoPage);
