/*
 * @Author: your name
 * @Date: 2020-11-19 17:58:29
 * @LastEditTime: 2020-12-10 09:42:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/test/test.js
 */

import React, { useCallback,useMemo } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import { withAlert } from "react-alert";
import UserManager from "../../manager/usermanager";
import MyUploadAdapter from "./uploadAdapter";
import Global from '../../global/global';
import axios from "axios";
import moment from 'moment'
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Dropzone from "react-dropzone";
//import UploadDrop from './uploadDrop'
import { useDropzone } from "react-dropzone";
var FormData = require("form-data");

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
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


// function MyCustomUploadAdapterPlugin(editor) {
//     editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
//         // 第二个参数设置上传图片的地址
//         console.log(loader);
//         let userName = UserManager.GetUserInfo().username
//         return new MyUploadAdapter(
//             loader,
//             Global.apiHost + `/api/store/upload/${userName}`
//         );
//     };
// }

class FileManagerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataready: false,
            tableData: [],
        };

        this.columns = [
            {
                name: "fileName",
                header: "File",
                defaultFlex: 1,
                editable: false,
            },
            {
                name: "fileSize",
                header: "Size",
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div>{(value / 1000).toFixed(2)} KB</div>;
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
                defaultWidth: 220,
                render: ({ data }) => {
                    return (
                        <div style={{ display: "flex" }}>
                            <div
                                className="btn btn-primary btn-sm"
                                //href="https://coldcdn.com:9090/api/store/download/zzb/123456.jpeg/QmWjYrbQWxBa3om7D73L9q5smpFSXwWju1rLagFTpDNNiC"
                                //download={data.fileName}
                                onClick={async () => {
                                    window.open(
                                        Global.apiHost + data.originUrl
                                    );
                                }}
                            >
                                download
                            </div>
                            <div
                                style={{ marginLeft: "5px" }}
                                className="btn btn-primary btn-sm"
                                onClick={async () => {
                                    console.log("share click", data);
                                }}
                            >
                                share
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

    UploadDrop = (props) => {
     const {
         getRootProps,
         getInputProps,
         isDragActive,
         isDragAccept,
         isDragReject,
     } = useDropzone({
         onDrop: async(file) => {
             console.log(file);
            let data = new FormData();
            data.append(
                "fileName",
                file[0]
            );

            let config = {
                method: "post",
                url: Global.apiHost + "/api/store/upload/" + UserManager.GetUserInfo().username,
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
                data: data,
                onUploadProgress: (progressEvent) => {
                    let complete =
                        (((progressEvent.loaded / progressEvent.total) * 100) |
                            0) +
                        "%";
                    console.log(complete);
                },
            };

            let response = await axios(config)
             console.log(response.data);
             let responseData = response.data
             switch (responseData.status) {
                 case 0:
                     this.props.alert.success("upload finish");
                     this.loadData();
                     break;
                 case 5001:
                     this.props.alert.error("file already exist");
                     break;
                 default:
                     this.props.alert.error("upload error");
                     break;
             }
            
         },
         maxFiles:1
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
                console.log(skip, limit);
                return axios
                    .get(Global.apiHost + "/api/v1/client/getfilelist", {
                        headers: {
                            Authorization:
                                "Bearer " + UserManager.GetUserToken(),
                        },
                    })
                    .then((response) => {
                        if (response.data.status != 0) {
                            return [];
                        }
                        let responseData = response.data.data;
                        console.log(responseData);
                        return {
                            data: responseData,
                            count: parseInt(1),
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
                //pagination
                defaultLimit={10}
                style={{ minHeight: 585, marginTop: "20px" }}
            ></ReactDataGrid>
        );
    };

    renderUploadArea() {
        return <this.UploadDrop></this.UploadDrop>;
    }

    render() {
        const Content = this.renderContent();

        return (
            <AdminLayout name="Admin" description="BlogEditor">
                {this.renderUploadArea()}

                <div className="toast-body">
                    <this.DataGrid></this.DataGrid>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(FileManagerPage);