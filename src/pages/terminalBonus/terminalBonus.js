/*
 * @Author: your name
 * @Date: 2020-11-10 19:56:44
 * @LastEditTime: 2020-11-16 23:15:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/terminalProfit/terminalProfit.js
 */

import React from "react";
import { withAlert } from "react-alert";
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import DataTable from "../../components/table/datatable";
import moment from "moment";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import DateRangePicker from "react-bootstrap-daterangepicker";
//import "bootstrap-daterangepicker/daterangepicker.css";

class TerminalBonus extends React.Component {
    constructor(props) {
        super(props);

        this.bonusInPlanPerSecond = 0;
        this.lastPayBonusTime = 0;
        this.todayRecord = [];
        this.queryRecord = [];

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
                name: "machine_mac",
                header: "Mac Addr",
                maxWidth: 1000,
                defaultFlex: 1,
            },
            {
                name: "amount",
                header: "Amount",
                maxWidth: 1000,
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div>${(value / 1e9).toFixed(5)}</div>;
                },
            },
        ];

        this.state = {
            dataready: false,
            paidBonus: 0,
            bonusInPlan: 0,
            queryRecord: [],

            queryStart: moment().subtract(31, "days"),
            queryEnd: moment(),
            isMergeTerminals: true,
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

        this.getBonusInfo();
        this.getBonusRecord(
            this.state.queryStart.valueOf(),
            this.state.queryEnd.valueOf()
        );
    }

    async getBonusRecord(startTime, endTime) {
        let response = await axios.post(
            "/api/v1/terminal/bonusrecord",
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

        this.setState({ queryRecord: response.data.data });
    }

    async getBonusInfo() {
        const last30 = moment().subtract("days", 30).valueOf();
        const startTime = last30;
        const endTime = moment().valueOf();

        let response = await axios.post(
            "/api/v1/terminal/bonus",
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

        this.bonusInPlanPerSecond = response.data.data.bonusInPlanPerSecond;
        this.lastPayBonusTime = response.data.data.lastPayBonusTime;
        this.todayRecord = response.data.data.todayRecord;

        //bonus in plan
        setInterval(() => {
            let nowStamp = Math.floor(moment().valueOf() / 1000);
            let bonusInPlan =
                (nowStamp - this.lastPayBonusTime) * this.bonusInPlanPerSecond;
            console.log("bonus in plan:", bonusInPlan);
            this.setState({ bonusInPlan: bonusInPlan });
        }, 1000);

        //paidBonus
        let paidBonus = 0;
        for (let index = 0; index < this.todayRecord.length; index++) {
            const element = this.todayRecord[index];
            paidBonus += element.amount;
        }
        console.log("paid bonus:", paidBonus);
        this.setState({ paidBonus: paidBonus });
    }

    render() {
        let label =
            this.state.queryStart.format("YYYY-MM-DD") +
            " ~ " +
            this.state.queryEnd.format("YYYY-MM-DD");
        return (
            <AdminLayout name="TerminalBonus" description="Bonus">
                {/* {Content} */}

                <div class="row">
                    <div class="col-lg-4 mb-4">
                        <div
                            class="card h-100 border-left-lg border-left-success"
                            style={{ boxShadow: "none" }}
                        >
                            <div class="card-body" style={{ padding: "10px" }}>
                                <div class="small text-muted">
                                    Today Paid Bonus
                                </div>
                                <div class="h3 d-flex align-items-center">
                                    ${(this.state.paidBonus / 1e9).toFixed(5)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 mb-4">
                        <div
                            class="card h-100 border-left-lg border-left-primary"
                            style={{ boxShadow: "none" }}
                        >
                            <div class="card-body" style={{ padding: "10px" }}>
                                <div class="small text-muted">
                                    Next Round Estimate Bonus
                                </div>
                                <div class="h3" style={{ color: "grey" }}>
                                    ${(this.state.bonusInPlan / 1e9).toFixed(5)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
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
                            <i className="ml-1" data-feather="chevron-down"></i>
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
                            this.getBonusRecord(start, end);
                        }}
                    >
                        Query Record
                    </button>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <div>Terminal Bonus Record:</div>
                    <ReactDataGrid
                        idProperty="id"
                        columns={this.columns}
                        dataSource={this.state.queryRecord}
                        pagination
                        defaultLimit={10}
                        style={{ minHeight: 485 }}
                    ></ReactDataGrid>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalBonus);
