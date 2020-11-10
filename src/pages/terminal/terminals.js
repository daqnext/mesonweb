/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2020-11-10 17:57:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/terminal/terminals.js
 */

import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import { withAlert } from "react-alert";
import AdminContent from "../../components/layout/adminContent";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import DataTable from "../../components/table/datatable";
import './terminals.css'

class TerminalPage extends React.Component {
    constructor(props) {
        super(props);

        this.fieldnames = {
            id: "id",
            machine_mac: "mac addr",
            machine_ip: "ip",
            port: "port",
            region: "region",
            disk_usage: "disk_usage",
            memory_usage: "memory_usage",
            machine_status: "status",
        };

        this.state = {
            dataready: false,
            tlist: [],
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

        return true
    }

    async gettabledata() {
        let response = await axios.post(
            "/api/v1/terminal/getmachineinfo",
            {
                limit: 999999,
                offset: 0,
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response.data.status != 0) {
            return [];
        }

        console.log(response);
        let terminalInfos = response.data.data.data;
        let tableData = [];
        for (let index = 0; index < terminalInfos.length; index++) {
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

        console.log(tableData);

        this.setState({
            dataready: true,
        });

        return tableData;
    }

    renderRowItem(data, key) {
        if (key == "disk_usage") {
            let percent = data[key]
            let width2 = "'" + '70' + '%' + "'";
            console.log(width2);
            let className = "progress-bar progress-bar-striped progress-bar-animated bg-danger";
            if (percent<60) {
                className =
                    "progress-bar progress-bar-striped progress-bar-animated bg-success";
            } else if (percent < 85) {
                className =
                    "progress-bar progress-bar-striped progress-bar-animated bg-warning";
            } 
            return (
                <td style={{ width: "15%" }}>
                    <div className="progress">
                        <div
                            className={className}
                            role="progressbar"
                            style={{ width: {width2} }}
                            aria-valuenow="0"
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >{ percent+' %'}</div>
                    </div>
                </td>
            );
        }

        if (key == "memory_usage") {
            let percent = data[key];
            let className = "progress-bar progress-bar-striped progress-bar-animated bg-danger";
            if (percent < 60) {
                className =
                    "progress-bar progress-bar-striped progress-bar-animated bg-success";
            } else if (percent < 85) {
                className =
                    "progress-bar progress-bar-striped progress-bar-animated bg-warning";
            } 
            return (
                <td style={{ width: "15%" }}>
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
                </td>
            );
        }

        if (key == "machine_status") {
            if (data[key].machine_status === "up") {
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
        }

        return <td>{data[key]}</td>;
    }

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
            <div>
                <DataTable
                    fieldnames={this.fieldnames}
                    gettabledata={this.gettabledata}
                    renderRowItem={this.renderRowItem}
                ></DataTable>
            </div>
        );
    }

    render() {
        const Content = this.renderContent();

        return (
            <AdminLayout name="Terminals" description="terminals">
                {Content}
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalPage);