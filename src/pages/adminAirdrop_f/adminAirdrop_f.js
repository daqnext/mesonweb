/*
 * @Author: your name
 * @Date: 2020-11-21 18:46:13
 * @LastEditTime: 2021-10-27 16:56:44
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

class AdminAirdropPage_f extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                name: "date",
                header: "Date",
                defaultFlex: 1,
            },
            // {
            //     name: "UserId",
            //     header: "User Id",
            //     defaultFlex: 1,
            //     editable: false,
            // },
            // {
            //     name: "UserName",
            //     header: "UserName",
            //     defaultFlex: 1,           
            // },
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
            // {
            //     name: "OperatorId",
            //     header: "Operator",
            //     defaultFlex: 1,           
            // },
            
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

    

    async AddNewAirdrop(username,amount) {
        let response = await axios.post(
            Global.apiHost + "/api/v1/admin/addnewtransfer_f",
            {
                UserName: username,
                Amount:Utils.ParseNormalToMesonTokenString(amount)
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response==null || response.data==null) {
            this.props.alert.error("Request error");
            return;
        }

        switch (response.data.status) {
            case 0:
                this.props.alert.success("Add new airdrop Success");
                this.loadData();
                break;
            case 1:
                this.props.alert.error("User error");
                return;
        
            default:
                this.props.alert.error("Add new airdrop Error");
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
                        Global.apiHost+"/api/v1/admin/transferrecord_f",
                        {
                            startTime: Math.floor(
                                this.state.queryStart.valueOf() / 1000
                            ),
                            endTime: Math.floor(
                                this.state.queryEnd.valueOf() / 1000
                            ),
                            
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
                        //console.log(responseData);
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
            <AdminLayout name="Admin" description="Airdrop">


                <div
                    className="toast fade show"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header text-primary-rocket">
                        <strong className="mr-auto ml-2" > Add new airdrop</strong>
                    </div>
                    <div className="toast-body" style={{color:"#555e68"}}>
                        <form>
                            <div className="form-group">
                                <label>UserName</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        this.setState({
                                            newAirdropUserName:
                                            event.currentTarget.value.trim(),
                                        });
                                    }}
                                    type="text"
                                />
                                <label>Amount</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        this.setState({
                                            newAirdropAmount:
                                            event.currentTarget.value.trim(),
                                        });
                                    }}
                                    type="text"
                                />
                                <button
                                    onClick={() => {
                                        this.AddNewAirdrop(
                                            this.state.newAirdropUserName,
                                            this.state.newAirdropAmount
                                        );
                                    }}
                                    className="btn btn-primary-rocket"
                                    type="button"
                                    style={{ marginTop: "10px" }}
                                >
                                    Add Airdrop
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div
                    className="toast fade show"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header text-primary-rocket">
                        <strong className="mr-auto ml-2"> AirdropRecord</strong>
                    </div>
                    <div className="toast-body">
                        <this.DataGrid></this.DataGrid>
                    </div>
                </div>



            </AdminLayout>
        );
    }
}

export default withAlert()(AdminAirdropPage_f);