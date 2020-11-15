/*
 * @Author: your name
 * @Date: 2020-11-10 19:56:44
 * @LastEditTime: 2020-11-15 22:58:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /coldCDNWeb/src/pages/terminalProfit/terminalProfit.js
 */

import React from "react";
import { withAlert } from "react-alert";
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import DataTable from "../../components/table/datatable";
import moment from "moment";
 
class TerminalBonus extends React.Component {
    constructor(props) {
        super(props);

        this.bonusInPlanPerSecond = 0
        this.lastPayBonusTime = 0
        this.todayRecord = []
        this.queryRecord = [];

        this.fieldnames = {
            //id: "id",
            timestamp: "date",
            machine_mac: "mac addr",
            amount: "amount",
        };
        this.state = {
            dataready: false,
            paidBonus: 0,
            bonusInPlan:0,
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

        if (response.data.status == 0) {
            this.bonusInPlanPerSecond = response.data.data.bonusInPlanPerSecond;
            this.lastPayBonusTime = response.data.data.lastPayBonusTime;
            this.todayRecord = response.data.data.todayRecord;
            this.queryRecord = response.data.data.queryRecord;
        }

        //bonus in plan
        setInterval(() => {
            let nowStamp=Math.floor(moment().valueOf()/1000)
            let bonusInPlan=(nowStamp-this.lastPayBonusTime)*this.bonusInPlanPerSecond
            console.log("bonus in plan:", bonusInPlan);
            this.setState({ bonusInPlan: bonusInPlan });
        },1000)
        
        //paidBonus
        let paidBonus=0
        for (let index = 0; index < this.todayRecord.length; index++) {
            const element = this.todayRecord[index];
            paidBonus+=element.amount
        }
        console.log("paid bonus:", paidBonus);
        this.setState({paidBonus:paidBonus})

        return this.queryRecord
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

        return <td>{data[key]}</td>;
    }

    render() {
        return (
            <AdminLayout name="TerminalBonus" description="Bonus">
                {/* {Content} */}

                <div>{this.state.paidBonus}</div>
                <div>{this.state.bonusInPlan}</div>

                <div style={{ marginTop: "10px" }}>
                    <div>Terminal Bonus:</div>
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

export default withAlert()(TerminalBonus);