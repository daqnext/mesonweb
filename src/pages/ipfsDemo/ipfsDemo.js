/*
 * @Author: your name
 * @Date: 2020-12-31 13:38:15
 * @LastEditTime: 2021-11-01 16:32:42
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
import "./ipfsDemo.css";

class IpfsDemoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputHash: "",
      ipfsDemoBindName:""
    };
  }

  async componentDidMount(){
    //get ipfsDemoBindName
    try {
      let response = await axios.get(Global.apiHost + "/api/v1/common/ipfsdemobindname");
      if (response.data.status != 0) {
          return;
      }
      this.setState({ ipfsDemoBindName: response.data.data });
  } catch (error) {
      console.error(error);
  }
  }

  render() {
    if (this.state.ipfsDemoBindName == "") {
      return <div></div>;
  }
    return (
        <div>
          
          <div className="form-group">
            <input
              style={{ 
                // backgroundColor: "#02233e", 
                //color: "white",
            }}
              className="form-control arweave-hash-input"
              //value={this.state.inputurl}
              onChange={(event) => {
                this.setState({
                  inputHash: event.target.value,
                });
                //console.log(event.target.value);
              }}
              type="text"
              placeholder="Input file ID(Hash) in IPFS"
            />
          </div>

          <div style={{color:"rgb(255 255 255 / 58%)"}}>
            {/* ipfs link */}
            <div style={{ 
              
              }}>Origin IPFS link</div>
            <div
              className="input-group "
              style={{
                marginBottom: "0px",
              }}
            >
              <input
                id="ipfslink"
                value={"https://ipfs.io/ipfs/" + this.state.inputHash}
                className="form-control"
                type="text"
                onChange={(event)=>{

                }}
                style={{
                  background: "none",
                  color: "white",
                  paddingLeft: "5px",
                  // opacity: "70%",
                }}
              />
              <div className="input-group-append">
                <div
                  // data-clipboard-target="#mytoken"
                  className="btn"
                  // type="button"
                  style={{
                    border:"1px solid white",
                    color:"white"
                  }}
                  onClick={() => {
                    copy("https://ipfs.io/ipfs/" + this.state.inputHash);
                    this.props.alert.success("ipfs url Copied");
                  }}
                >
                  copy
                </div>
              </div>
            </div>

            {/* meson link */}
            <div style={{ 
              
              }}>Accelerated link by meson:</div>
            <div
              className="input-group "
            >
              <input
                id="mesonlink"
                value={
                  Global.coldCdnApiHost +
                  "/api/cdn/"+this.state.ipfsDemoBindName+"/" +
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
                  // opacity: "70%",
                }}
              />
              <div className="input-group-append">
                <div
                  className="btn "
                  style={{
                    border:"1px solid white",
                    color:"white",
                  }}
                  onClick={() => {
                    copy(
                      Global.coldCdnApiHost +
                      "/api/cdn/"+this.state.ipfsDemoBindName+"/" +
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

          <div style={{marginTop:"10px"}}>This is test link, invalid in 30 minutes</div>
        </div>
    );
  }
}

export default withAlert()(IpfsDemoPage);
