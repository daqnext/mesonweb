/*
 * @Author: your name
 * @Date: 2020-11-10 09:30:35
 * @LastEditTime: 2020-11-10 20:01:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/clientTraffic/clientTraffic.js
 */

import React from "react";
import { withAlert } from "react-alert";
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import DataTable from "../../components/table/datatable";
import moment from "moment";
 
class ClientTraffic extends React.Component {
    constructor(props) {
        super(props);

        this.fieldnames = {
            //id: "id",
            timestamp: "date",
            region: "region",
            origin_url: "domain",
            traffic: "traffic",
            amount: "amount",
        };

        this.state = {
            dataready: false,
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
    }

    async gettabledata() {
        const last30 = moment().subtract("days", 30).valueOf();
        const startTime = last30;
        const endTime = moment().valueOf();

        let response = await axios.post(
            "/api/v1/client/traffic",
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

        // console.log(response.data.data);
        return response.data.data;
    }

    renderRowItem(data, key) {
        if (key == "timestamp") {
            let item_ar = data[key] * 1000;
            return (
                <td style={{ width: "20%" }}>
                    {moment(item_ar).format("YYYY-MM-DD")}
                </td>
            );
        }

        if (key == "amount") {
            let money = data[key] / 1000000000;
            return <td style={{ width: "20%" }}>$&ensp;{money.toFixed(5)}</td>;
        }

        if (key == "traffic") {
            let traffic = data[key];
            if (traffic < 1000) {
                return <td style={{ width: "20%" }}>{traffic}&ensp;KB</td>;
            } else if (traffic < 1000000) {
                return (
                    <td style={{ width: "20%" }}>
                        {(traffic / 1000).toFixed(2)}&ensp;MB
                    </td>
                );
            } else {
                return (
                    <td style={{ width: "20%" }}>
                        {(traffic / 1000000).toFixed(2)}&ensp;GB
                    </td>
                );
            }
        }

        return <td>{data[key]}</td>;
    }

    render() {
        return (
            <AdminLayout name="ClientTraffic" description="BindDomain Traffic">
                <div style={{ marginTop: "10px" }}>
                    <div>Traffic:</div>
                    <DataTable
                        fieldnames={this.fieldnames}
                        gettabledata={this.gettabledata}
                        renderRowItem={this.renderRowItem}
                    ></DataTable>
                </div>
            </AdminLayout>
        );
    }
}

export default withAlert()(ClientTraffic);