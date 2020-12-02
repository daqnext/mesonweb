/*
 * @Author: your name
 * @Date: 2020-11-02 12:31:01
 * @LastEditTime: 2020-12-02 15:39:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/terminal/terminals.js
 */

import React, { useCallback } from "react";
import AdminLayout from "../../components/layout/adminLayout";
import { withAlert } from "react-alert";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Global from "../../global/global";

class AdminPriceSetting extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                name: "id",
                header: "ID",
                defaultWidth: 80,
                editable: false,
            },
            {
                name: "region",
                header: "Region",
                defaultFlex: 1,
                editable: false,
            },
            {
                name: "client_price_per_kb",
                header: "client_price",
                defaultFlex: 1,
                type: "number",
                render: ({ value }) => {
                    return <div>{`$ ${(value / 1000).toFixed(3)} /GB`}</div>;
                },
                getEditStartValue: (value) => (value / 1000).toFixed(3),
            },
            {
                name: "terminal_price_per_kb",
                header: "terminal_price",
                defaultFlex: 1,
                type: "number",
                render: ({ value }) => {
                    return (
                        <div>{`Token ${(value / 1000).toFixed(3)} /GB`}</div>
                    );
                },
                getEditStartValue: (value) => (value / 1000).toFixed(3),
            },
        ];

        this.state = {
            dataready: false,
            tableData: [],
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

        this.GetPriceData();
    }

    async GetPriceData() {
        let response = await axios.get(
            Global.apiHost + "/api/v1/admin/getregionprice",
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

    DataGrid = () => {
        const onEditComplete = useCallback(
            ({ value, columnId, rowIndex }) => {
                const data = [...this.state.tableData];
                console.log(data);
                let modifyRecord = data[rowIndex];
                console.log(modifyRecord);

                if (modifyRecord[columnId] == parseInt(value*1000)) {
                    return
                }
                modifyRecord[columnId] = parseInt(value*1000);
                console.log(modifyRecord);
                //send post to server
                axios
                    .post(
                        Global.apiHost + "/api/v1/admin/setregionprice",
                        {
                            id: modifyRecord.id,
                            region: modifyRecord.region,
                            client_price_per_kb:
                                modifyRecord.client_price_per_kb,
                            terminal_price_per_kb:
                                modifyRecord.terminal_price_per_kb,
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
                            this.props.alert.error(
                                "set new price error"
                            );
                            return;
                        }
                        this.props.alert.success("set new price success");
                        this.GetPriceData();
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

    renderContent() {
        if (
            !this.state.dataready ||
            !UserManager.checkUserHasAuth(UserManager.UserAuth.terminal)
        ) {
            return (
                <div className="alert alert-danger" role="alert">
                    Auth Required
                </div>
            );
        }

        return (
            <div className="card border-light shadow-sm">
                <div className="card-body">
                    <this.DataGrid></this.DataGrid>
                </div>
            </div>
        );
    }

    render() {
        const Content = this.renderContent();
        return (
            <AdminLayout name="Admin" description="PriceSetting">
                {Content}
            </AdminLayout>
        );
    }
}

export default withAlert()(AdminPriceSetting);
