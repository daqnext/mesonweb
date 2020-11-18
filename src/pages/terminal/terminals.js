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
                name: "region",
                header: "region",
                defaultFlex: 1,
            },
            {
                name: "disk_usage",
                header: "disk_usage",
                defaultFlex: 1,
                render: ({ value }) => {
                    let percent = value;
                    let width2 = "'" + "70" + "%" + "'";
                    console.log(width2);
                    let className =
                        "progress-bar progress-bar-striped progress-bar-animated bg-danger";
                    if (percent < 60) {
                        className =
                            "progress-bar progress-bar-striped progress-bar-animated bg-success";
                    } else if (percent < 85) {
                        className =
                            "progress-bar progress-bar-striped progress-bar-animated bg-warning";
                    }
                    return (
                        <div className="progress">
                            <div
                                className={className}
                                role="progressbar"
                                style={{ width: { width2 } }}
                                aria-valuenow="0"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {percent + " %"}
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
                    let className =
                        "progress-bar progress-bar-striped progress-bar-animated bg-danger";
                    if (percent < 60) {
                        className =
                            "progress-bar progress-bar-striped progress-bar-animated bg-success";
                    } else if (percent < 85) {
                        className =
                            "progress-bar progress-bar-striped progress-bar-animated bg-warning";
                    }
                    return (
                        <div className="progress">
                            <div
                                className={className}
                                role="progressbar"
                                //style="width: 0%"
                                aria-valuenow="0"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {percent + " %"}
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

        this.state = {
            dataready: false,
            tableData: [],
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
                                region: terminalInfo.region,
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

    render() {
        const Content = this.renderContent();

        return (
            <AdminLayout name="Terminal" description="terminals">
                {Content}
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalPage);
