/*
 * @Author: your name
 * @Date: 2020-11-10 19:56:44
 * @LastEditTime: 2020-11-16 23:24:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/terminalProfit/terminalProfit.js
 */

import React, { useCallback } from "react";
import { withAlert } from "react-alert";
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import DataTable from "../../components/table/datatable";
import moment from "moment";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import DateRangePicker from "react-bootstrap-daterangepicker";

 
class TerminalProfit extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                name: "timestamp",
                header: "Date",
                minWidth: 50,
                defaultFlex: 1,
                render: ({ value }) => {
                    return moment(value * 1000).format("YYYY-MM-DD");
                },
            },
            {
                name: "region",
                header: "Region",
                maxWidth: 1000,
                defaultFlex: 1,
            },
            {
                name: "machine_mac",
                header: "Mac Addr",
                maxWidth: 1000,
                defaultFlex: 1,
            },
            {
                name: "traffic",
                header: "Traffic",
                maxWidth: 1000,
                defaultFlex: 1,
                render: ({ value }) => {
                    let traffic = value;
                    if (traffic < 1000) {
                        return (
                            <td style={{ width: "20%" }}>{traffic}&ensp;KB</td>
                        );
                    } else if (traffic < 1000000) {
                        return (
                            <td style={{ width: "20%" }}>
                                {(traffic / 1000).toFixed(2)}&ensp;MB
                            </td>
                        );
                    } else {
                        return (
                            <td style={{ width: "20%" }}>
                                {(traffic / 1000000).toFixed(2)}&ensp;GB
                            </td>
                        );
                    }
                }
            },
            {
                name: "amount",
                header: "Amount",
                maxWidth: 1000,
                defaultFlex: 1,
                render: ({ value }) => {
                    return <td style={{ width: "20%" }}>$&ensp;{(value/1e9).toFixed(5)}</td>;
                },
            },
        ];

        this.state = {
            dataready: false,
            tableData: [],
            queryStart: moment().subtract(31, "days"),
            queryEnd: moment(),
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

        this.gettabledata(this.state.queryStart.valueOf(),this.state.queryEnd.valueOf())
    }

    async gettabledata(startTime, endTime) {

        let response = await axios.post(
            "/api/v1/terminal/profit",
            {
                startTime: Math.floor(startTime / 1000),
                endTime: Math.floor(endTime / 1000),
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response.data.status != 0) {
            return;
        }
        
        this.setState({ tableData: response.data.data });
    }

    Grid = () => {
        const dataSource = useCallback(() => {
            return Promise.resolve({
                data: this.state.tableData,
                count: this.state.tableData.length,
            });
        }, []);

        return (
            <ReactDataGrid
                idProperty="id"
                columns={this.columns}
                //dataSource={this.state.tableData}
                dataSource={dataSource}
                pagination
                defaultLimit={10}
                style={{ minHeight: 485 }}
            ></ReactDataGrid>
        );
    }

    render() {
        let label =
            this.state.queryStart.format("YYYY-MM-DD") +
            " ~ " +
            this.state.queryEnd.format("YYYY-MM-DD");
        return (
            <AdminLayout name="TerminalProfit" description="Profit">
                <div style={{ marginTop: "10px" }}>
                    <div class="row">
                        <DateRangePicker
                            className="col-4"
                            initialSettings={{
                                startDate: this.state.queryStart.toDate(),
                                endDate: this.state.queryEnd.toDate(),
                                ranges: {
                                    Today: [
                                        moment().toDate(),
                                        moment().toDate(),
                                    ],
                                    Yesterday: [
                                        moment().subtract(1, "days").toDate(),
                                        moment().subtract(1, "days").toDate(),
                                    ],
                                    "Last 7 Days": [
                                        moment().subtract(6, "days").toDate(),
                                        moment().toDate(),
                                    ],
                                    "Last 30 Days": [
                                        moment().subtract(29, "days").toDate(),
                                        moment().toDate(),
                                    ],
                                    "This Month": [
                                        moment().startOf("month").toDate(),
                                        moment().endOf("month").toDate(),
                                    ],
                                    "Last Month": [
                                        moment()
                                            .subtract(1, "month")
                                            .startOf("month")
                                            .toDate(),
                                        moment()
                                            .subtract(1, "month")
                                            .endOf("month")
                                            .toDate(),
                                    ],
                                },
                            }}
                            onCallback={(start, end) => {
                                // console.log(start.valueOf());
                                // console.log(end.valueOf());
                                this.setState({
                                    queryStart: start,
                                    queryEnd: end,
                                });
                            }}
                        >
                            <div
                                id="reportrange"
                                className="btn btn-light btn-sm line-height-normal p-2"
                                style={{ marginLeft: "5px" }}
                            >
                                <i
                                    className="mr-2 text-primary"
                                    data-feather="calendar"
                                ></i>
                                <span>{label}</span>
                                <i
                                    className="ml-1"
                                    data-feather="chevron-down"
                                ></i>
                            </div>
                        </DateRangePicker>
                        <button
                            class="btn btn-primary btn-xs"
                            type="button"
                            style={{ marginLeft: "5px" }}
                            onClick={() => {
                                //console.log("click");
                                let start = this.state.queryStart.valueOf();
                                let end = this.state.queryEnd.valueOf();
                                this.gettabledata(start, end);
                            }}
                        >
                            Query Record
                        </button>
                    </div>
                    <div>Terminal Traffic:</div>
                    <ReactDataGrid
                        idProperty="id"
                        columns={this.columns}
                        dataSource={this.state.tableData}
                        // dataSource={() => {
                        //     return Promise.resolve({ data: this.state.tableData, count:this.state.tableData.length });
                        // }}
                        pagination
                        defaultLimit={10}
                        style={{minHeight:485}}
                    ></ReactDataGrid>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalProfit);