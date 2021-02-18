/*
 * @Author: your name
 * @Date: 2020-12-31 13:38:15
 * @LastEditTime: 2021-02-18 11:21:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/arweaveDemo/arweaveDemo.js
 */

import React, { useCallback, useMemo } from "react";
import { withAlert } from "react-alert";
import Global from "../../global/global";
import axios from "axios";
import moment from "moment";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { useDropzone } from "react-dropzone";
import copy from "copy-to-clipboard";
import "./arweaveDemo.css";

class ArweaveDemoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputHash: "",
    };

    // document
    //     .getElementsByTagName("body")[0]
    //     .setAttribute("style", "background-color: #0948B3");
  }

  render() {
    return (
      <div style={{ backgroundColor: "#0948B3",paddingTop:"30px" }}>
        <div className="container">
          <div className="form-group">
            {/* <label>input file id&#40;Hash&#41; in Arweave</label> */}
            <input
              style={{ backgroundColor: "#0948B3", color: "white" }}
              className="form-control arweave-hash-input"
              //value={this.state.inputurl}
              onChange={(event) => {
                this.setState({
                  inputHash: event.target.value,
                });
                //console.log(event.target.value);
              }}
              type="text"
              placeholder="Input file ID(Hash) in Arweave"
            />
          </div>

          <div>
            {/* ipfs link */}
            <div style={{ color: "white" }}>Origin Arweave link</div>
            <div
              className="input-group "
              style={{
                marginBottom: "0px",
              }}
            >
              <input
                id="ipfslink"
                value={"https://arweave.net/" + this.state.inputHash}
                className="form-control"
                type="text"
                onChange={(event)=>{

                }}
                style={{
                  background: "none",
                  color: "white",
                  paddingLeft: "5px",
                }}
              />
              <div className="input-group-append">
                <div
                  // data-clipboard-target="#mytoken"
                  className="btn   btn-light"
                  type="button"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                  onClick={() => {
                    copy("https://arweave.net/" + this.state.inputHash);
                    this.props.alert.success("arweave url Copied");
                  }}
                >
                  copy
                </div>
              </div>
            </div>

            {/* meson link */}
            <div style={{ color: "white" }}>Accelerated link by meson:</div>
            <div
              className="input-group "
            //   style={{
            //     marginBottom: "13px",
            //     marginTop: "-1px",
            //   }}
            >
              <input
                id="mesonlink"
                value={
                  Global.coldCdnApiHost +
                  "/api/cdn/bronil/" +
                  this.state.inputHash
                }
                onChange={(event)=>{

                }}
                className="form-control"
                type="text"
                style={{
                  background: "none",
                  color: "white",
                  paddingLeft: "5px",
                }}
              />
              <div className="input-group-append">
                <div
                  // data-clipboard-target="#mytoken"
                  className="btn   btn-light"
                  type="button"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                  onClick={() => {
                    copy(
                      Global.coldCdnApiHost +
                        "/api/cdn/bronil/" +
                        this.state.inputHash
                    );
                    this.props.alert.success("meson Url Copied");
                  }}
                >
                  copy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(ArweaveDemoPage);
