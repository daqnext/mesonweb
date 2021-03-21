/*
 * @Author: your name
 * @Date: 2020-11-10 19:56:44
 * @LastEditTime: 2021-03-13 10:47:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/terminalProfit/terminalProfit.js
 */

import React, { useCallback } from "react";
import { withAlert } from "react-alert";
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import moment from "moment";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Global from "../../global/global";

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
                            <div style={{ width: "20%" }}>{traffic}&ensp;KB</div>
                        );
                    } else if (traffic < 1000000) {
                        return (
                            <div style={{ width: "20%" }}>
                                {(traffic / 1000).toFixed(2)}&ensp;MB
                            </div>
                        );
                    } else {
                        return (
                            <div style={{ width: "20%" }}>
                                {(traffic / 1000000).toFixed(2)}&ensp;GB
                            </div>
                        );
                    }
                },
            },
            // {
            //     name: "amount",
            //     header: "Token Amount",
            //     maxWidth: 1000,
            //     defaultFlex: 1,
            //     render: ({ value }) => {
            //         return (
            //             <div style={{ width: "20%" }}>
            //                 &ensp;{(value / 1e9).toFixed(5)}
            //             </div>
            //         );
            //     },
            // },
        ];

        this.state = {
            dataready: false,
            tableData: [],
            queryStart: moment().subtract(31, "days").startOf('day'),
            queryEnd: moment().endOf('day'),
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

        this.loadData()
    }

    loadData=null
    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                console.log(skip,limit);
                return axios
                    .post(
                        Global.apiHost+"/api/v1/terminal/traffic",
                        {
                            startTime: Math.floor(
                                this.state.queryStart.valueOf() / 1000
                            ),
                            endTime: Math.floor(
                                this.state.queryEnd.valueOf() / 1000
                            ),
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
                        let responseData = response.data.data
                        console.log(responseData);
                        return {
                            data: responseData.data,
                            count: parseInt(responseData.total),
                        };
                    });
            };
            this.setState({tableData:data})
        }, []) 
        this.loadData=loadData

        let label =
            this.state.queryStart.format("YYYY-MM-DD") +
            " ~ " +
            this.state.queryEnd.format("YYYY-MM-DD");
        return (

            <div className="card border-light shadow-sm">
                <div className="card-body">
                <div className="row">
                    <DateRangePicker
                        className="col-4"
                        initialSettings={{
                            startDate: this.state.queryStart.toDate(),
                            endDate: this.state.queryEnd.toDate(),
                            ranges: {
                                Today: [moment().toDate(), moment().toDate()],
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
                            this.setState({
                                queryStart: start,
                                queryEnd: end,
                            });
                        }}
                    >
                        <div
                            id="reportrange"
                            className="btn btn-light btn-sm line-height-normal p-2"
                            style={{ marginLeft: "15px" }}
                        >
                            <i
                                className="mr-2 text-primary"
                                data-feather="calendar"
                            ></i>
                            <span>{label}</span>
                            <i className="ml-1" data-feather="chevron-down"></i>
                        </div>
                    </DateRangePicker>
                    <button
                        className="btn btn-primary btn-xs"
                        type="button"
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                            loadData()
                        }}
                    >
                        Query Record
                    </button>
                </div>

                <ReactDataGrid
                    idProperty="id"
                    columns={this.columns}
                    dataSource={this.state.tableData}
                    pagination
                    defaultLimit={10}
                    style={{ minHeight: 485,marginTop:'20px' }}
                ></ReactDataGrid>
            </div>
            </div>
        );
    };

    render() {
        return (
            <AdminLayout name="Terminal" description="Profit">
                <div style={{ marginTop: "10px" }}>
                    <this.DataGrid></this.DataGrid>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalProfit);
