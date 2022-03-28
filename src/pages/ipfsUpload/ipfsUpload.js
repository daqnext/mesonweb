import React, { useCallback, useMemo } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import { withAlert } from "react-alert";
import UserManager from "../../manager/usermanager";
import Global from "../../global/global";
import axios from "axios";
import moment from "moment";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { useDropzone } from "react-dropzone";
import copy from "copy-to-clipboard";
import DataTable from "../../components/table/datatable";
import "./ipfsUpload.css";
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

class IpfsUpload extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                name: "fileName",
                header: "file name",
                defaultFlex: 0.7,
                editable: true,
            },
            {
                name: "hash",
                header: "hash",
                defaultFlex: 1,
                editable: true,
            },
            {
                name: "url",
                header: "url",
                defaultFlex: 2,
                render: ({ value }) => {
                    if (value == null) {
                        return;
                    }
                    return (
                        <div>
                            <div style={{ lineHeight: "30px", display: "inline-flex" }}>
                                <div
                                    style={{margin:"5px",width:"120px"}}
                                    className="badge badge-dark"
                                    onClick={() => {
                                        //console.log(value[0]);
                                        copy(value[0]);
                                        this.props.alert.success("ipfs link Copied");
                                    }}
                                >
                                    copy ipfs link
                                </div>
                                <div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowarp"}}>{value[0]}</div>
                            </div>
                            <br/>
                            <div style={{ lineHeight: "30px", display: "inline-flex" }}>
                                <div
                                    style={{margin:"5px",width:"120px"}}
                                    className="badge badge-dark"
                                    onClick={() => {
                                        //console.log(value[1]);
                                        copy(value[1]);
                                        this.props.alert.success("meson link Copied");
                                    }}
                                >
                                    copy meson link
                                </div>
                                <div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowarp"}}>{value[1]}</div>
                            </div>
                        </div>
                    );
                },
            },
            {
                name: "state",
                header: "state",
                defaultFlex: 0.3,
                editable: false,
                render: ({ value }) => {
                    if (value == true) {
                        return <span className="badge badge-success">SUCCESS</span>;
                    } else {
                        return <span className="badge badge-dark">FAIL</span>;
                    }
                },
            },
            
        ];

        this.state = {
            dataready: false,
            tableData: [],
            upProcess: 0,
            userIpfsBindName:""
        };

        this.title = "";
        this.content = "";
        this.coverImgUrl = "";
        this.isPublishing = false;
    }

    renderProcess() {
        return (
            <div className="upload-frame">
                <div className="col">
                    <div className="progress-wrapper">
                        <div className="progress-info">
                            <div className="h6 mb-0">Uploading...</div>
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
        const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
            onDrop: async (file) => {
                console.log(file);
                if (file.length <= 0) {
                    return;
                }
                if (file.length > 10) {
                    this.props.alert.error("too much files");
                    return;
                }
                let data = new FormData();
                for (const key in file) {
                    if (file[key].size>2*1024*1024*1024){
                        this.props.alert.error("file too big,limit 2GB");
                        return
                    }
                    data.append("files", file[key]);
                }

                let config = {
                    method: "post",
                    url: "https://ipfs.coldcdn.com/upload",

                    headers: {
                        Authorization: "Bearer " + UserManager.GetUserToken(),
                    },
                    data: data,
                    onUploadProgress: (progressEvent) => {
                        let complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                        console.log(complete + "%");
                        this.setState({ upProcess: complete });
                    },
                };

                try {
                    let response = await axios(config);
                    console.log(response);
                if (response.status !== 200) {
                    this.props.alert.error("error request:"+response.data);
                    return;
                }

                let rData = [];
                for (let i = 0; i < response.data.length; i++) {
                    let obj = {
                        hash: "",
                        url: null,
                        fileName: response.data[i].FileName,
                        state: response.data[i].Success,
                    };
                    if (obj.state == true) {
                        obj.hash = response.data[i].Hash;
                        let link = obj.hash;
                        if (obj.fileName != "") {
                            link = link + "?filename=" + obj.fileName;
                        }

                        obj.url = ["https://ipfs.io/ipfs/" + link, `https://coldcdn.com/api/cdn/${this.state.userIpfsBindName}/ipfs/` + link];
                    }
                    rData.push(obj);
                }

                for (let i = 0; i < this.state.tableData.length; i++) {
                    let obj = this.state.tableData[i];
                    if (obj.state == true) {
                        let pass = false;
                        for (let j = 0; j < rData.length; j++) {
                            if (obj.hash == rData[j].hash) {
                                pass = true;
                                break;
                            }
                        }
                        if (pass) {
                            continue;
                        }
                        rData.push(this.state.tableData[i]);
                    } else {
                        let pass = false;
                        for (let j = 0; j < rData.length; j++) {
                            if (obj.fileName == rData[j].fileName) {
                                pass = true;
                                break;
                            }
                        }
                        if (pass) {
                            continue;
                        }
                        rData.push(this.state.tableData[i]);
                    }
                }

                this.setState({ tableData: rData });
                } catch (error) {
                    this.props.alert.error("network error");
                    return;
                }

                
            },
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
            <div className="container" style={{ maxWidth: "1800px" }}>
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <em>(10 files are the maximum number of files you can drop here)</em>
                </div>
            </div>
        );
    };

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.getMesonIpfsUserBindDomain()
        this.setState({
            dataready: true,
        });
    }

    async getMesonIpfsUserBindDomain() {
        try {
            let response = await axios.get(
                Global.apiHost + "/api/v1/client/getdomains",
                {
                    headers: {
                        Authorization: "Bearer " + UserManager.GetUserToken(),
                    },
                }
            );
            
            //console.log(response.data);
            if (response.data.status!=0) {
                this.props.alert.error("get ipfs user bindname error");
                return
            }

            for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].originurl=="ipfs.coldcdn.com") {
                    this.setState({userIpfsBindName:response.data.data[i].bindname})
                    //console.log(this.state.userIpfsBindName);
                    return
                }
            }
        } catch (error) {
            this.props.alert.error("no ipfs user bindname");
            return;
        }
        
    }

    renderContent() {
        if (!this.state.dataready || !UserManager.checkUserHasAuth(UserManager.UserAuth.admin)) {
            return (
                <div className="alert alert-danger" role="alert">
                    Auth Required
                </div>
            );
        }

        return <div></div>;
    }

    renderUploadArea() {
        return <this.UploadDrop></this.UploadDrop>;
    }

    DataGrid = () => {
        return (
            <ReactDataGrid
                idProperty="id"
                columns={this.columns}
                dataSource={this.state.tableData}
                rowHeight={80}
                style={{ minHeight: 485, marginTop: "20px" }}
            ></ReactDataGrid>
        );
    };

    render() {
        //const Content = this.renderContent();

        return (
            <AdminLayout name="Client" description="IPFS Uploader">
                {this.renderUploadArea()}

                {this.state.upProcess > 0 && this.state.upProcess != 100 && this.renderProcess()}

                <div className="toast-body">
                    <this.DataGrid></this.DataGrid>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(IpfsUpload);
