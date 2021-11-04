/*
 * @Author: your name
 * @Date: 2020-11-21 18:46:13
 * @LastEditTime: 2021-11-03 09:00:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/tokenControl/tokenControl.js
 */

import React, { useCallback } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import Global from "../../global/global";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { withAlert } from "react-alert";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";
import Utils from "../../utils/utils";

class UserAirdropPage_f extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                name: "date",
                header: "Date",
                defaultFlex: 0.5,
                // render: ({ value }) => {
                //     return <div>{moment(value*1000).format("YYYY-MM-DD")}</div>;
                // },          
            },
            {
                name: "amount",
                header: "Amount",
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div>{Utils.ParseMesonTokenStringToNormal(value)}</div>;
                },             
            },
            {
                name: "credit_name",
                header: "TokenType",
                defaultFlex: 0.5,           
            },      
        ];

        this.state = {
            dataready: false,
            tableData: [],
            newAirdropUserName: "",
            newAirdropAmount:0,
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

    //response data
    // {
    //     "data": [
    //         {
    //             "userid": 15,
    //             "credit_name": "MSNTT",
    //             "amount": "100000000200",
    //             "date": "2021-10-25",
    //             "type": "ADD",
    //             "reason": "U2U",
    //             "unixtimesec": 0
    //         },
    //         {
    //             "userid": 15,
    //             "credit_name": "MSNTT",
    //             "amount": "100",
    //             "date": "2021-10-26",
    //             "type": "ADD",
    //             "reason": "U2U",
    //             "unixtimesec": 0
    //         }
    //     ],
    //     "status": 0
    // }


    loadData = null;
    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                console.log(skip, limit);
                return axios
                    .post(
                        Global.apiHost+"/api/v1/user/transferrecord_f",
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
                            data: responseData,
                            count: responseData.length,
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
                <div className="row" style={{marginBottom:"20px"}}>
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
                            onClick={() => {
                                loadData();
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
                    style={{ minHeight: 485 }}
                ></ReactDataGrid>
            </div>
        );
    };

    render() {
        if (!this.state.dataready) {
            return <div></div>;
        }

        return (
            <AdminLayout name="Terminal" description="Airdrop">
                <div
                    className="toast fade show"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header text-primary-rocket">
                        <strong className="mr-auto ml-2">Get Airdrop Record</strong>
                    </div>
                    <div className="toast-body">
                        <this.DataGrid></this.DataGrid>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(UserAirdropPage_f);