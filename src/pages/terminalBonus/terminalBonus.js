/*
 * @Author: your name
 * @Date: 2020-11-10 19:56:44
 * @LastEditTime: 2020-11-17 08:38:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/terminalProfit/terminalProfit.js
 */

import React,{useCallback} from "react";
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
            tableData: [],

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
        this.loadData()
    }

    loadData = null;
    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                console.log(skip, limit);
                return axios
                    .post(
                        "/api/v1/terminal/bonusrecord",
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
                        let responseData = response.data.data;
                        console.log(responseData);
                        return {
                            data: responseData.data,
                            count: parseInt(responseData.total),
                        };
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
                        className="btn btn-primary btn-xs"
                        type="button"
                        style={{ marginLeft: "5px" }}
                        onClick={() => {
                            loadData();
                        }}
                    >
                        Query Record
                    </button>
                </div>
                <div>Terminal Bonus Record:</div>
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
        return (
            <AdminLayout name="TerminalBonus" description="Bonus">
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
                <this.DataGrid></this.DataGrid>
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalBonus);
