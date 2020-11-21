/*
 * @Author: your name
 * @Date: 2020-11-21 18:46:13
 * @LastEditTime: 2020-11-21 19:47:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/tokenControl/tokenControl.js
 */

import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import Global from "../../global/global";
import { withAlert } from "react-alert";

class TokenControlPage extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            dataready:false,
            data: {},
            newBonusPerDay:0,
        };
    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
           await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready:true,
            data:this.state.data,
        });

        this.GetBonusInfo()
        
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

    async SetNewTotalBonusPerDay() {
        let response = await axios.post(
            Global.apiHost + "/api/v1/admin/settotalbonus",
            {
                dailyTotalBonus: parseInt(this.state.newBonusPerDay)*1000000000,
            },
            {
                headers: {
                    Authorization: "Bearer " + UserManager.GetUserToken(),
                },
            }
        );
            
        if (response.data.status != 0) {
            this.props.alert.error(
                "Set new TotalBonusPerDay Error"
            );
            return ;
        }

        this.props.alert.success("Set new TotalBonusPerDay Success");
        this.GetBonusInfo()
           
    }

    render() {

        if(!this.state.dataready){
            return (<div></div>);
        }





        let monitorcontent=Object.keys(this.state.data).map((key,id) => {
            return(

                <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header text-primary">
                        <strong className="mr-auto ml-2">{key}</strong>
                    </div>
                    <div className="toast-body">
                        {this.state.data[key]/1000000000}
                    </div>
                </div>
            );
        });

        return (
            <AdminLayout name="Admin" description="monitoring">
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
                                        this.setState({newBonusPerDay:event.currentTarget.value})                                      
                                    }}
                                    type="text"
                                />
                                <button
                                    onClick={() => {
                                        this.SetNewTotalBonusPerDay()
                                    }}
                                    className="btn btn-primary"
                                    type="button"
                                    style={{marginTop:'10px'}}
                                >
                                    Set New Totoal Bonus
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {monitorcontent}
            </AdminLayout>
        );
    }
}

export default withAlert()(TokenControlPage);