/*
 * @Author: your name
 * @Date: 2020-11-19 17:58:29
 * @LastEditTime: 2021-04-08 21:34:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/test/test.js
 */

import React, { useCallback,useMemo } from "react";
import { withAlert } from "react-alert";
import Global from '../../global/global';
import axios from "axios";
import moment from 'moment'
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { useDropzone } from "react-dropzone";
import copy from "copy-to-clipboard";
import "./fileManager.css"
var FormData = require("form-data");

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "white",
    borderStyle: "dashed",
    backgroundColor: "none",
    color: "white",
    outline: "none",
    transition: "border .24s ease-in-out",
    // opacity: "70%",
};

const activeStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

const userName = "filedemo"
const userToken = "Z3+sooi0YC2rmjCxRxqTOA==";

class FileManagerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataready: false,
            tableData: [],
            upProcess: 0,
        };

        this.publicIpfsDemoId = this.makeid(8)

        this.columns = [
            {
                name: "file",
                header: "File",
                defaultFlex: 1,
                render: ({ data }) => {
                    return (
                        <div className="input-group ">
                            <input
                                id="mytoken"
                                value={Global.apiHost + data.originUrl}
                                className="form-control"
                                type="text"
                            />
                            <div className="input-group-append">
                                <div
                                    // data-clipboard-target="#mytoken"
                                    className="btn"
                                    type="button"
                                    onClick={() => {
                                        copy(Global.apiHost + data.originUrl);
                                        this.props.alert.success("Url Copied");
                                    }}
                                >
                                    copy&share
                                </div>
                            </div>
                        </div>
                    );
                },
            },
        ];

        this.title = "";
        this.content = "";
        this.coverImgUrl = "";
        this.isPublishing = false;
    }

    renderProcess() {
        return (
            <div className="upload-frame" style={{width:"70%",left:"15%"}}>
                <div className="col">
                    <div className="progress-wrapper">
                        <div className="progress-info">
                            <div className="h6 mb-0" style={{color:"#555e68",fontSize:"13px"}}>Uploading...</div>
                            <div className="small font-weight-bold text-dark">
                                <span>{this.state.upProcess} %</span>
                            </div>
                        </div>
                        <div className="progress mb-0">
                            <div
                                className="progress-bar bg-primary"
                                role="progressbar"
                                aria-valuenow={'"' + this.state.upProcess + '"'}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: this.state.upProcess + "%" }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    UploadDrop = (props) => {
        const {
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
        } = useDropzone({
            onDrop: async (file) => {
                console.log(file);
                let uploadUrl=""
                let serverResp = await axios.post(
                    "/api/store/publicupload/" + this.publicIpfsDemoId,
                    {
                        fileName:file[0].name
                    }
                );
                console.log(serverResp.data);
                if (serverResp.data.status==0) {
                    uploadUrl=serverResp.data.data
                } else if (serverResp.data.status == 5001) {
                    this.props.alert.error("file already exist");
                    return
                } else {
                    this.props.alert.error("upload error");
                    return;
                }
                
                let data = new FormData();
                data.append("fileName", file[0]);
                data.append("originFileName", file[0].name);
                //data.append("file", file[0].name);
                let config = {
                    method: "post",
                    url: uploadUrl,
                    data: data,
                    onUploadProgress: (progressEvent) => {
                        let complete =
                            ((progressEvent.loaded / progressEvent.total) *
                                100) |
                            0;
                        console.log(complete + "%");
                        this.setState({ upProcess: complete });
                    },
                };

                let response = await axios(config);
                console.log(response.data);
                let responseData = response.data;
                console.log(responseData.status);
                switch (responseData.status) {
                    case 0:
                        this.props.alert.success("upload finish");
                        this.LoadFileInfo();
                        break;
                    case "5001":
                        this.props.alert.error("file already exist");
                        break;
                    default:
                        this.props.alert.error("upload error");
                        break;
                }
            },
            maxFiles: 1,
        });

        const style = useMemo(
            () => ({
                ...baseStyle,
                ...(isDragActive ? activeStyle : {}),
                ...(isDragAccept ? acceptStyle : {}),
                ...(isDragReject ? rejectStyle : {}),
            }),
            [isDragActive, isDragReject, isDragAccept]
        );

        return (
            <div style={{cursor:"pointer"}}>
            <div className="container">
                <div {...getRootProps({ style })}  >
                    <input {...getInputProps()} />
                    <p style={{ fontSize: "20px",margin:"5px" }}>Click to select files</p>
                </div>
            </div>
            </div>
        );
    };

    makeid(length) {
        var result = "";
        var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    async componentDidMount() {
        // if (UserManager.GetUserInfo() == null) {
        //     await UserManager.UpdateUserInfo();
        // }
        // UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready: true,
        });
        //this.loadData();
        this.LoadFileInfo();
    }

    async LoadFileInfo() {
        axios
            .post(
                Global.apiHost +
                    "/api/store/publicfilelist/" +
                    this.publicIpfsDemoId,
                {
                    limit: 1000,
                    offset: 0,
                }
            )
            .then((response) => {
                if (response.data.status != 0) {
                    return [];
                }
                let responseData = response.data.data;
                console.log(responseData);
                this.setState({ tableData: responseData.data });
                return {
                    data: responseData.data,
                    count: responseData.total,
                };
            });
    }

    renderContent() {
        if (!this.state.dataready) {
            return (
                <div className="alert alert-danger" role="alert">
                    Auth Required
                </div>
            );
        }

        return <div></div>;
    }

    loadData = null;
    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                return axios
                    .post(
                        Global.apiHost + "/api/v1/client/getfilelist",
                        {
                            limit: limit,
                            offset: skip,
                        },
                        {
                            headers: {
                                Authorization: "Bearer " + userToken,
                            },
                        }
                    )
                    .then((response) => {
                        if (response.data.status != 0) {
                            return [];
                        }
                        let responseData = response.data.data;
                        console.log(responseData);
                        return {
                            data: responseData.data,
                            count: responseData.total,
                        };
                    });
            };
            this.setState({ tableData: data });
        }, []);
        this.loadData = loadData;

        return (
            <ReactDataGrid
                idProperty="id"
                rowHeight={55}
                columns={this.columns}
                dataSource={this.state.tableData}
                pagination
                defaultLimit={10}
                style={{ minHeight: 630 }}
            ></ReactDataGrid>
        );
    };

    renderUploadArea() {
        return <this.UploadDrop></this.UploadDrop>;
    }

    render() {
        //const Content = this.renderContent();

        return (
            <div style={{ paddingTop:"10px" }}>
                {this.renderUploadArea()}

                {this.state.upProcess > 0 &&
                    this.state.upProcess != 100 &&
                    this.renderProcess()}

                <div className="container">
                    <div
                        className="toast-body"
                        style={{
                            border: "2px dashed white",
                            // minHeight:"100px",
                            maxHeight: "250px",
                            overflowY: "scroll",
                            marginTop: "10px",
                            //color:"rgb(255 255 255 / 58%)"
                            // opacity: "70%",
                        }}
                    >
                        {/* <this.DataGrid></this.DataGrid> */}
                        {this.state.tableData.map((value, index, array) => {
                            return (
                                <div>
                                    {/* ipfs link */}
                                    <div style={{ 
                                        color: "rgb(255 255 255 / 58%)" 
                                        }}>
                                        Origin IPFS link
                                    </div>
                                    <div
                                        className="input-group "
                                        style={{
                                            marginBottom: "0px",
                                        }}
                                    >
                                        
                                        <input
                                            id="ipfslink"
                                            value={
                                                "https://ipfs.io/ipfs/" +
                                                value.fileHash
                                            }
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
                                                className="btn"
                                                // type="button"
                                                style={{
                                                    // backgroundColor: "rgb(61 86 107) !important",
                                                    // background:"#3d566b",
                                                    border:"1px solid white",
                                                    color: "white",
                                                }}
                                                onClick={() => {
                                                    copy(
                                                        "https://ipfs.io/ipfs/" +
                                                            value.fileHash
                                                    );
                                                    this.props.alert.success(
                                                        "IPFS url Copied"
                                                    );
                                                }}
                                            >
                                                copy
                                            </div>
                                        </div>
                                    </div>

                                    {/* meson link */}
                                    <div style={{                                        
                                        color: "rgb(255 255 255 / 58%)" 
                                        }}>
                                        Accelerated link by meson:
                                    </div>
                                    <div
                                        className="input-group "
                                        style={{
                                            marginBottom: "13px",
                                            marginTop: "-1px",
                                        }}
                                    >
                                       
                                        <input
                                            id="mesonlink"
                                            value={
                                                Global.coldCdnApiHost + value.originUrl
                                            }
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
                                                className="btn"
                                                // type="button"
                                                style={{
                                                    // backgroundColor: "rgb(61 86 107) !important",
                                                    // background:"#3d566b",
                                                    border:"1px solid white",
                                                    color: "white",
                                                }}
                                                onClick={() => {
                                                    copy(
                                                        Global.coldCdnApiHost +
                                                            value.originUrl
                                                    );
                                                    this.props.alert.success(
                                                        "meson Url Copied"
                                                    );
                                                }}
                                            >
                                                copy
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default withAlert()(FileManagerPage);