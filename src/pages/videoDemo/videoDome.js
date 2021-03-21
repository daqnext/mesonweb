/*
 * @Author: your name
 * @Date: 2021-03-21 14:46:41
 * @LastEditTime: 2021-03-21 16:38:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/videoDemo/videoDome.js
 */

import React, { useCallback, useMemo } from "react";
import { withAlert } from "react-alert";
import Global from "../../global/global";
import axios from "axios";
import moment from "moment";

class VideoDemoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ backgroundColor: "#02233e", paddingTop: "10px" }}>
        <div className="container">
          <video
            style={{ width:"100%", height:"100%",objectFit: "fill" }}
            src="https://coldcdn.com/api/cdn/wr1cs5/video/spacex2.mp4"
            controls="controls"
          ></video>
        </div>
      </div>
    );
  }
}

export default withAlert()(VideoDemoPage);
