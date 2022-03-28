/*
 * @Author: your name
 * @Date: 2020-12-31 13:38:15
 * @LastEditTime: 2021-04-12 10:01:42
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
            arweaveDemonBindName: "",
        };
    }

    async componentDidMount() {
        //get arweaveDemoBindName
        try {
            let response = await axios.get(Global.apiHost + "/api/v1/common/arweavedemobindname");
            if (response.data.status != 0) {
                return;
            }
            this.setState({ arweaveDemonBindName: response.data.data });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        if (this.state.arweaveDemonBindName == "") {
            return <div></div>;
        }

        return (
            <div>
                <div className="form-group">
                    <input
                        style={
                            {
                                // backgroundColor: "#02233e",
                                //color: "white",
                            }
                        }
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

                <div style={{ color: "rgb(255 255 255 / 58%)" }}>
                    {/* ipfs link */}
                    <div style={{}}>Origin Arweave link</div>
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
                            onChange={(event) => {}}
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
                                    border: "1px solid white",
                                    color: "white",
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
                    <div style={{}}>Accelerated link by meson:</div>
                    <div className="input-group ">
                        <input
                            id="mesonlink"
                            value={Global.coldCdnApiHost + "/api/cdn/" + this.state.arweaveDemonBindName + "/" + this.state.inputHash}
                            onChange={(event) => {}}
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
                                    border: "1px solid white",
                                    color: "white",
                                }}
                                onClick={() => {
                                    copy(Global.coldCdnApiHost + "/api/cdn/" + this.state.arweaveDemonBindName + "/" + this.state.inputHash);
                                    this.props.alert.success("meson Url Copied");
                                }}
                            >
                                copy
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:"10px"}}>This is a test link, invalid in 30 minutes</div>
            </div>
        );
    }
}

export default withAlert()(ArweaveDemoPage);
