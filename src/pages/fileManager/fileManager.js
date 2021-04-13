/*
 * @Author: your name
 * @Date: 2020-11-19 17:58:29
 * @LastEditTime: 2021-04-13 19:30:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/test/test.js
 */

import React, { useCallback,useMemo } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import { withAlert } from "react-alert";
import UserManager from "../../manager/usermanager";
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
    borderColor: "#2196f3",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
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

class FileManagerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataready: false,
            tableData: [],
            upProcess:0
        };

        this.columns = [
            {
                name: "originFileName",
                header: "File",
                defaultFlex: 1,
                editable: false,
            },
            {
                name: "fileSize",
                header: "Size",
                defaultFlex: 1,
                render: ({ value }) => {
                    if (value < 1000000) {
                        return <div>{(value / 1000).toFixed(2)} KB</div>;
                    } else {
                        return <div>{(value / 1000000).toFixed(2)} MB</div>;
                    }
                },
            },
            {
                name: "createTime",
                header: "Uploaded",
                defaultFlex: 1,
                editable: false,
                render: ({ value }) => {
                    return (
                        <div>
                            {moment(value * 1000).format("YYYY-MM-DD HH:mm:ss")}
                        </div>
                    );
                },
            },
            {
                name: "action",
                header: "Action",
                defaultWidth: 110,
                render: ({ data }) => {
                    return (
                        <div style={{ display: "flex" }}>
                            {/* <div
                                className="btn btn-primary-rocket btn-sm"
                                onClick={async () => {
                                    window.open(
                                        Global.apiHost + data.originUrl
                                    );
                                }}
                            >
                                Open
                            </div> */}
                            <div
                                style={{ marginLeft: "5px" }}
                                className="btn btn-primary-rocket btn-sm"
                                onClick={() => {
                                    copy(Global.apiHost + data.originUrl);
                                    this.props.alert.success("Url Copied");
                                }}
                            >
                                Copy Url
                            </div>
                        </div>
                    );
                },
            },
            {
                name: "delete",
                header: "Delete",
                defaultWidth: 90,
                render: ({ data }) => {
                    return (
                        <div style={{ display: "flex" }}>
                            <div
                                className="btn btn-secondary-rocket btn-sm"
                                onClick={async () => {
                                    //http://xxxx.com/api/store/delete/username/filename/hash
                                    let url = Global.apiHost + "/api/store/delete/" + data.userName + "/" + data.fileName + "/" + data.fileHash
                                    let response = await axios.get(
                                        url,
                                        {
                                            headers: {
                                                Authorization:
                                                    "Bearer " +
                                                    UserManager.GetUserToken(),
                                            },
                                        }
                                    );
                                    if (response.data.status==0) {
                                        this.props.alert.success("Deleted");
                                        this.loadData();
                                    } else {
                                        this.props.alert.error("Delete Error");
                                    }
                                }}
                            >
                                Delete
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
            <div className="upload-frame">
                <div class="col">
                    <div class="progress-wrapper">
                        <div class="progress-info">
                            <div class="h6 mb-0">Uploading...</div>
                            <div class="small font-weight-bold text-dark">
                                <span>{this.state.upProcess} %</span>
                            </div>
                        </div>
                        <div class="progress mb-0">
                            <div
                                class="progress-bar bg-primary"
                                role="progressbar"
                                aria-valuenow={'"'+this.state.upProcess+'"'}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: this.state.upProcess+"%" }}
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
             let uploadUrl = "";
             let serverResp = await axios.post(
                 "/api/store/upload/" + UserManager.GetUserInfo().userid,
                 {
                     fileName: file[0].name,
                 },
                 {
                     headers: {
                         Authorization: "Bearer " + UserManager.GetUserToken(),
                     },
                 }
             );
             console.log(serverResp.data);
             if (serverResp.data.status == 0) {
                 uploadUrl = serverResp.data.data;
             } else if (serverResp.data.status == 5001) {
                 this.props.alert.error("file already exist");
                 return;
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
                         ((progressEvent.loaded / progressEvent.total) * 100) |
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
                     this.loadData();
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
         <div className="container">
             <div {...getRootProps({ style })}>
                 <input {...getInputProps()} />
                 <p>Drag 'n' drop some files here, or click to select files</p>
             </div>
         </div>
     );
 }
    

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready: true,
        });
        this.loadData();
    }

    renderContent() {
        if (
            !this.state.dataready ||
            !UserManager.checkUserHasAuth(UserManager.UserAuth.admin)
        ) {
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
                                Authorization:
                                    "Bearer " + UserManager.GetUserToken(),
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
                columns={this.columns}
                dataSource={this.state.tableData}
                pagination
                defaultLimit={10}
                style={{ minHeight: 485, marginTop: "20px" }}
            ></ReactDataGrid>
        );
    };

    renderUploadArea() {
        return <this.UploadDrop></this.UploadDrop>;
    }

    render() {
        //const Content = this.renderContent();

        return (
            <AdminLayout name="Client" description="FileManager">
                {this.renderUploadArea()}

                {(this.state.upProcess>0&&this.state.upProcess!=100)&&this.renderProcess()}
                
                <div className="toast-body">
                    <this.DataGrid></this.DataGrid>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(FileManagerPage);