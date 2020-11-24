/*
 * @Author: your name
 * @Date: 2020-11-19 17:58:29
 * @LastEditTime: 2020-11-24 20:27:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mesonweb/src/pages/test/test.js
 */

import React from 'react';
import AdminLayout from "../../components/layout/adminLayout";
import AdminContent from "../../components/layout/adminContent";
import usermanager from "../../manager/usermanager";
import UserManager from "../../manager/usermanager";

class TestPage extends React.Component {


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
        UserManager.TokenCheckAndRedirectLogin();
        this.setState({
            dataready:true
        });
    }



    renderContent(){
        if(!this.state.dataready||!UserManager.checkUserHasAuth(UserManager.UserAuth.admin)){
            return (<div className="alert alert-danger" role="alert">Auth Required</div>);
        }


        return (
            <div>
                <div>
                    <div>with cdn</div>
                    <video
                        style={{ width: "30%" }}
                        src="https://mesontest.shuquxs.xyz/static/video/1.mp4"
                        controls="controls"
                    ></video>

                    <div>without cdn</div>
                    <video
                        style={{ width: "30%" }}
                        src="https://meson.network/static/video/1.mp4"
                        controls="controls"
                    ></video>
                </div>
                <div
                    onClick={() => {
                        usermanager.getuserinfo("dSyyh3wPoKGuNHSqHjOGWg==");
                    }}
                >
                    test userinfo
                </div>

                <div
                    onClick={() => {
                        UserManager.SetUserToken("xxxx");
                    }}
                >
                    set user token
                </div>

                <div
                    onClick={() => {
                        localStorage.coldcdnusertoken = null;
                        console.log(localStorage.coldcdnusertoken);
                    }}
                >
                    unset user token
                </div>

                <div
                    onClick={() => {
                        console.log(UserManager.GetUserInfo());
                    }}
                >
                    log userinfo
                </div>
            </div>
        );
    }


    render() {


        const Content=this.renderContent();

        return (
            <AdminLayout
                name="Admin"
                description="test"
            >
                {Content}
            </AdminLayout>
        );
    }
}

export  default  TestPage;