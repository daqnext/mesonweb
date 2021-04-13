/*
 * @Author: your name
 * @Date: 2021-03-24 19:15:34
 * @LastEditTime: 2021-04-08 20:26:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/monitoring/monitor.js
 */

import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import axios from "axios";
import Global from "../../global/global";

class MonitorPage extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            dataready:false,
            data:{}
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


        axios.get(Global.apiHost+"/api/v1/admin/walletjob", {headers: {
                    Authorization: "Bearer "+UserManager.GetUserToken()
                }}).then( (response)=>{

            this.setState({
                dataready:this.state.dataready,
                data:response.data.data,
            });

        });



    }

    render() {

        if(!this.state.dataready){
            return (<div></div>);
        }

        let monitorcontent=Object.keys(this.state.data).map((key,id) => {
            return(

                <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header text-primary-rocket">
                        <strong className="mr-auto ml-2">{key}</strong>
                    </div>
                    <div className="toast-body" style={{color:"#555e68"}}>
                        {this.state.data[key]}
                    </div>
                </div>
            );
        });

        return (
            <AdminLayout
                name="Admin"
                description="monitoring"
            >
                {monitorcontent}
            </AdminLayout>
        );
    }
}

export  default  MonitorPage;