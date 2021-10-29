/*
 * @Author: your name
 * @Date: 2020-12-02 15:18:47
 * @LastEditTime: 2021-10-27 16:57:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/terminalBalance/terminalBalance.js
 */

import React, { useCallback } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import SendCode from "../../components/sendcode/sendcode";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import Global from "../../global/global";
import Utils from "../../utils/utils";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { withAlert } from "react-alert";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";

class TerminalBalancePage_f extends React.Component {
    constructor(props) {
        super(props);

        // Address: "0x24f952c8c4d2ed90fdc2f7cbe62ef6f5ea837e9f"
        // Amount: "3000"
        // CreditName: "MSNTT"
        // FinanceId: 118
        // Id: 51
        // MerkleRoot: "0x2f5e77f4b32ff649e2e2ef207a66b59b5fde284a4dc38ce30163ca5ce6e25748"
        // Status: "confirmed"
        // UnixTime: 1635227890
        this.columns = [
            {
                name: "Id",
                header: "Id",
                defaultFlex: 0.15,
            },
            {
                name: "UnixTime",
                header: "Date",
                defaultFlex: 0.5,
                render: ({ value }) => {
                    if (value == 0) {
                        return <div>{"-"}</div>;
                    }
                    return <div>{moment(value * 1000).format("YYYY-MM-DD")}</div>;
                },
            },
            {
                name: "Address",
                header: "Address",
                defaultFlex: 1,
                editable:true
            },
            {
                name: "Amount",
                header: "Amount",
                defaultFlex: 1,
                editable:true,
                render: ({ value }) => {
                    return <div>{Utils.ParseMesonTokenStringToNormal(value)}</div>;
                },
            },
            {
                name: "CreditName",
                header: "TokenType",
                defaultFlex: 0.3,
            },
            {
                name: "Status",
                header: "Status",
                defaultFlex: 0.3,
                render: ({ value }) => {
                    switch (value) {
                        case "pending":
                            return (
                                <div>
                                    <span className="status-on" style={{backgroundColor:"orange"}}></span> &nbsp;Pending
                                </div>
                            );

                        case "confirmed":
                            return (
                                <div>
                                    <span className="status-on" style={{backgroundColor:"skyblue"}}></span> &nbsp;Confirmed
                                </div>
                            );

                        case "rejected":
                            return (
                                <div>
                                    <span className="status-on" style={{backgroundColor:"red"}}></span> &nbsp;Rejected
                                </div>
                            );

                        case "finished":
                            return (
                                <div>
                                    <span className="status-on"></span> &nbsp;Finished
                                </div>
                            );
                        default:
                            return (
                                <div>
                                    <span>{value}</span>
                                </div>
                            );
                    }
                },
            },
            {
                name: "action",
                header: "",
                defaultFlex: 0.3,
                render: ({ data }) => {
                    //console.log(data);
                    if (data.Status != "pending") {
                        return null;
                    }
                    return (
                        <div style={{ display: "flex" }}>
                            <div
                                style={{ marginLeft: "5px" }}
                                className="btn btn-primary-rocket btn-sm"
                                onClick={async () => {
                                    //console.log(data);
                                    let response = await axios.post(
                                        Global.apiHost + "/api/v1/user/cancelwithdraw_f",
                                        {
                                            Id: data.Id,
                                        },
                                        {
                                            headers: {
                                                Authorization: "Bearer " + UserManager.GetUserToken(),
                                            },
                                        }
                                    );

                                    if (response.data.status == 0) {
                                        this.props.alert.success("Cmd Sended");
                                        this.loadData();
                                        return;
                                    }

                                    this.props.alert.error("Cmd send error");
                                }}
                            >
                                Cancel
                            </div>
                        </div>
                    );
                },
            },
        ];

        this.state = {
            dataready: false,
            token: "",
            tableData: [],
            targetWalletAddress: "",
            amount: "",
            queryStart: moment().subtract(31, "days").startOf("day"),
            queryEnd: moment().startOf("day"),
        };
    }

    checkemail() {
        let userInfo = UserManager.GetUserInfo();
        if (userInfo == null) {
            // login
            this.props.alert.error("Please login");
            return false;
        }
        if (userInfo.email == "") {
            this.props.alert.error("Please bind email");
            return false;
        }

        return true;
    }

    clicksendemailvcode() {
        axios
            .get(Global.apiHost + "/api/v1/user/getwithdrawvcode_f", {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            })
            .then((response) => {
                //console.log(response);

                if (response && response.data.status == 2006) {
                    this.props.alert.error("Email format is not correct");
                    return;
                }

                if (response && response.data.status == 102) {
                    this.props.alert.error("please wait 60 seconds before you send verify code again");
                    return;
                }

                if (response && response.data.status == 0) {
                    this.props.alert.success("VCode send");
                    return;
                }
            });
    }

