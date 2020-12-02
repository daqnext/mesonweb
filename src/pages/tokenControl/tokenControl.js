/*
 * @Author: your name
 * @Date: 2020-11-21 18:46:13
 * @LastEditTime: 2020-12-02 15:16:30
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

class TokenControlPage extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                name: "country",
                header: "Country",
                defaultFlex: 1,
                editable: false,
            },
            {
                name: "daily_total_bonus",
                header: "daily_total_bonus",
                defaultFlex: 1,
                render: ({ value }) => {
                    return <div>{value / 1e9}</div>;
                },
                getEditStartValue: (value) => value /1e9,               
            },
            {
                name: "action",
                header: "Action",
                defaultWidth: 120,
                render: ({ data }) => {
                    return (
                        <div
                            style={{ display: "block", marginTop: "5px" }}
                            className="btn btn-secondary btn-sm"
                            onClick={async () => {
                                console.log("delete click", data);
                                this.DeleteBonusConfig(data.country);
                            }}
                        >
                            Delete
                        </div>
                    );
                },
            },
        ];

        this.state = {
            dataready: false,
            tableData: [],
            data: {},
            newBonusPerDay: 0,
            newCountry: "",
            newBonusToken:0,
        };
    }

    async componentDidMount() {
        if (UserManager.GetUserInfo() == null) {
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready: true,
            data: this.state.data,
        });

        this.GetBonusInfo();
        this.GetCountryBounusData();
    }

    async GetBonusInfo() {
        axios
            .get(Global.apiHost + "/api/v1/admin/getbonusinfo", {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            })
            .then((response) => {
                this.setState({
                    dataready: this.state.dataready,
                    data: response.data.data,
                });
            });
    }

    async DeleteBonusConfig(country) {
        let response = await axios.post(
            Global.apiHost + "/api/v1/admin/deletecountrytokenconfig",
            {
                country:country
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response.data.status != 0) {
            this.props.alert.error("Delete config error");
            return;
        }

        this.props.alert.success("Delete Success");
        this.GetCountryBounusData();
    }

    async SetNewTotalBonusPerDay() {
        let response = await axios.post(
            Global.apiHost + "/api/v1/admin/settotalbonus",
            {
                dailyTotalBonus:
                    parseInt(this.state.newBonusPerDay) * 1000000000,
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response.data.status != 0) {
            this.props.alert.error("Set new TotalBonusPerDay Error");
            return;
        }

        this.props.alert.success("Set new TotalBonusPerDay Success");
        this.GetBonusInfo();
    }

    async GetCountryBounusData() {
        let response = await axios.get(
            Global.apiHost + "/api/v1/admin/getcountrytokenconfig",
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );
        if (response.data.status != 0) {
            return;
        }
        let responseData = response.data.data;
        console.log(responseData);
        this.setState({ tableData: responseData });
    }

    async AddNewCountryBonusToken(country,token) {
        let response = await axios.post(
            Global.apiHost + "/api/v1/admin/addcountrytokenconfig",
            {
                country: country,
                tokenAmount:token*1e9
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );

        if (response.data.status != 0) {
            this.props.alert.error("Add new country config Error");
            return;
        }

        this.props.alert.success("Add new country config Success");
        this.GetCountryBounusData();
    }

    DataGrid = () => {
        const onEditComplete = useCallback(
            ({ value, columnId, rowIndex }) => {
                const data = [...this.state.tableData];
                console.log(data);
                let modifyRecord = data[rowIndex];
                console.log(modifyRecord);

                if (modifyRecord[columnId] == parseInt(value*1e9)) {
                    return;
                }
                //send post to server
                axios
                    .post(
                        Global.apiHost +
                            "/api/v1/admin/modifycountrytokenconfig",
                        {
                            country: modifyRecord.country,
                            tokenAmount: value * 1e9,
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
                            this.props.alert.error("set new value error");
                            return;
                        }
                        this.props.alert.success("set new value success");
                        this.GetCountryBounusData();
                    });
                // this.setState({tableData: data });
            },
            [this.state.tableData]
        );

        return (
            <div>
                <div></div>
                <ReactDataGrid
                    idProperty="id"
                    columns={this.columns}
                    dataSource={this.state.tableData}
                    onEditComplete={onEditComplete}
                    editable={true}
                    // pagination
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

        let monitorcontent = Object.keys(this.state.data).map((key, id) => {
            return (
                <div
                    className="toast fade show"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="toast-header text-primary">
                        <strong className="mr-auto ml-2">{key}</strong>
                    </div>
                    <div className="toast-body">
                        {this.state.data[key] / 1000000000}
                    </div>
                </div>
            );
        });

        return (
            <AdminLayout name="Admin" description="bonus token control">
                <div className="toast-header text-primary">
                    <strong className="mr-auto ml-2">
                        Total Bonus Token
                    </strong>
                </div>
                <div
                    className="card border-light shadow-sm"
                    style={{ marginBottom: "10px" }}
                >
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>TotalTokenPerDay</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        this.setState({
                                            newBonusPerDay:
                                                event.currentTarget.value,
                                        });
                                    }}
                                    type="text"
                                />
                                <button
                                    onClick={() => {
                                        this.SetNewTotalBonusPerDay();
                                    }}
                                    className="btn btn-primary"
                                    type="button"
                                    style={{ marginTop: "10px" }}
                                >
                                    Set New Totoal Bonus
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {monitorcontent}

                <div className="toast-header text-primary">
                    <strong className="mr-auto ml-2">
                        Country Bonus Token
                    </strong>
                </div>
                <div className="card border-light shadow-sm">
                    <div className="card-body">
                        <this.DataGrid></this.DataGrid>
                    </div>
                </div>
                <div
                    className="card border-light shadow-sm"
                    style={{ marginBottom: "10px" }}
                >
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Country</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        this.setState({
                                            newCountry:
                                                event.currentTarget.value,
                                        });
                                    }}
                                    type="text"
                                />
                                <label>DailyBonusToken</label>
                                <input
                                    className="form-control"
                                    onChange={(event) => {
                                        this.setState({
                                            newBonusToken:
                                                event.currentTarget.value,
                                        });
                                    }}
                                    type="text"
                                />
                                <button
                                    onClick={() => {
                                        this.AddNewCountryBonusToken(
                                            this.state.newCountry,
                                            this.state.newBonusToken
                                        );
                                    }}
                                    className="btn btn-primary"
                                    type="button"
                                    style={{ marginTop: "10px" }}
                                >
                                    Add New Country Config
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(TokenControlPage);