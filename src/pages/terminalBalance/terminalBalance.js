/*
 * @Author: your name
 * @Date: 2020-12-02 15:18:47
 * @LastEditTime: 2021-05-26 16:16:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/terminalBalance/terminalBalance.js
 */

import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import DataTable from "../../components/table/datatable";
import Global from "../../global/global";
import AdminContent from "../../components/layout/adminContent";

class TerminalBalancePage extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            dataready:false,
            token:'',
           
        };
    }


    updatebalance(){
        
        axios.get(Global.apiHost+"/api/v1/user/gettoken", {headers: {
                Authorization: "Bearer "+UserManager.GetUserToken()
            }}).then( (response_rp)=>{
            if(response_rp.data.status==0){
                this.setState({
                    dataready:this.state.dataready,
                    token:response_rp.data.data/1000000000,
                });
            }
        });
    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
            await UserManager.UpdateUserInfo();
        }
        UserManager.TokenCheckAndRedirectLogin();

        this.setState({
            dataready:true,
        });

        this.updatebalance();
    
    }

    render() {

        //console.log(UserManager.GetUserInfo());

        if(!this.state.dataready){
            return (<div></div>);
        }

        return (
            <AdminLayout
                name="Terminal"
                description="Token"
            >

                <div className="card border-light shadow-sm">
                    <div className="card-body">
                        <div className="small text-muted">Current Account Token</div>
                        <div className="h3" style={{color:"#555e68"}}>{this.state.token}</div>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default TerminalBalancePage;