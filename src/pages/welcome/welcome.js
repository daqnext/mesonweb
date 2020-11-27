/*
 * @Author: your name
 * @Date: 2020-11-19 17:58:29
 * @LastEditTime: 2020-11-26 16:32:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/welcome/welcome.js
 */

import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import UserManager from "../../manager/usermanager";
import { isMobile } from 'react-device-detect';
import moment from "moment"
import TimeManager from '../../manager/timemanager';

class WelcomePage extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            dataready:false
        };
    }


    async componentDidMount() {
        if(UserManager.GetUserInfo()==null){
            await UserManager.UpdateUserInfo();
        }
        if (TimeManager.timeZone == null) {
            await TimeManager.UpdateServerTimeZone();
        }
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready:true
        });
    }

    render() {

        if(!this.state.dataready){
            return (<div></div>);
        }

        let mobilewarning=(<div></div>)
        if (isMobile) {
            mobilewarning=(<div className="alert alert-danger" role="alert">
                Mobile web browser is not supported.
                Please use desktop web browser.
            </div>)
        }


        return (
            <AdminLayout name="Welcome" description="Welcome">
                <div className="card border-light shadow-sm">
                    <div className="card-body">
                        <div>Welcome:{UserManager.userinfo.username}</div>
                        {/* <div>CurentTime :{new Date().toLocaleString()}</div> */}
                        <div>CurentTime :{moment().toLocaleString()}</div>
                        {mobilewarning}
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export  default  WelcomePage;