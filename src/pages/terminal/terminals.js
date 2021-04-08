/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2021-04-08 20:49:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/terminal/terminals.js
 */

import React,{useCallback} from "react";
import AdminLayout from "../../components/layout/adminLayout";
import { withAlert } from "react-alert";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import "./terminals.css";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Global from "../../global/global";
import DataTable from "../../components/table/datatable";

class TerminalPage extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                name: "id",
                header: "ID",
                defaultWidth: 80,
                render: ({ value }) => {
                    return (
                        <div>{"id-"+value}</div>
                    );
                },
            },
            {
                name: "machine_mac",
                header: "Mac Addr",
                defaultFlex: 1,
            },
            {
                name: "machine_ip",
                header: "IP",
                defaultFlex: 1,
            },
            {
                name: "port",
                header: "port",
                defaultFlex: 1,
            },
            {
                name: "country",
                header: "country",
                defaultFlex: 1,
            },
            {
                name: "cdn_space_usage",
                header: "cdn_space_usage",
                defaultFlex: 1,
                render: ({ value }) => {
                    let percent = value;
                    let width2 = percent + "%";
                    //console.log(width2);

                    let className = "progress-bar bg-secondary";
                    if (percent < 60) {
                        className = "progress-bar bg-tertiary";
                    } else if (percent < 85) {
                        className = "progress-bar bg-primary";
                    }
                    return (
                        <div>
                            <div>{width2}</div>
                            <div className="progress mb-0">
                                <div
                                    className={className}
                                    role="progressbar"
                                    aria-valuenow={'"' + percent + '"'}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{ width: percent + "px" }}
                                ></div>
                            </div>
                        </div>
                    );
                },
            },
            // {
            //     name: "disk_usage",
            //     header: "disk_usage",
            //     defaultFlex: 1,
            //     render: ({ value }) => {
            //         let percent = value;
            //         let width2 =   percent + "%" ;
            //         //console.log(width2);

            //         let className = "progress-bar bg-secondary";
            //         if (percent < 60) {
            //             className = "progress-bar bg-tertiary";
            //         } else if (percent < 85) {
            //             className = "progress-bar bg-primary";
            //         }
            //         return (
            //             <div>
            //                 <div>{width2}</div>
            //                 <div className="progress mb-0">
            //                     <div className={className} role="progressbar"
            //                          aria-valuenow={'"'+percent+'"'}
            //                          aria-valuemin="0" aria-valuemax="100"
            //                          style={{width:percent+'px'}} ></div>
            //                 </div>
            //             </div>

            //         );
            //     },
            // },
            {
                name: "memory_usage",
                header: "memory_usage",
                defaultFlex: 1,
                render: ({ value }) => {
                    let percent = value;
                    let className = "progress-bar bg-secondary";
                    if (percent < 60) {
                        className = "progress-bar bg-tertiary";
                    } else if (percent < 85) {
                        className = "progress-bar bg-primary";
                    }
                    return (
                        <div>
                            <div>{percent + "%"}</div>
                            <div className="progress mb-0">
                                <div
                                    className={className}
                                    role="progressbar"
                                    aria-valuenow={'"' + percent + '"'}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    style={{ width: percent + "px" }}
                                ></div>
                            </div>
                        </div>
                    );
                },
            },
            {
                name: "version",
                header: "version",
                defaultFlex: 1,
                render: ({ value }) => {
                    if (this.state.terminalAllowVersion != "") {
                        let allowVersionStr = this.state.terminalAllowVersion.split(
                            "."
                        );
                        let terminalVersionStr = value.split(".");
                        let disableVersion=false
                        for (let i = 0; i < allowVersionStr.length; i++) {
                            if (
                                parseInt(allowVersionStr[i]) >
                                parseInt(terminalVersionStr[i])
                            ){
                             disableVersion=true  
                             break 
                            } else if(parseInt(allowVersionStr[i]) <
                            parseInt(terminalVersionStr[i])){
                                disableVersion =false
                                break
                            }

                            if (disableVersion==true)
                            {
                                return (
                                    <td>
                                        <div>
                                            <span className="disable-version"></span>
                                            &nbsp;{value}
                                        </div>
                                        <div>Disable Version</div>
                                    </td>
                                );
                            }
                        }
                    }

                    if (this.state.terminalLatestVersion != "") {
                        if (this.state.terminalLatestVersion != value) {
                            return (
                                <div>
                                    <div>
                                        <span className="low-version"></span>
                                        &nbsp;{value}
                                    </div>
                                    <div>Low Version</div>
                                </div>
                            );
                        }
                    }

                    return (
                        <td>
                            <span className="status-on"></span>
                            &nbsp;{value}
                        </td>
                    );
                },
            },
            {
                name: "machine_status",
                header: "status",
                defaultFlex: 1,
                render: ({ value }) => {
                    if (value === "up") {
                        return (
                            <td>
                                <span className="status-on"></span> &nbsp;ON
                            </td>
                        );
                    } else {
                        return (
                            <td>
                                <span className="status-down"></span> &nbsp;DOWN
                            </td>
                        );
                    }
                },
            },
        ];


        this.tutorial_sys=[
            'linux 64 bit',
            'linux 32 bit',
            'winserver 64 bit',
            'winserver 32 bit',
            'mac 64 bit',
        ];

        this.state = {
            dataready: false,
            tableData: [],
            tutorialsys: 'linux 64 bit',
            terminalAllowVersion: "",
            terminalLatestVersion:"",
        };
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();

        this.setState({
            dataready: true,
        });

        this.GetTerminalAllowVersion()
        this.loadData();
    }

    async GetTerminalAllowVersion() {
        let response = await axios.get(
            Global.apiHost + "/api/v1/common/terminalversion"
        );
        if (response.data.status==0) {
            this.setState({
                terminalAllowVersion: response.data.data.allowVersion,
                terminalLatestVersion: response.data.data.latestVersion,
            });
        }
    }

    loadData = null;
    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                console.log(skip, limit);
                return axios
                    .post(
                        Global.apiHost+"/api/v1/terminal/getmachineinfo",
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
                        
                        let terminalInfos = responseData.data;
                        let tableData = [];
                        for (
                            let index = 0;
                            index < terminalInfos.length;
                            index++
                        ) {
                            const terminalInfo = terminalInfos[index];
                            let tData = {
                                id: terminalInfo.id,
                                machine_mac: terminalInfo.machine_mac,
                                machine_ip: terminalInfo.machine_ip,
                                port: terminalInfo.port,
                                country: terminalInfo.country,
                                cdn_space_usage: (
                                    ((terminalInfo.cdn_disk_total -
                                        terminalInfo.cdn_disk_available) /
                                        terminalInfo.cdn_disk_total) *
                                    100
                                ).toFixed(2),
                                disk_usage: (
                                    ((terminalInfo.machine_total_disk -
                                        terminalInfo.machine_available_disk) /
                                        terminalInfo.machine_total_disk) *
                                    100
                                ).toFixed(2),
                                memory_usage: (
                                    ((terminalInfo.machine_total_memory -
                                        terminalInfo.machine_free_memory) /
                                        terminalInfo.machine_total_memory) *
                                    100
                                ).toFixed(2),
                                machine_status: terminalInfo.machine_status,
                                version:
                                    terminalInfo.version == ""
                                        ? "0.1.1"
                                        : terminalInfo.version,
                                info: terminalInfo,
                            };
                            tableData.push(tData);
                        }
                        return {
                            data: tableData,
                            count: parseInt(responseData.total),
                        };
                    });
            };
            this.setState({ tableData: data });
        }, []);
        this.loadData = loadData;

        return (
            <div>
                <div></div>
                <ReactDataGrid
                    idProperty="id"
                    columns={this.columns}
                    dataSource={this.state.tableData}
                    pagination
                    defaultLimit={10}
                    style={{ minHeight: 485 }}
                ></ReactDataGrid>
            </div>
        );
    };

    renderContent() {
        if (
            !this.state.dataready ||
            !UserManager.checkUserHasAuth(UserManager.UserAuth.terminal)
        ) {
            return (
                <div className="alert alert-danger" role="alert">
                    Auth Required
                </div>
            );
        }

        return (
            <div className="card border-light shadow-sm">
                <div className="card-body">
                     <this.DataGrid></this.DataGrid>
                </div>
            </div>
        );
    }

    renderTutorial(){

        let tutorialheaders=this.tutorial_sys.map((m, idx) => {
            if(this.state.tutorialsys==m){
                return (<a className="nav-link  active ml-0" href="#">{m}</a>);
            }else{
                return (<a className="nav-link  ml-0" href="#"  onClick={(e)=>{
                    this.setState({tutorialsys: m});
                }} >{m}</a>);
            }
        });

        //https://meson.network/static/terminal/v0.1.2/meson-darwin-amd64.tar.gz
        let tutorialcontent=(<div></div>);
        if(this.state.tutorialsys=='linux 64 bit'){
            tutorialcontent=(
                <div>
                    <div>####### Tutorial: How to install and run miner terminal on linux server#######</div>
                    <div>#Step.1 download the terminal package</div>
                    <div style={{ color: 'yellow' }}>$ wget '{Global.assetsHost}/static/terminal/v{this.state.terminalLatestVersion}/meson-linux-amd64.tar.gz'</div>
                    <div>#Step.2 unzip the package</div>
                    <div style={{color:'yellow'}}>$ tar -zxf meson-linux-amd64.tar.gz</div>
                    <div>#Step.3 run the app</div>
                    <div style={{color:'yellow'}}>$ cd ./meson-linux-amd64 && ./meson</div>
                    <div>#Step.4 input your token, port and space provide</div>
                    <div>after 2-3 minutes you will have a new terminal record  </div>
                    <div>#Step.5 check your earnings</div>
                </div>

            );
        }

        if(this.state.tutorialsys=='linux 32 bit'){
            tutorialcontent=(
                <div>
                    <div>####### Tutorial: How to install and run miner terminal on linux server#######</div>
                    <div>#Step.1 download the terminal package</div>
                    <div style={{color:'yellow'}}>$ wget '{Global.assetsHost}/static/terminal/v{this.state.terminalLatestVersion}/meson-linux-386.tar.gz'</div>
                    <div>#Step.2 unzip the package</div>
                    <div style={{color:'yellow'}}>$ tar -zxf meson-linux-386.tar.gz</div>
                    <div>#Step.3 run the app</div>
                    <div style={{color:'yellow'}}>$ cd ./meson-linux-386 && ./meson</div>
                    <div>#Step.4 input your token, port and space provide</div>
                    <div>after 2-3 minutes you will have a new terminal record  </div>
                    <div>#Step.5 check your earnings</div>
                </div>

            );
        }

        if(this.state.tutorialsys=='winserver 64 bit'){
            tutorialcontent=(
                <div>
                    <div>####### Tutorial: How to install and run miner terminal on windows server#######</div>
                    <div>#Step.1 download the terminal package</div>
                    <div style={{color:'yellow'}}>$ wget '{Global.assetsHost}/static/terminal/v{this.state.terminalLatestVersion}/meson-windows-amd64.zip'</div>
                    <div>#Step.2 unzip the package</div>
                    <div style={{color:'yellow'}}>$ unzip meson-windows-amd64.zip</div>
                    <div>#Step.3 run the app</div>
                    <div style={{color:'yellow'}}>$ cd ./meson-windows-amd64 && ./meson.exe</div>
                    <div>#Step.4 input your token, port and space provide</div>
                    <div>after 2-3 minutes you will have a new terminal record  </div>
                    <div>#Step.5 check your earnings</div>
                </div>

            );
        }

        if(this.state.tutorialsys=='winserver 32 bit'){
            tutorialcontent=(
                <div>
                    <div>####### Tutorial: How to install and run miner terminal on windows server#######</div>
                    <div>#Step.1 download the terminal package</div>
                    <div style={{color:'yellow'}}>$ wget '{Global.assetsHost}/static/terminal/v{this.state.terminalLatestVersion}/meson-windows-386.zip'</div>
                    <div>#Step.2 unzip the package</div>
                    <div style={{color:'yellow'}}>$ unzip meson-windows-386.zip</div>
                    <div>#Step.3 run the app</div>
                    <div style={{color:'yellow'}}>$ cd ./meson-windows-386 && ./meson.exe</div>
                    <div>#Step.4 input your token, port and space provide</div>
                    <div>after 2-3 minutes you will have a new terminal record  </div>
                    <div>#Step.5 check your earnings</div>
                </div>

            );
        }

        if(this.state.tutorialsys=='mac 64 bit'){
            tutorialcontent=(
                <div>
                    <div>####### Tutorial: How to install and run miner terminal on mac server#######</div>
                    <div>#Step.1 download the terminal package</div>
                    <div style={{color:'yellow'}}>$ wget '{Global.assetsHost}/static/terminal/v{this.state.terminalLatestVersion}/meson-darwin-amd64.tar.gz'</div>
                    <div>#Step.2 unzip the package</div>
                    <div style={{color:'yellow'}}>$ tar -zxf meson-darwin-amd64.tar.gz</div>
                    <div>#Step.3 run the app</div>
                    <div style={{color:'yellow'}}>$ cd ./meson-darwin-amd64 && ./meson</div>
                    <div>#Step.4 input your token, port and space provide</div>
                    <div>after 2-3 minutes you will have a new terminal record  </div>
                    <div>#Step.5 check your earnings</div>
                </div>

            );
        }

        return(
            <div>
                <div className="nav nav-tabs" style={{marginTop:'20px'}}>
                    {tutorialheaders}
                </div>

                <div className="card border-light shadow-sm" style={{borderRadius:'0px',marginBottom:'20px',minHeight:'200px'}}>
                    <div className="card-body"  style={{background:'#3a3a3a',marginTop:'-2px',marginLeft:'-1px',
                        borderBottomRightRadius:'6px',borderBottomLeftRadius:'6px',borderTopRightRadius:'6px',
                        minHeight:'120px',color:'white',padding:'25px 20px'}}>
                            {tutorialcontent}
                    </div>
                </div>
            </div>


        )

    }

    render() {
        const Content = this.renderContent();
        const Tutorial = this.renderTutorial();
        return (
            <AdminLayout name="Terminal" description="terminals">
                {Tutorial}

                <div className="card border-light shadow-sm" style={{marginBottom:'10px'}}>
                    <div className="card-body" style={{padding:'10px 20px'}}>

                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">My Token</label>
                            <div className="input-group mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-unlock-alt"></i></span>
                                </div>
                                <input  id="mytoken" value={UserManager.GetUserToken()} className="form-control"  type="text" />
                                <div className="input-group-append">
                                    <div data-clipboard-target="#mytoken" className="btn   btn-light" type="button">copy</div>
                                </div>
                            </div>
                            
                            
                        </div>

                    </div>
                </div>

                {Content}
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalPage);