    updatebalance() {
        axios
            .get(Global.apiHost + "/api/v1/user/gettoken_f", {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            })
            .then((response_rp) => {
                if (response_rp.data.status == 0) {
                    this.setState({
                        dataready: this.state.dataready,
                        token: Utils.ParseMesonTokenStringToNormal(response_rp.data.data),
                    });
                }
            });
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();

        this.setState({
            dataready: true,
        });

        this.updatebalance();
        this.loadData();
    }

    async AddWithdraw(address, amount, vcode) {
        let response = await axios.post(
            Global.apiHost + "/api/v1/user/addwithdraw_f",
            {
                Address: address,
                Amount: Utils.ParseNormalToMesonTokenString(amount),
                VCode: vcode,
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response == null || response.data == null) {
            this.props.alert.error("Request error");
            return;
        }

        switch (response.data.status) {
            case 0:
                this.props.alert.success("Add withdraw Success");
                this.loadData();
                break;

            default:
                this.props.alert.error("Add withdraw Error");
                return;
        }
    }

    loadData = null;
    DataGrid = () => {
        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                console.log(skip, limit);
                return axios
                    .post(
                        Global.apiHost + "/api/v1/user/withdrawrecord_f",
                        {
                            startTime: Math.floor(this.state.queryStart.valueOf() / 1000),
                            endTime: Math.floor(this.state.queryEnd.valueOf() / 1000),
                            Limit: limit,
                            Offset: skip,
                        },
                        {
                            headers: {
                                Authorization: "Bearer " + UserManager.GetUserToken(),
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
                            count: responseData.total,
                        };
                    });
            };
            this.setState({ tableData: data });
        }, []);
        this.loadData = loadData;

        let label = this.state.queryStart.format("YYYY-MM-DD") + " ~ " + this.state.queryEnd.format("YYYY-MM-DD");

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
                                Yesterday: [moment().subtract(1, "days").toDate(), moment().subtract(1, "days").toDate()],
                                "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
                                "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
                                "This Month": [moment().startOf("month").toDate(), moment().endOf("month").toDate()],
                                "Last Month": [
                                    moment().subtract(1, "month").startOf("month").toDate(),
                                    moment().subtract(1, "month").endOf("month").toDate(),
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
                        <div id="reportrange" className="btn btn-light btn-sm line-height-normal p-2" style={{ marginLeft: "15px" }}>
                            <i className="mr-2 text-primary-rocket" data-feather="calendar"></i>
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

    withdrawArea() {
        return (
            <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header text-primary-rocket">
                    <strong className="mr-auto ml-2"> Withdraw to wallet</strong>
                </div>

                {UserManager.GetUserInfo() && UserManager.GetUserInfo().email == "" ? (
                    <div className="toast-body h6" style={{ color: "#555e68" }}>
                        Please bind your email first.
                        <button
                                    onClick={() => {
                                        window.location="/bindemail"
                                    }}
                                    className="btn btn-primary-rocket"
                                    type="button"
                                    style={{marginLeft:"10px"}}
                                >
                                    Bind email
                                </button>
                    </div>
                ) : (
                    <div className="toast-body" style={{ color: "#555e68" }}>
                        <form>
                            <div className="form-group">
                                <label>target wallet address</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        this.setState({
                                            targetWalletAddress: event.currentTarget.value.trim(),
                                        });
                                    }}
                                    type="text"
                                />
                                <label>Amount</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        this.setState({
                                            amount: event.currentTarget.value.trim(),
                                        });
                                    }}
                                    type="text"
                                />

                                <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label className="small mb-2">email code</label>
                                            <input
                                                className="form-control py-3"
                                                type="text"
                                                placeholder="Enter vcode"
                                                onChange={(event) => {
                                                    this.vcode = event.target.value.trim();
                                                }}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <label className="small mb-2">send email</label>
                                            <div style={{ textAlign: "left" }}>
                                                <SendCode
                                                    checkphonecorrect={() => {
                                                        return this.checkemail();
                                                    }}
                                                    click={() => {
                                                        this.clicksendemailvcode();
                                                    }}
                                                ></SendCode>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        this.AddWithdraw(this.state.targetWalletAddress, this.state.amount, this.state.vcode);
                                    }}
                                    className="btn btn-primary-rocket"
                                    type="button"
                                    style={{ marginTop: "10px" }}
                                >
                                    Add Withdraw
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        );
    }

    render() {
        if (!this.state.dataready) {
            return <div></div>;
        }

        return (
            <AdminLayout name="Terminal" description="Token">
                <div className="card border-light shadow-sm" style={{ marginBottom: "20px" }}>
                    <div className="card-body">
                        <div className="small text-muted">Current Account Token</div>
                        <div className="h3" style={{ color: "#555e68" }}>
                            {this.state.token}
                        </div>
                    </div>
                </div>

                {this.withdrawArea()}

                <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header text-primary-rocket">
                        <strong className="mr-auto ml-2"> Withdraw Record</strong>
                    </div>
                    <div className="toast-body">
                        <this.DataGrid></this.DataGrid>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(TerminalBalancePage_f);
