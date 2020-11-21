/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2020-11-17 08:54:13
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
                name: "disk_usage",
                header: "disk_usage",
                defaultFlex: 1,
                render: ({ value }) => {
                    let percent = value;
                    let width2 =   percent + "%" ;
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
                                <div className={className} role="progressbar"
                                     aria-valuenow={'"'+percent+'"'}
                                     aria-valuemin="0" aria-valuemax="100"
                                     style={{width:percent+'px'}} ></div>
                            </div>
                        </div>



                    );
                },
            },
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
                            <div>{percent+"%"}</div>
                            <div className="progress mb-0">
                                <div className={className} role="progressbar"
                                     aria-valuenow={'"'+percent+'"'}
                                     aria-valuemin="0" aria-valuemax="100"
                                     style={{width:percent+'px'}} ></div>
                            </div>
                        </div>
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
            'linux',
            'winserver',
            'mac',
        ];

        this.state = {
            dataready: false,
            tableData: [],
            tutorialsys:'linux',
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

        this.loadData();
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


        let tutorialcontent=(<div></div>);
        if(this.state.tutorialsys=='linux'){
            tutorialcontent=(
                <div>
                    <div>//How to install and run miner terminal on linux server</div>
                    <div>//step 1 download the terminal package</div>
                    <div style={{color:'yellow'}}>$ wget 'https://meson.network/static/terminal/meson'</div>
                </div>

            );
        }

        return(
            <div>
                <div className="nav nav-tabs" style={{marginTop:'20px'}}>
                    {tutorialheaders}
                </div>

                <div className="card border-light shadow-sm" style={{borderRadius:'0px',marginBottom:'20px',minHeight:'200px'}}>
                    <div className="card-body">
                        <div style={{background:'black',borderRadius:'3px',minHeight:'120px',color:'white',padding:'5px 10px'}}>
                            {tutorialcontent}
                        </div>

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
                {Content}
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalPage);
