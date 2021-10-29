/*
 * @Author: your name
 * @Date: 2021-10-26 11:46:09
 * @LastEditTime: 2021-10-29 13:05:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/withdrawmgr_f/withdrawmgr_f.js
 */

import React, { useCallback, useState } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import Global from "../../global/global";
import AdminContent from "../../components/layout/adminContent";
import Utils from "../../utils/utils";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { withAlert } from "react-alert";
import moment from "moment";
import DateRangePicker from "react-bootstrap-daterangepicker";

class WithdrawMgr_f extends React.Component {
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
                defaultFlex: 0.3,
                render: ({ value }) => {
                    if (value == 0) {
                        return <div>{"-"}</div>;
                    }
                    return <div>{moment(value * 1000).format("YYYY-MM-DD")}</div>;
                },
            },
            {
                name: "UserName",
                header: "UserName",
                defaultFlex: 0.3,
                editable:true
            },
            {
                name: "UserEmail",
                header: "Email",
                defaultFlex: 0.3,
                editable:true
            },
            {
                name: "Address",
                header: "Address",
                defaultFlex: 1,
                editable:true
            },
            {
                name: "MerkleRoot",
                header: "MerkleRoot",
                defaultFlex: 1,
                editable:true
            },
            {
                name: "Amount",
                header: "Amount",
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div>{Utils.ParseMesonTokenStringToNormal(value)}</div>;
                },
                editable:true
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
                                    <span className="status-on" style={{ backgroundColor: "orange" }}></span> &nbsp;Pending
                                </div>
                            );

                        case "confirmed":
                            return (
                                <div>
                                    <span className="status-on" style={{ backgroundColor: "skyblue" }}></span> &nbsp;Confirmed
                                </div>
                            );

                        case "rejected":
                            return (
                                <div>
                                    <span className="status-on" style={{ backgroundColor: "red" }}></span> &nbsp;Rejected
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

        this.queryUserId=0
        this.queryStatus="All"
        this.queryTargetAddress=""
        this.queryTokenType="All"
        this.queryMerkleroot=""
        this.queryAsc=false
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();

        this.setState({
            dataready: true,
        });
        this.selected = {};

        this.loadData();
    }

    async confirmWithdraw(selectedObj){
        let ids=[]
        for (const key in selectedObj) {
            ids.push(parseInt(key))
        }
        if (ids.length==0) {
            this.props.alert.error("no selected");
            return;
        }
        let response = await axios.post(
            Global.apiHost + "/api/v1/admin/confirmwithdraw_f",
            {
                Ids:ids
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
                this.props.alert.success("confirm withdraw Success");
                this.loadData();
                break;

            default:
                this.props.alert.error(response.data.msg);
                return;
        }
    }

    async rejectWithdraw(selectedObj){
        let ids=[]
        for (const key in selectedObj) {
            ids.push(parseInt(key))
        }
        if (ids.length==0) {
            this.props.alert.error("no selected");
            return;
        }
        console.log(ids);
        let response = await axios.post(
            Global.apiHost + "/api/v1/admin/rejectwithdraw_f",
            {
                Ids:ids
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
                this.props.alert.success("reject withdraw Success");
                this.loadData();
                break;

            default:
                this.props.alert.error(response.data.msg);
                return;
        }
    }

    async FinishWithdraw(merkleroot){
        if (merkleroot=="") {
            this.props.alert.error("no merkleroot");
            return;
        }
        let response = await axios.post(
            Global.apiHost + "/api/v1/admin/finishwithdraw_f",
            {
                MerkleRoot:merkleroot
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
                this.props.alert.success("Finish Withdraw Success");
                this.loadData();
                break;

            default:
                this.props.alert.error(response.data.msg);
                // this.props.alert.error("Add withdraw Error");
                return;
        }
    }

    loadData = null;
    DataGrid = () => {
        const [selected, setSelected] = useState({});
        const onSelectionChange = useCallback(({ selected }) => {
            setSelected(selected);
            this.selected = selected;
        }, []);

        const loadData = useCallback(() => {
            const data = ({ skip, limit, sortInfo }) => {
                // console.log(skip, limit);
                let queryCondition={
                    startTime: Math.floor(this.state.queryStart.valueOf() / 1000),
                            endTime: Math.floor(this.state.queryEnd.valueOf() / 1000),
                            Limit: limit,
                            Offset: skip,
                }
                if (this.queryAsc==true) {
                    queryCondition.Idasc=true
                }
                if (this.queryMerkleroot!="") {
                    queryCondition.Merkleroot=this.queryMerkleroot
                }
                if (this.queryTokenType!="All") {
                    queryCondition.Credit_Name=this.queryTokenType
                }
                if (this.queryUserId!=0) {
                    queryCondition.UserId=this.queryUserId
                }
                if (this.queryTargetAddress!="") {
                    queryCondition.Address=this.queryTargetAddress
                }
                if (this.queryStatus!="All") {
                    queryCondition.Status=this.queryStatus
                }

                console.log(queryCondition);

                return axios
                    .post(
                        Global.apiHost + "/api/v1/admin/querywithdraw_f",
                        // {
                        //     startTime: Math.floor(this.state.queryStart.valueOf() / 1000),
                        //     endTime: Math.floor(this.state.queryEnd.valueOf() / 1000),
                        //     Limit: limit,
                        //     Offset: skip,
                        // },
                        queryCondition,
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
                        // console.log(responseData);
                        return {
                            data: responseData.data,
                            count: responseData.total,
                        };
                    });
            };
            this.setState({ tableData: data });
        }, []);
        this.loadData = loadData;

        return (
            <div>
                <ReactDataGrid
                    idProperty="Id"
                    columns={this.columns}
                    dataSource={this.state.tableData}
                    pagination
                    checkboxColumn={true}
                    checkboxOnlyRowSelect={true}
                    defaultLimit={10}
                    style={{ minHeight: 485 }}
                    selected={selected}
                    onSelectionChange={onSelectionChange}
                ></ReactDataGrid>
            </div>
        );
    };

    withdrawArea() {
        let label = this.state.queryStart.format("YYYY-MM-DD") + " ~ " + this.state.queryEnd.format("YYYY-MM-DD");
        return (
            <div className="card border-light shadow-sm mb-2" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header text-primary-rocket">
                    <strong className="mr-auto ml-2"> query conditions</strong>
                </div>

                <div className="card-body" style={{ color: "#555e68" }}>
                    <form
                        className="row card-body"
                        style={{ textAlign: "left" }}
                    >
                        <div className="row">
                            <div className="col-md-4">
                                <label>user id</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        let idStr=event.currentTarget.value.trim()
                                        if (idStr=="") {
                                            this.queryUserId=0
                                        }else{
                                            this.queryUserId=parseInt(idStr)
                                        }
                                    }}
                                    type="text"
                                />
                            </div>

                            <div className="col-md-4">
                                <label>status</label>
                                <select
                                    className="form-control"
                                    onChange={(event) => {
                                        this.queryStatus=event.currentTarget.value.trim()
                                    }}
                                    type="text"
                                >
                                    <option>All</option>
                                    <option>Pending</option>
                                    <option>Confirmed</option>
                                    <option>Rejected</option>
                                    <option>Finished</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label>target wallet address</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        this.queryTargetAddress=event.currentTarget.value.trim()
                                    }}
                                    type="text"
                                />
                            </div>

                            <div className="col-md-4">
                                <label>token type</label>
                                <select
                                    className="form-control"
                                    onChange={(event) => {
                                        this.queryTokenType= event.currentTarget.value.trim();
                                    }}
                                    type="text"
                                >
                                    <option>All</option>
                                    <option>MSNTT</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label>merkleroot</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        
                                        this.queryMerkleroot= event.currentTarget.value.trim()
                                        
                                    }}
                                    type="text"
                                />
                            </div>

                            <div className="col-md-4">
                                <label>sort</label>
                                <select
                                    className="form-control"
                                    onChange={(event) => {
                                        let sort =event.currentTarget.value.trim();
                                        if (sort=="desc") {
                                            this.queryAsc=false
                                        }else{
                                            this.queryAsc=true
                                        }
                                    }}
                                    type="text"
                                >
                                    <option>desc</option>
                                    <option>asc</option>
                                </select>
                            </div>

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
                                        this.loadData();
                                        //console.log("query");
                                    }}
                                >
                                    Query Record
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    operation() {
        return (
            <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header text-primary-rocket">
                    <strong className="mr-auto ml-2"> operation </strong>
                </div>

                <div className="toast-body" style={{ color: "#555e68" }}>
                    <form>
                        <div className="form-row">
                            <button
                                onClick={() => {
                                    console.log("confirm click", this.selected);
                                    this.confirmWithdraw(this.selected)
                                }}
                                className="btn btn-primary-rocket"
                                type="button"
                                // style={{ marginTop: "10px" }}
                            >
                                Confirm
                            </button>

                            <button
                                onClick={() => {
                                    console.log("reject click", this.selected);
                                    this.rejectWithdraw(this.selected)
                                }}
                                className="btn btn-primary-rocket"
                                type="button"
                                style={{ marginLeft: "10px" }}
                            >
                                Reject
                            </button>

                            <div className="col-6" style={{ marginLeft: "40px" }}>
                                <input
                                    className="form-control py-3"
                                    type="text"
                                    placeholder="Enter MerkleRoot"
                                    onChange={(event) => {
                                        this.finishMerkleRoot = event.target.value.trim();
                                    }}
                                ></input>
                            </div>
                            <button
                                onClick={() => {
                                    console.log("finish click", this.finishMerkleRoot);
                                    this.FinishWithdraw(this.finishMerkleRoot)
                                }}
                                className="btn btn-primary-rocket"
                                type="button"
                                style={{ marginRight: "10px" }}
                            >
                                Finish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    render() {
        if (!this.state.dataready) {
            return <div></div>;
        }

        return (
            <AdminLayout name="Admin" description="Withdraw Manager">
                {this.withdrawArea()}
                {this.operation()}
                <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header text-primary-rocket">
                        <strong className="mr-auto ml-2"> Withdraw Record</strong>
                    </div>
                    <div className="toast-body">
                        <this.DataGrid></this.DataGrid>
                    </div>
                </div>

                {/* {this.operation()} */}
            </AdminLayout>
        );
    }
}

export default withAlert()(WithdrawMgr_f);
