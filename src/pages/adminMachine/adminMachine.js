/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2020-12-21 21:20:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/terminal/terminals.js
 */

import React,{useCallback} from "react";
import AdminLayout from "../../components/layout/adminLayout";
import { withAlert } from "react-alert";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import "./adminMachine.css";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Global from "../../global/global";
import DataTable from "../../components/table/datatable";
import AdminTerminal from "./adminTerminal";
import AdminFileTransfer from "./adminFileTransfer";
import AdminFileStore from "./adminFileStore";
import AdminSpeedTester from "./adminSpeedTester";

class AdminMachinePage extends React.Component {
    constructor(props) {
        super(props);

        this.machineType = [
            "terminal",
            "validator",
            "speedTester",
            "fileTransfer",
            "fileStore",
        ];

        this.state = {
            dataready: false,
            machineType: "terminal",
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
    }

    

    loadData = null;
    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                console.log(skip, limit);
                return axios
                    .post(
                        Global.apiHost + "/api/v1/terminal/getmachineinfo",
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

    renderMachineTable() {
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

        let tutorialheaders = this.machineType.map((m, idx) => {
            if (this.state.machineType == m) {
                return (
                    <a className="nav-link  active ml-0" href="#">
                        {m}
                    </a>
                );
            } else {
                return (
                    <a
                        className="nav-link  ml-0"
                        href="#"
                        onClick={(e) => {
                            this.setState({ machineType: m });
                        }}
                    >
                        {m}
                    </a>
                );
            }
        });

        let machineContent = <div></div>;
        if (this.state.machineType == "terminal") {
            machineContent = (
                <div>
                    <AdminTerminal></AdminTerminal>
                </div>
            );
        }

        if (this.state.machineType == "validator") {
            machineContent = (
                <div>
                    <AdminTerminal></AdminTerminal>
                </div>
            );
        }

        if (this.state.machineType == "speedTester") {
            machineContent = (
                <div>
                    <AdminSpeedTester></AdminSpeedTester>
                </div>
            );
        }

        if (this.state.machineType == "fileTransfer") {
            machineContent = (
                <div>
                    <AdminFileTransfer></AdminFileTransfer>
                </div>
            );
        }

        if (this.state.machineType == "fileStore") {
            machineContent = (
                <div>
                    <AdminFileStore></AdminFileStore>
                </div>
            );
        }

        return (
            <div>
                <div className="nav nav-tabs" style={{ marginTop: "20px" }}>
                    {tutorialheaders}
                </div>

                <div
                    className="  border-light shadow-sm"
                    style={{
                        borderRadius: "0px",
                        marginBottom: "20px",
                        minHeight: "200px",
                    }}
                >
                    {machineContent}
                </div>
            </div>
        );
    }

    render() {
        const MachineTable = this.renderMachineTable();
        return (
            <AdminLayout name="Admin" description="Machines">
                {MachineTable}
            </AdminLayout>
        );
    }
}

export default withAlert()(AdminMachinePage);
