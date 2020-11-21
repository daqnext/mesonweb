/*
 * @Author: your name
 * @Date: 2020-11-19 23:52:52
 * @LastEditTime: 2020-11-21 19:38:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/terminalTotalProfit/terminalTotalProfit.js
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
//import "bootstrap-daterangepicker/daterangepicker.css";
import Global from "../../global/global";

import ChartistGraph from "react-chartist";

class TerminalTotalProfit extends React.Component {
    constructor(props) {
        super(props);

        this.bonusInPlanPerSecond = 0;
        this.lastPayBonusTime = 0;
        this.todayRecord = [];
        this.queryRecord = [];
        this.tableData = [];

        this.columns = [
            {
                name: "date",
                header: "Date",
                minWidth: 50,
                defaultFlex: 1,
            },
            // {
            //     name: "ipaddr",
            //     header: "Ip Addr",
            //     maxWidth: 1000,
            //     defaultFlex: 1,
            // },

            // {
            //     name: "machine_mac",
            //     header: "Terminals",
            //     maxWidth: 1000,
            //     defaultFlex: 1,
            // },

            {
                name: "FileToken",
                header: "File Transfer Token",
                maxWidth: 1000,
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div>T {value.toFixed(5)}</div>;
                },
            },
            {
                name: "Bonous",
                header: "Bonous Token",
                maxWidth: 1000,
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div>T {value.toFixed(5)}</div>;
                },
            },
            {
                name: "Total",
                header: "Total",
                maxWidth: 1000,
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div>T {value.toFixed(5)}</div>;
                },
            },
        ];

        this.state = {
            dataready: false,
            paidBonus: 0,
            bonusInPlan: 0,
            trafficTokenToday:0,
            tableData: [],

            queryStart: moment().subtract(31, "days"),
            queryEnd: moment(),
            isMergeTerminals: true,
            chardata: {},
        };

        /////below for charist test data

        this.charoptions = {
            fullWidth: true,
            chartPadding: {
                right: 40,
                left: 10,
            },
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
        this.GetTrafficTokenToday()
        await this.LoadTotalData();
        this.loadData();
    }

    async GetTrafficTokenToday() {
        let response = await axios.post(
            Global.apiHost + "/api/v1/terminal/profit",
            {
                startTime: Math.floor(moment().startOf("day").valueOf() / 1000),
                endTime: Math.floor(moment().valueOf() / 1000),
                limit: 10000,
                offset: 0,
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );
        if (response.data.status != 0) {
            return ;
        }

        let responseData = response.data.data;
        let traffic = responseData.data;
        let totalTrafficTokenToday=0
        for (let i = 0; i < traffic.length; i++) {
            totalTrafficTokenToday+=traffic[i].amount
        }
        this.setState({ trafficTokenToday: totalTrafficTokenToday });
    }

    loadData = null;
    async LoadTotalData() {
        let response = await axios.post(
            Global.apiHost + "/api/v1/terminal/totalprofit",
            {
                startTime: Math.floor(this.state.queryStart.valueOf() / 1000),
                endTime: Math.floor(this.state.queryEnd.valueOf() / 1000),
                limit: 10000,
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
        let responseData = response.data.data;
        console.log(responseData);

        let totalData = responseData.totalData;
        let tempCharData = {
            labels: [],
            series: [[], []],
        };

        let tableData = [];

        let startTime = this.state.queryStart.valueOf();
        let endTime = this.state.queryEnd.valueOf();
        let day = 0;
        while (startTime + day * (1000 * 3600 * 24) < endTime) {
            let dayTimeStamp = startTime + day * (1000 * 3600 * 24);
            let dayDate = moment(dayTimeStamp).format("YYYY-MM-DD");
            tempCharData.labels.push(dayDate);
            day++;

            if (!totalData[dayDate]) {
                tempCharData.series[0].push(0);
                tempCharData.series[1].push(0);
                continue;
            }

            if (totalData[dayDate].traffic) {
                tempCharData.series[0].push(totalData[dayDate].traffic / 1e9);
            } else {
                tempCharData.series[0].push(0);
            }

            if (totalData[dayDate].bonus) {
                tempCharData.series[1].push(totalData[dayDate].bonus / 1e9);
            } else {
                tempCharData.series[1].push(0);
            }

            let dayTableData = {
                date: dayDate,
                FileToken: tempCharData.series[0][day - 1],
                Bonous: tempCharData.series[1][day - 1],
                Total:
                    tempCharData.series[0][day - 1] +
                    tempCharData.series[1][day - 1],
            };
            tableData.push(dayTableData);
        }

        this.chardata = tempCharData;
        this.setState({ chardata: tempCharData });
        this.tableData=tableData
    }

    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {           
                let limitTableData = this.tableData.slice(skip, skip + limit);               
                return Promise.resolve( {
                    data: limitTableData,
                    count: this.tableData.length,
                });
            };
            this.setState({ tableData: data });
        }, []);

        this.loadData = loadData;

        let label =
            this.state.queryStart.format("YYYY-MM-DD") +
            " ~ " +
            this.state.queryEnd.format("YYYY-MM-DD");
        return (
            <div>
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
                        onClick={async () => {
                            await this.LoadTotalData();
                            this.loadData();
                        }}
                    >
                        Query Record
                    </button>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <ChartistGraph
                        data={this.state.chardata}
                        options={this.charoptions}
                        type="Line"
                    />
                </div>

                <ReactDataGrid
                    idProperty="id"
                    columns={this.columns}
                    dataSource={this.state.tableData}
                    pagination
                    defaultLimit={10}
                    style={{ minHeight: 485, marginTop: "20px" }}
                ></ReactDataGrid>
            </div>
        );
    };

    async getBonusInfo() {
        const last30 = moment().subtract("days", 30).valueOf();
        const startTime = last30;
        const endTime = moment().valueOf();

        let response = await axios.post(
            Global.apiHost + "/api/v1/terminal/bonus",
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
        return (
            <AdminLayout name="Terminal" description="Earnings">
                <div class="row">
                    <div class="col-lg-4 mb-4">
                        <div class="card  border-light shadow-sm">
                            <div
                                class="card-body"
                                style={{ padding: "10px 20px" }}
                            >
                                <div class="small text-muted">
                                    Bonous Tokens Earned Today
                                </div>
                                <div
                                    class="h4 d-flex align-items-center"
                                    style={{
                                        fontSize: "20px",
                                        color: "green",
                                        marginTop: "5px",
                                    }}
                                >
                                    {(this.state.paidBonus / 1e9).toFixed(5)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 mb-4">
                        <div class="card card  border-light shadow-sm">
                            <div
                                class="card-body"
                                style={{ padding: "10px 20px" }}
                            >
                                <div class="small text-muted">
                                    Estimated Bonous Tokens Next Round
                                </div>
                                <div
                                    class="h4"
                                    style={{
                                        fontSize: "20px",
                                        color: "grey",
                                        marginTop: "5px",
                                    }}
                                >
                                    {" "}
                                    {(this.state.bonusInPlan / 1e9).toFixed(5)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <div className="card  border-light shadow-sm">
                            <div
                                className="card-body"
                                style={{ padding: "10px 20px" }}
                            >
                                <div className="small text-muted">
                                    Tokens Earned For Files Transferred Today
                                </div>
                                <div
                                    style={{
                                        fontSize: "20px",
                                        color: "green",
                                        marginTop: "5px",
                                    }}
                                    className="h4 d-flex align-items-center"
                                >
                                    {(this.state.trafficTokenToday/1e9).toFixed(5)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card border-light shadow-sm">
                    <div className="card-body">
                        <this.DataGrid></this.DataGrid>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalTotalProfit);
