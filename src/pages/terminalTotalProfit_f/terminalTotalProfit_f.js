/*
 * @Author: your name
 * @Date: 2020-11-19 23:52:52
 * @LastEditTime: 2021-10-28 08:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/terminalTotalProfit/terminalTotalProfit.js
 */

import React, { useCallback } from "react";
import { withAlert } from "react-alert";
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import TimeManager from "../../manager/timemanager";
import axios from "axios";
import moment from "moment";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Global from "../../global/global";

import ChartistGraph from "react-chartist";
import Utils from "../../utils/utils";


class TerminalTotalProfit_f extends React.Component {
    constructor(props) {
        super(props);

        this.bonusInPlanPerSecond = 0;
        this.lastPayBonusTime = 0;
        this.todayRecord = [];
        this.queryRecord = [];
        this.tableData = [];
        this.refrashBonusInPlanInterval=0

        this.columns = [
            {
                name: "date",
                header: "Date",
                minWidth: 50,
                defaultFlex: 1,
            },
            {
                name: "amount",
                header: "Token",
                maxWidth: 1000,
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div> {Utils.ParseMesonTokenStringToNormal(value)}</div>;
                },
            },
        ];

        this.state = {
            dataready: false,
            committedToday: "0",
            uncommitted:"0",
            bonusInPlan: 0,
            trafficTokenToday:0,
            tableData: [],

            queryStart: moment().subtract(30, "days").startOf('day'),
            queryEnd: moment().subtract(1, "days").endOf('day'),
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

        if(TimeManager.timeZone==null){
            await TimeManager.UpdateServerTimeZone();
        }

        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready: true,
        });

        this.getBonusInfo();
        await this.LoadTotalData();
        this.loadData();

        setInterval(() => {
            this.getBonusInfo();
        }, 60*1000);
    }

    loadData = null;
    async LoadTotalData() {
        let response = await axios.post(
            Global.apiHost + "/api/v1/terminal/totalprofit_f",
            {
                startTime: Math.floor(this.state.queryStart.valueOf() / 1000),
                endTime: Math.floor(this.state.queryEnd.valueOf() / 1000)
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

        let tempCharData = {
            labels: [],
            series: [[],[]],
        };
        for (let i = responseData.length-1; i >=0 ; i--) {
            tempCharData.labels.push(responseData[i].date.substr(5))
            tempCharData.series[1].push(Utils.ParseMesonTokenStringToNormal(responseData[i].amount))
        }
        
        this.setState({ chardata: tempCharData });
        this.tableData=responseData  //table data
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
                                    moment().subtract(7, "days").toDate(),
                                    moment().subtract(1, "days").toDate()
                                ],
                                "Last 30 Days": [
                                    moment().subtract(30, "days").toDate(),
                                    moment().subtract(1, "days").toDate()
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
                                queryStart: start.startOf("day"),
                                queryEnd: end.startOf("day"),
                            });
                        }}
                    >
                        <div
                            id="reportrange"
                            className="btn btn-light btn-sm line-height-normal p-2"
                            style={{ marginLeft: "15px" }}
                        >
                            <i
                                className="mr-2 text-primary-rocket"
                                data-feather="calendar"
                            ></i>
                            <span>{label}</span>
                            <i className="ml-1" data-feather="chevron-down"></i>
                        </div>
                    </DateRangePicker>
                    <button
                        className="btn btn-primary-rocket btn-xs"
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
        let response = await axios.post(
            Global.apiHost + "/api/v1/terminal/bonus_f",
            {
                startTime: Math.floor(moment().subtract(1, "days").toDate() / 1000),
                endTime: Math.floor(moment().subtract(1, "days").toDate() / 1000)
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
        
        this.todayCommittedBonus = response.data.data.todayCommittedBonus;
        this.unCommittedBonus = response.data.data.unCommittedBonus;

        //bonus in plan
        clearInterval(this.refrashBonusInPlanInterval);
        this.refrashBonusInPlanInterval=setInterval(() => {
            let nowStamp = Math.floor(moment() / 1000);
            let bonusInPlan =
                (nowStamp - this.lastPayBonusTime) * this.bonusInPlanPerSecond;
            console.log("bonus in plan:", bonusInPlan);
            this.setState({ bonusInPlan: bonusInPlan });
        }, 1000);

        //paidBonus
        this.setState({ committedToday:this.todayCommittedBonus,uncommitted:this.unCommittedBonus });
    }

    render() {
        return (
            <AdminLayout name="Terminal" description="Earnings">
                <div className="row">
                    <div className="col-lg-4 mb-4">
                        <div className="card  border-light shadow-sm">
                            <div
                                className="card-body"
                                style={{ padding: "10px 20px" }}
                            >
                                <div className="small text-muted">
                                    Tokens Committed Today
                                </div>
                                <div
                                    className="h4 d-flex align-items-center"
                                    style={{
                                        fontSize: "20px",
                                        color: "green",
                                        marginTop: "5px",
                                    }}
                                >
                                    {Utils.ParseMesonTokenStringToNormal(this.state.committedToday)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <div className="card  border-light shadow-sm">
                            <div
                                className="card-body"
                                style={{ padding: "10px 20px" }}
                            >
                                <div className="small text-muted">
                                    Tokens Uncommitted
                                </div>
                                <div
                                    className="h4 d-flex align-items-center"
                                    style={{
                                        fontSize: "20px",
                                        color: "green",
                                        marginTop: "5px",
                                    }}
                                >
                                    {Utils.ParseMesonTokenStringToNormal(this.state.uncommitted)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 mb-4">
                        <div className="card card  border-light shadow-sm">
                            <div
                                className="card-body"
                                style={{ padding: "10px 20px" }}
                            >
                                <div className="small text-muted">
                                    Estimated Tokens Next Round
                                </div>
                                <div
                                    className="h4"
                                    style={{
                                        fontSize: "20px",
                                        color: "grey",
                                        marginTop: "5px",
                                    }}
                                >
                                    {" "}
                                    {(this.state.bonusInPlan / 1e9).toFixed(9)}
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

export default withAlert()(TerminalTotalProfit_f);
